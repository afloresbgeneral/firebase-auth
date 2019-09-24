import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel;
  rememberUser = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = new UserModel();
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.rememberUser = true;
    }
  }

  submit(form: NgModel) {
    console.log('this.userModel ', this.user);
    if (form.invalid) {
      console.log('Invalido');
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    this.authService.login(this.user).subscribe( resp => {
      console.log(resp);
      Swal.close();

      if (this.rememberUser) {
        localStorage.setItem('email', this.user.email);
      }

      this.router.navigateByUrl('/home');
    }, (error) => {
      console.log(error.error.error.message);
      Swal.close();
      Swal.fire({
        allowOutsideClick: false,
        type: 'error',
        title: 'Error de autenticacion',
        text: error.error.error.message
      });
    });
  }

}
