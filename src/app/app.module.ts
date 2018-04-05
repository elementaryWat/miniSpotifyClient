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
import { ArtistComponent } from './components/artist/artist.component';
import { ArtistService } from './services/artist.service';
import { ArtistAddComponent } from './components/artist/artist-add.component';
import { ArtistListComponent } from './components/artist/artist-list.component';


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
    ArtistComponent,
    ArtistAddComponent,
    ArtistListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ROUTES
  ],
  providers: [UserService,ArtistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
