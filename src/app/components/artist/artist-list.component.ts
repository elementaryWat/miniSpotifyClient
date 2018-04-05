import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styles: []
})
export class ArtistListComponent implements OnInit {
  artists:Artist[]=[];
  urlImage:string;
  constructor(private artistService:ArtistService) { 
    artistService.getArtists().subscribe(data=>{
      this.artists=data.artists;
      this.urlImage=artistService.getUrlImage();
      console.log(data);
    });
  }

  ngOnInit() {
  }

}
