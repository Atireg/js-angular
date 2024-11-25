import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../consts';

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
      passGroup: new FormGroup({
        password: new FormControl('', [Validators.required]),
        rePassword: new FormControl('', [Validators.required]),
      })
    }
  );

  isInputMissing(controlName: string) {
    return (
      this.form.get(controlName)?.touched
      && this.form.get(controlName)?.errors?.['required']
    )
  };

  get isNotMinLength() {
    return (
      this.form.get('username')?.touched
      && this.form.get('username')?.errors?.['minlength']
    )
  };

  get isEmailNotValid() {
    return (
      this.form.get('email')?.touched
      && this.form.get('email')?.errors?.['emailValidator']
    )
  };

  get getPassGroup(){
    return this.form.get('passGroup')
  }

  register() {
    if (this.form.invalid) {
      return
    }
    // console.log(this.form.value)
  }
}
