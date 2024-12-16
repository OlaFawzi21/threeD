import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { FBXLoader } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';
import { CSS2DRenderer } from 'three-stdlib';

@Component({
  selector: 'app-model-viewer',
  template: `<div #rendererContainer class="model-container"></div>`,
  styles: [
    `
      .model-container {
        width: 100%;
        height: 100vh;
      }
    `,
  ],
})
export class FbxComponent implements OnInit, AfterViewInit {
  @ViewChild('rendererContainer', { static: true })
  rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private labelRenderer!: CSS2DRenderer;
  private loader!: FBXLoader;
  private light!: THREE.DirectionalLight;
  private controls!: OrbitControls;

  private fbxModel!: THREE.Object3D; // Reference to the loaded model

  ngOnInit(): void {
    this.initThreeJS();
  }

  ngAfterViewInit(): void {
    this.loadFBXModel();
    this.addDragControls(); // Add drag-based rotation
    this.animate();
  }

  private initThreeJS(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xeeeeee);

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.rendererContainer.nativeElement.offsetWidth /
        this.rendererContainer.nativeElement.offsetHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2, 5);

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(
      this.rendererContainer.nativeElement.offsetWidth,
      this.rendererContainer.nativeElement.offsetHeight
    );
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // CSS2DRenderer setup (for annotations or labels)
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(
      this.rendererContainer.nativeElement.offsetWidth,
      this.rendererContainer.nativeElement.offsetHeight
    );
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    this.rendererContainer.nativeElement.appendChild(
      this.labelRenderer.domElement
    );

    // Lighting
    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.light.position.set(5, 10, 7.5);
    this.scene.add(this.light);

    const ambientLight = new THREE.AmbientLight(0xf0f0f0);
    this.scene.add(ambientLight);

    // OrbitControls setup
    this.controls = new OrbitControls(
      this.camera,
      this.labelRenderer.domElement
    );
    this.controls.enableDamping = true; // Smooth movement
    this.controls.dampingFactor = 0.05;
    this.controls.autoRotate = true; // Auto-rotate the camera
    this.controls.autoRotateSpeed = 1.0; // Adjust speed
    this.controls.target.set(0, 1, 0); // Focus on the model's position
    this.controls.update();

    this.loader = new FBXLoader();
  }

  private loadFBXModel(): void {
    const modelPath = 'assets/car/car.fbx'; // Adjust the path as needed

    this.loader.load(
      modelPath,
      (fbx) => {
        fbx.scale.set(0.01, 0.01, 0.01); // Scale down if necessary
        this.scene.add(fbx);
        this.fbxModel = fbx; // Save a reference for further manipulation
      },
      (progress) => {
        console.log(
          `Loading: ${((progress.loaded / progress.total) * 100).toFixed(2)}%`
        );
      },
      (error) => {
        console.error('Error loading FBX model:', error);
      }
    );
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    // Add rotation or other animations for the loaded model
    if (this.fbxModel) {
      this.fbxModel.rotation.y += 0.01; // Rotate the model around the Y-axis
    }

    this.controls.update(); // Ensure smooth camera controls
    this.renderer.render(this.scene, this.camera); // Render 3D scene
    this.labelRenderer.render(this.scene, this.camera); // Render labels
  }

  private addDragControls(): void {
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    this.renderer.domElement.addEventListener('mousedown', () => {
      isDragging = true;
    });

    this.renderer.domElement.addEventListener('mousemove', (event) => {
      if (isDragging && this.fbxModel) {
        const deltaX =
          event.movementX || event.screenX - previousMousePosition.x;
        const deltaY =
          event.movementY || event.screenY - previousMousePosition.y;

        this.fbxModel.rotation.y += deltaX * 0.01; // Rotate horizontally
        this.fbxModel.rotation.x += deltaY * 0.01; // Rotate vertically

        previousMousePosition = { x: event.screenX, y: event.screenY };
      }
    });

    this.renderer.domElement.addEventListener('mouseup', () => {
      isDragging = false;
    });
  }
}
