import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

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
  artistToDelete:Artist;
  subscriptionArtists:Subscription;
  constructor(private artistService:ArtistService,
    private router:Router,
    private activatedRoute:ActivatedRoute) {
      this.activatedRoute.params.subscribe(params=>{     
        if (this.subscriptionArtists){
          this.subscriptionArtists.unsubscribe();
        }    
        if(params['numPage']!=undefined)
        {
          this.paginaActual=parseInt(params['numPage']);
        }
        if(this.paginaActual<1){
          this.router.navigate(['artists/page',1]);
        }else{
          this.subscriptionArtists= this.artistService.getArtists(this.paginaActual).subscribe(data=>{
            
            this.artists=data.artists;
            this.urlImage=this.artistService.getUrlImage();
            this.numeroPaginas=data.pages;
            if(this.paginaActual>this.numeroPaginas){
              this.router.navigate(['artists/page',this.numeroPaginas]);
            }
          });
        }
      })
  }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.subscriptionArtists.unsubscribe();  
    
  }

  selectArtistToDelete(artist:Artist){
    this.artistService.selectArtistToDelete(artist);
  }
}
