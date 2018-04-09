import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GLOBAL } from '../GLOBAL';
import { UserService } from './user.service';
import { Album } from '../models/album';

@Injectable()
export class AlbumService {
  url:string;
  constructor(private http:Http,
    private userService:UserService) { 
    this.url=GLOBAL.url+"/albums";
  }

  getAlbums(artistId?:string){
    let urlGet=(artistId)?(this.url+"/artist/"+artistId):this.url;
    let headers=new Headers({'Authorization':this.userService.currentToken});
    return this.http.get(urlGet,{headers})
      .map(res=>{
        return res.json();
      })
  }

  addAlbum(album:Album){
    let body=JSON.stringify(album);
    let headers=new Headers({'Content-Type':'application/json' ,
      'Authorization':this.userService.currentToken});
    return this.http.post(this.url,body,{headers})
      .map(res=>{
        return res.json();
      })
  }

}
