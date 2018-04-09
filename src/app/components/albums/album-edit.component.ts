import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styles: []
})
export class AlbumEditComponent implements OnInit {
  formUpdateAlbum:FormGroup;
  updateAlbumExitoso:boolean=false;
  hayErrorUpdate:boolean=false;
  errorUpdate:string;

  constructor(private activatedRoute:ActivatedRoute) { 
    this.crearFormUpdateAlbum();
    activatedRoute.params.subscribe(params=>{
      console.log(params['albumId']);
    })
  }

  crearFormUpdateAlbum() {
    this.formUpdateAlbum = new FormGroup({
      'title': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'year':new FormControl('',Validators.required)
    });
    this.formUpdateAlbum.valueChanges.subscribe(data=>{
      this.hayErrorUpdate=false;
    })
  }

  updateAlbum(){
    console.log(this.formUpdateAlbum)
  }

  ngOnInit() {
  }

}
