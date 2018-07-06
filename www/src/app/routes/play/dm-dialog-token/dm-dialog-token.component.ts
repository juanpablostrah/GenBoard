import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Actor } from 'app/routes/actor/actor';
import { ActorService } from 'app/services/actor/actor.service';
import { Router } from '@angular/router';
import { AppConfig } from 'app/config/app.config';
import { ActorType } from 'app/routes/actor/actorType';


@Component({
  selector: 'app-dm-dialog-token',
  templateUrl: './dm-dialog-token.component.html',
  styleUrls: ['./dm-dialog-token.component.css']
})
export class DmDialogTokenComponent implements OnInit {

  actor : Actor;
  name : string;

  localStorage: Storage;

  @Output()
  onNewActor: EventEmitter<any>

  constructor(dialogRef: MatDialogRef<DmDialogTokenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private actorService: ActorService,
      private router: Router){
    this.actor = new Actor;
    this.localStorage = window.localStorage;
    this.onNewActor = new EventEmitter();
  }

  ngOnInit() {
  }

  saveActor() {
    var partidaId = this.localStorage.getItem("PARTIDA_ID")
    var playerId = this.localStorage.getItem("PLAYER_ID")
    this.actor.tipoActor = ActorType.Personaje;
    let gameSetURI = `${AppConfig.endpoints.api}/gameSet/${partidaId}`
    let playerURI = `${AppConfig.endpoints.api}/player/${playerId}`
    this.actor.gameSet = gameSetURI;
    this.actor.player = playerURI;
    this.actor.dm = false;
    this.actor.name = this.name;
    this.actorService.save(this.actor).then((actor) =>  {
      console.log("response : ",actor)
      this.onNewActor.emit(actor.id)//deberia terminar en el canvas dice roller, llamando al addCylinder(0,0,actorId)
    })
  }

}
