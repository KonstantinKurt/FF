import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserRegisterModel} from '../models/user-register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.scss',
    '../login/login.component.scss'
  ]
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;
  private userRegister: UserRegisterModel;

  constructor() {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormGroup({
        pass: new FormControl('', [
          Validators.required,
          Validators.minLength(8)
        ]),
        passConfirm: new FormControl('', [
          Validators.required,
          Validators.minLength(8)
        ]),
      })
    });
  }

  submit() {
    console.log('Registered form', this.registerForm)
    if (this.registerForm.valid) {
      // console.log({...this.registerForm.value});
    }
  }

}
