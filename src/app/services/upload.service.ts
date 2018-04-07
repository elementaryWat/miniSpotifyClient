import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class UploadService {

  constructor(private userService:UserService) { }

  makeFileUpload(files: Array<File>, url: string) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      var formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('avatar', files[i]);
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST',url , true);
      xhr.setRequestHeader('Authorization', this.userService.currentToken);
      xhr.send(formData);
    });
  }

}
