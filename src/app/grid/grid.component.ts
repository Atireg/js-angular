import { Component } from '@angular/core';
import { CubeComponent } from '../cube/cube.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CubeComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {

}
