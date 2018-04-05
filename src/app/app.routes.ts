import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { USUARIO_ROUTES } from './components/user/user.routes';
import { ArtistComponent } from './components/artist/artist.component';
import { ARTIST_ROUTES } from './components/artist/artist.routes';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'artists', component: ArtistComponent,children:ARTIST_ROUTES },
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
