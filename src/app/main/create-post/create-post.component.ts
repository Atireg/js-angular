import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {
  themeId: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private apiService: ApiService, 
    private router: Router
  ) {}
  
  ngOnInit(): void {
      this.route.parent?.params.subscribe(params => {
        this.themeId = params['themeId'];
      });

  }

  createPost(form: NgForm) {
    // console.log('Current ThemeId:', this.themeId);
    
    if (!this.themeId) {
      console.error('No theme ID found');
      return;
    }

    if (form.invalid) {
      return;
    }

    const { postText } = form.value;
    
    this.apiService.createPost(this.themeId, postText).subscribe({
      next: () => {
        // Navigate with a query parameter to trigger a refresh
        this.router.navigate([`/catalog/${this.themeId}`], { 
          queryParams: { 
            refresh: 'true',
            timestamp: new Date().getTime() 
          } 
        });
      },
      error: (error) => {
        console.error('Failed to create post', error);
      }
    });
  }
}