import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Vector3 } from 'three';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<string>();

  public points_in_polygon = []; //{ x : pointX, y : pointY, inCircle: 0 }

  public total_points_in_all_circles:number;

  public settings = {
    circles_total : 4,
    circles_size : 15
  }
  
  public genetic_config = {
    "size": 250, //Population size
    "crossover": 0.3, //Probability of crossover
    "mutation": 0.3, //Probability of mutation
    "iterations": 4000, //Maximum number of iterations before finishing
    "fittestAlwaysSurvives": true, //Prevents losing the best fit between generations
    "maxResults": 100, //The maximum number of best-fit results that webworkers will send per notification
    "webWorkers": true, //Use Web Workers (when available)
    "skip": 20 //Setting this higher throttles back how frequently genetic.notification gets called in the main thread.
  };

  sendMessage(message: string) {
    this.subject.next( message );
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }

}
