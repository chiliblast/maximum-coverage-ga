import { Injectable } from '@angular/core';
import { EngineService } from '../engine/engine.service';
import { MessageService } from './message.service';
import { FunctionService } from './function.service';
import * as Genetic from 'genetic-js';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneticService {

  subscription: Subscription;

  genetic:Genetic;

  constructor(private engServ: EngineService, private MS: MessageService, private FS: FunctionService) {
    // subscribe to component messages
    this.subscription = this.MS.getMessage().subscribe(message => {
      
      if (message == 'start_ga_click') {
         this.createGenetic();
         this.startGenetic();
      }

    });

  }

  startGenetic() {

    let config = {
      "size": this.MS.genetic_config.size, //Population size
      "crossover": this.MS.genetic_config.crossover, //Probability of crossover
      "mutation": this.MS.genetic_config.mutation, //Probability of mutation
      "iterations": this.MS.genetic_config.iterations, //Maximum number of iterations before finishing
      "fittestAlwaysSurvives": this.MS.genetic_config.fittestAlwaysSurvives, //Prevents losing the best fit between generations
      "maxResults": this.MS.genetic_config.maxResults, //The maximum number of best-fit results that webworkers will send per notification
      "webWorkers": this.MS.genetic_config.webWorkers, //Use Web Workers (when available)
      "skip": this.MS.genetic_config.skip //Setting this higher throttles back how frequently genetic.notification gets called in the main thread.
    };
    
    if(config.size == 0) {
      alert("Draw initial population to start Genetic Algorithm");
      return;
    }

    //make array of circle userData which contains id, position, radius and points count
    /*let circles:any = [];
    for (let i = 0; i < this.engServ.circleGroup.children.length; i++) {
      let circle:any = this.engServ.circleGroup.children[i];
      circles.push( circle.userData )
    }*/

		let userData = {
      //array of points in polygon { x : pointX, y : pointY, inCircle: 0 }
      "points_in_polygon" : this.MS.points_in_polygon, 
      "total_points_in_all_circles" : this.MS.total_points_in_all_circles,
      //array of circles
      "circles" : this.engServ.circleGroup.children
      
		};

    this.genetic.evolve( config, userData );
    
  }

  createGenetic() {
    
        let genetic = Genetic.create();

        genetic.optimize = Genetic.Optimize.Maximize;
        
        genetic.select1 = Genetic.Select1.Tournament2;
        genetic.select2 = Genetic.Select2.Tournament2;


        //Called to create an individual, can be of any type (int, float, string, array, object)
        genetic.seed = function():any {

          let  individual:any = [];

          //individual.push( this.userData["circles"][this.see].object.userData )

          return individual;
        };

        //Computes a fitness score for an individual
        genetic.fitness = function( individual ):number {
          console.log(individual)
          let  fitness:number;
          let pointsCount = 0;
          for (let i = 0; i < individual.length; i++) {
            //individual[0].object.userData.pointsCount
          }

          return fitness;
        };

        //Called when an individual has been selected for mutation
        genetic.mutate = function( individual ):any {
          
          let  _individual:any;

          return _individual;          
        };

        //Called when two individuals are selected for mating. Two children should always returned
        genetic.crossover = function( mother, father ):any {

          let son:any;
          let daughter:any;

          return [ son, daughter ];     
        };

        //Called for each generation. Return false to terminate end algorithm (ie- if goal state is reached)
        genetic.generation = function( pop, generation, stats ):boolean {


          return false;
        };

        //Runs in the calling context. All functions other than this one are run in a web worker.
        genetic.notification = function( pop, generation, stats, isFinished ) {


        };
    
        this.genetic = genetic;
  }
    

  
}
