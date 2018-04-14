import { Component, OnInit, Input } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-album-delete',
  templateUrl: './album-delete.component.html',
  styles: []
})
export class AlbumDeleteComponent implements OnInit {
  @Input() artista;
  albumToDelete:Album;
  socket:any;
  constructor(private albumService:AlbumService,
    private socketService:SocketService) {
    this.socket=socketService.socket;
    albumService.albumToDelete.subscribe(album=>{
      this.albumToDelete=album;
    })
   }
   eliminarAlbum(){
     this.albumService.deleteAlbum(this.albumToDelete._id)
      .subscribe(data=>{
        this.socket.emit('albums-list-updated');
      },error=>{
        console.log(error);
      })
   }

  ngOnInit() {
  }

}
