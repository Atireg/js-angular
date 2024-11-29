import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailDirective } from '../../directives/email.directive';
import { DOMAINS } from '../../consts'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  domains = DOMAINS;
  constructor(private userService: UserService, private router: Router) {}

  login(form: NgForm){
    console.log(form.invalid);
    if(form.invalid){
      console.error('Invalid Login Form')
      return;
    }

    const { email, password } = form.value;
    this.userService.login(email, password).subscribe(() =>{
      this.router.navigate(['/home'])
    })
    

    // this.userService.login();
    // this.router.navigate(['/home'])
    
  }
}
