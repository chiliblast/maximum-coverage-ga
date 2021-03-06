import { Component } from '@angular/core';
import { EngineService } from '../engine/engine.service';
import { MessageService } from '../services/message.service';
import { FunctionService } from '../services/function.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  subscription: Subscription;

  public mutation:number;
  public generations:number;

  constructor(private engServ: EngineService, private MS: MessageService, private FS: FunctionService) {
    // subscribe to component messages
    this.subscription = this.MS.getMessage().subscribe(message => {

      let msg:string = message.split(":")[0];
      let val:string = message.split(":")[1];
      
      if (message == 'points_in_polygon') {
        document.getElementById('points_in_polygon').innerHTML = this.MS.points_in_polygon.length.toString();
      }
      if (msg == 'circle_popupation') {
        document.getElementById('circle_popupation').innerHTML = val;
      }
      if (message == 'total_points_in_all_circles') {
        document.getElementById('total_points_in_all_circles').innerHTML = this.MS.total_points_in_all_circles.toString();
      }

    });

    this.mutation = this.MS.genetic_config.mutation;
    this.generations = this.MS.genetic_config.generations;

  }

  start_ga_clickHandler() {
    
    this.MS.genetic_config.mutation = this.mutation;
    this.MS.genetic_config.generations = this.generations;

    this.MS.sendMessage( "start_ga_click" );
  }


}
