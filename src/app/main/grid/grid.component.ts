import { Component, OnInit } from '@angular/core';
import { CubeComponent } from '../cube/cube.component';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CubeComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})

export class GridComponent implements OnInit {
  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.getPosts().subscribe((posts) => {
      console.log(posts);
    })
  }
}
