import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParticlesComponent } from './particles/particles.component';
import { GridComponent } from './grid/grid.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ParticlesComponent, GridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '3D experience';
}
