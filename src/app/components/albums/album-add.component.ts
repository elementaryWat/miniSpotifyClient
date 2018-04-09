import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
  styles: []
})
export class AlbumAddComponent implements OnInit {
  formNewAlbum:FormGroup;
  hayErrorCreate:boolean=false;
  createAlbumExitoso:boolean=false;
  errorCreate:string;
  constructor() {
    this.crearFormNewAlbum();
   }
  ngOnInit() {
  }
  crearFormNewAlbum() {
    this.formNewAlbum = new FormGroup({
      'title': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'year':new FormControl('')
    });
    this.formNewAlbum.valueChanges.subscribe(data=>{
      this.createAlbumExitoso=false;
      this.hayErrorCreate=false;
    })
  }

}
