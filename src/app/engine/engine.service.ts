import { Injectable, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { Scene, WebGLRenderer, OrthographicCamera, AmbientLight, 
  Mesh, PlaneGeometry, Group, Raycaster, MeshLambertMaterial, Vector3, Color, BufferGeometry, BufferAttribute, Points, PointsMaterial } from 'three';

@Injectable({ providedIn: 'root' })
export class EngineService implements OnDestroy {
  private canvasRef: ElementRef;
  private canvas: HTMLCanvasElement;
  private renderer: WebGLRenderer;
  private camera: OrthographicCamera;
  private scene: Scene;
  private light: AmbientLight;
  public group: Group;

  private frameId: number = null;

  public constructor(private ngZone: NgZone) {}

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvasRef = canvas;
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvas.nativeElement;

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor("#000", 1);

    // create the scene
    this.scene = new Scene();

    this.camera = new OrthographicCamera(
      this.canvas.clientWidth/-20, this.canvas.clientWidth/20, this.canvas.clientHeight/20, this.canvas.clientHeight/-20, 1, 1000
    );
    this.camera.position.z = 400;
    this.scene.add(this.camera);

    // soft white light
    this.light = new AmbientLight( 0x404040 );
    this.light.position.z = 10;
    this.scene.add(this.light);

    this.group = new Group();
    this.scene.add( this.group );

    //background image
    this.loadTransparentBackground();

    

  }

  loadTransparentBackground() {

    // Load a custom material
    var material = new MeshLambertMaterial({
      color: 0xFFE000,
      opacity: 0.1,
      transparent: true,
      wireframe: false
    });

    const aspect:number = this.canvas.clientWidth / this.canvas.clientHeight;
    const heightSegments:number = Math.round( this.canvas.clientHeight / 10 );
    const widthSegments:number = Math.round( heightSegments * aspect );

    // create a plane geometry
    var geometry = new PlaneGeometry(this.canvas.clientWidth/15, this.canvas.clientHeight/15, widthSegments, heightSegments);

    let background = new Mesh(geometry, material);

    // set the position of the background mesh in the x,y,z dimensions
    background.position.set(0, 0, 0);
    background.name = "Background";

    // add the image to the scene
    this.scene.add(background);

    this.loadPoints( geometry );
  }

  loadPoints( planeGeometry:PlaneGeometry ) {

    const vertices = planeGeometry.vertices;

    let positions = new Float32Array( vertices.length * 3 );
    let colors = new Float32Array( vertices.length * 3 );

    let vertex:Vector3;
    let color:Color = new Color();

    for ( let i = 0; i < vertices.length; i ++ ) {

      vertex = vertices[ i ];
      vertex.toArray( positions, i * 3 );

      color.setRGB(255,0,0);
			color.toArray( colors, i * 3 );

    }

    let geometry:BufferGeometry = new BufferGeometry();
    geometry.setAttribute( 'position', new BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'color', new BufferAttribute( colors, 3 ) );
    

    const material:PointsMaterial = new PointsMaterial( { size: 2, opacity: 0.5, transparent: true, vertexColors: true } );

    const points:Points = new Points( geometry, material );
    points.name = "Points";
    this.group.add( points );



  }

  public animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }

      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  public render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });

    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }

  get3DPosition(clientX:number, clientY:number) { 
    const position = {
        x: ( ( clientX - this.getCurrentOffset( this.canvasRef ).left ) / this.canvas.clientWidth ) * 2 - 1,
        y: -( ( clientY - this.getCurrentOffset( this.canvasRef ).top ) / this.canvas.clientHeight ) * 2 + 1
    };
    const rayCaster:Raycaster = new Raycaster();
    rayCaster.setFromCamera(position, this.camera);
    const intersects = rayCaster.intersectObjects(this.scene.children, true);
    if (intersects.length > 0) { 
        //if canvas has multiple Object, then find the background object to get exact mouse osition
        for( let i = 0; i < intersects.length; i++) {
          if( intersects[i].object.name == "Background" ) {
            return intersects[i].point;
          }
        }
        
    }
  }

  getCurrentOffset(element: ElementRef) {
    const rect = element.nativeElement.getBoundingClientRect();
    let top:number = rect.top + window.pageYOffset - document.documentElement.clientTop;
    let left:number = rect.left + window.pageXOffset - document.documentElement.clientLeft;
    return {left:left, top:top};
  }

}
