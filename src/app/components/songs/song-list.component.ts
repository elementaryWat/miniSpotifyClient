import { Component, OnInit, Input } from '@angular/core';
import { SongService } from '../../services/song.service';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../../models/song';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styles: []
})
export class SongListComponent implements OnInit {
  @Input() album;
  @Input() forSearch;
  albumId: string;
  songsOriginal: Song[] = [];
  songs: Song[] = [];
  songHoverSelected: string = "";
  socket: any;
  subscriptionSongs: Subscription;
  queryString: string;
  constructor(private userService: UserService,
    private songService: SongService,
    private activatedRoute: ActivatedRoute) {
    songService.queryString.subscribe(query => {
      this.queryString=query;
    })
  }
  mostrarBotonPlay(songId: string) {
    this.songHoverSelected = songId;
  }
  ocultarBotonPlay() {
    this.songHoverSelected = "";
  }

  ngOnInit() {
    if (this.forSearch) {
      this.subscriptionSongs= this.songService.getSongsForSearch().subscribe(data => {
        this.songsOriginal = data.songs;
        this.songService.queryString.subscribe(query => {
          this.songs = this.songService.searchSongs(this.songsOriginal, query);
        })
      })
    } else {
      this.activatedRoute.params.subscribe(params => {
        this.albumId = params['albumId'];
        this.subscriptionSongs = this.songService.getSongs(this.albumId).subscribe(data => {
          this.songs = (data.songs.length > 0) ? data.songs : [];
        }, error => {
          console.log(error)
        })
      })
    }
  }

  ngOnDestroy(): void {
    this.subscriptionSongs.unsubscribe();
  }
}
