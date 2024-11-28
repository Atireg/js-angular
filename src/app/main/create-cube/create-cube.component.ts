import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-cube',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-cube.component.html',
  styleUrl: './create-cube.component.css'
})
export class CreateCubeComponent {
  constructor(private apiService: ApiService){}

  addCube(form: NgForm ){
    console.log(form.invalid);
    if (form.invalid){
      return
    }
    console.log(form.value);
    
    // this.apiService.createCube(inputSize).subscribe(data => {
    //   console.log(data);
    // })
  }


}
