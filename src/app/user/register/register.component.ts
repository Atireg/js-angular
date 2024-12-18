import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../consts';
import { matchPasswordsValidator } from '../../utils/match-passes.validator';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
      tel: new FormControl(''),

      passGroup: new FormGroup(
        {
          password: new FormControl('', [Validators.required, Validators.minLength(5)]),
          rePassword: new FormControl('', [Validators.required]),
        },
        {
          validators: [matchPasswordsValidator('password', 'rePassword')],
        }
      )
    });

    constructor(private userService: UserService, private router: Router){

    }

  isInputMissing(controlName: string) {
    return (
      this.form.get(controlName)?.touched
      && this.form.get(controlName)?.errors?.['required']
    )
  };

  isNotMinLength(controlName: string) {
    return (
      this.form.get(controlName)?.touched
      && this.form.get(controlName)?.errors?.['minlength']
    )
  };

  get isEmailNotValid() {
    return (
      this.form.get('email')?.touched
      && this.form.get('email')?.errors?.['emailValidator']
    )
  };

  get getPassGroup() {
    return this.form.get('passGroup')
  }

  register() {
    if (this.form.invalid) {
      return
    }
    const {
      username,
      email,
      passGroup: { password, rePassword }  = {}
    } = this.form.value;

    this.userService.register(username!, email!, password!, rePassword!).subscribe(()=> {
      this.router.navigate(['/home'])
    });
  }
}
