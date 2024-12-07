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
  defaultColor: string = '#111011';

  constructor(private apiService: ApiService, private router: Router){}

  createCube(form: NgForm ){
    // console.log(form.invalid);
    if (form.invalid){
      return
    }

    const {cubeName, cubeColor, cubeSize, cubePost, rotationX, rotationY, rotationZ} = form.value;

    this.apiService.createCube(cubeName, cubePost, cubeColor, cubeSize, [rotationX, rotationY, rotationZ]).subscribe(() => {
      this.router.navigate(['/catalog']);
    })
  }

}
