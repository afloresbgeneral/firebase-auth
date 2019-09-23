import { Component, OnInit } from '@angular/core';

import { NgModel } from '@angular/forms';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userModel: UserModel;

  constructor() { }

  ngOnInit() {
    this.userModel = new UserModel();
  }

  submit(form: NgModel) {
    if (form.invalid) {
      console.log('Invalido');
      return;
    }
    console.log(form);
  }

}
