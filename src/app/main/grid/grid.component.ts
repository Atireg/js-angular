import { Component, OnInit } from '@angular/core';
import { CubeComponent } from '../cube/cube.component';
import { ApiService } from '../../api.service';
import { Post } from '../../types/post';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CubeComponent, LoaderComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})

export class GridComponent implements OnInit {
  posts: Post[] = [];
  isLoading = true;
  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.getPosts().subscribe((posts) => {
      this.posts = posts;
      this.isLoading = false;
    })
  }
}
