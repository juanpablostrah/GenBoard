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

  doInitiative(){
    this.message = {
      tag: 'INITIATIVE_REQUEST',
      data: {}
    }
    console.log("comienzo iniciativa")

    this.send(this.message)
  }

  doRoll(data : any){
    this.subscription = this.route.params
    .subscribe(params => {
        var actorId = params['actorId'];
        this.message = {
          tag: 'ROLL_REQUEST',
          data: {dataSet : data, actorId : actorId}
        }
        console.log("envio el roll al backend")

        this.send(this.message)
     })
  }

  doChat(data : any){
    console.log("CHATINFO",data)
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

  handle(tag:any, data: any ){
    console.log('MENSAJE:',data);

    switch(tag) {
      case "ROLL_RESPONSE": {
            console.log("DATA",data.dataSet)
            this.currentGame.roll(data.dataSet.result.dataSet);
            this.currentGame.log(data);
            // this.currentGame.roll(data.result.dataSet);
            // this.currentGame.log(data.result.dataSet);
          break;
       }
       case "CONNECT_ACTOR_RESPONSE": {
            console.log("se conecto un personaje")
            this.currentGame.populateList(data)
          break;
       }
       case "CHAT_RESPONSE": {
            this.currentGame.sendChat(data)
          break;
       }
       case "INITIATIVE_RESPONSE": {
            this.currentGame.notifyActor()
          break;
       }
       default: {
          //statements;
          break;
       }
      }
    }

}
