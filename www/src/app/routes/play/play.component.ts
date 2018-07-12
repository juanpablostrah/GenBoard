import { OnInit, ViewChild, Output } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidasSocketService } from 'app/services/partidas/partidas-socket.service';
import { CanvasDiceRollComponent } from 'app/routes/play/canvas-dice-roll/canvas-dice-roll.component';
import { GameLogComponent } from 'app/routes/play/game-log/game-log.component';
import { EventEmitter } from '@angular/core';
import { ActorListComponent } from 'app/routes/play/actor-list/actor-list.component';
import { Actor } from 'app/routes/actor/actor';
import { CurrentGameComponent } from 'app/routes/play/current-game/current-game.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})

export class PlayComponent implements OnInit, OnDestroy {

  private subscription: any;
  private client: any;
  message : any;
  currentActor : Actor;

  @ViewChild('currentGame')
  currentGame: CurrentGameComponent;

  @ViewChild('gameLogger')
  gameLogger: GameLogComponent

  @ViewChild('diceRoller')
  diceRoller: CanvasDiceRollComponent

  constructor(
    private route: ActivatedRoute,
    private partidasSocketSrv: PartidasSocketService,
  ) {

  }

  ngOnInit() {
    this.subscription = this.route.params
    .subscribe(params => {
      const partidaIdRaw = params['partidaId'];
      const partidaId = parseInt(partidaIdRaw);
      const actorIdRaw = params['actorId'];
      const actorId = parseInt(actorIdRaw);
      this.partidasSocketSrv
      .connect(partidaId, actorId)
      .subscribe((client)=>{
        console.log('client', client);
        this.client = client;
        client.onMessage((tag,data)=>{
          this.handle(tag,data);
        })
      })
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  send(message: { tag:any, data: any }){
    if(!this.client){
      console.log('trying to send message before connect');
    }
    this.client.sendMessage(message.tag, message.data);
  }

  doHandleDeletePersonaje(data:any){
    this.subscription = this.route.params
    .subscribe(params => {
        var actorId = data;
        console.log("ACTOR_ID_DELETE", data)
        var partidaId = params['partidaId'];
        this.message = {
          tag: 'HANDLE_DELETE_PERSONAJE',
          data: {actorId : actorId,
                 partidaId: partidaId}
        }
        console.log("personaje eliminado")

        this.send(this.message)
     })
  }


  doHandleNewPersonaje(){
    this.subscription = this.route.params
    .subscribe(params => {
        var actorId = params['actorId'];
        var partidaId = params['partidaId'];
        this.message = {
          tag: 'HANDLE_NEW_PERSONAJE',
          data: {actorId : actorId,
                 partidaId: partidaId}
        }
        console.log("nuevo personaje creado")

        this.send(this.message)
     })
  }

  doFinishTurn(){
    console.log("FINALIZO TURNO")
    this.subscription = this.route.params
    .subscribe(params => {
      var actorId = this.currentGame.currentActorId;
      var partidaId = params['partidaId'];
      this.message = {
        tag: 'FINISH_TURN',
        data: {actorId : actorId,
          partidaId: partidaId}
        }
        console.log("Finalizo Turno",)

        this.send(this.message)
      })
  }

  doInitiative(){
    this.subscription = this.route.params
    .subscribe(params => {
      var actorId = params['actorId'];
      var partidaId = params['partidaId'];
      this.message = {
        tag: 'INITIATIVE_REQUEST',
        data: {actorId : actorId,
          partidaId: partidaId}
        }
        console.log("comienzo iniciativa")

        this.send(this.message)
      })
  }

  initiateCombatMode(data : any){
    this.subscription = this.route.params
    .subscribe(params => {
        var partidaId = params['partidaId'];
        this.message = {
          tag: 'COMBAT_MODE_REQUEST',
          data: {actorId : this.currentGame.currentActorId,
                 partidaId: partidaId}
        }
        console.log("entrando en combate")

        this.send(this.message)
     })
  }

  historyMode(){
    this.subscription = this.route.params
    .subscribe(params => {
        var partidaId = params['partidaId'];
        var actorId = params['actorId'];
        this.message = {
          tag: 'HISTORY_MODE_REQUEST',
          data: {actorId : actorId,
                 partidaId: partidaId}
        }
        console.log("entrando en modo Historia")

        this.send(this.message)
     })
  }

  setToken(){
    this.subscription = this.route.params
    .subscribe(params => {
        var actorId = params['actorId'];
        var partidaId = params['partidaId'];
        this.message = {
          tag: 'SET_TOKEN_REQUEST',
          data: {actorId : actorId,
                 partidaId: partidaId}
        }
        console.log("pongo una ficha en el tablero")

        this.send(this.message)
     })
  }

  moveToken(data){
    console.log("MOVE_TOKEN", data)
    this.subscription = this.route.params
    .subscribe(params => {
        var actorId = params['actorId'];
        this.message = {
          tag: 'MOVE_TOKEN_REQUEST',
          data: {
            actorId : data.actorId,
            x: data.x,
            z: data.z
          }
        }
        this.send(this.message)
     })
  }

  throwInitiative(){
    this.subscription = this.route.params
    .subscribe(params => {
        var actorId = this.currentGame.currentActorId;
        var partidaId = params['partidaId'];
        this.message = {
          tag: 'THROW_INITIATIVE',
          data: {actorId : actorId,
                 partidaId: partidaId}
        }
        console.log("envio la tirada de iniciativa")
        console.log("INITIATIVE THROW",this.message.data)
        this.send(this.message)
     })
  }

  doRoll(data : any){

    this.subscription = this.route.params
    .subscribe(params => {
        var actorId = this.currentGame.currentActorId
        this.message = {
          tag: 'ROLL_REQUEST',
          data: {dataSet : data, actorId : actorId}
        }
        console.log("envio el roll al backend")

        this.send(this.message)
     })
  }

  doChat(data : any){
    this.subscription = this.route.params
    .subscribe(params => {
        var actorId = params['actorId'];
        this.message = {
          tag: 'CHAT_REQUEST',
          data: {chat : data, actorId : actorId}
        }
        console.log("se envio el mensaje")

        this.send(this.message)
     })
  }

  doSetCurrentActor(data : any){
    this.subscription = this.route.params
    .subscribe(params => {
      var partidaId = params['partidaId'];
        this.message = {
          tag: 'CURRENT_ACTOR',
          data: {actorId : data.actorId,
                 partidaId: partidaId}
        }
        console.log("el actor actual es el id :"+ data.actorId)

        this.send(this.message)
     })
  }

  handle(tag:any, data: any ){
    console.log('MENSAJE:',data);

    switch(tag) {
      case "ROLL_RESPONSE": {
            console.log("ROLL_RESPONSE",data)
            //this.currentGame.currentActorId = data.actorId
            this.currentGame.roll(data.dataSet.result.dataSet);
            this.currentGame.log(data);
          break;
       }
       case "CONNECT_ACTOR_RESPONSE": {
            console.log("se conecto un personaje", data)
            this.currentGame.populateList(data)
          break;
       }
       case "CHAT_RESPONSE": {
            this.currentGame.sendChat(data)
          break;
       }
       case "INITIATIVE_RESPONSE": {
            console.log("ENTRANDO A MI TURNO",data)
            this.currentGame.currentActorId = data.actorId
            this.currentGame.changeShowThrow(false)
            this.currentGame.changeCombatMode(false)
            this.currentGame.notifyActor()
          break;
       }
       case "SORTING_INITIATIVE": {
            console.log("Ordenando iniciativa")
            this.currentGame.sortList(data)
          break;
       }
       case "SET_TOKEN_RESPONSE": {
            console.log("insertando una ficha",data)
            this.currentGame.setTokenInCanvas(data)
          break;
       }
       case "MOVE_TOKEN_RESPONSE": {
            console.log("moviendo una ficha",data)
            this.currentGame.doMouseMove(data)
          break;
       }
       case "COMBAT_RESPONSE": {
            console.log("tu turno de combatir")
            this.currentGame.currentActorId = data.actorId
            this.currentGame.changeShowThrow(true)
            this.currentGame.changeCombatMode(true)
            this.currentGame.notifyActor()
          break;
       }
       case "HISTORY_RESPONSE": {
            console.log("tu turno de combatir")
            this.currentGame.historyMode()
          break;
       }
       case "CURRENT_ACTOR_RESPONSE": {
            console.log("seteo actor actual")
            this.currentGame.currentActorId = data.actorId
          break;
       }
       case "FINISH_TURN_RESPONSE": {
            this.currentGame.currentActorId = data.actorId
            this.currentGame.changeShowThrow(true)
            this.currentGame.changeCombatMode(true)
            this.currentGame.notifyActor()
          break;
       }
       case "DELETE_TOKEN_RESPONSE": {
         console.log("Eliminando una ficha",data)
         this.currentGame.removeTokenInCanvas(data)
          break;
       }

       default: {
          //statements;
          break;
       }
      }
    }

}
