
import { Injectable } from '@angular/core';
import { EngineService } from '../engine/engine.service';
import { MessageService } from './message.service';
import { Vector3, MathUtils } from 'three';
import { Circle } from '../engine/circle';




@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor(private engServ: EngineService, private MS: MessageService) {
  }

  populate_circles( circle:Circle ) {

    this.remove_all_circles();

    const totalCircles:number = this.MS.settings.circles_total;
    let initialPopulation:number = totalCircles * totalCircles;
    if( initialPopulation == 1 ) 
      initialPopulation = 2;
    const radius:number = this.MS.settings.circles_size / 2;

    const points_in_polygon:any = this.MS.points_in_polygon;

    for( let i = 0; i < initialPopulation; i++ ) {
      
      const random:number = MathUtils.randInt( 0, points_in_polygon.length - 1 );
      let count:number =  Math.floor(random / 3) * 3;
      count = Math.round( count );

      //console.log(random + ", " + count + ", " + points_in_polygon.length)

      const position:Vector3 = new Vector3( points_in_polygon[ count ].x, points_in_polygon[ count ].y, 0 );

      //console.log( this.is_circle_in_polygon(position, radius) )
      
      const circleID:number = circle.drawCircle( position, radius );
      this.get_points_covered_in_circle( circleID );
    }
    
    this.MS.sendMessage( "circle_popupation:"+initialPopulation );
  }

  
  get_points_covered_in_circle( circleID:number ) {
    //console.log( this.engServ.group.getObjectById( circleID ) )
  }

  show_points_in_polygon() {
    let points:any = this.engServ.group.getObjectByName( "Points" );
    let pointPosition =  points.geometry.attributes.position.array;

    const polygon:any = this.engServ.group.getObjectByName( "Polygon" );
    const polygonPosition = polygon.geometry.attributes.position.array;

    let points_in_polygon:any = [];

    for( let i = 0; i < pointPosition.length; ) {

      const pointX:number = pointPosition[ i ];
      const pointY:number = pointPosition[ i + 1 ];

      const point_in_polygon:boolean = this.is_point_in_polygon( pointX, pointY, polygonPosition );

      if( point_in_polygon ) {

        let pointColor = points.geometry.attributes.color.array;

        pointColor[ i ] = 0;
        pointColor[ i + 1 ] = 255;
        pointColor[ i + 2 ] = 255;

        points.geometry.attributes.color.needsUpdate = true;
        
        points_in_polygon.push( { x : pointX, y : pointY } );

      }

      i = i + 3;
    }

    this.MS.points_in_polygon = points_in_polygon;
    this.MS.sendMessage('points_in_polygon');
 
  }

  private is_point_in_polygon( pointX:number, pointY:number, polygon:[] ) {
        
    let inside:boolean = false;

    for (let i = 0, j = polygon.length - 6; i < polygon.length - 3; ) {
        let xi = polygon[i], yi = polygon[i+1];
        let xj = polygon[j], yj = polygon[j+1]; 

        let intersect = ((yi > pointY) != (yj > pointY))
            && (pointX < (xj - xi) * (pointY - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;

        j = i; 
        i = i + 3;
        
    }
    
    return inside;
  }

  private is_circle_in_polygon( position:Vector3, radius:number ) {

  }

  remove_all_circles() {
    //remove all circles from DimensionsGroup
    if( this.engServ.group.getObjectByName("Circle") ) {
      let group = this.engServ.group; 
      for (let i:number = 0; i < group.children.length; i++) {
          if( group.children[i].getObjectByName("Circle") ) {
            group.remove( group.children[i].getObjectByName("Circle") );
            i = -1;
          }
      }
    }
  }


}
