import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { SongService } from './services/song.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MEANSIFY';
  playingSong:boolean;
  logged:boolean;
  constructor(private router:Router,
    private userService:UserService,
    private songService:SongService){
    userService.isLogged().subscribe(isLogged=>{
      this.logged=isLogged;
      if(!isLogged){
        router.navigate(['/login']);
      }
      songService.songPlaying.subscribe(song=>{
        if(song){
          this.playingSong=true;
          console.log(this.playingSong);
          
        }
      })
    })
  }
}
