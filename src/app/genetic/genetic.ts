import { Vector3 } from 'three';

import { Subscription } from 'rxjs';
import { EngineService } from '../engine/engine.service';
import { MessageService } from '../services/message.service';
import { FunctionService } from '../services/function.service';
import { Circle } from '../engine/circle';
import { Binary } from './binary';

export class Genetic {

    subscription: Subscription;

    private config:any = {};
    private binary:Binary = new Binary();

    constructor( private engServ: EngineService, private MS: MessageService, private FS: FunctionService, private circle:Circle ) {
        // subscribe to component messages
        this.subscription = this.MS.getMessage().subscribe(message => {
        
            if (message == 'start_ga_click') {
                if( this.configGenetic() ) {
                    this.start();
                }
             }
    
        });
    }

    configGenetic():boolean {

        this.config = {
          "size": this.MS.genetic_config.size, //Population size
          "crossover": this.MS.genetic_config.crossover, //Probability of crossover
          "mutation": this.MS.genetic_config.mutation, //Probability of mutation
          "iterations": this.MS.genetic_config.iterations //Maximum number of iterations before finishing
        };
        
        if(this.config.size == 0) {
          alert("Draw initial population to start Genetic Algorithm");
          return false;
        }
        else
          return true;
    }


//---------------------------------------------------------------------------
    start() {

        var population:any = []; //population of circles
        var points_in_polygon:any = []; //{ x : pointX, y : pointY, inCircle: 0 }
        var total_points_in_all_circles:number;

        for( let i = 0; i < this.config.iterations; i++ ) {

            console.log("ITERATION--------------:" + (i+1));
            
            population = this.engServ.circleGroup.children;
            points_in_polygon = this.MS.points_in_polygon;
            total_points_in_all_circles = this.MS.total_points_in_all_circles;
            console.log("Population:"+population.length)

            this.fitness( population );

            //selects half of total population, based on fitness, and sort then in acsending order of fitness level
            var selected:any = this.selection( population );

            //delete population that is not selected
            this.discardPopulation( selected );
   
            var children:any = [];

            children = this.crossover( selected );

            children = this.mutation( children );

            if( children.length > 0 ) {
                for ( let i = 0; i < children.length; i++) {            
                    this.FS.populate_a_circle( this.circle, children[i].son.position, children[i].son.radius );
                    this.FS.populate_a_circle( this.circle, children[i].daughter.position, children[i].daughter.radius );
                }
            }

            this.FS.set_total_points_in_all_circles();

            //break if population is less then total circles
            //or total points in circles is less that total points in polygon
            if( population.length <= this.MS.settings.circles_total 
                /*|| this.MS.total_points_in_all_circles <= this.MS.points_in_polygon.length*/ ) {
                
                this.MS.sendMessage( "circle_popupation:"+population.length );
                console.log("Population:"+population.length);

                if( population.length <= this.MS.settings.circles_total )
                    console.log("Population size reached:"+population.length);
                /*else if( this.MS.total_points_in_all_circles <= this.MS.points_in_polygon.length )
                    console.log("Max points covered");  */  
                break;

            }
                
            this.MS.sendMessage( "circle_popupation:"+population.length );
            console.log("Population:"+population.length);
            
        }

 
    }
//---------------------------------------------------------------------------





    fitness( population:any ) {

        console.log("Fitness");
        
        for( var i = 0; i < population.length; i++ ) {
            var circle:any = population[i];

            //more the radius, more the fitness level is
            //circle.userData.fitness = circle.userData.radius;

            //number of total points in a circle
            circle.userData.fitness = circle.userData.circlePoints.length;

            //fitness will be nagative when a point is within more than 1 circle
            for( let j = 0; j < circle.userData.circlePoints.length; j++ ) {
                var circlePoints:any = circle.userData.circlePoints[j];
                if( circlePoints.inCircle == 1) {
                    circle.userData.fitness = circle.userData.fitness + 1;
                }
                else {
                    circle.userData.fitness = circle.userData.fitness - circlePoints.inCircle;
                }
                
            }
        }

    }

