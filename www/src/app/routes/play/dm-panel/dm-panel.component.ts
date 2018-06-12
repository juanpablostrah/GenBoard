import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { Player } from 'app/routes/player/player';
import { PartidasService } from 'app/services/partidas/partidas.service';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DmDialogComponent } from '../dm-dialog/dm-dialog.component';
import { Actor } from 'app/routes/actor/actor';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-dm-panel',
  templateUrl: './dm-panel.component.html',
  styleUrls: ['./dm-panel.component.css']
})
export class DmPanelComponent implements OnInit {

  guests : Player[];

  @Input()
  actors : Actor[];

  @Input()
  onSetActors: EventEmitter<Actor[]>

  @ViewChild('dmDialog')
  dmDialog: DmDialogComponent

  @Output()
  onSetMap: EventEmitter<File>

  maps : File[];
  selectedFile: File;

  private subscription: any;

  constructor(
    private partidasService: PartidasService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.guests = [];
    this.actors = [];
    this.onSetActors = new EventEmitter();
    this.onSetMap = new EventEmitter();
    this.maps = []
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DmDialogComponent, {
      width: '600px',
      data: { actors: this.actors }
    });
    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
    });
  }

  public handleSetMap(actors:Actor[]){
    console.log("setting actors")
    //this.dmDialog.setActors(actors);
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
    var partidaId = params['partidaId']
    console.log('obteniendo partida: '+ partidaId);
      var promise: Promise<Actor[]> = this.partidasService.getActors(partidaId);
      var afterThenPromise: Promise<void> = promise.then((actors) => {
        console.log(actors);
        this.actors = actors;
        //this.dmDialog.setActors(actors);
      });
    });
  }

  darTurno(){
    this.openDialog();
  }

  public setMap(map :File){
    console.log("setting Map");
    this.onSetMap.emit(map);
  }

  public saveMap(event) {
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile);
      this.maps.push(this.selectedFile);
  }

}
