import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-cube',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditCubeComponent implements OnInit {
  themeId: string | null = null;
  postId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.postId = params['postId'];
    });

    this.route.parent?.params.subscribe(params => {
      this.themeId = params['themeId'];
    });
  }

  editPost(form: NgForm) {
    if (!this.themeId) {
      console.error('No theme ID found');
      this.router.navigate([`/catalog`]);
      return;
    }

    if (!this.postId) {
      console.error('No post ID found');
      this.router.navigate([`/catalog/${this.themeId}`]);
      return;
    }

    if (form.invalid) {
      return;
    }

    const { postText } = form.value;
    
    this.apiService.updatePost(this.themeId, this.postId, postText).subscribe({
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
        console.error('Failed to update post', error);
      }
    });
  }

  cancelForm() {
    this.router.navigate([`/catalog/${this.themeId}`]);
  }
}
