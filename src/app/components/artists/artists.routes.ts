import {Routes } from '@angular/router';
import { ArtistAddComponent } from './artist-add.component';
import { ArtistListComponent } from './artist-list.component';


export const ARTIST_ROUTES: Routes = [
  { path: '', component: ArtistListComponent },
  { path: 'page/:numPage', component: ArtistListComponent },
  { path: 'new-artist', component: ArtistAddComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];