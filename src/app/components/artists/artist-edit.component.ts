import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styles: []
})
export class ArtistEditComponent implements OnInit {
  formUpdateArtist: FormGroup;
  imageArtist: Array<File>;
  currentArtist:Artist;
  initialValue: string;
  cambioForm: boolean = false;
  urlImage:string;
  hayImagen = false;
  artistId: string;
  updateArtistExitoso: boolean = false;
  hayErrorUpdate: boolean = false;
  errorUpdate: string;
  constructor(private artistService: ArtistService,
    private activatedRoute: ActivatedRoute) {
    this.crearFormUpdateArtist();
    activatedRoute.params.subscribe(params => {
      this.artistId = params['artistId'];
      console.log(this.urlImage);
      artistService.getArtist(this.artistId).subscribe(data => {
        this.currentArtist=data.artist;
        this.getUrlImage();
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
      this.artistService.updateFotoArtistRemoto(this.imageArtist, this.artistId)
        .then(result => {
          console.log(result);
          this.updateArtistExitoso=true;
          this.getUrlImage();
        })
    }
    if (this.cambioForm) {
      console.log("Se actualizaran los datos");
    }
  }
  subirImageArtist(fileInput: any) {
    this.imageArtist = <Array<File>>fileInput.target.files;
    this.hayImagen = this.imageArtist.length > 0;
    this.hayErrorUpdate = false;
    this.updateArtistExitoso = false;
  }

  ngOnInit() {
  }

}
