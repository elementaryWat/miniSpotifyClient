import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styles: []
})
export class AlbumEditComponent implements OnInit {
  formUpdateAlbum:FormGroup;
  updateAlbumExitoso:boolean=false;
  cambioForm:boolean=false;
  hayErrorUpdate:boolean=false;
  errorUpdate:string;
  hayImagen:boolean=false;
  imageAlbum:Array<File>;
  albumId:string;
  currentAlbum:Album;
  urlImage:string;
  initialValue:string;
  socket:any;
  constructor(private activatedRoute:ActivatedRoute,
    private fileUploadService:UploadService,
    private albumService:AlbumService,
    private socketService:SocketService) { 
    this.crearFormUpdateAlbum();
    this.socket=socketService.socket;
    activatedRoute.params.subscribe(params=>{
      this.albumId=params['albumId'];
      albumService.getAlbum(this.albumId).subscribe(data=>{
        this.currentAlbum=data.album;
        this.getUrlImage();
        this.formUpdateAlbum.patchValue(this.currentAlbum);
        this.initialValue=this.formUpdateAlbum.value;
        this.formUpdateAlbum.valueChanges.subscribe(currentValue=>{
          this.cambioForm = JSON.stringify(this.initialValue) != JSON.stringify(currentValue);
          this.hayErrorUpdate=false;
          this.updateAlbumExitoso=false;
        })
      })
    })
  }

  crearFormUpdateAlbum() {
    this.formUpdateAlbum = new FormGroup({
      'title': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'year':new FormControl('',Validators.required)
    });
    
  }

  updateAlbum() {
    if (this.hayImagen) {
      this.fileUploadService.makeFileUpload(this.imageAlbum, 
        this.albumService.url+ this.albumService.photoUploadRoute + this.albumId)
        .then(result => {
          this.updateAlbumExitoso=true;
          this.currentAlbum.image=(<any>result).image;
          this.imageAlbum=null;          
          this.hayImagen=false;          
          this.getUrlImage();
          this.socket.emit('albums-list-updated');
        })
        .catch(error=>{
          console.log(error);
          this.hayErrorUpdate=true;
          this.errorUpdate="Ocurrio un error al actualizar la foto";
        })
    }
    if (this.cambioForm) {
      this.albumService.updateDataAlbum(this.formUpdateAlbum.value,this.albumId)
        .subscribe(data=>{
          this.updateAlbumExitoso=true;
          this.initialValue=this.formUpdateAlbum.value;
          this.cambioForm=false;
          this.socket.emit('albums-list-updated');          
        },error=>{
          console.log(error);
          this.hayErrorUpdate=true;
          this.errorUpdate="Ocurrio un error al actualizar los datos del album";
        });
    }
  }
  getUrlImage(){
    this.urlImage=this.albumService.getUrlImage()+this.currentAlbum.image;
  }
  selectImageAlbum(fileInput: any) {
    this.imageAlbum = <Array<File>>fileInput.target.files;
    this.hayImagen = this.imageAlbum.length > 0;
    this.hayErrorUpdate = false;
    this.updateAlbumExitoso = false;
  }
  ngOnInit() {
  }

}
