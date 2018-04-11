import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../../models/song';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styles: []
})
export class SongListComponent implements OnInit {
  albumId:string;
  songs:Song[];
  constructor(private songService:SongService,
    private activatedRoute:ActivatedRoute) { 
    activatedRoute.params.subscribe(params=>{
      this.albumId=params['albumId'];
      songService.getSongs(this.albumId).subscribe(data=>{
        this.songs=data.songs;
      })
    })
  }

  ngOnInit() {
  }

}
