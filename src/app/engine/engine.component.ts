import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Vector3 } from 'three';
import { Subscription } from 'rxjs';
import { EngineService } from './engine.service';
import { MessageService } from '../services/message.service';
import { FunctionService } from '../services/function.service';
import { Polygon } from './polygon';
import { Circle } from './circle';
import { Genetic } from '../genetic/genetic';




@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html'
})
export class EngineComponent implements OnInit {

  subscription: Subscription;
  private polygon:Polygon;
  private circle:Circle;
  private genetic:Genetic;

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private engServ: EngineService, private MS: MessageService, private FS: FunctionService) { 
    // subscribe to component messages
    this.subscription = this.MS.getMessage().subscribe(message => {
      
      if (message == 'navbar_populate_click') {
         this.FS.populate_circles( this.circle );
      }

    });

    this.polygon = new Polygon( this.engServ, this.MS, this.FS );
    this.circle = new Circle( this.engServ, this.MS, this.FS );
    this.genetic = new Genetic( this.engServ, this.MS, this.FS, this.circle );


  }

  public ngOnInit(): void {
    this.engServ.createScene(this.rendererCanvas);
    this.engServ.animate();
  }

  mousedown(e:MouseEvent) { 
    const relative:Vector3 = this.engServ.get3DPosition( e.clientX, e.clientY );
    if( relative ) {
      //left mouse click
      if(e.button == 0) { 
        this.polygon.onMouseDown(relative)
      }
      //right mouse click
      else if(e.button == 2) {
        this.polygon.onStop(relative);
      }
    }
    
  }

  mouseup(e:MouseEvent) { 

  }

  mousemove(e:MouseEvent) { 
    const relative:Vector3 = this.engServ.get3DPosition( e.clientX, e.clientY );
    if( relative )
      this.polygon.onMouseMove(relative);
  }

}
