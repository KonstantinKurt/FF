import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {UserRegisterModel} from '../models/user-register.model';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly apiUrl: string = environment.apiUrl;
  private readonly httpOptions: object;

  constructor(
    private httpClient: HttpClient
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'response',
    };
  }

  checkEmail(email: string): Observable<object> {
    return this.httpClient.post<object>(this.apiUrl + `check-email`, {email});
  }

  register(user: UserRegisterModel): Observable<object> {
    return this.httpClient.post<object>(this.apiUrl + `register`, user, this.httpOptions)
      .pipe(
        map((response) => {
          console.log('Response', response);
          return response;
        }),
        catchError(error => {
          console.log('Error: ', error.message);
          return throwError(error);
        })
      );
  }

}
