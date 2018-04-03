import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MEANSIFY';
  logged:boolean;
  constructor(private router:Router,
    private userService:UserService){
    userService.isLogged().subscribe(isLogged=>{
      this.logged=isLogged;
      if(!isLogged){
        router.navigate(['/login']);
      }
    })
  }
}
