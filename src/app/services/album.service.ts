import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GLOBAL } from '../GLOBAL';
import { UserService } from './user.service';
import { Album } from '../models/album';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class AlbumService {
  url: string;
  socket:any;
  photoUploadRoute: string = "/uploadAlbumImage/";
  albumToDelete: BehaviorSubject<Album>;
  queryString: BehaviorSubject<string>;
  constructor(private http: Http,
    private userService: UserService) {
    this.url = GLOBAL.url + "/albums";
    this.albumToDelete = new BehaviorSubject(null);
    this.queryString = new BehaviorSubject("");
  }

  getAlbums(page: number, artistId: string) {
    this.socket = io(GLOBAL.socketUrl);                            
    this.socket.emit('initial-list-albums');
    let observable = new Observable<any>(observer => {
      this.socket.on('albums', () => {
        let urlGet = (artistId) ? (this.url + "/artist/" + artistId) : (this.url+ "/list/" + page);
        let headers = new Headers({ 'Authorization': this.userService.currentToken });
        return this.http.get(urlGet, { headers })
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
  getAlbumsForSearch() {
    this.socket = io(GLOBAL.socketUrl);                            
    this.socket.emit('initial-list-albums');
    let observable = new Observable<any>(observer => {
      this.socket.on('albums', () => {
        let headers = new Headers({ 'Authorization': this.userService.currentToken });
        return this.http.get(this.url+"/albumsForSearch", { headers })
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

  searchAlbums(albums:Album[],query:string){
    let resBusqueda:Album[]=[];
    let queryString=query.toLowerCase();
    for(let album of albums){
      let title=album.title.toLowerCase();
      if(title.indexOf(queryString)>=0){
        resBusqueda.push(album);
      }
    }
    return resBusqueda;
  }

  getUrlImage() {
    return this.url + "/getAlbumImage/";
  }

  getAlbum(albumId: string) {
    let headers = new Headers({ 'Authorization': this.userService.currentToken });
    return this.http.get(this.url + "/album/" + albumId, { headers })
      .map(res => {
        return res.json();
      })
  }

  addAlbum(album: Album) {
    let body = JSON.stringify(album);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.userService.currentToken
    });
    return this.http.post(this.url, body, { headers })
      .map(res => {
        return res.json();
      })
  }

  updateDataAlbum(update: any, albumId: string) {
    let body = JSON.stringify(update);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.userService.currentToken
    });
    return this.http.put(this.url + "/" + albumId, body, { headers })
      .map(res => {
        return res.json();
      })
  }

  selectAlbumToDelete(album: Album) {
    this.albumToDelete.next(album);
  }

  deleteAlbum(albumId: string) {
    let headers = new Headers({'Authorization': this.userService.currentToken});
    return this.http.delete(this.url + "/" + albumId, { headers })
      .map(res => {
        return res.json();
      })
  }
}
