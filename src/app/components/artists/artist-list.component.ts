import { Component, OnInit, Input } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../services/user.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styles: []
})
export class ArtistListComponent implements OnInit {
  @Input() forSearch: boolean;
  artistsOriginal: Artist[] = [];
  artists: Artist[] = [];
  urlImage: string;
  paginaActual: number = 1;
  numeroPaginas: number;
  artistToDelete: Artist;
  subscriptionArtists: Subscription;
  queryString: string;
  constructor(private userService: UserService,
    private artistService: ArtistService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    artistService.queryString.subscribe(query => {
      this.queryString = query;
    })
  }

  ngOnInit() {
    if (this.forSearch) {
      this.urlImage = this.artistService.getUrlImage();      
      this.subscriptionArtists = this.artistService.getArtistsForSearch().subscribe(data => {
        this.artistsOriginal = data.artists;
        this.artistService.queryString.subscribe(query => {
          this.artists=this.artistService.searchArtists(this.artistsOriginal,query);
        })
      });
      
    } else {
      this.activatedRoute.params.subscribe(params => {
        if (this.subscriptionArtists) {
          this.subscriptionArtists.unsubscribe();
        }
        if (params['numPage'] != undefined) {
          this.paginaActual = parseInt(params['numPage']);
        }
        if (this.paginaActual < 1) {
          this.router.navigate(['artists/page', 1]);
        } else {
          this.subscriptionArtists = this.artistService.getArtists(this.paginaActual).subscribe(data => {

            this.artists = data.artists;
            this.urlImage = this.artistService.getUrlImage();
            this.numeroPaginas = data.pages;
            if (this.paginaActual > this.numeroPaginas) {
              this.router.navigate(['artists/page', this.numeroPaginas]);
            }
          });
        }
      })
    }
  }

  ngOnDestroy() {
    this.subscriptionArtists.unsubscribe();

  }

  selectArtistToDelete(artist: Artist) {
    this.artistService.selectArtistToDelete(artist);
  }
}
