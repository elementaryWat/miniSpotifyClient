import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ROUTES } from './app.routes';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Providers
import { UserService } from './services/user.service';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UserDataComponent } from './components/user/user-data.component';
import { UserPhotoComponent } from './components/user/user-photo.component';
import { UserPasswordComponent } from './components/user/user-password.component';
import { UserComponent } from './components/user/user.component';
import { ArtistService } from './services/artist.service';
import { ArtistAddComponent } from './components/artists/artist-add.component';
import { ArtistListComponent } from './components/artists/artist-list.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { ArtistEditComponent } from './components/artists/artist-edit.component';
import { UploadService } from './services/upload.service';
import { AlbumsComponent } from './components/albums/albums.component';
import { ArtistComponent } from './components/artists/artist.component';
import { AlbumService } from './services/album.service';
import { AlbumAddComponent } from './components/albums/album-add.component';
import { AlbumEditComponent } from './components/albums/album-edit.component';
import { AlbumListComponent } from './components/albums/album-list.component';
import { AlbumComponent } from './components/albums/album.component';
import { SongsComponent } from './components/songs/songs.component';
import { SongService } from './services/song.service';
import { SongListComponent } from './components/songs/song-list.component';
import { SongAddComponent } from './components/songs/song-add.component';
import { DurationPipe } from './pipes/duration.pipe';
import { SocketService } from './services/socket.service';
import { SongEditComponent } from './components/songs/song-edit.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    UserDataComponent,
    UserPhotoComponent,
    UserPasswordComponent,
    UserComponent,
    ArtistsComponent,
    ArtistAddComponent,
    ArtistListComponent,
    ArtistEditComponent,
    AlbumsComponent,
    ArtistComponent,
    AlbumAddComponent,
    AlbumEditComponent,
    AlbumListComponent,
    AlbumComponent,
    SongsComponent,
    SongListComponent,
    SongAddComponent,
    DurationPipe,
    SongEditComponent,
    DeleteModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ROUTES
  ],
  providers: [UserService,ArtistService,AlbumService,SongService,UploadService,SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
