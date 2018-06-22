import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Actor } from 'app/routes/actor/actor';
import { NgForm, FormControl, Validators } from '@angular/forms';
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

  nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(private actorService: ActorService,
    private partidaService: PartidasService,
    private router: Router,) {
    this.actor = new Actor;
    this.localStorage = window.localStorage;
    this.onSetActor = new EventEmitter();

  }

  ngOnInit() {

  }

  getNameErrorMessage() {
    return this.nameControl.hasError('required') ? 'Ingresa un nombre para el actor' :
           this.nameControl.hasError('minlength') ? 'Debes ingresar al menos 3 caracteres' :
            '';
  }

  save() {
    var partidaId = this.localStorage.getItem("PARTIDA_ID")
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
