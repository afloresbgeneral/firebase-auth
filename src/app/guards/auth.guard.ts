import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      console.log('authenticated');
      return true;
    } else {
      console.log('not auth');
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
