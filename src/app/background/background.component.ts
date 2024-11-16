import { Component, ElementRef, OnInit } from '@angular/core';
import * as THREE from 'three'; 
import { log } from 'three/webgpu';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [],
  templateUrl: './background.component.html',
  styleUrl: './background.component.css'
})
export class BackgroundComponent implements OnInit {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private cube!: THREE.Mesh;
  // private animationId!: number;

  constructor(private el: ElementRef){}
  
  ngOnInit(): void {
    this.initializeScene();
    this.renderScene();
  }

  private initializeScene(): void {
    // Create a renderer and attach it to the DOM
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.el.nativeElement.querySelector('#canvasContainer').appendChild(this.renderer.domElement);


    // Create a scene
    this.scene = new THREE.Scene();
    console.log(this.scene);
    

    // Create a camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    console.log(this.cube);
    this.scene.add(this.cube);

    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this), false)

  }

  private renderScene(): void {
    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
