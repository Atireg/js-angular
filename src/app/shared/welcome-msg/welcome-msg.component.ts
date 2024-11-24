import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-welcome-msg',
  standalone: true,
  imports: [],
  templateUrl: './welcome-msg.component.html',
  styleUrl: './welcome-msg.component.css'
})
export class WelcomeMsgComponent {
  @Input('isLoggedIn')isLoggedIn = false;
}
