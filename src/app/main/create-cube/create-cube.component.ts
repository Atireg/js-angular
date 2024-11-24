import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-cube',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './create-cube.component.html',
  styleUrl: './create-cube.component.css'
})
export class CreateCubeComponent {
  constructor(private apiService: ApiService){}

  addCube(){

  }

}
