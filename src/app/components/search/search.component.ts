import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { AlbumService } from '../../services/album.service';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  formSearch:FormGroup;
  emptyQuery:boolean=true;  
  cantResultsArtists:number;
  cantResultsAlbums:number;
  cantResultsSongs:number;
  constructor(private artistService:ArtistService,
    private albumService:AlbumService,
    private songService:SongService) { 
    this.crearFormSearch();
    artistService.cantResults.subscribe(cant=>{
      this.cantResultsArtists=cant;
    })
    albumService.cantResults.subscribe(cant=>{
      this.cantResultsAlbums=cant;
    })
    songService.cantResults.subscribe(cant=>{
      this.cantResultsSongs=cant;
    })
  }
  
  ngOnInit() {
  }

  crearFormSearch(){
    this.formSearch=new FormGroup({
      'query':new FormControl('')
    });
    this.formSearch.controls['query'].valueChanges.subscribe(query=>{
      if(query!=""){
        this.emptyQuery=false;
        this.artistService.queryString.next(query);        
        this.albumService.queryString.next(query);        
        this.songService.queryString.next(query);        
      }else{
        this.emptyQuery=true;
      }
    })
  }
}
