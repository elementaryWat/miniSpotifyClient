import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-artist-add',
  templateUrl: './artist-add.component.html',
  styles: []
})
export class ArtistAddComponent implements OnInit {
  formNewArtist:FormGroup;
  createArtistExitoso:boolean=false;
  hayErrorCreate:boolean=false;
  errorCreate:string;
  constructor() { 
    this.crearFormNewArtist();
  }

  ngOnInit() {
  }
  crearFormNewArtist() {
    this.formNewArtist = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required)
    });
  }
  crearArtist(){
    console.log(this.formNewArtist);
  }
  
}
