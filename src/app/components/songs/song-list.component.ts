import { Component, OnInit,Input } from '@angular/core';
import { SongService } from '../../services/song.service';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../../models/song';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styles: []
})
export class SongListComponent implements OnInit {
  @Input() album;
  albumId:string;
  songs:Song[]=[];
  songHoverSelected:string="";
  socket:any;
  subscriptionSongs:Subscription;
  constructor(private songService:SongService,
    private activatedRoute:ActivatedRoute) {
      //Para empezar a recibir las canciones      
      activatedRoute.params.subscribe(params=>{
      this.albumId=params['albumId'];
      this.subscriptionSongs= songService.getSongs(this.albumId).subscribe(data=>{
        this.songs=(data.songs.length>0)?data.songs:[];
      },error=>{
        console.log(error)
      })
    })
  }
  mostrarBotonPlay(songId:string){
    this.songHoverSelected=songId;
  }
  ocultarBotonPlay(){
    this.songHoverSelected="";
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptionSongs.unsubscribe();
  }
}
