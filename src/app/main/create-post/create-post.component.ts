import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Theme } from '../../types/theme';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent{
  theme = {} as Theme;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router){}
  
  // ngOnInit(): void {
  //   const themeId = this.route.snapshot.params['themeId'];
  //   console.log(themeId);
  // };

  createPost(form: NgForm){
    
    if (form.invalid){
      return
    }

    const { postText } = form.value;
    console.log(postText);

    // this.apiService.createCube(themeId, postText).subscribe(() => {
    //   this.router.navigate(['/catalog']);
    // })
  }

}
