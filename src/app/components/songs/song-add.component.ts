import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { SongService } from '../../services/song.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import 'jquery';
import 'bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from '../../models/album';
import { SocketService } from '../../services/socket.service';


@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styles: []
})
export class SongAddComponent implements OnInit {
  albumId:string;
  fileAudio:Array<File>;
  formNewSong:FormGroup;
  hayErrorCreate:boolean=false;
  hayAudio:boolean=false;
  loading:boolean=false;
  socket:any;
  constructor(private router:Router,
    private activatedRoute:ActivatedRoute,
    private uploadFileService:UploadService,
    private songService:SongService,
    private socketService:SocketService) { 
      this.crearFormNewSong();
      this.socket=socketService.socket;
      activatedRoute.params.subscribe(params=>{
        this.albumId=params['albumId'];
      })
    }

  seleccionarFile(fileInput:any){
    this.fileAudio=fileInput.target.files;
    if (this.fileAudio.length>0){
      let fileName=this.fileAudio[0].name.split("\.")[0];
      this.formNewSong.controls['name'].setValue(fileName);
      this.hayAudio=true;
    }else{
      this.hayAudio=false;
      this.formNewSong.reset();
    }
  }

  crearFormNewSong() {
    this.formNewSong = new FormGroup({
      'number': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required)
    });
    this.formNewSong.valueChanges.subscribe(data=>{
      this.hayErrorCreate=false;
    })
  }

  addSong(){
    let paramsNames:Array<string>=[];
    let paramsValues:Array<any>=[];
    
    paramsNames.push("name");
    paramsValues.push(this.formNewSong.controls['name'].value);
    paramsNames.push("number");
    paramsValues.push(this.formNewSong.controls['number'].value);
    paramsNames.push("albumId");
    paramsValues.push(this.albumId);
    this.loading=true;
    this.uploadFileService.makeFileUpload(this.fileAudio,this.songService.url,paramsNames,paramsValues)
      .then(response=>{
        this.loading=false;
        //Se emite mensaje para volver a obtener las canciones
        this.socket.emit('new-song');
      })
      .catch(error=>{
        console.log(error)
      });
  }

  ngOnInit() {
  }

}
