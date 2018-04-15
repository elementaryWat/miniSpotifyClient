import {Routes } from '@angular/router';
import { ArtistAddComponent } from './artist-add.component';
import { ArtistListComponent } from './artist-list.component';
import { ArtistEditComponent } from './artist-edit.component';
import { ArtistComponent } from './artist.component';
import { CanActivateGuard } from '../../services/auth-guar.service';


export const ARTIST_ROUTES: Routes = [
  { path: '', component: ArtistListComponent },
  { path: 'page/:numPage', component: ArtistListComponent },
  { path: 'artist/:artistId', component: ArtistComponent },
  { path: 'edit/:artistId', component: ArtistEditComponent, canActivate:[CanActivateGuard] },
  { path: 'new-artist', component: ArtistAddComponent, canActivate:[CanActivateGuard] },
  { path: '**', pathMatch: 'full', redirectTo: '' } 
];