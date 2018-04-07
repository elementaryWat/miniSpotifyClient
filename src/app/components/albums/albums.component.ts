import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styles: []
})
export class AlbumsComponent implements OnInit {
  albums:Album[]=[];
  urlImage:string;
  constructor(private activatedRoute:ActivatedRoute,
    private albumService:AlbumService) { 
    this.getUrlImage();
    activatedRoute.params.subscribe(params=>{
      albumService.getAlbums(params['artistId']).subscribe(data=>{
        this.albums=data.albums;
      });
    })
  }

  ngOnInit() {
  }
  getUrlImage(){
    this.urlImage=this.albumService.url+"/getAlbumImage/";
  }
}
