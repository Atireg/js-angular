import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { User } from '../../types/user';

@Component({
  selector: 'app-delete-post',
  standalone: true,
  imports: [],
  templateUrl: './delete-post.component.html',
  styleUrl: './delete-post.component.css'
})
export class DeletePostComponent {
  themeId: string | null = null;
  postId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.postId = params['postId'];
    });

    this.route.parent?.params.subscribe(params => {
      this.themeId = params['themeId'];
    });

  }

  onDelete() {
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

    this.apiService.deletePost(this.themeId, this.postId).subscribe({
      next: () => {
        // Navigate with a query parameter to trigger a refresh
        this.router.navigate([`/catalog/${this.themeId}`], {
          queryParams: {
            refresh: 'true',
            // timestamp: new Date().getTime()
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
  };


}
