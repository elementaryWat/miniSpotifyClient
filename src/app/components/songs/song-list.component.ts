import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../../models/song';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styles: []
})
export class SongListComponent implements OnInit {
  albumId:string;
  songs:Song[]=[];
  songSelected:string="";
  socket:any;
  constructor(private songService:SongService,
    private activatedRoute:ActivatedRoute,
    private socketService:SocketService) { 
      this.socket=socketService.socket;
      //Para empezar a recibir las canciones 
      this.socket.emit('initial-list-songs');      
    activatedRoute.params.subscribe(params=>{
      this.albumId=params['albumId'];
      songService.getSongs(this.albumId).subscribe(data=>{
        this.songs=(data.songs.length>0)?data.songs:[];
      },error=>{
        console.log(error)
      })
    })
  }
  mostrarBotonPlay(songId:string){
    this.songSelected=songId;
  }
  ocultarBotonPlay(){
    this.songSelected="";
  }

  ngOnInit() {
  }

}
