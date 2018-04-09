import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Album } from '../../models/album';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../../services/album.service';

@Component({
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
  styles: []
})
export class AlbumAddComponent implements OnInit {
  formNewAlbum:FormGroup;
  artistId:string;
  hayErrorCreate:boolean=false;
  errorCreate:string;
  albumToAdd:Album;
  constructor(private router:Router,
    private activatedRoute:ActivatedRoute,
    private albumService:AlbumService) {
    this.crearFormNewAlbum();
    this.albumToAdd=new Album('','',2000,'default.png','');
    activatedRoute.params.subscribe(params=>{
      this.artistId=params['artistId'];
    })
   }
  ngOnInit() {
  }
  crearFormNewAlbum() {
    this.formNewAlbum = new FormGroup({
      'title': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'year':new FormControl('',Validators.required)
    });

    this.formNewAlbum.valueChanges.subscribe(data=>{
      this.hayErrorCreate=false;
    })
  }

  crearAlbum(){
    this.albumToAdd.title=this.formNewAlbum.controls['title'].value;
    this.albumToAdd.description=this.formNewAlbum.controls['description'].value;
    this.albumToAdd.year=this.formNewAlbum.controls['year'].value;
    this.albumToAdd.artist=this.artistId;
    this.albumService.addAlbum(this.albumToAdd).subscribe(data=>{
      this.router.navigate(['/artists/artist/',this.artistId]);
    },error=>{
      console.log(error);
      this.hayErrorCreate=true;
      this.errorCreate="Ocurrio un error al intentar crear el album";
    });
  }
}
