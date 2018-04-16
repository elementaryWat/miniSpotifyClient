import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  formSearch:FormGroup;
  emptyQuery:boolean=true;  
  constructor(private artistService:ArtistService) { 
    this.crearFormSearch();
  }
  
  ngOnInit() {
  }

  crearFormSearch(){
    this.formSearch=new FormGroup({
      'query':new FormControl('')
    });
    this.formSearch.controls['query'].valueChanges.subscribe(query=>{
      if(query!=""){
        this.emptyQuery=false;
        this.artistService.queryString.next(query);        
      }else{
        this.emptyQuery=true;
      }
    })
  }
}
