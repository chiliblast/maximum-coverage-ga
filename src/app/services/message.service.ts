import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Vector3 } from 'three';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<string>();

  public points_in_polygon = []; //{ x : pointX, y : pointY, inCircle: 0 }

  public total_points_in_all_circles:number = 0;

  public settings = {
    circles_total : 2, 
    circles_size : 15,
    sets_total : 20
  }
  
  public genetic_config = {
    "size": 0, //Population size
    "crossover": 1, //Probability of crossover
    "mutation": 0.3, //Probability of mutation
    "iterations": 100, //Maximum number of iterations before finishing
  };

  sendMessage(message: string) {
    this.subject.next( message );
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }

}
