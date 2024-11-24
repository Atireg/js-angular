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
  rotation$ = new BehaviorSubject<number[] | null>(null);

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private cube!: THREE.Mesh;
  private animationId!: number;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {

    const themeId = this.route.snapshot.params['themeId'];

    this.apiService.getSingleTheme(themeId).subscribe(theme => {
      this.theme = theme;
      this.initializeScene(theme.colour, theme.size);
      this.rotation$.next(theme.rotation)
      this.startAnimationLoop();
    });

  }

  ngOnDestroy(): void {
    this.renderer.dispose();
  };

  private initializeScene(colour: string, size: number): void {
    const gridItemContainer = this.containerRef.nativeElement;

    // Texture
    const textureoader = new THREE.TextureLoader()
    const gradientTexture = textureoader.load('./3.jpg')
    gradientTexture.magFilter = THREE.NearestFilter

    // Material
    const parameters = {
      materialColor: new THREE.Color()
    }

    if (colour === 'red') {
      // parameters.materialColor = new THREE.Color(0x990000);
      parameters.materialColor = new THREE.Color(0xff4d4d);
    } else if (colour === 'green') {
      // parameters.materialColor = new THREE.Color(0x00FF00);
      parameters.materialColor = new THREE.Color(0x66cc66);
    } else if (colour === 'blue') {
      // parameters.materialColor = new THREE.Color(0x00FF00);
      parameters.materialColor = new THREE.Color(0x4d4dff);
    }


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
    const geometry = new THREE.BoxGeometry(size, size, size);
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
    this.rotation$.subscribe(rotation => {
      
      if (rotation) {
        // console.log(rotation[0].valueOf());
        this.animationId = requestAnimationFrame(() => this.startAnimationLoop());
        this.cube.rotation.x += Number(rotation[0]);
        this.cube.rotation.y += Number(rotation[1]);
        this.cube.rotation.z += Number(rotation[2]);
        this.renderer.render(this.scene, this.camera);
      }
    });
  };

}
