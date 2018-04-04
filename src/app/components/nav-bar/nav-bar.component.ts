import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: []
})
export class NavBarComponent implements OnInit {
  urlImage:string;

  constructor(private userService:UserService) {
    this.getImageUser();
   }
  logOut(){
    this.userService.logOut();
  }
  getImageUser(){
    this.urlImage= this.userService.getUrlImage();
  }
  ngOnInit() {
  }

}
