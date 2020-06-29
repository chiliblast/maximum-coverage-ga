import { Component } from '@angular/core';
import { EngineService } from '../engine/engine.service';
import { MessageService } from '../services/message.service';
import { FunctionService } from '../services/function.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  circlesTotal:number;
  circlesSize:number;
  setsTotal:number

  constructor(private engServ: EngineService, private MS: MessageService, private FS: FunctionService) {
    this.circlesTotal = this.MS.settings.circles_total;
    this.circlesSize = this.MS.settings.circles_size;
    this.setsTotal = this.MS.settings.sets_total;
  }

  clear_clickHandler() {
    this.engServ.group.remove( this.engServ.group.getObjectByName("Polygon") );

    let points:any = this.engServ.group.getObjectByName( "Points" );
    let pointPosition =  points.geometry.attributes.position.array;
    for( let i = 0; i < pointPosition.length; ) {
      let pointColor = points.geometry.attributes.color.array;

        pointColor[ i ] = 255;
        pointColor[ i + 1 ] = 0;
        pointColor[ i + 2 ] = 0;

        points.geometry.attributes.color.needsUpdate = true;
        i = i + 3;
    }

    this.MS.sendMessage( "navbar_clear_click" );
    this.FS.remove_all_circle_sets();

  }

  circles_total_changeHandler( value: number ) {
    this.circlesTotal = this.MS.settings.circles_total = this.MS.genetic_config.size = value;
  }

  circles_size_changeHandler( value: number ) {
    this.circlesSize = this.MS.settings.circles_size = value;
  }

  sets_total_changeHandler( value: number ) {
    this.setsTotal = this.MS.settings.sets_total = value;
  }

  populate_clickHandler() {
    this.MS.sendMessage( "navbar_populate_click" );
  }

  

  

}
