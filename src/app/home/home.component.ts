import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WelcomeMsgComponent } from '../shared/welcome-msg/welcome-msg.component';
import { UserService } from '../user/user.service';
import { ApiService } from '../api.service';
import { Theme } from '../types/theme';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, WelcomeMsgComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  cubes: Theme[] = [];
  selectedCubes: Theme[] = [];

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService, private apiService: ApiService){}

  ngOnInit() {
    this.apiService.getThemes().subscribe(cubes => {
      this.cubes = cubes;    
      
      const sortedCubes = this.cubes.sort((a, b) => b.posts.length - a.posts.length);
      this.selectedCubes = sortedCubes.slice(0, 3);
    });
  }

}
