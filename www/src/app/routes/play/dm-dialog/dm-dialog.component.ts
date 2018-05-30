import { Component, OnInit, Input, Inject } from '@angular/core';
import { Actor } from 'app/routes/actor/actor';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { DmPanelComponent } from 'app/routes/play/dm-panel/dm-panel.component';

@Component({
  selector: 'app-dm-dialog',
  templateUrl: './dm-dialog.component.html',
  styleUrls: ['./dm-dialog.component.css']
})
export class DmDialogComponent implements OnInit {

  @Input()
  actors : Actor[];

  constructor(dialogRef: MatDialogRef<DmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
    this.actors = this.data.actors;
  }

  ngOnInit() {
    console.log(this.actors)
  }

  setActors(actor:any){
    console.log("actores a mostrar")
    //this.actors = actor
  }

}
