import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { GLOBAL } from '../GLOBAL';
import { UserService } from './user.service';
import { Artist } from '../models/artist';
import { reject } from 'q';

@Injectable()
export class ArtistService {
  url: string;
  constructor(private http: Http,
    private userService: UserService) {
    this.url = GLOBAL.url + "/artists";
  }
  getArtists(page: number) {
    var body = JSON.stringify({ sortBy: 'createdAt', order: 'asc' });
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.userService.currentToken
    });
    return this.http.post(this.url + "/list/" + page, body, { headers })
      .map(res => {
        return res.json();
      });
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
  updateFotoArtistRemoto(files: Array<File>,artistId:string) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      var formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('avatar', files[i]);
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST',this.url+"/uploadArtistImage/"+artistId,true);
      xhr.setRequestHeader('Authorization',this.userService.currentToken);
      xhr.send(formData);
    });
  }
  updateDataArtist(update:any,artistId:string){
    var body = JSON.stringify(update);
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.userService.currentToken
    });
    return this.http.post(this.url + "/update/"+artistId, body, { headers })
      .map(res => {
        return res.json()
      })
  }
  addArtist(artist: Artist) {
    var body = JSON.stringify(artist);
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.userService.currentToken
    });
    return this.http.post(this.url + "/create", body, { headers })
      .map(res => {
        return res.json()
      })
  }
}
