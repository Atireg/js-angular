import { Component, ElementRef, OnInit } from '@angular/core';
import * as THREE from 'three';

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
  private directionalLight!: THREE.DirectionalLight;
  private animationId!: number;
  private sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  private particles!: THREE.Points;
  private particlesColor!: '#ffeded';

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.initializeScene();
    this.startAnimationLoop();
  }

  private initializeScene(): void {
    // Create a renderer and attach it to the DOM
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.el.nativeElement.querySelector('.particles').appendChild(this.renderer.domElement);

    // Create a scene
    this.scene = new THREE.Scene();

    // Create a camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // Create lights
    this.directionalLight = new THREE.DirectionalLight('#ffffff', 1)
    this.directionalLight.position.set(1, 1, 0)

    this.scene.add(this.directionalLight)

    // Particles
    const particlesCount = 1000
    const positions = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }

    const particlesGeometry = new THREE.BufferGeometry()
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      color: this.particlesColor,
      sizeAttenuation: true,
      size: 0.03
    })

    // Points
    this.particles = new THREE.Points(particlesGeometry, particlesMaterial)
    this.scene.add(this.particles)

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
    // this.particles.rotation.x += 0.0004;
    // this.particles.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

}
