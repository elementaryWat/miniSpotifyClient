import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-photo',
  templateUrl: './user-photo.component.html',
  styles: []
})
export class UserPhotoComponent implements OnInit {
  urlImage: string;
  formPhotoUser: FormGroup;
  constructor(private userService: UserService) {
    this.urlImage = userService.getUrlImage(userService.currentUser.image);
    this.crearFormPhotoUser();
  }
  crearFormPhotoUser() {
    this.formPhotoUser = new FormGroup({
      'fileImage': new FormControl('', Validators.required)
    })
  }
  actualizarFoto(){
    console.log(this.formPhotoUser)
  }
  ngOnInit() {
  }

}
