import { AbstractControl } from '@angular/forms';
import {Observable} from "rxjs";

export class CustomValidator {
  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value;
    const confirmPassword: string = control.get('confirmPassword').value;
    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({ notMatch: true });
    }
  }
  static emailUniqueValidator(control: AbstractControl) {
    const email: string = control.get('email').value;
    const check: Observable<boolean> = this.registerService.checkEmail(email);
    console.log(check);
    if (check) {
      control.get('email').setErrors({alreadyExists: true});
    }
  }
}
