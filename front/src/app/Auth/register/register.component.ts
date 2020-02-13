import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {UserRegisterModel} from '../models/user-register.model';
import {CustomValidator} from '../../shared/custom-validator.validator';
import {RegisterService} from './register.service';
import {Observable, of} from 'rxjs';
import {debounceTime, map, switchMap, take} from 'rxjs/operators';
import {Router} from '@angular/router';

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
    private registerService: RegisterService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
        email: [null,
          [
            Validators.email,
            Validators.required
          ],
          this.uniqueEmailValidator()
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

  uniqueEmailValidator(initialEmail: string = ''): AsyncValidatorFn {
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

  async submit() {
    if (this.form.valid) {
      this.user = new UserRegisterModel();
      this.user.email = this.form.value.email;
      this.user.password = this.form.value.password;
      await this.registerService.register(this.user)
        .subscribe((response: any) => {
          response.status === 201 ? this.router.navigateByUrl('auth/confirm') : this.router.navigateByUrl('error/500');
        });
    }
  }
}

