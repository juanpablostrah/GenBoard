import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-maps-control',
  templateUrl: './maps-control.component.html',
  styleUrls: ['./maps-control.component.css']
})
export class MapsControlComponent implements OnInit {

  maps : File[];
  selectedFile: File;

  @Output()
  onSetMap: EventEmitter<void>

  @ViewChild('map')
  mapToShow: MapComponent;

  constructor() {
    this.maps = [];
    this.onSetMap = new EventEmitter();
  }

  ngOnInit() {

  }

  public setMap(){
    console.log("setting Map");
    this.onSetMap.emit();
    // this.mapToShow.setMap(this.selectedFile);

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
