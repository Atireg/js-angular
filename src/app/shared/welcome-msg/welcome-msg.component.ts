import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileDetails } from '../../types/user';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-welcome-msg',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './welcome-msg.component.html',
  styleUrl: './welcome-msg.component.css'
})
export class WelcomeMsgComponent implements OnInit{
  @Input('isLoggedIn')isLoggedIn = false;

  profileDetails: ProfileDetails = {
    username: '',
    email: ''
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if(this.userService.user){
      const { username, email } = this.userService.user;
      this.profileDetails = { username, email };
    }
    
  }
  
}
