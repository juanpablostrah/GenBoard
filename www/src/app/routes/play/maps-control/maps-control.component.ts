import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps-control',
  templateUrl: './maps-control.component.html',
  styleUrls: ['./maps-control.component.css']
})
export class MapsControlComponent implements OnInit {

  maps : File[];
  selectedFile: File;

  constructor() {
    this.maps = [];
  }

  ngOnInit() {
    
  }

  public load(){
    console.log("load");
  }

  public saveMap(event) {
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile);
      this.maps.push(this.selectedFile);
      // this.changeMap(this.selectedFile);
    }

    public changeMap(map : File){

    }

}
