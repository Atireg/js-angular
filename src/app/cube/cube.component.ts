import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-cube',
  standalone: true,
  imports: [],
  templateUrl: './cube.component.html',
  styleUrl: './cube.component.css'
})
export class CubeComponent implements OnInit, OnDestroy {
  @ViewChild('cube', { static: true }) containerRef!: ElementRef;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private cube!: THREE.Mesh;
  private animationId!: number;
  
  constructor() { }

  ngOnInit(): void {
    this.initializeScene();
    this.startAnimationLoop();
  }

  ngOnDestroy(): void {
    this.renderer.dispose();
  };

  private initializeScene(): void {
    const gridItemContainer = this.containerRef.nativeElement

    const sizes = {
      width: gridItemContainer.clientWidth,
      height: gridItemContainer.clientHeight,
    }

    // Input Parameters
    const parameters = {
      materialColor: '#73d800f8'
    }
    // Texture
    const textureoader = new THREE.TextureLoader()
    const gradientTexture = textureoader.load('./3.jpg')
    gradientTexture.magFilter = THREE.NearestFilter

    // Material
    const material = new THREE.MeshToonMaterial({
      color: parameters.materialColor,
      gradientMap: gradientTexture
    })

    // Create a renderer and attach it to the DOM
    this.renderer = new THREE.WebGLRenderer({
      alpha: true
    });
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    this.renderer.setSize(sizes.width, sizes.height);
    gridItemContainer.appendChild(this.renderer.domElement);

    // Create a scene
    this.scene = new THREE.Scene();

    // Create a camera
    this.camera = new THREE.PerspectiveCamera(75, gridItemContainer.clientWidth / gridItemContainer.clientHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // Create a cube
    const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshBasicMaterial({ color: 0x214E34 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    // Create lights
    const directionalight = new THREE.DirectionalLight('#ffffff', 1)
    directionalight.position.set(1, 1, 0)
    this.scene.add(directionalight)

    // Resize Grid Item
    // gridItemContainer.addEventListener('resize', () => {
    //   // Update sizes
      
    //   sizes.width = gridItemContainer.clientHeight;
    //   sizes.height = gridItemContainer.clientHeight;

    //   console.log(sizes.width, sizes.height );


    //   // Update camera
    //   this.camera.aspect = sizes.width / sizes.height;
    //   this.camera.updateProjectionMatrix();

    //   //Update renderer
    //   this.renderer.setSize(sizes.width, sizes.height)
    //   this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // });
  };

  private startAnimationLoop(): void {
    this.animationId = requestAnimationFrame(() => this.startAnimationLoop());
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  };
}
