import { Component, OnInit, Input } from '@angular/core';
import { Actor } from 'app/routes/actor/actor';

@Component({
  selector: 'app-dm-dialog',
  templateUrl: './dm-dialog.component.html',
  styleUrls: ['./dm-dialog.component.css']
})
export class DmDialogComponent implements OnInit {

  @Input()
  actors : Actor[];

  constructor() {
    this.actors = [];
  }

  ngOnInit() {
  }

  setActors(actor:any){
    console.log("actores a mostrar")
    this.actors = actor
  }

}
