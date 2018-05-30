import { Component, OnInit } from '@angular/core';
import { Actor } from 'app/routes/actor/actor';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.css']
})
export class CreateActorComponent implements OnInit {

  actor : Actor;

  constructor() {
    this.actor = new Actor;
  }

  ngOnInit() {
  }


  onSubmit(f: NgForm) {
    // console.log(f)
    // this.actorService.save(this.actor).then((data) =>  {
		// 	console.log(data)
		// })
  }

}