    selection( population:any ) {

        console.log("Selection");

        //selects half of total population and sorts them in acsending order of fitness level
        var selected:any = [];
        var max = -Infinity;
        var maxCircle:any; 
        for( var i = 0; i < population.length; i++ ) {
            var circle:any = population[i];

            if( circle.userData.selected == true ) {
                //end of loop
                if( i >= population.length - 1 ) { 
                    maxCircle.userData.selected = true;
                    selected.push( maxCircle );
                    max = -Infinity;
                    i = -1;
                }
                else
                    continue;
            }
                
            //console.log(circle.userData.fitness +" "+max)   

            if( circle.userData.fitness >= max ) { 
                max = circle.userData.fitness;   
                maxCircle = circle;
            }
  
            //end of loop
            if( i >= population.length - 1 ) { 
                maxCircle.userData.selected = true;
                selected.push( maxCircle );
                max = -Infinity;
                i = -1;
            }

            //select half of number of total circles
            if( selected.length >= population.length / 2 ) {       
                break;
            }

        }
        console.log("Selected:"+selected.length)
        return selected;

    }

    crossover( selected:any ) {

        console.log("Crossover");

        var children:any = [];

        for( var i = 0; i < selected.length; ) {

            var father:any = selected[i];
            var mother:any = selected[i+1];

            var son:any = { radius:null, position:{x:null,y:null}  };
            var daughter:any = { radius:null, position:{x:null,y:null} };

            if( father!=undefined && mother != undefined ) {
                
                son.radius = father.userData.radius;
                //son.position = this.FS.get_random_point_between_two_points( father.userData.position.x, father.userData.position.y, mother.userData.position.x, mother.userData.position.y );
                //son.position = this.FS.get_point_adjacent_to_circle( father.userData.position.x, father.userData.position.y, mother.userData.position.x, mother.userData.position.y, father.userData.radius, mother.userData.radius );

                daughter.radius = father.userData.radius;
                //daughter.position = this.FS.get_random_point_between_two_points( father.userData.position.x, father.userData.position.y, mother.userData.position.x, mother.userData.position.y );
                //daughter.position = this.FS.get_point_adjacent_to_circle( mother.userData.position.x, mother.userData.position.y, father.userData.position.x, father.userData.position.y, mother.userData.radius, father.userData.radius );

                let offsprings:any = this.binary.binSwapping( father.userData.position.x, father.userData.position.y, mother.userData.position.x, mother.userData.position.y );
               
                son.position = offsprings.firstOffsping;
                daughter.position = offsprings.secondOffsping;
         
                children.push( {son:son, daughter:daughter} )
            }
        
            i = i + 2;
        }

        return children;
    }

    mutation( children:any ) {

        console.log("Mutation");

        for( var i = 0; i < children.length; i++) {

            if( Math.random() <= this.config.mutation ) {
                console.log("Mutating:"+ (i+1) + " of " + children.length);

                const points_in_polygon:any = this.MS.points_in_polygon;
                let random:number;
                let randomPosition:Vector3;
                
                random = Math.floor(Math.random() * Math.floor( points_in_polygon.length - 1 ));
                random =  Math.floor(random / 3) * 3;
                random = Math.round( random );
                randomPosition = new Vector3( points_in_polygon[ random ].x, points_in_polygon[ random ].y, 0 );

                //check if new random point already has a cicle in population
                if( this.FS.is_circle_at_point( randomPosition ) == false ) {
                    children[i].son.position = randomPosition;
                }
                //mutate again
                else {
                    console.log("Mutating again");
                    i = i - 1;
                    continue;
                }

                random = Math.floor(Math.random() * Math.floor( points_in_polygon.length - 1 ));
                random =  Math.floor(random / 3) * 3;
                random = Math.round( random );
                randomPosition = new Vector3( points_in_polygon[ random ].x, points_in_polygon[ random ].y, 0 );

                //check if new random point already has a cicle in population
                if( this.FS.is_circle_at_point( randomPosition ) == false ) {
                    children[i].daughter.position = randomPosition;
                }
                //mutate again
                else {
                    console.log("Muatating again");
                    i = i - 1;
                    continue;
                }

            }

        }

        return children;
    }
    
    discardPopulation( selected:any ) {
        //remove all population
        this.FS.remove_all_circles();
        //add selected circles
        for( var i = 0; i < selected.length; i++ ) { 
            let circle:any = selected[i];
            this.FS.populate_a_circle( this.circle, circle.userData.position, circle.userData.radius );
        }
        
    }
}
