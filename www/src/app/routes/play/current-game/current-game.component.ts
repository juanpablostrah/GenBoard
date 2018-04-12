import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
// import { CanvasDiceRollComponent }  from 'app/routes/play/canvas-dice-roll';
// import { GameLogComponent }  from './game-log/game-log';
// import { RollerControlComponent }  from './roller-control/roller-control';

import { CanvasDiceRollComponent } from '../canvas-dice-roll/canvas-dice-roll.component';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.css']
})
export class CurrentGameComponent implements OnInit {

  constructor() { }

  dataSet: [{}]

  @ViewChild('diceRoller')
  diceRoller: CanvasDiceRollComponent

  ngOnInit() {
    this.dataSet = [{
      descriptor: 4,
      value: 0
    },{
      descriptor: 6,
      value: 0
    },{
      descriptor: 8,
      value: 0
    },{
      descriptor: 10,
      value: 0
    },{
      descriptor: 12,
      value: 0
    },{
      descriptor: 20,
      value: 0
    }]
  }

  doRoll(){
    this.diceRoller.doRoll(this.dataSet);
  }

}
