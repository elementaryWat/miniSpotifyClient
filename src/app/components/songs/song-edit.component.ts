import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Song } from '../../models/song';
import { SongService } from '../../services/song.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styles: []
})
export class SongEditComponent implements OnInit {
  formEditSong:FormGroup;
  loading:boolean=false;
  currentSong:Song;
  updateSongExitoso:boolean=false;
  hayErrorUpdate:boolean=false;
  errorUpdate:string;
  constructor(private songService:SongService) { 
    this.crearFormUpdateArtist();
    songService.songToEdit.subscribe(songId=>{
      if(songId!=""){
        songService.getSong(songId).subscribe(data=>{
          this.currentSong=data.song;
          this.formEditSong.controls['name'].setValue(this.currentSong.name);
        })
      }
    })
  }

  ngOnInit() {
  }

  crearFormUpdateArtist() {
    this.formEditSong = new FormGroup({
      'name': new FormControl('', Validators.required)
    });
    this.formEditSong.valueChanges.subscribe(currentValue=>{
      this.updateSongExitoso=false;
      this.hayErrorUpdate=false;
    })
  }

  editSong(){
    this.loading=true;
    this.songService.updateDataSong(this.formEditSong.value ,this.currentSong._id)
      .subscribe(data=>{
        this.loading=false;
        this.songService.socket.emit('song-list-updated');
        this.updateSongExitoso=true;
      },error=>{
        this.loading=false;        
        this.hayErrorUpdate=true;
        console.log(error);
        this.errorUpdate="Ha ocurrido un error al actualizar el nombre de la cancion";
      });
  }

}
