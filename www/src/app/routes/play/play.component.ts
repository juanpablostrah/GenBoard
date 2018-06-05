import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidasSocketService } from 'app/services/partidas/partidas-socket.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})

export class PlayComponent implements OnInit, OnDestroy {

  private subscription: any;
  private client: any;

  constructor(
    private route: ActivatedRoute,
    private partidasSocketSrv: PartidasSocketService
  ) {

  }

  ngOnInit() {
    // loading = true
    this.subscription = this.route.params
    .subscribe(params => {
      const partidaIdRaw = params['partidaId'];
      const partidaId = parseInt(partidaIdRaw);
      const actorIdRaw = params['actorId'];
      const actorId = parseInt(actorIdRaw);
      this.partidasSocketSrv
      .connect(partidaId, actorId)
      .subscribe((client)=>{
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

  handle(message: { tag:any, data: any }){
    console.log(message);
  }
}
