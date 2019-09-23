import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apiKey = 'AIzaSyBYw8XlriLRRQ_OlpWF0Vx3Q4bBR6s6_uU';

  // crear nuevo usuario https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // login https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor(private http: HttpClient) {

  }

  logout() {
  }

  login(user: UserModel) {

  }

  register(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}/accounts:signUp?key=${this.apiKey}`, authData);

  }
}
