import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-game-log',
  templateUrl: './game-log.component.html',
  styleUrls: ['./game-log.component.css']
})
export class GameLogComponent implements OnInit {

  @Input()
  dataSet: [{}]

  @Output()
  onRoll: EventEmitter<void>

  constructor() {
    this.onRoll = new EventEmitter();
  }

  doLog(dataSet: [any]){
    
  }

  ngOnInit() {
  }

}
