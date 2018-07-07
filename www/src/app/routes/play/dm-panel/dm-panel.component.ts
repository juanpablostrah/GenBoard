import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { Player } from 'app/routes/player/player';
import { PartidasService } from 'app/services/partidas/partidas.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DmDialogComponent } from '../dm-dialog/dm-dialog.component';
import { Actor } from 'app/routes/actor/actor';
import { EventEmitter } from '@angular/core';
import { DmDialogTokenComponent } from 'app/routes/play/dm-dialog-token/dm-dialog-token.component';
import { DmDialogDeleteTokenComponent } from 'app/routes/play/dm-dialog-delete-token/dm-dialog-delete-token.component';

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
  dmActors : Actor[];

  @Input()
  onSetActors: EventEmitter<Actor[]>

  @ViewChild('dmDialog')
  dmDialog: DmDialogComponent

  @Output()
  onSetMap: EventEmitter<File>

  @Output()
  onInitiative: EventEmitter<any>

  @Output()
  onHistoryMode: EventEmitter<any>

  @Output()
  onCombatMode: EventEmitter<any>

  @Output()
  onHandleNewPersonaje: EventEmitter<any>

  maps : File[];
  selectedFile: File;

  yourTurn : boolean;

  private subscription: any;

  constructor(
    private partidasService: PartidasService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar
  ) {
    this.guests = [];
    this.actors = [];
    this.onSetActors = new EventEmitter();
    this.onSetMap = new EventEmitter();
    this.onInitiative = new EventEmitter();
    this.onCombatMode = new EventEmitter();
    this.onHistoryMode = new EventEmitter();
    this.onHandleNewPersonaje = new EventEmitter();
    this.maps = [];
    this.yourTurn = false;
  }

  openDeleteTokenDialog(): void {
    let dialogRef = this.dialog.open(DmDialogDeleteTokenComponent, {
      width: '500px',
      data: { actors: this.actors }
    });
    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
    });
  }

  openTurnDialog(): void {
    let dialogRef = this.dialog.open(DmDialogComponent, {
      width: '600px',
      data: { actors: this.actors }
    });
    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
    });
  }

  openAddTokenDialog(): void {
    let dialogRef = this.dialog.open(DmDialogTokenComponent, {
      width: '600px',
      data: { actors: this.actors }
    });
    const sub = dialogRef.componentInstance.onNewActor.subscribe((data:any) => {
     console.log(data)
     this.onHandleNewPersonaje.emit();
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
    // this.subscription = this.route.params.subscribe(params => {
    // var partidaId = params['partidaId']
    // console.log('obteniendo partida: '+ partidaId);
    //   var promise: Promise<Actor[]> = this.partidasService.getActors(partidaId);
    //   var afterThenPromise: Promise<void> = promise.then((actors) => {
    //     console.log(actors);
    //     this.actors = actors;
    //     //this.dmDialog.setActors(actors);
    //   });
    // });
  }

  darTurno(){
    this.openTurnDialog();
  }

  agregarPersonaje(){
    this.openAddTokenDialog();
  }

  borrarPersonaje(){
    this.openDeleteTokenDialog();
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

  public iniciative(){
    if(this.actors.length < 2){
        this.snackBar.open('No hay suficiente jugadores para comenzar', '', {duration:5000});
    }
    else{
      this.actors[0].id
      this.onInitiative.emit()
    }
  }

  historyMode(){
    this.onHistoryMode.emit()
  }

  combatMode(){
    this.onCombatMode.emit(this.actors[0].id)
  }

  enabledTurn(){
    console.log("SETEO TURNO EN TRUE")
    this.yourTurn = true;
  }

}
