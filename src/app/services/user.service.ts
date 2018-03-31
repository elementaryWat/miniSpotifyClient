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

}
