import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../consts';
import { ProfileDetails } from '../../types/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  isEditMode: boolean = false;

  profileDetails: ProfileDetails = {
    username: '',
    email: ''
  };

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
  });

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const { username, email } = this.userService.user!;
    this.profileDetails = { username, email };

    this.form.setValue({ username, email })
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  };

  handleSaveProfile() {
    if (this.form.invalid) {
      return;
    }

    this.profileDetails = this.form.value as ProfileDetails;
    const { username, email } = this.profileDetails;
    this.userService.updateProfile(username, email).subscribe(() => {
      this.toggleEditMode();
    });

  };

  onCancel(event: Event) {
    event.preventDefault();
    // console.log('onCancel envoked');
    this.toggleEditMode();
  }
}
