import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Actor } from 'app/routes/actor/actor';
import { NgForm } from '@angular/forms';
import { ActorService } from 'app/services/actor/actor.service';
import { PartidasService } from 'app/services/partidas/partidas.service';
import { ActorType } from 'app/routes/actor/actorType';
import { Router } from '@angular/router';
import { ActorListComponent } from 'app/routes/play/actor-list/actor-list.component';
import { AppConfig } from 'app/config/app.config';
const ACTOR_ID = 'ACTOR_ID';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.css']
})
export class CreateActorComponent implements OnInit {

  localStorage: Storage;

  actor : Actor;

  @Output()
  onSetActor: EventEmitter<any>

  constructor(private actorService: ActorService,
    private partidaService: PartidasService,
    private router: Router,) {
    this.actor = new Actor;
    this.localStorage = window.localStorage;
    this.onSetActor = new EventEmitter();
  }

  ngOnInit() {

  }

  save() {
    var partidaId = this.localStorage.getItem("PARTIDA_ID")
    //creo que Personaje se convierte en falopa igual
    this.actor.tipoActor = ActorType.Personaje;
    let gamSetURI = `${AppConfig.endpoints.api}/gameSet/${partidaId}`
    this.actor.gameSet = gamSetURI;
    this.actorService.save(this.actor).then((actor) =>  {
      console.log("response : ",actor)
      this.onSetActor.emit(actor)
      this.router.navigateByUrl('/play/'+ partidaId + '/' + actor.id)
    })
  }
  
}
