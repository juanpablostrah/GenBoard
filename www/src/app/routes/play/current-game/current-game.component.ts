import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { CanvasDiceRollComponent } from '../canvas-dice-roll/canvas-dice-roll.component';
import { GameLogComponent } from '../game-log/game-log.component';
import { MapComponent } from '../map/map.component';
import * as SockJS from 'sockjs-client';
import { PartidasSocketService } from 'app/services/partidas/partidas-socket.service';
import { ActorListComponent } from 'app/routes/play/actor-list/actor-list.component';
import { Actor } from 'app/routes/actor/actor';


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

  @Output()
  onChatToParent: EventEmitter<any>

  @ViewChild('diceRoller')
  diceRoller: CanvasDiceRollComponent

  @ViewChild('gameLogger')
  gameLogger: GameLogComponent

  @ViewChild('actorList')
  actorList: ActorListComponent

  data : any;
  
  @Input()
  enanosi : boolean;

  @Input()
  chat : any;

  constructor(private partidasSocketService: PartidasSocketService) {
    this.localStorage = window.localStorage;
    this.onRollToParent = new EventEmitter();
    this.onChatToParent = new EventEmitter();
  }

  ngOnInit() {
    //tenes que passarte la instancia del socket, no podes conectarte 2 veces,
    // al margen de la bizarreada de pasarte el partida id por el localStorage
    var partidaId = Number(this.localStorage.getItem("PARTIDA_ID"));
    //var actorId = Number(this.localStorage.getItem("ACTOR_ID"));
    var actorId = 1
    console.log("conectado al socket")

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
      dataSet: this.dataSet
    };
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

      // this.data = {
      //   dataSet: JSON.stringify(this.dataSet)
      // };
      // this.client.sendMessage('roll', this.data)

  doRoll(){
    this.onRollToParent.emit(this.data)
  }

  doChat($event){
    console.log($event)
    console.log($event.chat)
    this.onChatToParent.emit($event.chat)
  }

  setActor(actor : Actor){
    console.log("actor : " + actor)
    this.actorList.addActor(actor)
  }

  roll(data : any){
    this.diceRoller.doRoll(data);
  }

  populateList(data : any) {
    this.actorList.populateActorList(data)
  }

  log(data : any){
    this.gameLogger.doLog(data);
  }

  sendChat(data : any){
    this.gameLogger.doChat(data.chat);
  }

  getRandomColor(){
    var color = "";
    for(var i = 0; i < 3; i++) {
        var sub = Math.floor(Math.random() * 256).toString(16);
        color += (sub.length == 1 ? "0" + sub : sub);
    }
    return "#" + color;
  }

}
