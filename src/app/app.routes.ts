import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { USUARIO_ROUTES } from './components/user/user.routes';
import { ARTIST_ROUTES } from './components/artists/artists.routes';
import { ArtistsComponent } from './components/artists/artists.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { ALBUM_ROUTES } from './components/albums/albums.routes';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'login', component: LoginComponent },
    { path: 'albums', component: AlbumsComponent,children:ALBUM_ROUTES },
    { path: 'artists', component: ArtistsComponent,children:ARTIST_ROUTES },
    { path: 'user', component: UserComponent,children:USUARIO_ROUTES },
    { path: '**', pathMatch:'full',  redirectTo:'/home' },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ROUTES {}
