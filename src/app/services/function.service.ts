
import { Injectable } from '@angular/core';
import { EngineService } from '../engine/engine.service';
import { MessageService } from './message.service';
import { Vector3, Line, Group } from 'three';
import { Circle } from '../engine/circle';


@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  circle:Circle;
  result:any

  constructor(private engServ: EngineService, private MS: MessageService) {
  }

  set_population_points() {

    this.MS.total_points_in_all_circles = 0;
    this.MS.sendMessage( "total_points_in_all_circles");

    var circleSet:any = this.engServ.circleGroup.children;
    var total_points_in_all_circles:number;
    
    //loop through sets
    for( var i = 0; i < circleSet.length; i++ ) {

      circleSet[i].userData.selected = false;
      circleSet[i].userData.total_points_in_all_circles = 0;
      circleSet[i].userData.fitness = 0;
          
      this.reset_points_inCircle_to_zero();
      total_points_in_all_circles = 0;

      var circle = circleSet[i].children;

      //loop through circles
      for( let j = 0; j < circle.length; j++ ) {

        var object = circle[j];
        
        object.userData.fitness = 0;
        object.userData.circlePoints = [];

        //get_total_points_in_all_circles in a circle set
        total_points_in_all_circles = total_points_in_all_circles + this.get_points_in_a_circle( object.id, circleSet[i] );
      
      }

      circleSet[i].userData.total_points_in_all_circles = total_points_in_all_circles;

      //if points in a set is greater than previous set
      if( total_points_in_all_circles > this.MS.total_points_in_all_circles ) {
        this.MS.total_points_in_all_circles = total_points_in_all_circles;
        this.MS.sendMessage( "total_points_in_all_circles");

        this.result = circleSet[i];
      }

    }

  }

  populate_circles( circle:Circle ) {

    this.circle = circle;

    this.remove_all_circle_sets();
    this.reset_points_inCircle_to_zero();
    

    const circles_total:number = this.MS.settings.circles_total;
    const sets_total:number = this.MS.settings.sets_total;

    const initialPopulation:number = circles_total * sets_total;

    const radius:number = this.MS.settings.circles_size / 2;

    const points_in_polygon:any = this.MS.points_in_polygon;

    let total_points_in_all_circles:number;

    //loop through sets
    for( var i = 0; i < sets_total; i++ ) {

      this.reset_points_inCircle_to_zero();

      var circleSet = new Group();
      circleSet.name = "CircleSet";
      circleSet.userData.selected = false;
      this.engServ.circleGroup.add( circleSet );

      total_points_in_all_circles = 0;

      var color = this.get_random_color();

      //loop through circles
      for( let j = 0; j < circles_total; j++ ) {
        //let random:number = MathUtils.randInt( 0, points_in_polygon.length - 1 );
        let random:number = Math.floor(Math.random() * Math.floor( points_in_polygon.length - 1 ));
        random =  Math.floor(random / 3) * 3;
        random = Math.round( random );

        const position:Vector3 = new Vector3( points_in_polygon[ random ].x, points_in_polygon[ random ].y, 0 );

        //let radius:number =  MathUtils.randInt( 1, this.MS.settings.circles_size / 2 );   

        const circleID:number = circle.drawCircle( position, radius, circleSet );
        let object:any = this.engServ.circleGroup.getObjectById( circleID );
        object.material.color.setHex( color );

        //get_total_points_in_all_circles in a circle set
        total_points_in_all_circles = total_points_in_all_circles + this.get_points_in_a_circle( circleID, circleSet );
      }

      circleSet.userData.total_points_in_all_circles = total_points_in_all_circles;

      //if points in a set is greater than previous set
      if( total_points_in_all_circles > this.MS.total_points_in_all_circles ) {
        this.MS.total_points_in_all_circles = total_points_in_all_circles;
        this.MS.sendMessage( "total_points_in_all_circles");
      }
      

    }

    this.MS.genetic_config.size = this.get_population();
    this.MS.sendMessage( "circle_popupation:"+this.get_population() );
    
    //this.MS.sendMessage( "circle_popupation:"+initialPopulation );

  }


  populate_selected( selected:any ) {

        let total_points_in_all_circles:number;

        //add selected circles sets
        for( var i = 0; i < selected.length; i++ ) { 

            var selectedCircle:any = selected[i].children;

            this.reset_points_inCircle_to_zero();

            var circleSet = new Group();
            circleSet.name = "CircleSet";
            circleSet.userData.selected = false;

            this.engServ.circleGroup.add( circleSet );

            total_points_in_all_circles = 0;
            var color = this.get_random_color();
            
            for( var j = 0; j < selectedCircle.length; j++ ) {
                //this.FS.populate_a_circle( this.circle, circle[j].userData.position, circle[j].userData.radius, circleSet, color );
                const circleID:number = this.circle.drawCircle( selectedCircle[j].userData.position, selectedCircle[j].userData.radius, circleSet );
                let object:any = this.engServ.circleGroup.getObjectById( circleID );
                object.material.color.setHex( color );

                //get_total_points_in_all_circles
                //total_points_in_all_circles = total_points_in_all_circles + this.get_points_in_a_circle( circleID, circleSet );
            }

            //circleSet.userData.total_points_in_all_circles = total_points_in_all_circles;

            //if points in a set is greater than previous set
            /*if( total_points_in_all_circles > this.MS.total_points_in_all_circles ) {
                this.MS.total_points_in_all_circles = total_points_in_all_circles;
                this.MS.sendMessage( "total_points_in_all_circles");
            }*/

        }
        
        //this.MS.sendMessage( "circle_popupation:"+this.get_population() );
  }

  populate_a_circle( circle:Circle, position:Vector3, radius:number, circleSet:any, color:number  ) {
    const circleID:number = circle.drawCircle( position, radius, circleSet );
    let object:any = this.engServ.circleGroup.getObjectById( circleID );
    object.material.color.setHex( color );
    //get_total_points_in_all_circles
    //circleSet.userData.total_points_in_all_circles = circleSet.userData.total_points_in_all_circles + this.get_points_in_a_circle( circleID, circleSet );

    //if points in a set is greater than previous set
    /*if( circleSet.userData.total_points_in_all_circles > this.MS.total_points_in_all_circles ) {
      this.MS.total_points_in_all_circles = circleSet.userData.total_points_in_all_circles;
      this.MS.sendMessage( "total_points_in_all_circles");
    }*/

    //this.MS.sendMessage( "circle_popupation:"+this.get_population() );
  }

  /*set_total_points_in_all_circles() {
    var circle:any = this.engServ.circleGroup.children;
    var total_points_in_all_circles:number = 0;
    for( let i = 0; i < circle.length; i++ ) {
      total_points_in_all_circles = total_points_in_all_circles + circle[i].userData.circlePoints.length;
    }
    this.MS.total_points_in_all_circles = total_points_in_all_circles;
    this.MS.sendMessage( "total_points_in_all_circles");

  }*/

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
  get_points_in_a_circle( circleID:number, circleSet:Group ):number {
    var circle = this.engServ.circleGroup.getObjectById( circleID );
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
        //inCircle will tell in how many circles this point is inside
        points[i].inCircle = points[i].inCircle + 1;      

        //if point in circle is only covered with one circle
        if( points[i].inCircle == 1 ) {
          circlePoints.push( { x: points[i].x, y: points[i].y, inCircle: 1 } );   
          count++;
        }

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

  get_point_adjacent_to_circle( x1:number, y1:number, x2:number, y2:number, radius1:number, radius2:number ) {
    const distance:number = this.get_distance_between_points( x1, y1, x2, y2 );
    const angle:number = this.get_angle_between_points( x1, y1, x2, y2 );
    const pointDistance:number = radius1 * 2;
    const position = this.get_point_from_angle_distance( x1, y1, angle, distance );

    var newPosition = this.get_nearest_polygon_point_to_point( position.x, position.y );
    if( newPosition.x == null && newPosition.y == null ) {
      console.log("Recursive call to get_point_adjacent_to_circle()")
      this.get_point_adjacent_to_circle( x1, y1, x2, y2, radius1, radius2 );
    }
    return newPosition;
  }

  get_random_point_between_two_points( x1:number, y1:number, x2:number, y2:number ) {

    var position = {x:null,y:null};
    var n:number = Math.random();

    if( x1 != x2) {
      let a:number = (y2-y1)/(x2-x1);
      position.x = (x2 - x1) * n + x1;
      position.y = a * ( position.x - x1 ) + y1;
    }
    else if( x1 == x2 ) {
      position.x = x1 = x2;
      position.y = ( y2 - y1 ) * n + y1;      
    }

    var newPosition = this.get_nearest_polygon_point_to_point( position.x, position.y );

    if( newPosition.x == null && newPosition.y == null ) {
      console.log("Recursive call to get_random_point_between_two_points()")
      this.get_random_point_between_two_points( x1, y1, x2, y2 );
    }
    return newPosition;
    
  }

  //get nearest point on polygon to a point
  get_nearest_polygon_point_to_point( x:number, y:number ) {
    var newPoint = {x:null,y:null};
    var points_in_polygon = this.MS.points_in_polygon;
    for( let i = 0; i < points_in_polygon.length; i++) {

      var pointX:number = Math.round( points_in_polygon[i].x );
      var pointY:number = Math.round( points_in_polygon[i].y );

      x = Math.round( x );
      y = Math.round( y );

      if( pointX == x && pointY == y /*&& points_in_polygon[i].inCircle == 0*/ ) {
        newPoint.x = points_in_polygon[i].x;
        newPoint.y = points_in_polygon[i].y;
        break;
      }

    }
    return newPoint;
  }

  public reset_points_inCircle_to_zero() {
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

  is_circle_at_point( position:Vector3 ):boolean {

    var circleSet = this.engServ.circleGroup.children;

    for (var i = 0; i < circleSet.length; i++ ) {

      let circle = circleSet[i].children;

      for( var j = 0; j < circle.length; j++ ) {

        let object = circle[j];

        if( position.equals( object.userData.position) ) {
          return true;
        }

      }

    }

    return false;
    
  }

  remove_all_circle_sets() {
    //remove all circles sets from Circle Group
    if( this.engServ.circleGroup.getObjectByName("CircleSet") ) {
      let group = this.engServ.circleGroup; 
      for (let i:number = 0; i < group.children.length; i++) {
          if( group.children[i].getObjectByName("CircleSet") ) {
            group.remove( group.children[i].getObjectByName("CircleSet") );
            i = -1;
          }
      }
    }
    //this.MS.total_points_in_all_circles = 0;
    //this.MS.sendMessage( "total_points_in_all_circles");
  }

  //line legth or distance between 2 points
  get_distance_between_points( x1:number, y1:number, x2:number, y2:number ):number {
    const distanceBetweenPoints:number = Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
    return distanceBetweenPoints;    
  }

  // angle in degrees
  get_angle_between_points(x1:number, y1:number, x2:number, y2:number):number {
    return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI
  }

  //get a new point from a current point, angle and distance
  get_point_from_angle_distance(x:number, y:number, angle:number, distance:number) {
    let point:any = {x:null, y:null}

    point.x = Math.cos(angle * Math.PI / 180) * distance + x;
    point.y = Math.sin(angle * Math.PI / 180) * distance + y;

    return point;
  }

  get_random_color():number {
    var randomColor = "000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
    randomColor = '0x'+randomColor;
    return parseInt( randomColor );
  }

  //count all circles in all sets
  get_population():number {
    var circleSet = this.engServ.circleGroup.children;
    return circleSet.length;
    /*var count=0;
    for(var i = 0; i < circleSet.length; i++) {
      let circle = circleSet[i].children;
      count = count + circle.length;
    }
    return count;*/
  }

  isOdd(n:number):boolean {
    return Math.abs(n % 2) == 1;
 }

}
