import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: []
})
export class ArtistComponent implements OnInit {
  artistId:string;
  currentArtist:Artist;
  urlImage:string;
  constructor(private activatedRoute:ActivatedRoute,
    private artistService:ArtistService) { 
    activatedRoute.params.subscribe(params=>{
      this.artistId=params['artistId'];
      artistService.getArtist(this.artistId).subscribe(data=>{
        this.currentArtist=data.artist;
        this.getUrlImage();
      })
    })
  }

  ngOnInit() {
  }

  getUrlImage(){
    this.urlImage= this.artistService.getUrlImage()+this.currentArtist.image;
  }
}
