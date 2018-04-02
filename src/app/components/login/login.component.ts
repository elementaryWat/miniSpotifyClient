import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import {  Router} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  formRegistro: FormGroup;
  user:User;
  hayErrorLogin:boolean=false;
  errorMsg:string;
  constructor(private userService:UserService,
              private router:Router) {
    this.crearFormLogin();
    this.crearFormRegistro();
    userService.isLogged().subscribe(isLogged=>{
      if(isLogged){
        router.navigate(['/home']);
      }
    });
  }

  crearFormLogin() {
    this.formLogin = new FormGroup({
      'password': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")])
    });
    this.formLogin.valueChanges.subscribe(data=>{
      this.hayErrorLogin=false;
    })
  }
  crearFormRegistro() {
    this.user=new User('','','','','USER','default.png');
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
      'password': new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]),
      'confirmPassword': new FormControl('')
    });
    this.formRegistro.controls['email'].setAsyncValidators(this.existeUsuario.bind(this))    
    this.formRegistro.controls['confirmPassword'].setValidators([Validators.required, this.noIgual.bind(this.formRegistro)]);
  }
  login() {
    this.userService.signIn(this.formLogin.value,true)
    .subscribe(data=>{
      //console.log(data);
      this.formLogin.reset();
      if(data.user._id && data.token){
        this.userService.setCurrentUser(data.user)
        this.userService.setCurrentToken(data.token);
        this.userService.estadoLogged.next(true);
      }else{
        this.hayErrorLogin=true;
        this.errorMsg="Credenciales de acceso no validas";
      }
    },error=>{
      this.hayErrorLogin=true;
      this.errorMsg=JSON.parse(error._body).message;
    })
  }
  register() {
    this.user.name=this.formRegistro.value.name;
    this.user.surname=this.formRegistro.value.surname;
    this.user.email=this.formRegistro.value.email;
    this.user.password=this.formRegistro.value.password;
    this.userService.register(this.user).subscribe(data=>{
      //console.log(data);
      this.formRegistro.reset();
    });
  }
  noIgual(control: FormControl) {
    let formRegistro: any = this;
    if (control.value !== formRegistro.controls['password'].value) {
      return { noIgual: true }
    }
  }
  existeUsuario(control:FormControl){
    let promiseUser=new Promise((resolve,reject)=>{
      this.userService.existeUsuarioConEmail(control.value).subscribe(data=>{
        if(data.founded){
          resolve({existeUsuario:true})
        }else{
          resolve(null);
        }
      })
    })
    return promiseUser;
  }
  ngOnInit() {

  }

}
