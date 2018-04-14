import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { Router } from '@angular/router';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-artist-add',
  templateUrl: './artist-add.component.html',
  styles: []
})
export class ArtistAddComponent implements OnInit {
  formNewArtist:FormGroup;
  hayErrorCreate:boolean=false;
  errorCreate:string;
  socket:any;
  constructor(private artistService:ArtistService,
    private router:Router,
    private socketService:SocketService) { 
    this.crearFormNewArtist();
    this.socket=socketService.socket;
  }

  ngOnInit() {
  }
  crearFormNewArtist() {
    this.formNewArtist = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'image':new FormControl('default.png')
    });
    this.formNewArtist.controls['name'].setAsyncValidators(this.existeArtista.bind(this));
    this.formNewArtist.valueChanges.subscribe(data=>{
      this.hayErrorCreate=false;
    })
  }
  crearArtist(){
    this.artistService.addArtist(this.formNewArtist.value)
      .subscribe(data=>{
        console.log(data);
        this.router.navigate(['/artists']);
        this.socket.emit('artists-list-updated');
      },error=>{
        console.log(error);
        this.hayErrorCreate=true;
        this.errorCreate="Ha ocurrido un error al crear el usuario";
      })
  }
  existeArtista(control:FormControl){
    let promiseUser=new Promise((resolve,reject)=>{
      this.artistService.existArtist(control.value).subscribe(data=>{
        if(data.founded){
          resolve({existeArtista:true})
        }else{
          resolve(null);
        }
      })
    })
    return promiseUser;
  }
  
}
