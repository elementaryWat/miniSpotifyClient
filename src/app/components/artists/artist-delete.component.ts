import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-artist-delete',
  templateUrl: './artist-delete.component.html',
  styles: []
})
export class ArtistDeleteComponent implements OnInit {
  artistToDelete:Artist;
  socket:any;
  constructor(private artistService:ArtistService,
    private socketService:SocketService) { 
    this.socket=socketService.socket;
    this.artistService.artistToDelete.subscribe(artist=>{
      this.artistToDelete=artist;
    })
  }

  ngOnInit() {
  }
  eliminarArtista(){
    this.artistService.deleteArtist(this.artistToDelete._id).subscribe(data=>{
      this.socket.emit('artists-list-updated');
    })
  }

}
