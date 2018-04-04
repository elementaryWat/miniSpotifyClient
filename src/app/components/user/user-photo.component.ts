import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-photo',
  templateUrl: './user-photo.component.html',
  styles: []
})
export class UserPhotoComponent implements OnInit {
  urlImage: string;
  formPhotoUser: FormGroup;
  constructor(private userService: UserService,) {
    this.updateUserImageDiv();
    this.crearFormPhotoUser();
  }
  crearFormPhotoUser() {
    this.formPhotoUser = new FormGroup({
      'fileImage': new FormControl('')
    })
  }
  updateUserImageDiv(){
    this.urlImage = this.userService.getUrlImage();
  }
  imageFiles:Array<File>;
  selectImagesFiles(fileInput:any){
    this.imageFiles=fileInput.target.files;
  }
  actualizarFoto(){
    this.userService.actualizarImagenUsuarioRemoto(this.imageFiles)
    .then(result=>{
      this.userService.actualizarImagenUsuarioLocal((<any>result).image);
      this.imageFiles=null;
      this.updateUserImageDiv();
      document.getElementById("imageUserNav").setAttribute("src",this.urlImage);
    })
    .catch(error=>{
      console.log(error);
      alert("Ocurrio un error al subir la imagen");
    })
  }
  ngOnInit() {
  }

}
