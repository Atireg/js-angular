import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-cube',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-cube.component.html',
  styleUrl: './create-cube.component.css'
})
export class CreateCubeComponent {
  constructor(private apiService: ApiService, private router: Router){}

  addCube(form: NgForm ){
    console.log(form.invalid);
    if (form.invalid){
      return
    }

    const {cubeColor, cubeSize, rotationX, rotationY, rotationZ} = form.value;

    console.log(cubeColor);

    
    this.apiService.createCube('Test', 'Test', cubeColor, cubeSize, [rotationX, rotationY, rotationZ]).subscribe(() => {
      this.router.navigate(['/catalog'])
    })
  }


}
