import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  formRegistro: FormGroup;
  constructor() {
    this.crearFormLogin();
    this.crearFormRegistro();
  }

  crearFormLogin() {
    this.formLogin = new FormGroup({
      'password': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")])
    });
  }
  crearFormRegistro() {
    /* /^
      (?=.*\d)          // should contain at least one digit
      (?=.*[a-z])       // should contain at least one lower case
      (?=.*[A-Z])       // should contain at least one upper case
      [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
    $/ */
    this.formRegistro = new FormGroup({
      'name': new FormControl('', Validators.required),
      'surname': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'password': new FormControl('', [, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]),
      'confirmPassword': new FormControl(''),
      'role':new FormControl('USER'),
      'image':new FormControl('default.png')
    });
    this.formRegistro.controls['confirmPassword'].setValidators([Validators.required, this.noIgual.bind(this.formRegistro)]);
  }
  login() {
    console.log(this.formLogin.value)
  }
  register() {
    console.log(this.formRegistro.value);
  }
  noIgual(control: FormControl) {
    let formRegistro: any = this;
    if (control.value !== formRegistro.controls['password'].value) {
      return { noIgual: true }
    }
  }
  ngOnInit() {

  }

}
