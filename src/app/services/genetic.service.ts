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

  constructor(private engServ: EngineService, private MS: MessageService, private FS: FunctionService) {
    // subscribe to component messages
    this.subscription = this.MS.getMessage().subscribe(message => {
      
      if (message == 'start_ga_click') {
         this.start();
      }

    });

  }

    start() {
    
        var genetic = Genetic.create();;
    
        
    
    console.log(genetic)
    }


  
}
