import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url = environment.apiUrl;
  constructor(private httpClient: HttpClient) {
  }

  checkEmail(email: string) {
    return this.httpClient.get<boolean>(`${this.url}/${email}`);
  }
}
