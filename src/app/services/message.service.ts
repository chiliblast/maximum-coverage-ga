import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Vector3 } from 'three';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<string>();

  public valid_points = [];

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
