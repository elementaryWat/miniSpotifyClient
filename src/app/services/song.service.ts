import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GLOBAL } from '../GLOBAL';
import { UserService } from './user.service';
import { Song } from '../models/song';
import { Observable } from "rxjs/Observable";
import { SocketService } from './socket.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Injectable()
export class SongService {
  url: string;
  socket: any;
  photoUploadRoute: string = "/uploadArtistImage/";
  songToEdit: BehaviorSubject<string>;
  songToDelete: BehaviorSubject<Song>;
  constructor(private http: Http,
    private userService: UserService,
    private socketService: SocketService) {
    this.url = GLOBAL.url + "/songs";
    this.socket = socketService.socket;
    this.songToEdit=new BehaviorSubject("");
    this.songToDelete=new BehaviorSubject(null);
  }

  getSongs(albumId: string) {
    let observable = new Observable<any>(observer => {
      this.socket.on('songs', () => {
        let headers = new Headers({ 'Authorization': this.userService.currentToken });
        this.http.get(this.url + "/album/" + albumId, { headers })
          .map(res => {
            return res.json();
          }).subscribe(data => {
            observer.next(data);
          })
      })
    })
    return observable;
  }
  getCountSongs(albumId: string) {
    let observable = new Observable<any>(observer => {
      this.socket.on('songs', () => {
        let headers = new Headers({ 'Authorization': this.userService.currentToken });
        this.http.get(this.url + "/contSongsAlbum/" + albumId, { headers })
          .map(res => {
            return res.json();
          }).subscribe(data => {
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
  selectSongToEdit(songId: string) {
    this.songToEdit.next(songId);
  }
  selectSongToDelete(song: Song) {
    this.songToDelete.next(song);
  }

  getSong(songId) {
    let headers = new Headers({ 'Authorization': this.userService.currentToken });
    return this.http.get(this.url + "/song/" + songId, { headers })
      .map(res => {
        return res.json();
      })
  }

  updateDataSong(update:any,songId){
    let body=JSON.stringify(update);
    let headers = new Headers({ 'Content-Type': 'application/json',
    'Authorization': this.userService.currentToken });
    return this.http.put(this.url + "/" + songId, body, { headers })
      .map(res => {
        return res.json();
      })
  }

}
