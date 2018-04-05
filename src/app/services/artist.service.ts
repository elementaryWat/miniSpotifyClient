import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { GLOBAL } from '../GLOBAL';
import { UserService } from './user.service';

@Injectable()
export class ArtistService {
  url: string;
  constructor(private http: Http,
    private userService:UserService) {
    this.url = GLOBAL.url + "/artists";
  }
  getArtists(){
    var headers=new Headers({'Authorization':this.userService.currentToken});
    return this.http.get(this.url+"/list",{headers})
      .map(res=>{
        return res.json();
      });
  }
  getUrlImage(){
    return this.url+"/getArtistImage/";
  }
}
