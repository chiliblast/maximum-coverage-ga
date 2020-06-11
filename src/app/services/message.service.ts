import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Vector3 } from 'three';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<string>();

  public points_in_polygon = [];

  public total_points_in_all_circles;

  public settings = {
    circles_total : 4,
    circles_size : 15
  }

  sendMessage(message: string) {
    this.subject.next( message );
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }

}
