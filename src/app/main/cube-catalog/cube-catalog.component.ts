import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';  // Add this import
import { Theme } from '../../types/theme';
import * as THREE from 'three'
import { ApiService } from '../../api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cube-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cube-catalog.component.html',
  styleUrl: './cube-catalog.component.css'
})
export class CubeCatalogComponent implements OnInit, AfterViewInit {
  @ViewChildren('cubeContainer') cubeContainers!: QueryList<ElementRef>;

  cubes: Theme[] = [];
  private animationFrames: Map<string, number> = new Map();
  private scenes: Map<string, { 
    scene: THREE.Scene, 
    camera: THREE.PerspectiveCamera, 
    renderer: THREE.WebGLRenderer, 
    cube: THREE.Mesh,
    rotationSpeeds: number[] 
  }> = new Map();
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  // Helper method to get rotation speed from array
  private getRotationSpeed(cube: Theme, axis: number): number {
    return cube.rotation && cube.rotation.length > axis ? Number(cube.rotation[axis]) : 0;
  };

  // Helper method to get all rotation speeds
  private getAllRotationSpeeds(cube: Theme): number[] {
    return [
      this.getRotationSpeed(cube, 0), // X axis
      this.getRotationSpeed(cube, 1), // Y axis
      this.getRotationSpeed(cube, 2)  // Z axis
    ];
  }

  ngOnInit() {
    // Fetch cube data from your database
    // CUBES === THEMES!!
    this.apiService.getThemes().subscribe(cubes => {
      this.cubes = cubes;     
    });
  }

  ngAfterViewInit() {
    // Wait for view children to be available
    this.cubeContainers.changes.subscribe(() => {
      this.initializeCubes();
    });
  }

  private initializeCubes() {
    this.cubeContainers.forEach((container: ElementRef, index: number) => {
      const cube = this.cubes[index];
      // console.log(cube);

      this.initializeThreeJS(container.nativeElement, cube);
    });
  }

  private initializeThreeJS(container: HTMLElement, cubeData: Theme) {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Texture
    const textureoader = new THREE.TextureLoader()
    const gradientTexture = textureoader.load('./5.jpg')
    gradientTexture.magFilter = THREE.NearestFilter

    // Material
    const parameters = {
      materialColor: new THREE.Color()
    }

    if (cubeData.colour === 'red') {
      parameters.materialColor = new THREE.Color(0x990000);
    } else if (cubeData.colour === 'green') {
      parameters.materialColor = new THREE.Color(0x00FF00);
    } else if (cubeData.colour === 'blue') {
      parameters.materialColor = new THREE.Color(0x000099);
    }

    const material = new THREE.MeshToonMaterial({
      color: parameters.materialColor,
      gradientMap: gradientTexture
    })



    // Create cube
    const geometry = new THREE.BoxGeometry(cubeData.size, cubeData.size, cubeData.size);
    // const material = new THREE.MeshBasicMaterial({ color: cubeData.colour });
    const cube = new THREE.Mesh(geometry, material);

    // Create lights
    const directionalight = new THREE.DirectionalLight('#ffffff', 3)
    directionalight.position.set(1, 1, 0)
    scene.add(directionalight)

    scene.add(cube);
    camera.position.z = 5;

    const rotationSpeeds = this.getAllRotationSpeeds(cubeData);

    // Store the Three.js objects
    this.scenes.set(cubeData._id, { 
      scene, 
      camera, 
      renderer, 
      cube,
      rotationSpeeds 
    });

    // Start animation
    this.animate(cubeData._id);

    // Handle window resize
    const resizeObserver = new ResizeObserver(() => {
      const { camera: cam, renderer: rend } = this.scenes.get(cubeData._id)!;
      cam.aspect = container.clientWidth / container.clientHeight;
      cam.updateProjectionMatrix();
      rend.setSize(container.clientWidth, container.clientHeight);
    });

    resizeObserver.observe(container);
  }

  private animate(cubeId: string) {
    const sceneData = this.scenes.get(cubeId);
    if (!sceneData) return;

    const { scene, camera, renderer, cube, rotationSpeeds } = sceneData;

    const animateFrame = () => {
      // Apply rotation for each axis
      cube.rotation.x += rotationSpeeds[0];
      cube.rotation.y += rotationSpeeds[1];
      cube.rotation.z += rotationSpeeds[2];

      renderer.render(scene, camera);
      this.animationFrames.set(cubeId, requestAnimationFrame(animateFrame));
    };

    animateFrame();
  }

  ngOnDestroy() {
    // Cleanup
    this.scenes.forEach((sceneData, cubeId) => {
      if (this.animationFrames.has(cubeId)) {
        cancelAnimationFrame(this.animationFrames.get(cubeId)!);
      }
      sceneData.renderer.dispose();
    });
  }
}
