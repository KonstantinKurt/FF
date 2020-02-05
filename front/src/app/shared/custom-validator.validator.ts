import {AbstractControl} from '@angular/forms';
import {RegisterService} from '../Auth/register/register.service';
import {Injectable} from '@angular/core';
@Injectable()
export class CustomValidator {
  private static instance: CustomValidator;
  constructor( private registerService: RegisterService) {
    return CustomValidator.instance || (CustomValidator.instance = this);
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value;
    const confirmPassword: string = control.get('confirmPassword').value;
    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({notMatch: true});
    }
  }

   static emailUniqueValidator(control: AbstractControl) {
    const email: string = control.get('email').value;
    const check = CustomValidator.instance.registerService.checkEmail(email);
    console.log(check);
    if (check) {
      control.get('email').setErrors({alreadyExists: true});
    }
  }
}
