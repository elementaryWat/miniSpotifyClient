import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GLOBAL } from '../GLOBAL';
import { UserService } from './user.service';
import { Song } from '../models/song';

@Injectable()
export class SongService {
  url:string;
  photoUploadRoute:string="/uploadArtistImage/";  
  constructor(private http:Http,
    private userService:UserService) {
    this.url=GLOBAL.url+"/songs";    
   }

  getSongs(albumId:string){
    let headers=new Headers({'Authorization':this.userService.currentToken});
    return this.http.get(this.url+"/album/"+albumId,{headers})
      .map(res=>{
        return res.json();
      })
  }

  addSong(song:Song){
    let body=JSON.stringify(song);
    let headers=new Headers({'Content-Type':'application/json'
      ,'Authorization':this.userService.currentToken});  
    return this.http.post(this.url,body,{headers})
      .map(res=>{
        return res.json();
      })
  }

}
