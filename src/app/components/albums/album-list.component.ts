import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../services/user.service';

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
  paginaActual:number=1;
  numeroPaginas:number;
  subscriptionAlbums:Subscription;  
  constructor(private router:Router,
    private activatedRoute:ActivatedRoute,
    private userService:UserService,
    private albumService:AlbumService,
    private artistService:ArtistService) { 
    this.getUrlImageAlbum();
    activatedRoute.params.subscribe(params=>{
      this.artistId=params['artistId'];
      if (this.subscriptionAlbums){
        this.subscriptionAlbums.unsubscribe();
      }    
      if (this.artistId){
        this.subscriptionAlbums= this.albumService.getAlbums(null,this.artistId).subscribe(data=>{  
          this.albums=data.albums;
        });
      }else{
        if(params['numPage']!=undefined)
        {
          this.paginaActual=parseInt(params['numPage']);
        }
        this.getUrlImageArtist();
        if(this.paginaActual<1){
          this.router.navigate(['/albums/page',1]);
        }else{
          this.subscriptionAlbums= this.albumService.getAlbums(this.paginaActual,null).subscribe(data=>{
            this.albums=data.albums;
            this.numeroPaginas=data.pages;
            if(this.paginaActual>this.numeroPaginas){
              this.router.navigate(['/albums/page',this.numeroPaginas]);
            }
          });
        }
      }
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

  ngOnDestroy(): void {
    this.subscriptionAlbums.unsubscribe();
  }
}
