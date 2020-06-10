import { BufferGeometry, BufferAttribute, LineBasicMaterial, Line, Vector3 } from 'three';
import { Subscription } from 'rxjs';
import { EngineService } from './engine.service';
import { MessageService } from '../services/message.service';
import { FunctionService } from '../services/function.service';

export class Polygon {

    subscription: Subscription;
    private line:any;
    private count:number = 0;
    private MAX_POINTS:number = 100;
    private positions:any;

    constructor( private engServ: EngineService, private MS: MessageService, private FS: FunctionService ) {
        // subscribe to component messages
        this.subscription = this.MS.getMessage().subscribe(message => {
        
            if (message == 'navbar_clear_click') {
                this.count = 0;
            }
    
        });
    }

    onMouseDown( relative:Vector3 ) {

        // on first click add an extra point
        if( this.count === 0 ){
            this.engServ.group.remove( this.line )
            this.line = this.lineGeometry();
            this.line.name = 'Polygon';
            this.engServ.group.add(this.line);
            this.addPoint(relative);
        }
        this.addPoint(relative);  

        // when drawing of a line segment is completed 
        // then call this function recursively to start drawing a new line segment
        if(this.count > this.MAX_POINTS) {
            this.onStop(relative);
            //bounding sphere is set so that line can be selected using mouse
            //this.line.geometry.computeBoundingSphere();       
            
            //this.onMouseDown(relative);

        }  
    }

    onMouseMove( relative:Vector3 ) {
        if( this.count !== 0 ){
            if (!relative) {
                return;
            }
            this.updateLine(relative);         
        }
    }

    onStop( relative:Vector3 ) {
        //if line is already drawing
        if( this.count > 0 ) {

            //remove unused line geometry array space
            var lineArray = new Float32Array(this.line.geometry.attributes.position.array);
            lineArray = lineArray.slice(0, (this.count) * 3 );

            lineArray[(this.count) * 3 - 3] = lineArray[0];
            lineArray[(this.count) * 3 - 2] = lineArray[1];
            lineArray[(this.count) * 3 - 1] = lineArray[2];

            this.line.geometry.attributes.position.array = lineArray;
      
            this.line.geometry.attributes.position.needsUpdate = true; 

            this.count = 0;

            //this.MS.sendMessage( "show_points_in_polygon" );
            this.FS.show_points_in_polygon();

        }       
    }

    private lineGeometry() {
        // geometry
        const geometry:BufferGeometry = new BufferGeometry();
       
        this.positions = new Float32Array(this.MAX_POINTS * 3);
        geometry.setAttribute('position', new BufferAttribute(this.positions, 3));

        // material
        const material:LineBasicMaterial = new LineBasicMaterial(
            { color: 0x49BFFE }
        );
        
        // line
        const line:Line = new Line(geometry, material);

        return line;
    }

    // update line
    private updateLine(relative:Vector3) {
        this.positions[this.count * 3 - 3] = relative.x;
        this.positions[this.count * 3 - 2] = relative.y;
        this.positions[this.count * 3 - 1] = relative.z;     
        this.line.geometry.attributes.position.needsUpdate = true; 
    }

    // add point
    private addPoint(relative:Vector3){

        this.positions[this.count * 3 + 0] = relative.x;
        this.positions[this.count * 3 + 1] = relative.y;
        this.positions[this.count * 3 + 2] = relative.z;
  
        this.count++;
        this.line.geometry.setDrawRange(0, this.count);
        this.line.geometry.attributes.position.needsUpdate = true;
    }
 
    
}
