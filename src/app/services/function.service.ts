
import { Injectable } from '@angular/core';
import { EngineService } from '../engine/engine.service';
import { MessageService } from './message.service';
import { Vector3, MathUtils, Line } from 'three';
import { Circle } from '../engine/circle';


@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor(private engServ: EngineService, private MS: MessageService) {
  }

  populate_circles( circle:Circle ) {

    this.remove_all_circles();
    this.reset_points_inCircle_to_zero();

    const totalCircles:number = this.MS.settings.circles_total;
    let initialPopulation:number = totalCircles * 50;
    if( initialPopulation == 1 ) 
      initialPopulation = 2;
    //const radius:number = this.MS.settings.circles_size / 2;

    const points_in_polygon:any = this.MS.points_in_polygon;

    let total_points_in_all_circles:number = 0;

    for( let i = 0; i < initialPopulation; i++ ) {
      
      //let random:number = MathUtils.randInt( 0, points_in_polygon.length - 1 );
      let random:number = Math.floor(Math.random() * Math.floor( points_in_polygon.length - 1 ));
      random =  Math.floor(random / 3) * 3;
      random = Math.round( random );

      //console.log(random + ", " + count + ", " + points_in_polygon.length)

      const position:Vector3 = new Vector3( points_in_polygon[ random ].x, points_in_polygon[ random ].y, 0 );

      //console.log( this.is_circle_in_polygon(position, radius) )

      //let radius:number =  MathUtils.randInt( 1, this.MS.settings.circles_size / 2 ); 
      let radius:number =  this.MS.settings.circles_size / 2;  

      const circleID:number = circle.drawCircle( position, radius );
      //get_total_points_in_all_circles
      total_points_in_all_circles = total_points_in_all_circles + this.get_points_in_a_circle( circleID );
    }
    
    this.MS.genetic_config.size = initialPopulation;
    this.MS.sendMessage( "circle_popupation:"+initialPopulation );

    this.MS.total_points_in_all_circles = total_points_in_all_circles;
    this.MS.sendMessage( "total_points_in_all_circles");

  }

  populate_a_circle( circle:Circle, position:Vector3, radius:number  ) {
    const circleID:number = circle.drawCircle( position, radius );
    //get_total_points_in_all_circles
    this.MS.total_points_in_all_circles = this.MS.total_points_in_all_circles + this.get_points_in_a_circle( circleID );
    this.MS.sendMessage( "total_points_in_all_circles");
  }

  set_total_points_in_all_circles() {
    var circle:any = this.engServ.circleGroup.children;
    var total_points_in_all_circles:number = 0;
    for( let i = 0; i < circle.length; i++ ) {
      total_points_in_all_circles = total_points_in_all_circles + circle[i].userData.circlePoints.length;
    }
    this.MS.total_points_in_all_circles = total_points_in_all_circles;
    this.MS.sendMessage( "total_points_in_all_circles");

  }

  /*populate_a_circle( circle:Circle ):number {

    const radius:number = this.MS.settings.circles_size / 2;

    const points_in_polygon:any = this.MS.points_in_polygon;

    let random:number = MathUtils.randInt( 0, points_in_polygon.length - 1 );
    random =  Math.floor(random / 3) * 3;
    random = Math.round( random );

    const position:Vector3 = new Vector3( points_in_polygon[ random ].x, points_in_polygon[ random ].y, 0 );
      
    const circleID:number = circle.drawCircle( position, radius );
    //get_total_points_in_all_circles
    this.MS.total_points_in_all_circles = this.MS.total_points_in_all_circles + this.get_points_in_a_circle( circleID );
    this.MS.sendMessage( "total_points_in_all_circles");

    return circleID;
  }*/

  //get points in a circle which are from points in polygon
  get_points_in_a_circle( circleID:number ):number {
    let circle = this.engServ.circleGroup.getObjectById( circleID );
    const position = circle.userData.position;
    const radius = circle.userData.radius;

    var points:any = this.MS.points_in_polygon;
    var circlePoints:any = [];

    let count:number = 0;

    for( let i = 0; i < points.length; i++ ) {

      const pointX:number = points[i].x;
      const pointY:number = points[i].y;

      const distance:number = this.get_distance_between_points( position.x, position.y, pointX, pointY );

      //point is within circle's radius
      if( distance <= radius ) {
        count++;
        //inCircle will tell in how many circles this point is inside
        points[i].inCircle = points[i].inCircle + 1; 
        circlePoints.push( points[i] );     
      }

    }

    //circle.userData.pointsCount = count;
    circle.userData.circlePoints = circlePoints;

    return count;
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
        
        points_in_polygon.push( { x : pointX, y : pointY, inCircle: 0 } );

      }

      i = i + 3;
    }

    this.MS.points_in_polygon = points_in_polygon;
    this.MS.sendMessage('points_in_polygon');
 
  }

  private reset_points_inCircle_to_zero() {
    const points_in_polygon =  this.MS.points_in_polygon;
    for(let i = 0; i < points_in_polygon.length; i++) {
      this.MS.points_in_polygon[i].inCircle = 0;
    }
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
    //remove all circles from Circle Group
    if( this.engServ.circleGroup.getObjectByName("Circle") ) {
      let group = this.engServ.circleGroup; 
      for (let i:number = 0; i < group.children.length; i++) {
          if( group.children[i].getObjectByName("Circle") ) {
            group.remove( group.children[i].getObjectByName("Circle") );
            i = -1;
          }
      }
    }
  }

  //line legth or distance between 2 points
  get_distance_between_points( x1:number, y1:number, x2:number, y2:number ):number {
    const distanceBetweenPoints:number = Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
    return distanceBetweenPoints;    
  }


}
