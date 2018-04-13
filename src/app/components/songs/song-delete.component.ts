import { Component, OnInit, Input } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song';

@Component({
  selector: 'app-song-delete',
  templateUrl: './song-delete.component.html',
  styles: []
})
export class SongDeleteComponent implements OnInit {
  @Input() album;
  songToDelete:Song;
  constructor(private songService:SongService) { 
    songService.songToDelete.subscribe(song=>{
      this.songToDelete=song;
    })
  }

  ngOnInit() {
  }
  
  deleteSong(){
    console.log("Se eliminara la cancion")
  }

}
