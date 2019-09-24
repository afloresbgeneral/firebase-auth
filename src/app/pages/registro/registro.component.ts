import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: UserModel;
  rememberUser = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = new UserModel();
    this.user.email = 'p4ul1991@gmail.com';
   }

   submit(registerForm: NgForm) {

    if (registerForm.invalid) {
      console.log('Invalido');
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    this.authService.register(this.user).subscribe( resp => {
      console.log(resp);
      Swal.close();
      if (this.rememberUser) {
        localStorage.setItem('email', this.user.email);
      }
      this.router.navigateByUrl('/home');
    }, (error ) => {
      Swal.close();
      Swal.fire({
        allowOutsideClick: false,
        type: 'error',
        title: 'Error de autenticacion',
        text: error.error.error.message
      });
      console.log(error.error.error.message);
    });
   }

}
