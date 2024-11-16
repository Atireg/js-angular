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
  private cube!: THREE.Mesh;
  private animationId!: number;

  constructor(private el: ElementRef){}
  
  ngOnInit(): void {
    this.initializeScene();
  }

  private initializeScene(): void {
    // Create a renderer and attach it to the DOM
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.el.nativeElement.querySelector('#canvasContainer').appendChild(this.renderer.domElement);

    // Create a scene
  }
}
