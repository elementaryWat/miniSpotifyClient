import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: []
})
export class NavBarComponent implements OnInit {

  constructor(private userService:UserService) { }
  
  logOut(){
    this.userService.logOut();
  }
  ngOnInit() {
  }

}
