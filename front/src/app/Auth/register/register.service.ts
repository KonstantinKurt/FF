import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly apiUrl: string = environment.apiUrl;
  constructor(
    private httpClient: HttpClient
  ) { }

  checkEmail(email: string): Observable<object> {
    return this.httpClient.post<object>(this.apiUrl + `check-email`, {email});
  }

}
