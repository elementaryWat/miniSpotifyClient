import {Routes } from '@angular/router';
import { ArtistAddComponent } from './artist-add.component';
import { ArtistListComponent } from './artist-list.component';
import { ArtistEditComponent } from './artist-edit.component';
import { ArtistComponent } from './artist.component';


export const ARTIST_ROUTES: Routes = [
  { path: '', component: ArtistListComponent },
  { path: 'page/:numPage', component: ArtistListComponent },
  { path: 'artist/:artistId', component: ArtistComponent },
  { path: 'edit/:artistId', component: ArtistEditComponent },
  { path: 'new-artist', component: ArtistAddComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' } 
];