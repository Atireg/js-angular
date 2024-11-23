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
  private scenes: Map<string, { scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, cube: THREE.Mesh }> = new Map();
  private animationFrames: Map<string, number> = new Map();

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  // Helper method to get rotation speed from array
  //TODO Add all rotation axis
  private getRotationSpeed(cube: Theme): number {
    return cube.rotation && cube.rotation.length > 0 ? Number(cube.rotation[0]) : 0;
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

    // Create cube
    const geometry = new THREE.BoxGeometry(cubeData.size, cubeData.size, cubeData.size);
    const material = new THREE.MeshBasicMaterial({ color: cubeData.colour });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    camera.position.z = 5;

    // Store the Three.js objects
    this.scenes.set(cubeData._id, { scene, camera, renderer, cube });

    // Start animation
    this.animate(cubeData._id, this.getRotationSpeed(cubeData));

    // Handle window resize
    const resizeObserver = new ResizeObserver(() => {
      const { camera: cam, renderer: rend } = this.scenes.get(cubeData._id)!;
      cam.aspect = container.clientWidth / container.clientHeight;
      cam.updateProjectionMatrix();
      rend.setSize(container.clientWidth, container.clientHeight);
    });

    resizeObserver.observe(container);
  }

  private animate(cubeId: string, speed: number) {
    const sceneData = this.scenes.get(cubeId);
    if (!sceneData) return;

    const { scene, camera, renderer, cube } = sceneData;

    const animateFrame = () => {
      cube.rotation.x += speed;
      cube.rotation.y += speed;
      cube.rotation.y += speed;

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
