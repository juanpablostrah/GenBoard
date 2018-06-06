import { Component, OnInit } from '@angular/core';
import { Actor } from 'app/routes/actor/actor';
import { NgForm } from '@angular/forms';
import { ActorService } from 'app/services/actor/actor.service';
import { ActorType } from 'app/routes/actor/actorType';
import { Router } from '@angular/router';

const ACTOR_ID = 'ACTOR_ID';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.css']
})
export class CreateActorComponent implements OnInit {

  localStorage: Storage;

  actor : Actor;

  constructor(private actorService: ActorService,
    private router: Router,) {
    this.actor = new Actor;
    this.localStorage = window.localStorage;
  }

  ngOnInit() {}

  save() {
    this.actor.tipoActor = ActorType.PERSONAJE;
    this.actorService.save(this.actor).then((data) =>  {
      console.log(data)
      console.log(this.actor.id)
      this.localStorage.setItem(ACTOR_ID, this.actor.id.toString())
		})
    var partidaId = this.localStorage.getItem("PARTIDA_ID")
    var actorId = this.localStorage.getItem("ACTOR_ID")
    this.router.navigateByUrl('/play/'+ partidaId + actorId )
  }

}
