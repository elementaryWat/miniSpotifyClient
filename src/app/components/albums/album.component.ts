import { Component, OnInit } from '@angular/core';
import { Album } from '../../models/album';
import { AlbumService } from '../../services/album.service';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../../services/song.service';
import { UserService } from '../../services/user.service';
import { Song } from '../../models/song';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styles: []
})
export class AlbumComponent implements OnInit {
  currentAlbum:Album;
  albumId:string;
  urlImage:string;
  cantSongs:number;
  songsAlbum:Song[]=[];
  songsSubscription:Subscription;
  songsCountSubscription:Subscription;
  duration:number;
  constructor(private userService:UserService,
    private albumService:AlbumService,
    private songService:SongService,
    private activatedRoute:ActivatedRoute) { 
      activatedRoute.params.subscribe(params=>{
        this.albumId=params['albumId'];
        this.songsCountSubscription= songService.getCountSongs(this.albumId).subscribe(data=>{
          this.cantSongs=data.count;
        })
        this.songsSubscription= songService.getSongs(this.albumId).subscribe(data=>{
          this.songsAlbum=data.songs;
          this.duration=0;
          for(let song of this.songsAlbum){
            this.duration+=song.duration;
          }
        })
        albumService.getAlbum(this.albumId).subscribe(data=>{
          this.currentAlbum=data.album;
          this.getUrlImage();
        })
      })
  }

  getUrlImage(){
    this.urlImage=this.albumService.getUrlImage()+this.currentAlbum.image;
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.songsCountSubscription.unsubscribe();
    this.songsSubscription.unsubscribe();
  }

}
