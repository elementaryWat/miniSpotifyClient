import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Artist } from '../../models/artist';
import { UploadService } from '../../services/upload.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styles: []
})
export class ArtistEditComponent implements OnInit {
  formUpdateArtist: FormGroup;
  imageArtist: Array<File>;
  initialValue: string;
  cambioForm: boolean = false;
  urlImage:string;
  hayImagen = false;
  currentArtist:Artist;
  artistId: string;
  updateArtistExitoso: boolean = false;
  hayErrorUpdate: boolean = false;
  errorUpdate: string;
  socket:any;
  constructor(private artistService: ArtistService,
    private fileUploadService:UploadService,
    private activatedRoute: ActivatedRoute,
    private socketService:SocketService) {
    this.crearFormUpdateArtist();
    activatedRoute.params.subscribe(params => {
      this.artistId = params['artistId'];
      artistService.getArtist(this.artistId).subscribe(data => {
        this.currentArtist=data.artist;
        this.getUrlImage();
        this.socket=socketService.socket;
        this.formUpdateArtist.patchValue(this.currentArtist);
        this.initialValue = this.formUpdateArtist.value;
        this.formUpdateArtist.valueChanges.subscribe(currentValue => {
          this.cambioForm = JSON.stringify(this.initialValue) != JSON.stringify(currentValue);
          this.hayErrorUpdate = false;
          this.updateArtistExitoso = false;
        })
      })
    })
  }
  getUrlImage(){
    this.urlImage=this.artistService.getUrlImage()+this.currentArtist.image;
  }
  crearFormUpdateArtist() {
    this.formUpdateArtist = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required)
    });
  }
  updateArtist() {
    if (this.hayImagen) {
      this.fileUploadService.makeFileUpload(this.imageArtist, 
        this.artistService.url+ this.artistService.photoUploadRoute + this.artistId)
        .then(result => {
          this.updateArtistExitoso=true;
          this.currentArtist.image=(<any>result).image;
          this.imageArtist=null;          
          this.hayImagen=false;
          this.getUrlImage();
          this.socket.emit('artists-list-updated');
        })
        .catch(error=>{
          console.log(error);
          this.hayErrorUpdate=true;
          this.errorUpdate="Ocurrio un error al actualizar la foto";
        })
    }
    if (this.cambioForm) {
      this.artistService.updateDataArtist(this.formUpdateArtist.value,this.artistId)
        .subscribe(data=>{
          this.updateArtistExitoso=true;
          this.initialValue=this.formUpdateArtist.value;
          this.cambioForm=false;
          this.socket.emit('artists-list-updated');          
        },error=>{
          console.log(error);
          this.hayErrorUpdate=true;
          this.errorUpdate="Ocurrio un error al actualizar los datos del artista";
        });
    }
  }
  selectImageArtist(fileInput: any) {
    this.imageArtist = <Array<File>>fileInput.target.files;
    this.hayImagen = this.imageArtist.length > 0;
    this.hayErrorUpdate = false;
    this.updateArtistExitoso = false;
  }

  ngOnInit() {
  }

}
