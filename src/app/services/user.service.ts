import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { GLOBAL } from '../GLOBAL';
import { User } from '../models/user';


@Injectable()
export class UserService {
  url: string;
  photoUploadRoute:string;
  currentUser:User;
  currentToken:string;
  estadoLogged:BehaviorSubject<boolean>;
  constructor(
    private http: Http
  ) {
    this.estadoLogged=new BehaviorSubject(false);
    this.url = GLOBAL.url+"/user";
    this.photoUploadRoute="/uploadUserImage/";
  }
  register(userToRegister: User):Observable<any> {
    var body=JSON.stringify(userToRegister);
    var headers=new Headers({'Content-Type':'application/json'});
    return this.http.post(this.url + "/register",body,{headers})
      .map(res => {
        return res.json();
      })
  }
  signIn(userToLogin,gethash=null):Observable<any>{
    if(gethash){
      userToLogin.gethash=gethash;
    }
    var body=JSON.stringify(userToLogin);
    var headers=new Headers({'Content-Type':'application/json'});
    return this.http.post(this.url + "/login",body,{headers})
      .map(res => {
        return res.json();
      })
  }
  setCurrentUser(user:User){
    localStorage.setItem("user",JSON.stringify(user));
    this.currentUser=user;
  }
  getCurrentUser(){
    return this.currentUser;
  }
  setCurrentToken(token:string){
    localStorage.setItem("token",token);    
    this.currentToken=token;    
  }
  getCurrentToken(){
    return this.currentToken;
  }
  isLogged():BehaviorSubject<any>{
    let currentLoginU=localStorage.getItem("user");
    let currentLoginT=localStorage.getItem("token");
    if(this.currentUser){
      this.estadoLogged.next(true);
    }else{
      if(currentLoginU){
        this.currentUser=JSON.parse(currentLoginU);
        this.currentToken=currentLoginT;
        this.estadoLogged.next(true);        
      }else{
        this.estadoLogged.next(false);                
      }
    }
    return this.estadoLogged;
  }
  logOut(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUser=null;
    this.currentToken=null;
    this.estadoLogged.next(false);
  }
  getUrlImage(){
    return this.url+"/getImageFile/"+this.currentUser.image;
  }
  actualizarImagenUsuarioLocal(image:string){
    this.currentUser.image=image;
    localStorage.setItem("user",JSON.stringify(this.currentUser));
  }
  actualizarDatosUsuario(user:User){
    var body=JSON.stringify(user);
    var headers=new Headers({'Content-Type':'application/json',
      'Authorization':this.currentToken})
    return this.http.put(this.url+"/update/"+this.currentUser._id,body,{headers})
      .map(res=>{
        return res.json();
      })
  }
  passwordEqual(inputOldPassword:string,oldPassword:string){
    var body=JSON.stringify({oldPassword, inputOldPassword});
    var headers=new Headers({'Content-Type':'application/json',
      'Authorization':this.currentToken})
    return this.http.post(this.url+"/passwordEqual",body,{headers})
      .map(res=>{
        return res.json();
      })
  }
  actualizarPassword(newPassword:string){
    var body=JSON.stringify({password:newPassword});
    var headers=new Headers({'Content-Type':'application/json',
      'Authorization':this.currentToken})
    return this.http.put(this.url+"/updatePassword/"+this.currentUser._id,body,{headers})
      .map(res=>{
        return res.json();
      })
  }
  existeUsuarioConEmail(email:string):Observable<any>{
    let body=JSON.stringify({email:email});
    var headers=new Headers({'Content-Type':'application/json'});
    
    return this.http.post(this.url+"/exist",body,{headers})
      .map(res=>{
        return res.json();
      })
  }

}
