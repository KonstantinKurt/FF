import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserRegisterModel} from '../models/user-register.model';
import {confirmPasswordValidator} from '../../_validators/confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.scss',
    '../login/login.component.scss'
  ]
})
export class RegisterComponent implements OnInit {
  private form: FormGroup;
  private user: UserRegisterModel;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.user = new UserRegisterModel();
    this.form = this.formBuilder.group({
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        confirmPasswordValidator('password')
      ])
    });
  }

  submit() {
    if (this.form.valid) {
      const formData = {...this.form.value};
      console.log('Form data', formData);
    }
  }
}

