import { Component, OnInit, Input } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-album-delete',
  templateUrl: './album-delete.component.html',
  styles: []
})
export class AlbumDeleteComponent implements OnInit {
  @Input() artista;
  albumToDelete:Album;
  constructor(private albumService:AlbumService) {
    albumService.albumToDelete.subscribe(album=>{
      this.albumToDelete=album;
    })
   }
   eliminarAlbum(){
     console.log(this.albumToDelete)
   }

  ngOnInit() {
  }

}
