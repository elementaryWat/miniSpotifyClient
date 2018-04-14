import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { GLOBAL } from '../GLOBAL';
import { UserService } from './user.service';
import { Artist } from '../models/artist';
import { reject } from 'q';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as io from 'socket.io-client';


@Injectable()
export class ArtistService {
  url: string;
  photoUploadRoute: string = "/uploadArtistImage/";
  artistToDelete: BehaviorSubject<Artist>;
  socket:any;
  observableArtists:Observable<any>;
  constructor(private http: Http,
    private userService: UserService) {
    this.url = GLOBAL.url + "/artists";
    this.artistToDelete = new BehaviorSubject(null);
    this.observableArtists=new Observable<any>();
  }
  addArtist(artist: Artist) {
    var body = JSON.stringify(artist);
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.userService.currentToken
    });
    return this.http.post(this.url + "/", body, { headers })
      .map(res => {
        return res.json()
      })
  }
  getArtists(page: number) {
    this.socket = io(GLOBAL.socketUrl);                
    this.socket.emit('initial-list-artists');
    this.observableArtists = new Observable<any>(observer => {            
      this.socket.on('artists', () => {              
      
        var body = JSON.stringify({ sortBy: 'createdAt', order: 'desc' });
        var headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': this.userService.currentToken
        });
        this.http.post(this.url + "/list/" + page, body, { headers })
          .map(res => {
            return res.json();
          })
          .subscribe(data=>{
            observer.next(data);
          });
      })
      return () => {
        this.socket.disconnect();
      };  
    })
    return this.observableArtists;

  }
  getUrlImage() {
    return this.url + "/getArtistImage/";
  }
  getArtist(artistId: string) {
    var headers = new Headers({ 'Authorization': this.userService.currentToken });
    return this.http.get(this.url + "/artist/" + artistId, { headers })
      .map(res => {
        return res.json()
      })
  }
  existArtist(artistName: string) {
    var body = JSON.stringify({ artistName });
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.userService.currentToken
    });
    return this.http.post(this.url + "/exist", body, { headers })
      .map(res => {
        return res.json();
      });
  }

  updateDataArtist(update: any, artistId: string) {
    var body = JSON.stringify(update);
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.userService.currentToken
    });
    return this.http.put(this.url + "/" + artistId, body, { headers })
      .map(res => {
        return res.json()
      })
  }
  selectArtistToDelete(artist: Artist) {
    this.artistToDelete.next(artist);
  }
  deleteArtist(artistId: string) {
    var headers = new Headers({
      'Authorization': this.userService.currentToken
    });
    return this.http.delete(this.url + "/" + artistId, { headers })
      .map(res => {
        return res.json()
      })
  }
}
