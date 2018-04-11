import {Routes } from '@angular/router';
import { AlbumListComponent } from './album-list.component';
import { AlbumEditComponent } from './album-edit.component';
import { AlbumAddComponent } from './album-add.component';
import { AlbumComponent } from './album.component';



export const ALBUM_ROUTES: Routes = [
  { path: '', component: AlbumListComponent },
  { path: 'album/:albumId', component: AlbumComponent },
  { path: 'edit/:albumId', component: AlbumEditComponent },
  { path: 'new-album/artist/:artistId', component: AlbumAddComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' } 
];