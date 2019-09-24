import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apiKey = 'AIzaSyBYw8XlriLRRQ_OlpWF0Vx3Q4bBR6s6_uU';
  userToken: string;

  // crear nuevo usuario https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // login https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor(private http: HttpClient) {
    console.log(this.getToken());
  }

  logout() {
    localStorage.removeItem('token');
  }

  login(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true
    };
    return this.http.post(`${this.url}/accounts:signInWithPassword?key=${this.apiKey}`, authData).pipe(
      map( resp => {
        this.setToken(resp['idToken']);
        return resp;
      })
    );
  }

  register(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true
    };
    return this.http.post(`${this.url}/accounts:signUp?key=${this.apiKey}`, authData).pipe(
      map( resp => {
        this.setToken(resp['idToken']);
        return resp;
      })
    );
  }

  private setToken(token: string) {
    this.userToken = token;
    localStorage.setItem('token', this.userToken);

    const today = new Date();
    today.setSeconds(3600);
    localStorage.setItem('expires', today.getTime().toString());
  }

  getToken(): string {
    if ( localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  isAuthenticated(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }

    const expires = Number(localStorage.getItem('expires'));
    const expiresDate = new Date();

    expiresDate.setTime(expires);

    if (expiresDate > new Date()) {
      return true;
    } else {
      return;
    }
  }
}
