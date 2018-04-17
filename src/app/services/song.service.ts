import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GLOBAL } from '../GLOBAL';
import { UserService } from './user.service';
import { Song } from '../models/song';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as io from 'socket.io-client';


@Injectable()
export class SongService {
  url: string;
  socket: any;
  photoUploadRoute: string = "/uploadArtistImage/";
  songToEdit: BehaviorSubject<string>;
  songToDelete: BehaviorSubject<Song>;
  queryString: BehaviorSubject<string>;
  cantResults: BehaviorSubject<number>;
  constructor(private http: Http,
    private userService: UserService) {
    this.url = GLOBAL.url + "/songs";
    this.songToEdit=new BehaviorSubject("");
    this.songToDelete=new BehaviorSubject(null);
    this.queryString = new BehaviorSubject("");    
    this.cantResults = new BehaviorSubject(0);    
  }

  getSongs(albumId: string) {
    this.socket.emit('initial-list-songs');
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
      return () => {
        this.socket.disconnect();
      };  
    })
    return observable;
  }
  getSongsForSearch() {
    this.socket = io(GLOBAL.socketUrl);                            
    this.socket.emit('initial-list-songs');
    let observable = new Observable<any>(observer => {
      this.socket.on('songs', () => {
        let headers = new Headers({ 'Authorization': this.userService.currentToken });
        return this.http.get(this.url+"/songsForSearch", { headers })
          .map(res => {
            return res.json();
          }).subscribe(data => {
            observer.next(data);
          })
      })
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  getCountSongs(albumId: string) {
    this.socket = io(GLOBAL.socketUrl);                        
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

  searchSongs(songs:Song[],query:string){
    let resBusqueda:Song[]=[];
    let queryString=query.toLowerCase();
    for(let song of songs){
      let name=song.name.toLowerCase();
      if(name.indexOf(queryString)>=0){
        resBusqueda.push(song);
      }
    }
    this.cantResults.next(resBusqueda.length);
    
    return resBusqueda;
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

  deleteSong(songId:string){
    let headers = new Headers({ 'Authorization': this.userService.currentToken });
    return this.http.delete(this.url + "/" + songId, { headers })
      .map(res => {
        return res.json();
      })
  }

}
