import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserLoginModel } from '../models/user-login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private form: FormGroup;
  private user: UserLoginModel;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.user = new UserLoginModel();
    this.form = this.formBuilder.group({
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
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
