import { Vector3, Line, Group } from 'three';

import { Subscription } from 'rxjs';
import { EngineService } from '../engine/engine.service';
import { MessageService } from '../services/message.service';
import { FunctionService } from '../services/function.service';
import { Circle } from '../engine/circle';
import { Binary } from './binary';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';

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
          "generations": this.MS.genetic_config.generations //Maximum number of generations before finishing
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

        


        //this.FS.set_population_points();

        var circleSet:any = []; //population of circles
        var points_in_polygon:any = []; //{ x : pointX, y : pointY, inCircle: 0 }
        var total_points_in_all_circles:number;

        //if circle sets alreadt exists, make them visible
        if( this.engServ.circleGroup.children.length > 0 ) {
            this.FS.show_all_circle_sets();
        }

        for( let i = 0; i < this.config.generations; i++ ) {

            //this.FS.removeAllLables();

            console.log("GENERATION--------------:" + (i+1));
            
            circleSet = this.engServ.circleGroup.children;
            points_in_polygon = this.MS.points_in_polygon;
            total_points_in_all_circles = this.MS.total_points_in_all_circles;
            console.log( "Population:"+this.FS.get_population() );

            this.fitness( circleSet );

            //selects half of total population, based on fitness, and sort then in acsending order of fitness level
            var selected:any = this.selection( circleSet );

            //delete population that is not selected
            this.discardPopulation( selected );

            var children:any = [];
   
            children = this.crossover( selected );
             
            //var circleSetLast:any = null;

             //if selected circle set is odd in length, then add last circle set without crossover in children 
            /* if( children.length == selected.length - 1 ) {
                 circleSetLast = selected[ selected.length - 1 ];
                 
             }*/

            children = this.mutation( children );

            if( children.length > 0 ) {

                for ( let i = 0; i < children.length; i++) {    
                    
                    //check for in which new circle group this new child will be added
                    for ( let j = 0; j < this.engServ.circleGroup.children.length; j++ ) {
                        let circleSet = this.engServ.circleGroup.children;

                        if( circleSet[j].userData.circleSet == children[i].son.circleSet ) {

                            this.FS.populate_a_circle( this.circle, children[i].son.position, children[i].son.radius, circleSet[j], circleSet[j].userData.color );

                        }
                        else if( circleSet[j].userData.circleSet == children[i].daughter.circleSet ) {
                        
                            this.FS.populate_a_circle( this.circle, children[i].daughter.position, children[i].daughter.radius, circleSet[j], circleSet[j].userData.color );

                        }

                    }

                }
                
            }
  
    /*        //break if population is less then total circles
            //or total points in all circles is greater than or equal to total points in polygon
            if( population.length <= this.MS.settings.circles_total 
                || this.MS.total_points_in_all_circles >= this.MS.points_in_polygon.length ) {
                
                this.MS.sendMessage( "circle_popupation:"+population.length );
                console.log("Population:"+population.length);

                if( population.length <= this.MS.settings.circles_total )
                    console.log("Population size reached:"+population.length);
                else if( this.MS.total_points_in_all_circles >= this.MS.points_in_polygon.length )
                    console.log("Max points covered");   
                break;

            }
      */          
            let population = this.FS.get_population();
            this.MS.sendMessage( "circle_popupation:"+population );
            console.log("Population:"+population);

            this.FS.set_population_points();
          
        }

        this.showResult();

 
    }
