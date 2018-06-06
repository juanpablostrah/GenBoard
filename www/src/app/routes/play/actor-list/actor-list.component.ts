import { Component, OnInit } from '@angular/core';
import { Actor } from 'app/routes/actor/actor';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {

  actorList : Actor[];

  constructor() {
    this.actorList = []
  }

  addActor(actor:any){
    this.actorList.push(actor)
  }

  ngOnInit() {
  }

}
