import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Rive } from 'rive-js';

@Component({
  selector: 'app-welcome-cube',
  standalone: true,
  imports: [],
  templateUrl: './welcome-cube.component.html',
  styleUrl: './welcome-cube.component.css'
})
export class WelcomeCubeComponent implements AfterViewInit{
  @ViewChild('riveCanvas') canvasRef!: ElementRef;
  private rive!: Rive;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;

    this.rive = new Rive({
      canvas: canvas,
      src: 'cube-rolling.riv', 
      autoplay: true,
      onLoad: () => {
        //TODO Replace with my animation character
        // console.log('Rive animation loaded');
      }
    });
  }

  playAnimation() {
    this.rive?.play();
  }

  pauseAnimation() {
    this.rive?.pause();
  }
}
