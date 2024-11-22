import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as THREE from 'three';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/theme';
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-cube',
  standalone: true,
  imports: [],
  templateUrl: './cube.component.html',
  styleUrl: './cube.component.css'
})
export class CubeComponent implements OnInit, OnDestroy {
  theme = {} as Theme;

  @ViewChild('cube', { static: true }) containerRef!: ElementRef;
  colour$ = new BehaviorSubject<string | null>(null);

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private cube!: THREE.Mesh;
  private animationId!: number;
  private cubeParamaters!: {};

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    const themeId = this.route.snapshot.params['themeId'];

    this.apiService.getSingleTheme(themeId).subscribe(theme => {
      this.theme = theme;
      this.colour$.next(theme.colour);
    });

    this.colour$.subscribe(colour => {
      if (colour) {
        this.initializeScene(colour);
        this.startAnimationLoop();
      }
      //TODO Add error handling
    });
  }

  ngOnDestroy(): void {
    this.renderer.dispose();
  };

  private initializeScene(colour: string): void {
    const gridItemContainer = this.containerRef.nativeElement;
    
    const parameters = {
      materialColor: new THREE.Color()
    }

    if (colour === 'red'){
      parameters.materialColor = new THREE.Color(0x990000);
    } else if (colour === 'yellow'){
      parameters.materialColor = new THREE.Color(0xFFFF00);
    } else if (colour === 'blue'){
      parameters.materialColor = new THREE.Color(0x000099);
    }

    // Texture
    const textureoader = new THREE.TextureLoader()
    const gradientTexture = textureoader.load('./5.jpg')
    gradientTexture.magFilter = THREE.NearestFilter

    // Material
    const material = new THREE.MeshToonMaterial({
      color: parameters.materialColor,
      gradientMap: gradientTexture
    })

    // Create a scene
    this.scene = new THREE.Scene();

    // Create a camera
    this.camera = new THREE.PerspectiveCamera(75, gridItemContainer.clientWidth / gridItemContainer.clientHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // Create a cube
    const geometry = new THREE.BoxGeometry();
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    // Create lights
    const directionalight = new THREE.DirectionalLight('#ffffff', 3)
    directionalight.position.set(1, 1, 0)
    this.scene.add(directionalight)

    const sizes = {
      width: gridItemContainer.clientWidth,
      height: gridItemContainer.clientHeight,
    }

    // Resize Grid Item
    window.addEventListener('resize', () => {
      // Update sizes

      sizes.width = gridItemContainer.clientWidth;

      // Update camera
      this.camera.aspect = 1;
      this.camera.updateProjectionMatrix();

      //Update renderer
      this.renderer.setSize(sizes.width, sizes.width)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    });

    // Create a renderer and attach it to the DOM
    this.renderer = new THREE.WebGLRenderer({
      alpha: true
    });
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    this.renderer.setSize(sizes.width, sizes.width);
    gridItemContainer.appendChild(this.renderer.domElement);
  };

  private startAnimationLoop(): void {
    this.animationId = requestAnimationFrame(() => this.startAnimationLoop());
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.005;
    // this.cube.rotation.z += 0.005;
    this.renderer.render(this.scene, this.camera);
  };

}
