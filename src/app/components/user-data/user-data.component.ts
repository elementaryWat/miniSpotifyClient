import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  constructor(private userService:UserService) { }
  formUserData:FormGroup;
  ngOnInit() {
    this.crearFormUserData();
  }
  crearFormUserData(){
    this.formUserData=new FormGroup({
      'name':new FormControl('',Validators.required),
      'surname':new FormControl('',Validators.required),
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")])
    });
    this.formUserData.patchValue(this.userService.currentUser);
  }
  updateUserData(){
    console.log(this.formUserData);
  }

}
