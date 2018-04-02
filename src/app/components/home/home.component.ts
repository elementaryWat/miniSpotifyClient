import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser:User;
  constructor(private router: Router,
    private userService: UserService) {
     this.currentUser=userService.getCurrentUser();
  }
  logOut(){
    this.userService.logOut();
  }
  ngOnInit() {
  }

}
