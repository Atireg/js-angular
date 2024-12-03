import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { ParticlesComponent } from './core/particles/particles.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ParticlesComponent, AuthenticateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '3D experience';

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService){

  }
}
