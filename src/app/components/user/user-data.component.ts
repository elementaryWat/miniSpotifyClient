import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  constructor(private userService: UserService) { }
  formUserData: FormGroup;
  updateDataExitoso:boolean=false;
  hayErrorUpdate:boolean=false;
  errorUpdate:string;
  initialValue:string;
  cambioForm:boolean=false;
  ngOnInit() {
    this.crearFormUserData();
  }
  crearFormUserData() {
    this.formUserData = new FormGroup({
      'name': new FormControl('', Validators.required),
      'surname': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")])
    });
    this.formUserData.patchValue(this.userService.currentUser);
    this.initialValue = this.formUserData.value;    
    this.formUserData.controls['email'].setAsyncValidators(this.existeUsuario.bind(this));
    this.formUserData.valueChanges.subscribe(currentValue=>{
      this.cambioForm = JSON.stringify(this.initialValue) != JSON.stringify(currentValue);      
      this.updateDataExitoso=false;
      this.hayErrorUpdate=false;
    })
  }
  updateUserData() {
    this.userService.actualizarDatosUsuario(this.formUserData.value)
      .subscribe(data=>{
        this.updateDataExitoso=true;
        this.userService.setCurrentUser(data.user);
        this.initialValue=this.formUserData.value;
        this.cambioForm=false;
      },error=>{
        console.log(error);
        this.hayErrorUpdate=true;
        this.errorUpdate="Ha ocurrido un error al actualizar sus datos";
      })
  }
  existeUsuario(control: FormControl) {
    let promiseUser = new Promise((resolve, reject) => {
      if(this.userService.currentUser.email==control.value){
        resolve(null);
      }else{
        this.userService.existeUsuarioConEmail(control.value).subscribe(data => {
          if (data.founded) {
            resolve({ existeUsuario: true })
          } else {
            resolve(null);
          }
        })
      }
    })
    return promiseUser;
  }
}
