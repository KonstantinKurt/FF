import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {UserRegisterModel} from '../models/user-register.model';
import {CustomValidator} from '../../shared/custom-validator.validator';
import {RegisterService} from './register.service';
import {Observable, of} from 'rxjs';
import {debounceTime, map, switchMap, take} from 'rxjs/operators';

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

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {
  }

  ngOnInit() {
    this.user = new UserRegisterModel();
    this.form = this.formBuilder.group({
        email: ['',
          [
            Validators.email,
            Validators.required
          ],
          this.existingEmailValidator()
        ],
        password: [null,
          [
          Validators.required,
          Validators.minLength(6)
        ]
        ],
        confirmPassword: [null,
          [
          Validators.required,
          ]
        ]
      },
      {
        validator: [
          CustomValidator.passwordMatchValidator,

        ]
      });
  }

  existingEmailValidator(initialEmail: string = ''): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<{ [key: string]: any } | null>
      | Observable<{ [key: string]: any } | null> => {
      if (!control.value) {
        return of(null);
      } else if (control.value === initialEmail) {
        return of(null);
      } else {
        return control.valueChanges.pipe(
          debounceTime(500),
          take(1),
          switchMap(_ =>
            this.registerService
              .checkEmail(control.value)
              .pipe(
                map((response: any) =>
                  response.result ? {alreadyExists: {value: control.value}} : null
                )
              )
          )
        );
      }
    };
  }

  emailUniqueValidator() {
    // const email: string = control.get('email').value;
    // console.log('Email control:', email);
    // let check: object;
    // this.registerService.checkEmail(value)
    //   .subscribe((response: any) => {
    //     check = response.body.result;
    //   });
    // console.log(check);
    // if (check) {
    //   control.get('email').setErrors({alreadyExists: true});
    // }
    // const check = this.registerService.checkEmail(email).pipe(map((data) => {
    //   console.log(data);
    // }));
    // return {alreadyExists: true};
  }

  submit() {
    if (this.form.valid) {
      const formData = {...this.form.value};
      console.log('Form data', formData);
    }
  }
}

