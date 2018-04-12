import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';


@Injectable()
export class SocketService {
  socket:any;
  constructor() { 
    this.socket = io("http://localhost:3000");    
  }

}
