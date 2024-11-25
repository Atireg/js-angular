import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-create-cube',
  standalone: true,
  imports: [],
  templateUrl: './create-cube.component.html',
  styleUrl: './create-cube.component.css'
})
export class CreateCubeComponent {
  constructor(private apiService: ApiService){}

  addCube(event: Event, inputSize: string){
    event.preventDefault();
    console.log(inputSize);
    // this.apiService.createCube(inputSize).subscribe(data => {
    //   console.log(data);
    // })
  }


}
