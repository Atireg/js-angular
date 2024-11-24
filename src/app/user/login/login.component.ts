import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  login(event: Event, emailValue: string, passwordValue: string){
    event.preventDefault()
    console.log(emailValue, passwordValue);

    this.userService.login();
    this.router.navigate(['/home'])
    
  }
}
