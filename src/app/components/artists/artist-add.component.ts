import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { Router } from '@angular/router';

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
  constructor(private artistService:ArtistService,
    private router:Router) { 
    this.crearFormNewArtist();
  }

  ngOnInit() {
  }
  crearFormNewArtist() {
    this.formNewArtist = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'image':new FormControl('default.png')
    });
  }
  crearArtist(){
    this.artistService.addArtist(this.formNewArtist.value)
      .subscribe(data=>{
        console.log(data);
        this.router.navigate(['/artists']);
      })
  }
  
}
