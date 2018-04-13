import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GLOBAL } from '../GLOBAL';
import { UserService } from './user.service';
import { Album } from '../models/album';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AlbumService {
  url:string;
  photoUploadRoute:string="/uploadAlbumImage/";
  albumToDelete:BehaviorSubject<Album>;
  constructor(private http:Http,
    private userService:UserService) { 
    this.url=GLOBAL.url+"/albums";
    this.albumToDelete=new BehaviorSubject(null);
  }

  getAlbums(artistId?:string){
    let urlGet=(artistId)?(this.url+"/artist/"+artistId):this.url;
    let headers=new Headers({'Authorization':this.userService.currentToken});
    return this.http.get(urlGet,{headers})
      .map(res=>{
        return res.json();
      })
  }

  getUrlImage(){
    return this.url+"/getAlbumImage/";
  }

  getAlbum(albumId:string){
    let headers=new Headers({'Authorization':this.userService.currentToken});
    return this.http.get(this.url+"/album/"+albumId,{headers})
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

  updateDataAlbum(update:any, albumId:string){
    let body=JSON.stringify(update);
    let headers=new Headers({'Content-Type':'application/json' ,
      'Authorization':this.userService.currentToken});
    return this.http.put(this.url+"/"+albumId,body,{headers})
      .map(res=>{
        return res.json();
      })
  }

  selectAlbumToDelete(album:Album){
    this.albumToDelete.next(album);
  }

}
