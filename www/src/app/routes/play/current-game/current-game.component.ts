import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
// import { CanvasDiceRollComponent }  from 'app/routes/play/canvas-dice-roll';
// import { GameLogComponent }  from './game-log/game-log';
// import { RollerControlComponent }  from './roller-control/roller-control';

import { CanvasDiceRollComponent } from '../canvas-dice-roll/canvas-dice-roll.component';
import { GameLogComponent } from '../game-log/game-log.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.css']
})
export class CurrentGameComponent implements OnInit {

  constructor() { }

  dataSet: [{value,descriptor,modifier,results}]

  map: File;

  @ViewChild('diceRoller')
  diceRoller: CanvasDiceRollComponent

  @ViewChild('gameLogger')
  gameLogger: GameLogComponent


  ngOnInit() {
    this.dataSet = [{
      descriptor: 4,
      value: 0,
      modifier:0,
      results:[]
    },{
      descriptor: 6,
      value: 0,
      modifier:0,
      results:[]
    },{
      descriptor: 8,
      value: 0,
      modifier:0,
      results:[]
    },{
      descriptor: 10,
      value: 0,
      modifier:0,
      results:[]
    },{
      descriptor: 12,
      value: 0,
      modifier:0,
      results:[]
    },{
      descriptor: 20,
      value: 0,
      modifier:0,
      results:[]
    }]
  }

  public handleSetMap(map:File){

    console.log("12345678");
    console.log(map);
    this.diceRoller.setMap(map);
  }

  doRoll(){
    this.dataSet.map( dice => {
      dice.results = Array.from(Array(dice.value).keys()).map(val => {
        return Math.floor(Math.random() * (dice.descriptor)) + 1;
      })
    })
    this.diceRoller.doRoll(this.dataSet);
    this.gameLogger.doLog(this.dataSet);
    console.log("LOG");
  }

  // doSetMap(){
  //   this.diceRoller.setMap(this.map);
  // }
}
