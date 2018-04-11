import { Component, OnInit } from '@angular/core';
import { Album } from '../../models/album';
import { AlbumService } from '../../services/album.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styles: []
})
export class AlbumComponent implements OnInit {
  currentAlbum:Album;
  albumId:string;
  urlImage:string;
  constructor(private albumService:AlbumService,
    private activatedRoute:ActivatedRoute) { 
      activatedRoute.params.subscribe(params=>{
        this.albumId=params['albumId'];
        albumService.getAlbum(this.albumId).subscribe(data=>{
          this.currentAlbum=data.album;
          this.getUrlImage();
        })
      })
  }

  getUrlImage(){
    this.urlImage=this.albumService.getUrlImage()+this.currentAlbum.image;
  }

  ngOnInit() {
  }

}