//---------------------------------------------------------------------------





    fitness( circleSet:any ) {

        console.log("Fitness");
        
        for( var i = 0; i < circleSet.length; i++ ) {

            let circle = circleSet[i].children;

            var fitness_total:number = 0;

            for( var j = 0; j < circle.length; j++ ) {

                var object:Line = circle[j];

                //more the radius, more the fitness level is
                //object.userData.fitness = circle.userData.radius;

                //number of total points in a circle
                object.userData.fitness = object.userData.circlePoints.length;
                
                fitness_total = fitness_total + object.userData.fitness; 

            }
         
            circleSet[i].userData.fitness = fitness_total;
            
        }

    }

    selection( circleSet:any ) {
   
        console.log("Selection");

        //selects half of total population of circle set and sorts them in acsending order of fitness level
        var selected:any = [];
        var max = -Infinity;
        var maxCircleSet:any; 
        for( var i = 0; i < circleSet.length; i++ ) {
            var _circleSet:any = circleSet[i];

            if( _circleSet.userData.selected == true ) {
                //end of loop
                if( i >= circleSet.length - 1 ) { 
                    maxCircleSet.userData.selected = true;
                    selected.push( maxCircleSet );
                    max = -Infinity;
                    i = -1;
                }               
                continue;
            }
                
            //console.log(circle.userData.fitness +" "+max)   

            if( _circleSet.userData.fitness >= max) { 
                max = _circleSet.userData.fitness;   
                maxCircleSet = _circleSet;
            }
  
            //end of loop
            if( i >= circleSet.length - 1 ) { 
                maxCircleSet.userData.selected = true;
                selected.push( maxCircleSet );
                max = -Infinity;
                i = -1;
            }

            //select half of number of total circles
            if( circleSet.length > 2 ) {
                if( selected.length >= circleSet.length / 2 ) {       
                    break;
                }
            }
            else if( selected.length == 2 ) {
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

            var fatherSet:any = selected[i];
            var motherSet:any = selected[i+1];

            if( fatherSet != undefined && motherSet != undefined ) {

                console.log("Crossing over: Set " + ( i + 1 ) + " with " + ( i + 2 ) );

                //two new circle sets will have new children after each crossover
                var circleSet = new Group();
                circleSet.name = "CircleSet";
                circleSet.userData.selected = false;
                circleSet.userData.total_points_in_all_circles = 0;
                circleSet.userData.circleSet = i;
                circleSet.userData.color = this.FS.get_random_color();
                this.engServ.circleGroup.add( circleSet );

                var circleSet = new Group();
                circleSet.name = "CircleSet";
                circleSet.userData.selected = false;
                circleSet.userData.total_points_in_all_circles = 0;
                circleSet.userData.circleSet = i + 1;
                circleSet.userData.color = this.FS.get_random_color();
                this.engServ.circleGroup.add( circleSet );

                var son:any = { radius:null, position:{x:null,y:null}  };
                var daughter:any = { radius:null, position:{x:null,y:null} };

                if( fatherSet.children.length == motherSet.children.length ) {

                    for( let j = 0; j < fatherSet.children.length; j++ ) {
                        let father = fatherSet.children[j];
                        let mother = motherSet.children[j];

                        son.radius = father.userData.radius;
                        daughter.radius = mother.userData.radius;

                        let offsprings:any = this.binary.binSwapping( father.userData.position.x, father.userData.position.y, mother.userData.position.x, mother.userData.position.y );
               
                        son.position = offsprings.firstOffsping;
                        daughter.position = offsprings.secondOffsping;

                        son.position = this.FS.get_exact_polygon_point_to_point( son.position.x, son.position.y );
                        daughter.position = this.FS.get_exact_polygon_point_to_point( daughter.position.x, daughter.position.y );
     

                        if( son.position.x == null || son.position.y == null ) {
                            son.position = this.FS.get_nearest_polygon_point_to_point( son.position.x, son.position.y );
                        }
                        if( daughter.position.x == null || daughter.position.y == null ) {
                            daughter.position = this.FS.get_nearest_polygon_point_to_point( daughter.position.x, daughter.position.y );
                        }

                        son.circleSet = i;
                        daughter.circleSet = i + 1;

                        children.push( {son:son, daughter:daughter} );
                    }

                }

            }
            //if selected circle set is odd in length, then add last circle set without crossover in children 
            else if( fatherSet != undefined &&  motherSet == undefined ) {
                console.log("Odd circle sets, one set left for crossover")
               /* var circleSet = new Group();
                circleSet.name = "CircleSet";
                circleSet.userData.selected = false;
                circleSet.userData.total_points_in_all_circles = 0;
                circleSet.userData.circleSet = i;
                circleSet.userData.color = this.FS.get_random_color();
                this.engServ.circleGroup.add( circleSet );

                for( let j = 0; j < fatherSet.children.length; j++ ) {
                    let father = fatherSet.children[j];

                    son.radius = father.userData.radius;
                }*/
                
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

                //check if new random point already has a circle in population
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
        this.FS.remove_all_circle_sets();
        this.FS.reset_points_inCircle_to_zero();
        this.MS.total_points_in_all_circles = 0;
        this.MS.sendMessage( "total_points_in_all_circles");

        //add selected circle sets back
        for (let i:number = 0; i < selected.length; i++) {
            this.engServ.circleGroup.add( selected[i] );            
        }

        this.MS.sendMessage( "circle_popupation:"+this.FS.get_population() );
        
    }

    showResult() {
        this.FS.hide_all_circle_sets();
        this.FS.removeAllLabels();

        var result = this.FS.result;
        this.engServ.circleGroup.getObjectById( result.id ).visible = true;

        //show label for each circle
        for( var i = 0; i < result.children.length; i++) {
            var circle = result.children[i];
            this.FS.attachLabel( circle.userData.position, circle.userData.circlePoints.length )
        }


        //let population = this.FS.get_population();
        this.MS.sendMessage( "circle_popupation:1" );
        console.log("Population:1");

        //console.log(this.engServ.circleGroup.children)
    }


}
