import { AfterViewInit, Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileDetails } from '../../types/user';
import { UserService } from '../../user/user.service';
import { Rive } from '@rive-app/canvas'

@Component({
  selector: 'app-welcome-msg',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './welcome-msg.component.html',
  styleUrl: './welcome-msg.component.css'
})
export class WelcomeMsgComponent implements OnInit, AfterViewInit {
  @Input('isLoggedIn')isLoggedIn = false;

  @ViewChild('riveCanvas', { static: false }) riveCanvas!: ElementRef<HTMLCanvasElement>;

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

  ngAfterViewInit() {
    if (this.riveCanvas?.nativeElement) {
      try {
        new Rive({
          src: './cube-animation.riv',
          canvas: this.riveCanvas.nativeElement,
          autoplay: true,
          onLoad: () => {
            console.log('Rive animation loaded successfully');
          },
        });
      } catch (error) {
        console.error('Error initializing Rive:', error);
      }
    } else {
      console.error('Canvas element is undefined.');
    }
  }
  
}
