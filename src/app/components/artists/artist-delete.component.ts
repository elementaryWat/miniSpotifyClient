import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-artist-delete',
  templateUrl: './artist-delete.component.html',
  styles: []
})
export class ArtistDeleteComponent implements OnInit {
  artistToDelete:Artist;
  constructor(private artistService:ArtistService) { 
    this.artistService.artistToDelete.subscribe(artist=>{
      this.artistToDelete=artist;
    })
  }

  ngOnInit() {
  }
  eliminarArtista(){
    console.log(this.artistToDelete)
    /* this.artistService.deleteArtist(this.artistToDelete._id).subscribe(data=>{
      console.log(data);
    }) */
  }

}
