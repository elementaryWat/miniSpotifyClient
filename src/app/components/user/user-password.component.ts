import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styles: []
})
export class UserPasswordComponent implements OnInit {
  formUserPassword: FormGroup;
  hayErrorPassword:boolean=false;
  cambioPasswordExitoso:boolean=false;
  errorPassword:string;
  constructor(private userService: UserService) {
    this.crearFormPassword();
  }
  crearFormPassword() {
    this.formUserPassword=new FormGroup({
      'oldPassword':new FormControl('',Validators.required),
      'password': new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]),
      'confirmPassword': new FormControl('')
    });
    this.formUserPassword.controls['confirmPassword'].setValidators([Validators.required, this.noIgual.bind(this.formUserPassword)]);    
  }
  cambiarPassword(){
    console.log(this.formUserPassword.value);
  }
  noIgual(control: FormControl) {
    let formUserPassword: any = this;
    if (control.value !== formUserPassword.controls['password'].value) {
      return { noIgual: true }
    }
  }
  ngOnInit() {
  }

}
