import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WelcomeMsgComponent } from '../shared/welcome-msg/welcome-msg.component';
import { UserService } from '../user/user.service';
import { WelcomeCubeComponent } from '../shared/welcome-cube/welcome-cube.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, WelcomeMsgComponent, WelcomeCubeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService){

  }
}
