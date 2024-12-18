import { Component, ElementRef, OnDestroy, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import * as THREE from 'three';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/theme';
import { BehaviorSubject, Subscription } from 'rxjs'
import { ElapsedTimePipe } from '../../shared/pipes/elapsed-time.pipe';
import { UserService } from '../../user/user.service';
import { UserForAuth } from '../../types/user';

@Component({
  selector: 'app-cube',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ElapsedTimePipe],
  templateUrl: './cube.component.html',
  styleUrl: './cube.component.css'
})
export class CubeComponent implements OnInit, OnDestroy {
  theme = {} as Theme;
  currentUser: UserForAuth | null = null;

  @ViewChild('cube', { static: true }) containerRef!: ElementRef;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private cube!: THREE.Mesh;
  private animationId!: number;
  private rotationSubscription!: Subscription;
  isRotating: boolean = true;
  rotation$ = new BehaviorSubject<number[] | null>(null);
  showTooltip: boolean = true;
  private currentRotation: number[] = [0, 0, 0];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private userService: UserService, private router: Router) { }

  get isLoggedIn(): boolean{
    return this.userService.isLogged;
  };

  ngOnInit(): void {
    const themeId = this.route.snapshot.params['themeId'];

    this.apiService.getSingleTheme(themeId).subscribe(theme => {
      this.theme = theme;

      this.currentUser = this.userService.user!;
      if(this.currentUser){
          console.log(this.currentUser.username);
      }

      this.initializeScene(theme.colour, theme.size);
      this.rotation$.next(theme.rotation);
      this.setupRotationSubscription();
      this.animate();
    });

    // Triggers a refresh after a new post is created
    this.route.queryParams.subscribe(params => {
      if (params['refresh'] === 'true') {
        this.apiService.getSingleTheme(themeId).subscribe(theme => {
          this.theme.posts = theme.posts;
        });
      }
    }); 
    
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.rotationSubscription) {
      this.rotationSubscription.unsubscribe();
    }
    this.renderer.dispose();
    this.scene.remove(this.cube);
    this.cube.geometry.dispose();
    (this.cube.material as THREE.Material).dispose();
  }

  onMouseOver() {
    this.isRotating = false;
    this.showTooltip = false;
  }

  onMouseOut() {
    this.isRotating = true;
    setTimeout(() => {
      this.showTooltip = true;
    }, 1000);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isRotating) {
      const tooltip = document.querySelector('.tooltip') as HTMLElement;
      if (tooltip) {
        tooltip.style.left = `${event.clientX + 10}px`;
        tooltip.style.top = `${event.clientY - 20}px`;
      }
    }
  }

  private setupRotationSubscription(): void {
    this.rotationSubscription = this.rotation$.subscribe(rotation => {
      if (rotation) {
        this.currentRotation = rotation.map(Number);
      }
    });
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    if (this.isRotating && this.currentRotation) {
      this.cube.rotation.x += this.currentRotation[0];
      this.cube.rotation.y += this.currentRotation[1];
      this.cube.rotation.z += this.currentRotation[2];
    }

    this.renderer.render(this.scene, this.camera);
  }

  private initializeScene(colour: string, size: number): void {
    const gridItemContainer = this.containerRef.nativeElement;

    // Texture
    const textureoader = new THREE.TextureLoader()
    const gradientTexture = textureoader.load('./3.jpg')
    gradientTexture.magFilter = THREE.NearestFilter


    const material = new THREE.MeshToonMaterial({
      color: new THREE.Color(colour),
      gradientMap: gradientTexture
    })

    // Scene setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, gridItemContainer.clientWidth / gridItemContainer.clientHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // Cube setup
    const geometry = new THREE.BoxGeometry(size, size, size);
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    // Lighting
    const directionalight = new THREE.DirectionalLight('#ffffff', 3)
    directionalight.position.set(1, 1, 0)
    this.scene.add(directionalight)

    // Responsive handling
    const sizes = {
      width: gridItemContainer.clientWidth,
      height: gridItemContainer.clientHeight,
    }

    window.addEventListener('resize', () => {
      sizes.width = gridItemContainer.clientWidth;
      this.camera.aspect = 1;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(sizes.width, sizes.width)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    });

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    this.renderer.setSize(sizes.width, sizes.width);
    gridItemContainer.appendChild(this.renderer.domElement);
  }
}