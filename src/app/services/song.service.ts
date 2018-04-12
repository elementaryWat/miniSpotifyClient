import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GLOBAL } from '../GLOBAL';
import { UserService } from './user.service';
import { Song } from '../models/song';
import { Observable } from "rxjs/Observable";
import { SocketService } from './socket.service';



@Injectable()
export class SongService {
  url: string;
  socket: any;
  photoUploadRoute: string = "/uploadArtistImage/";
  constructor(private http: Http,
    private userService: UserService,
    private socketService:SocketService) {
    this.url = GLOBAL.url + "/songs";
    this.socket=socketService.socket;
  }

  getSongs(albumId: string) {
    let observable = new Observable<any>(observer => {
      this.socket.on('song', () => {
        let headers = new Headers({ 'Authorization': this.userService.currentToken });
        this.http.get(this.url + "/album/" + albumId, { headers })
          .map(res => {
            return res.json();
          }).subscribe(data=>{
            observer.next(data);
          })
      })
    })
    return observable;
  }

  addSong(song: Song) {
    let body = JSON.stringify(song);
    let headers = new Headers({
      'Content-Type': 'application/json'
      , 'Authorization': this.userService.currentToken
    });
    return this.http.post(this.url, body, { headers })
      .map(res => {
        return res.json();
      })
  }

}
