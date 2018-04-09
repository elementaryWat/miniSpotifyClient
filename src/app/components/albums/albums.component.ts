import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styles: []
})
export class AlbumsComponent implements OnInit {
  constructor() { 
  }

  ngOnInit() {
  }
}
