import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styles: []
})
export class AlbumListComponent implements OnInit {
  @Input() artista:Artist;
  artistId:string;
  albums:Album[]=[];
  urlImageAlbum:string;
  urlImageArtist:string;
  albumToDelete:Album;
  
  constructor(private activatedRoute:ActivatedRoute,
    private albumService:AlbumService,
    private artistService:ArtistService) { 
    this.getUrlImageAlbum();
    activatedRoute.params.subscribe(params=>{
      this.artistId=params['artistId'];
      this.getUrlImageArtist();
      albumService.getAlbums(this.artistId).subscribe(data=>{
        this.albums=data.albums;
      });
    })
  }

  ngOnInit() {
  }

  getUrlImageAlbum(){
    this.urlImageAlbum=this.albumService.url+"/getAlbumImage/";
  }

  getUrlImageArtist(){
    this.urlImageArtist=this.artistService.url+"/getArtistImage/";
  }

  selectAlbumToDelete(album:Album){
    this.albumService.selectAlbumToDelete(album);
  }
}
