import { Component, OnInit, Input } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-song-delete',
  templateUrl: './song-delete.component.html',
  styles: []
})
export class SongDeleteComponent implements OnInit {
  @Input() album;
  songToDelete:Song;
  socket:any;
  constructor(private songService:SongService,
    private socketService:SocketService) { 
    this.socket=socketService.socket;
    songService.songToDelete.subscribe(song=>{
      this.songToDelete=song;
    })
  }

  ngOnInit() {
  }
  
  deleteSong(){
    this.songService.deleteSong(this.songToDelete._id)
      .subscribe(data=>{
        this.socket.emit('songs-list-updated');
      },error=>{
        console.log(error);
      })
  }

}
