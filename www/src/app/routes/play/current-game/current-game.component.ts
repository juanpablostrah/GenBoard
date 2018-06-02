import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
// import { CanvasDiceRollComponent }  from 'app/routes/play/canvas-dice-roll';
// import { GameLogComponent }  from './game-log/game-log';
// import { RollerControlComponent }  from './roller-control/roller-control';

import { CanvasDiceRollComponent } from '../canvas-dice-roll/canvas-dice-roll.component';
import { GameLogComponent } from '../game-log/game-log.component';
import { MapComponent } from '../map/map.component';
import * as SockJS from 'sockjs-client';


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

  sock : any;

  data : any;

  ngOnInit() {
    var websocketurl = "http://172.30.0.21:8080/api/v1/socket/gameset";
    this.sock = new SockJS(websocketurl);
    this.data = {
      partidaId: 2,
      actorId: 1,
      dataSet: this.dataSet
    };
    this.sock.onopen = function() {
      console.log('open');
      this.sock.send(JSON.stringify({
        tag: 'authorize',
        //data: btoa('player1:123456')
        data: this.data
      }));
    };
    this.sock.onmessage = function(e) {

      this.diceRoller.doRoll(this.dataSet);
      this.gameLogger.doLog(this.dataSet);
      console.log("LOG");

      var outputContainer = document.getElementById("output");
      console.log('message', e.data);
      outputContainer.innerHTML += e.data + '<br/>';
      //sock.close();
    };
    this.sock.onclose = function() {
      console.log('close');
    };
    // window.enviar = function(){
    //   var message = document.getElementById("mensaje").value;
    //   console.log(message);
    //   this.sock.send(JSON.stringify({
    //     tag: 'action',
    //     //data: btoa('player1:123456')
    //     data: message
    //   }));
    // }

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
    this.diceRoller.setMap(map);
  }

  doRoll(){
    // this.dataSet.map( dice => {
    //   dice.results = Array.from(Array(dice.value).keys()).map(val => {
    //     return Math.floor(Math.random() * (dice.descriptor)) + 1;
    //   })
    // })

    this.sock.send(JSON.stringify({
      tag: 'throw',
      data: this.data
    }));
    console.log("enviando dataSet")

  }
}
