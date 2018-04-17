import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song';
import { Album } from '../../models/album';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  urlImageAlbum:string;
  urlAudioSong:string;
  currentSong:Song;
  @ViewChild('player') player: ElementRef;
  constructor(private albumService:AlbumService,
    private songService:SongService) {
    }

  ngOnInit() {
    this.songService.songPlaying.subscribe(song=>{
      this.currentSong=song;
      
      this.urlImageAlbum=this.albumService.getUrlImage()+(<any>this.currentSong.album).image;
      this.urlAudioSong=this.songService.getUrlSong()+this.currentSong.file;

      (this.player.nativeElement as any).load();
      (this.player.nativeElement as any).play();
    })
  }

}
