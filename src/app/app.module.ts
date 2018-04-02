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
import { UserDataComponent } from './components/user-data/user-data.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    UserDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ROUTES
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
