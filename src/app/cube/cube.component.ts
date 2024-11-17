import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-cube',
  standalone: true,
  imports: [],
  templateUrl: './cube.component.html',
  styleUrl: './cube.component.css'
})
export class CubeComponent implements OnInit, OnDestroy {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private cube!: THREE.Mesh;
  private animationId!: number;
  private sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.initializeScene();
    this.startAnimationLoop();
  }

  ngOnDestroy(): void {
    this.renderer.dispose();
  };

  private initializeScene(): void {
    // Create a renderer and attach it to the DOM
    this.renderer = new THREE.WebGLRenderer({
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.el.nativeElement.querySelector('.cube').appendChild(this.renderer.domElement);


    // Create a scene
    this.scene = new THREE.Scene();
    console.log(this.scene);

    // Create a camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    // Handle window resize
    window.addEventListener('resize', () => {
      // Update sizes
      this.sizes.width = window.innerWidth;
      this.sizes.height = window.innerHeight;

      // Update camera
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      //Update renderer
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

  }

  private startAnimationLoop(): void {
    this.animationId = requestAnimationFrame(() => this.startAnimationLoop());
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

}
