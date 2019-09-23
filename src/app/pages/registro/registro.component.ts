import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: UserModel;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = new UserModel();
    this.user.email = 'p4ul1991@gmail.com';
   }

   submit(registerForm: NgForm) {

    if (registerForm.invalid) {
      console.log('Invalido');
      return;
    }

    this.authService.register(this.user).subscribe( resp => {
      console.log(resp);
    }, (error ) => {
      console.log(error.error.error.message);
    });
   }

}
