import { Component, OnInit } from '@angular/core';
import { CubeComponent } from '../cube/cube.component';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/theme';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CubeComponent, LoaderComponent, RouterLink],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})

export class GridComponent implements OnInit {
  themes: Theme[] = [];
  isLoading = true;
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getThemes().subscribe((themes) => {
      this.themes = themes;
      this.isLoading = false;
    })
  }
}
