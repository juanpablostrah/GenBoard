import { Component, OnInit, Input, Inject } from '@angular/core';
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

  constructor(dialogRef: MatDialogRef<DmDialogDeleteTokenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
    this.actors = this.data.actors;
  }

  ngOnInit() {
    console.log(this.actors)
  }

}
