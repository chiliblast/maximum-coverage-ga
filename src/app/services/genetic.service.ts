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

    const config = {
      "size": 250, //Population size
      "crossover": 0.3, //Probability of crossover
      "mutation": 0.3, //Probability of mutation
      "iterations": 4000, //Maximum number of iterations before finishing
      "fittestAlwaysSurvives": true, //Prevents losing the best fit between generations
      "maxResults": 100, //The maximum number of best-fit results that webworkers will send per notification
      "webWorkers": true, //Use Web Workers (when available)
      "skip": 20 //Setting this higher throttles back how frequently genetic.notification gets called in the main thread.
		};

		const userData = {
			
		};

    this.genetic.evolve( config, userData );
    
  }

  createGenetic() {
    
        let genetic = Genetic.create();

        genetic.optimize = Genetic.Optimize.Maximize;
        
        genetic.select1 = Genetic.Select1.Tournament2;
        genetic.select2 = Genetic.Select2.Tournament2;

        genetic.seed = function():any {

          let  individual:any;

          return individual;
        };

        genetic.fitness = function( individual ):number {
          
          let  fitness:number;

          return fitness;
        };

        genetic.mutate = function( individual ):any {
          
          let  _individual:any;

          return _individual;          
        };

        genetic.crossover = function( mother, father ):any {

          let son:any;
          let daughter:any;

          return [ son, daughter ];     
        };

        genetic.generation = function( pop, generation, stats ):boolean {

           
          return false;
        };

        genetic.notification = function( pop, generation, stats, isFinished ) {


        };
    
        this.genetic = genetic;
  }
    

  
}
