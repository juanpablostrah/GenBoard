import { Component, OnInit } from '@angular/core';
import { Actor } from 'app/routes/actor/actor';
import { NgForm } from '@angular/forms';

const ACTOR_ID = 'ACTOR_ID';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.css']
})
export class CreateActorComponent implements OnInit {

  localStorage: Storage;
  actorService: any;

  actor : Actor;

  constructor() {
    this.actor = new Actor;
  }

  ngOnInit() {
  }


  onSubmit(f: NgForm) {
    console.log(f)
    this.actorService.save(this.actor).then((data) =>  {
      this.localStorage.setItem(ACTOR_ID, this.actor.id.toString())
			console.log(data)
		})
  }

}
