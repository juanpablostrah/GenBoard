import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { CanvasDiceRollComponent } from '../canvas-dice-roll/canvas-dice-roll.component';
import { GameLogComponent } from '../game-log/game-log.component';
import { MapComponent } from '../map/map.component';
import * as SockJS from 'sockjs-client';
import { PartidasSocketService } from 'app/services/partidas/partidas-socket.service';
import { ActorListComponent } from 'app/routes/play/actor-list/actor-list.component';
import { Actor } from 'app/routes/actor/actor';
import { PartidasService } from 'app/services/partidas/partidas.service';
import { ActorService } from 'app/services/actor/actor.service';
import { ActivatedRoute } from '@angular/router';
import { DmPanelComponent } from 'app/routes/play/dm-panel/dm-panel.component';
import { Partida } from 'app/services/partidas/partida.model';
import { RollerControlComponent } from 'app/routes/play/roller-control/roller-control.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.css']
})
export class CurrentGameComponent implements OnInit {

  actors: Actor[];

  client: any;
  localStorage: Storage;

  dataSet: [{value,descriptor,modifier,results}]

  map: File;

  @Output()
  onRollToParent: EventEmitter<any>

  @Output()
  onChatToParent: EventEmitter<any>

  @Output()
  onThrowInitiativeToParent: EventEmitter<any>

  @Output()
  onSetTokenToParent: EventEmitter<any>

  @Output()
  onMoveTokenToParent: EventEmitter<any>

  @Output()
  onInitiativeToParent: EventEmitter<any>

  @Output()
  onCombatModeToParent: EventEmitter<any>

  @ViewChild('diceRoller')
  diceRoller: CanvasDiceRollComponent

  @ViewChild('gameLogger')
  gameLogger: GameLogComponent

  @ViewChild('actorList')
  actorList: ActorListComponent

  @ViewChild('dmPanel')
  dmPanel: DmPanelComponent

  @ViewChild('rollerControl')
  rollerControl: RollerControlComponent

  data : any;

  @Input()
  enanosi : boolean;

  @Input()
  chat : any;

  @Input()
  isDM : boolean;
  currentActor : any;
  subscription: any;

  initiativeList : Number[];

  constructor(private partidasSocketService: PartidasSocketService,
    private partidasService: PartidasService,
    private actorService: ActorService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar) {
    this.localStorage = window.localStorage;
    this.onRollToParent = new EventEmitter();
    this.onChatToParent = new EventEmitter();
    this.onInitiativeToParent = new EventEmitter();
    this.onSetTokenToParent = new EventEmitter();
    this.onMoveTokenToParent = new EventEmitter();
    this.onThrowInitiativeToParent = new EventEmitter();
    this.onCombatModeToParent = new EventEmitter();
    this.initiativeList = [];
  }

  ngOnInit() {

    this.subscription = this.route.params.subscribe(params => {
    //this.onSetTokenToParent.emit()
    var actorId = params['actorId']
    console.log('obteniendo actor: ',actorId);
    if(actorId == 1){
      console.log("ES DM")
      this.isDM = true
    }else{
      console.log("ES INVITADO")
      this.isDM = false
    }
    // this.actorService.get(actorId).then(actor =>
    //   this.onSetTokenToParent(actor.);
    // )

    });



    //VERIFICAR PORQUE NO TRAE EL PLAYER OWNER, Y PORQUE NO TRANSFORMA
    //EL RESPONSE EN UNA PARTIDA Y LO DEJA COMO OBJECT

    console.log("conectado al socket")
    this.snackBar.open('Conectado a la partida', '', {duration:5000});
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

  doThrowInitiative(){
    this.onThrowInitiativeToParent.emit()
  }

  doOnMouseMove($event){
    console.log("do_mouse", $event)
    this.onMoveTokenToParent.emit($event)
  }

  notifyActor(){
    this.snackBar.open('Es tu turno aventurero', '', {duration:10000});
    this.rollerControl.enabledTurn()
  }

  setActor(actor : Actor){
    console.log("actor : " + actor)
    this.actorList.addActor(actor)
  }

  roll(data : any){
    this.diceRoller.doRoll(data);
  }

  populateList(data : any) {
    this.subscription = this.route.params.subscribe(params => {
    var partidaId = params['partidaId']
    console.log('obteniendo partida: '+ partidaId);
      var promise: Promise<Actor[]> = this.partidasService.getActors(partidaId);
      var afterThenPromise: Promise<void> = promise.then((actors) => {
        console.log(actors);
        this.actors = actors;
        console.log("ACTORES",this.actors)
        this.actorList.populateActorList(this.actors)
        this.dmPanel.actors = this.actors
      });
    });
  }

  sortList(actorsId : any){
    let result : Actor[];
    result = [];
    actorsId.throwsActorsId.map(actorthrow => {
      let actorReorder = this.actors.find(actor => {
        console.log("ID ACTOR", actor.id);
        console.log("ID RECEIVED", actorthrow);
        return actor.id  == parseInt(actorthrow)
      })
      this.actors.splice(this.actors.indexOf(actorReorder), 1)
      this.actors.push(actorReorder)

    })
    console.log("LISTA YA ORDENADA",result);
    console.log("ACTORS", this.actors)
  }

  setTokenInCanvas(data : any){
    this.diceRoller.setToken(data)
  }

  log(data : any){
    this.gameLogger.doLog(data);
  }

  sendChat(data : any){
    this.gameLogger.doChat(data.chat, data.actorId);
  }

  doMouseMove(data : any){
    console.log('doMouseMove', data)
    this.diceRoller.doMouseMoveExternal(data.x, data.z, data.actorId)
  }

  public handleInitiative(){
    this.onInitiativeToParent.emit();
  }

  handleCombatMode($event){
    this.onCombatModeToParent.emit($event);
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
