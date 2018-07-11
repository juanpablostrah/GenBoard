import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { Actor } from 'app/routes/actor/actor';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dm-dialog-delete-token',
  templateUrl: './dm-dialog-delete-token.component.html',
  styleUrls: ['./dm-dialog-delete-token.component.css']
})
export class DmDialogDeleteTokenComponent implements OnInit {

  @Input()
  actors : Actor[];

  @Output()
  onDeleteActor: EventEmitter<any>

  constructor(dialogRef: MatDialogRef<DmDialogDeleteTokenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
    this.actors = this.data.actors;
    this.onDeleteActor = new EventEmitter();
  }

  ngOnInit() {
    console.log(this.actors)
  }

  deleteToken(actor:any){
    console.log("DELETE_TOKEN", actor) //ver como tomar la data del dialog
    this.onDeleteActor.emit(actor)
  }

}
