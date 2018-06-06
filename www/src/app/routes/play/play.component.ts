import { OnInit, ViewChild, Output } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidasSocketService } from 'app/services/partidas/partidas-socket.service';
import { CanvasDiceRollComponent } from 'app/routes/play/canvas-dice-roll/canvas-dice-roll.component';
import { GameLogComponent } from 'app/routes/play/game-log/game-log.component';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})

export class PlayComponent implements OnInit, OnDestroy {

  private subscription: any;
  private client: any;
  message : any;

  @ViewChild('diceRoller')
  diceRoller: CanvasDiceRollComponent

  @ViewChild('gameLogger')
  gameLogger: GameLogComponent

  constructor(
    private route: ActivatedRoute,
    private partidasSocketSrv: PartidasSocketService,
  ) {

  }

  ngOnInit() {
    // loading = true
    // este es el padre
    // administra todo el estado y la comunicacion con el socket
    // igual sacando esto.. no tiene nada qe ver con el null creo ajaja
    // no, hay algo extraño, no se esta completando el flujo
    // ahora reviso, que lindo dejarle estos comentisisisis son hermosos los voy a pushear te lo juro
    // jajajjaajjajajajaja
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
        client.onMessage((message)=>{
          this.handle(message);
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
    this.client.sendMessage(message);
  }

  doRoll(data : any){
    this.message = {tag :'ROLL_REQUEST', data :data}
    console.log("envio el roll al backend")
    this.send(this.message)
  }

  handle(message: { tag:any, data: any }){
    console.log(message);
    switch(message.tag) {
      case "roll": {
            this.doRoll(message.data);
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


}
