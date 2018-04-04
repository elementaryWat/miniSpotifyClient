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
  hayErrorPassword: boolean = false;
  cambioPasswordExitoso: boolean = false;
  errorPassword: string;
  constructor(private userService: UserService) {
    this.crearFormPassword();
  }
  crearFormPassword() {
    this.formUserPassword = new FormGroup({
      'oldPassword': new FormControl('', Validators.required),
      'password': new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]),
      'confirmPassword': new FormControl('')
    });
    this.formUserPassword.controls['confirmPassword'].setValidators([Validators.required, this.noIgual.bind(this.formUserPassword)]);
    this.formUserPassword.valueChanges.subscribe(currentValue => {
      this.hayErrorPassword = false;
      this.cambioPasswordExitoso = false;
    })
  }
  cambiarPassword() {
    var oldPassword = this.formUserPassword.controls['oldPassword'].value;
    var newPassword = this.formUserPassword.controls['password'].value;
    //Se usa un servicio de la API para comparar las contraseñas dado que la misma esta encriptada
    this.userService.passwordEqual(oldPassword, this.userService.currentUser.password)
      .subscribe(data => {
        if (data.equal) {
          this.userService.actualizarPassword(this.formUserPassword.value.password)
            .subscribe(data => {
              this.cambioPasswordExitoso = true;
            }, error => {
              console.log(error)
              this.hayErrorPassword = true;
              this.errorPassword = "Ha ocurrido un error cuando se modificaba su contraseña";
            });
        } else {
          this.hayErrorPassword = true;
          this.errorPassword = "Su vieja contraseña es incorrecta";
        }
      }, error => {
        console.log(error)
        this.hayErrorPassword = true;
        this.errorPassword = "Ha ocurrido un error cuando se modificaba su contraseña";
      })
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
