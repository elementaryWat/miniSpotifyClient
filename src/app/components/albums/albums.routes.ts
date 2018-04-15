import {Routes } from '@angular/router';
import { AlbumListComponent } from './album-list.component';
import { AlbumEditComponent } from './album-edit.component';
import { AlbumAddComponent } from './album-add.component';
import { AlbumComponent } from './album.component';
import { CanActivateGuard } from '../../services/auth-guar.service';



export const ALBUM_ROUTES: Routes = [
  { path: '', component: AlbumListComponent },
  { path: 'page/:numPage', component: AlbumListComponent },
  { path: 'album/:albumId', component: AlbumComponent },
  { path: 'edit/:albumId', component: AlbumEditComponent, canActivate:[CanActivateGuard]  },
  { path: 'new-album/artist/:artistId', component: AlbumAddComponent, canActivate:[CanActivateGuard]  },
  { path: '**', pathMatch: 'full', redirectTo: '' } 
];