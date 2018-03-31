import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../GLOBAL';
import { User } from '../models/user';


@Injectable()
export class UserService {
  url: string;
  constructor(
    private http: Http
  ) {
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
  signIn(userToLogin,gethash=null){
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
  existeUsuarioConEmail(email:string):Observable<any>{
    let body=JSON.stringify({email:email});
    var headers=new Headers({'Content-Type':'application/json'});
    
    return this.http.post(this.url+"/user/exist",body,{headers})
      .map(res=>{
        return res.json();
      })
  }

}
