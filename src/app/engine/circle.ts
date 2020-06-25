import { BufferGeometry, EllipseCurve, LineBasicMaterial, Line, Vector3 } from 'three';
import { Subscription } from 'rxjs';
import { EngineService } from './engine.service';
import { MessageService } from '../services/message.service';
import { FunctionService } from '../services/function.service';

export class Circle {

    subscription: Subscription;
    private circle:Line;

    constructor( private engServ: EngineService, private MS: MessageService, private FS: FunctionService ) {
        // subscribe to component messages
        this.subscription = this.MS.getMessage().subscribe(message => {
    
        });
    }

    drawCircle( position:Vector3, radius:number ) {
        const geometry:BufferGeometry = this.circleGeometry( radius, position );
        this.circle = this.circleShape( geometry );
        this.circle.name = 'Circle';

        this.circle.userData.id = this.circle.id;
        this.circle.userData.radius = radius;
        this.circle.userData.position = position;
        this.circle.userData.selected = false;

        this.engServ.circleGroup.add(this.circle);

        return this.circle.id;

    }

    private circleGeometry( radius:number, position:Vector3 ) {
        //console.log(position.x + ", " + position.y + ", " + radius)
        let curve:EllipseCurve = new EllipseCurve(
            position.x,  position.y,            // ax, aY
            radius, radius,           // xRadius, yRadius
            0,  2 * Math.PI,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0                // aRotation
        );
 
        const points = curve.getPoints( 50 );
    
        // geometry
        const geometry:BufferGeometry = new BufferGeometry().setFromPoints( points );
  
        return geometry;
        
    }

    circleShape( geometry:BufferGeometry ):Line {
        // material
        const material:LineBasicMaterial = new LineBasicMaterial(
            { color: 0x49BFFE }
        );
        
        // ellipse
        const circle:Line = new Line( geometry, material );

        return circle;
    }

}
