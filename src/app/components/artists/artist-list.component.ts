import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styles: []
})
export class ArtistListComponent implements OnInit {
  artists:Artist[]=[];
  urlImage:string;
  paginaActual:number=1;
  numeroPaginas:number;
  constructor(private artistService:ArtistService,
    private activatedRoute:ActivatedRoute) { 
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      if(params['numPage']!=undefined)
      {
        this.paginaActual=parseInt(params['numPage']);
      }
      this.artistService.getArtists(this.paginaActual).subscribe(data=>{
        this.artists=data.artists;
        this.urlImage=this.artistService.getUrlImage();
        this.numeroPaginas=data.pages;
      });
    })
  }

}
