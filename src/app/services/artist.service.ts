import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { GLOBAL } from '../GLOBAL';
import { UserService } from './user.service';
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService {
  url: string;
  constructor(private http: Http,
    private userService:UserService) {
    this.url = GLOBAL.url + "/artists";
  }
  getArtists(page:number){
    var body=JSON.stringify({sortBy:'createdAt',order:'asc'});
    var headers=new Headers({'Content-Type':'application/json',
    'Authorization':this.userService.currentToken});
    return this.http.post(this.url+"/list/"+page,body,{headers})
      .map(res=>{
        return res.json();
      });
  }
  getUrlImage(){
    return this.url+"/getArtistImage/";
  }
  addArtist(artist:Artist){
    var body=JSON.stringify(artist);
    var headers=new Headers({'Content-Type':'application/json',
    'Authorization':this.userService.currentToken});
    return this.http.post(this.url+"/create",body,{headers})
      .map(res=>{
        return res.json()
      })
  }
}
