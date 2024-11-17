import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParticlesComponent } from './particles/particles.component';
import { CubeComponent } from './cube/cube.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CubeComponent, ParticlesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '3D experience';
}
