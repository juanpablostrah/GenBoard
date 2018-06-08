import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Actor } from 'app/routes/actor/actor';
import { NgForm } from '@angular/forms';
import { ActorService } from 'app/services/actor/actor.service';
import { PartidasService } from 'app/services/partidas/partidas.service';
import { ActorType } from 'app/routes/actor/actorType';
import { Router } from '@angular/router';
import { ActorListComponent } from 'app/routes/play/actor-list/actor-list.component';

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

  ngOnInit() {}



  save() {
    var partidaId = this.localStorage.getItem("PARTIDA_ID")
    this.actor.tipoActor = ActorType.PERSONAJE;
    var partidaGet = this.partidaService.get(partidaId).then((partida) => {
      console.log("partida id: ", partidaId)
      //this.actor.partida = 2
      //this.actor.partida = partida
      // this.actor.gameSet = {
      //   id: 5,
      //   name: 'nada'
      // };
      this.actorService.save(this.actor).then((data) =>  {
        console.log("response : ",data)
        this.onSetActor.emit(data)
        this.router.navigateByUrl('/play/'+ partidaId +"/1" )
        //this.localStorage.setItem(ACTOR_ID, this.actor.id.toString())
      })
    }

    )
    //var actorId = this.localStorage.getItem("ACTOR_ID")
    //this.onSetActor.emit(this.actor)

  }
}
