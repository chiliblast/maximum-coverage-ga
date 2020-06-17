import { Line } from 'three';

import { Subscription } from 'rxjs';
import { EngineService } from '../engine/engine.service';
import { MessageService } from '../services/message.service';
import { FunctionService } from '../services/function.service';
import { Circle } from '../engine/circle';

export class Genetic {

    subscription: Subscription;

    private config:any = {};

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

    start() {

        var population:any = []; //population of circles
        var points_in_polygon:any = []; //{ x : pointX, y : pointY, inCircle: 0 }
        var total_points_in_all_circles:number;

        for( let i = 0; i < this.config.iterations; i++ ) {

            console.log("Iteration:" + (i+1));

            population = this.engServ.circleGroup.children;
            points_in_polygon = this.MS.points_in_polygon;
            total_points_in_all_circles = this.MS.total_points_in_all_circles;

            this.fitness( population );

            //selects half of total population, based on fitness, and sort then in acsending order of fitness level
            var selected:any = this.selection( population );

            //delete population that is not selected
            this.discardPopulation( selected, population );

            var children:any = [];

            if( Math.random() <= this.config.crossover ) {
                children = this.crossover( selected );
            }

            if( children.length > 0 ) {
                for ( let i = 0; i < children.length; i++) {            
                    this.FS.populate_a_circle( this.circle, children[i].son.position, children[i].son.radius );
                    this.FS.populate_a_circle( this.circle, children[i].daughter.position, children[i].daughter.radius )
                }
            }

            if( Math.random() <= this.config.mutation ) {
                this.mutation();
            }

            if( population.length <= this.MS.settings.circles_total ) {
                this.MS.sendMessage( "circle_popupation:"+population.length );
                console.log("Population:"+population.length)
                console.log("Population size reached");
                break;
            }
                
            this.MS.sendMessage( "circle_popupation:"+population.length );
            console.log("Population:"+population.length)
            
        }

 
    }

    fitness( population:any ) {

        console.log("Fitness");
        
        for( var i = 0; i < population.length; i++ ) {
            var circle:any = population[i];

            //more the radius, more the fitness level is
            circle.userData.fitness = circle.userData.radius;

            //number of total points in a circle
            circle.userData.fitness = circle.userData.fitness + circle.userData.circlePoints.length;

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

        //selects half of total population and sort then in acsending order of fitness level
        var selected:any = [];
        var max = -Infinity;
        var maxCircle:any;
        for( var i = 0; i < population.length; i++ ) {
            var circle:any = population[i];

            if( circle.userData.selected == true )
                continue;

            //console.log(circle.userData.fitness +" "+max)   


            if( circle.userData.fitness > max ) {
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
        console.log("Selected length:"+selected.length)
        return selected;

    }

    crossover( selected:any ) {

        console.log("Crossover");

        var children:any = [];

        for( var i = 0; i < selected.length; ) {

            var father:any = selected[i];
            var mother:any = selected[i+1];

            var son:any = {radius:null, position:null};
            var daughter:any = {radius:null, position:null};

            if( father!=undefined && mother != undefined ) {
                son.radius = father.userData.radius;
                son.position = mother.userData.position;

                daughter.radius = mother.userData.radius;
                daughter.position = father.userData.position;

                children.push( {son:son, daughter:daughter} )
            }
        
            i = i + 2;
        }

        return children;
    }

    mutation() {

        console.log("Mutation");

    }
    
    discardPopulation( selected:any, population:any ) {

        //remove all circles
        for( var i = 0; i < population.length; i++ ) {
            let circle:any = population[i];
            this.engServ.circleGroup.remove(circle );
            i = -1;
        }

        //add selected circles
        for( var i = 0; i < selected.length; i++ ) { 
            let circle:any = selected[i];
            circle.userData.selected = true;
            this.engServ.circleGroup.add( circle )

        }

        
        /*for( var i = 0; i < population.length; i++ ) {
            var circle:any = population[i];

            var found:boolean = false;
            for( let j = 0; j < selected.length; j++ ) { 

                if( circle.userData.id == selected[j].userData.id ) {
                    found = true;
                    break;
                }

            }
            if( found == false ) {
                this.engServ.circleGroup.remove(circle );
            }

        }*/
    }
}
