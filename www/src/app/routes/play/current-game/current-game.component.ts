import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ViewChild } from '@angular/core';
import { CanvasDiceRollComponent } from '../canvas-dice-roll/canvas-dice-roll.component';
import { GameLogComponent } from '../game-log/game-log.component';
import { MapComponent } from '../map/map.component';
import * as SockJS from 'sockjs-client';
import { PartidasSocketService } from 'app/services/partidas/partidas-socket.service';


@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.css']
})
export class CurrentGameComponent implements OnInit {

  client: any;
  localStorage: Storage;

  dataSet: [{value,descriptor,modifier,results}]

  map: File;

  @Output()
  onRollToParent: EventEmitter<any>

  @ViewChild('diceRoller')
  diceRoller: CanvasDiceRollComponent

  @ViewChild('gameLogger')
  gameLogger: GameLogComponent

  data : any;

  constructor(private partidasSocketService: PartidasSocketService) {
    this.localStorage = window.localStorage;
    this.onRollToParent = new EventEmitter();
  }

  ngOnInit() {
    //tenes que passarte la instancia del socket, no podes conectarte 2 veces,
    // al margen de la bizarreada de pasarte el partida id por el localStorage
    var partidaId = Number(this.localStorage.getItem("PARTIDA_ID"));
    //var actorId = Number(this.localStorage.getItem("ACTOR_ID"));
    var actorId = 1
    console.log("conectado al socket")

    //this.partidasSocketService
    //.connect(partidaId, actorId)
    //.subscribe((client)=>{
    //  this.client = client;
    //  //no pasa por aca?
    //  console.log("client: ",client)
    //  client.onMessage((message)=>{
    //    this.handle(message);
    //  })
    //})


    //
    // this.data = {
    //   partidaId: 2,
    //   actorId: 1,
    //   dataSet: this.dataSet
    // };
    // this.sock.onopen = function() {
    //   console.log('open');
    //   this.sock.send(JSON.stringify({
    //     tag: 'authorize',
    //     //data: btoa('player1:123456')
    //     data: this.data
    //   }));
    // };
    // this.sock.onmessage = function(e) {
    //
    //   this.diceRoller.doRoll(this.dataSet);
    //   this.gameLogger.doLog(this.dataSet);
    //   console.log("LOG");
    //
    //   var outputContainer = document.getElementById("output");
    //   console.log('message', e.data);
    //   outputContainer.innerHTML += e.data + '<br/>';
    //   //sock.close();
    // };
    // this.sock.onclose = function() {
    //   console.log('close');
    // };
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

    this.data = {
      dataSet: JSON.stringify(this.dataSet)
    };
  }

  handle(message: any) {
    console.log(message)
    //es mas, no deberias estar handleando
    //mensajes aca, eso deberia hacerlo el componente padre,
    // porque es el que administra la comunicacion entre los hijos
    // es decir, todos le tienen que decir al padre que hay que hacer
    // quien vendria a ser el padre? play?
    switch(message.tag) {
     case "roll": {
          this.diceRoller.doRoll(message.data);
          this.gameLogger.doLog(message.data);
        break;
     }
     case "": {
        //statements;
        break;
     }
     default: {
        //statements;
        break;
     }
   }

  }

  public handleSetMap(map:File){
    this.diceRoller.setMap(map);
  }

  // this.dataSet.map( dice => {
  //   dice.results = Array.from(Array(dice.value).keys()).map(val => {
  //     return Math.floor(Math.random() * (dice.descriptor)) + 1;
  //   })
  // })
  // this.diceRoller.doRoll(this.dataSet);
  // this.gameLogger.doLog(this.dataSet);
  // console.log("LOG");
  doRoll(){
    this.onRollToParent.emit(this.data)

    // this.data = {
    //   dataSet: JSON.stringify(this.dataSet)
    // };
    // this.client.sendMessage('roll', this.data)
  }
}
