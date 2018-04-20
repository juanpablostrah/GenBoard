import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input()
  map: "./assets/images/castle.jpg";

  constructor() { }

  ngOnInit() {
  }

  public setMap(newMap: any){
    this.map = newMap;
  }

}
