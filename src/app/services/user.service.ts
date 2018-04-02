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
  currentUser:User;
  currentToken:string;
  estadoLogged:BehaviorSubject<boolean>;
  constructor(
    private http: Http
  ) {
    this.estadoLogged=new BehaviorSubject(false);
    this.url = GLOBAL.url;
  }
  register(userToRegister: User):Observable<any> {
    var body=JSON.stringify(userToRegister);
    var headers=new Headers({'Content-Type':'application/json'});
    return this.http.post(this.url + "/user/register",body,{headers})
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
    return this.http.post(this.url + "/user/login",body,{headers})
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
  existeUsuarioConEmail(email:string):Observable<any>{
    let body=JSON.stringify({email:email});
    var headers=new Headers({'Content-Type':'application/json'});
    
    return this.http.post(this.url+"/user/exist",body,{headers})
      .map(res=>{
        return res.json();
      })
  }

}
