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
import { ActorService } from 'app/services/actor/actor.service';
import { HttpClient } from '@angular/common/http';
import { MapaService } from 'app/services/mapa/mapa.service.component';
import { AppConfig } from 'app/config/app.config';

@Component({
  selector: 'app-dm-panel',
  templateUrl: './dm-panel.component.html',
  styleUrls: ['./dm-panel.component.css']
})
export class DmPanelComponent implements OnInit {
  localStorage: Storage;

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
  onSetFile: EventEmitter<any>

  @Output()
  onInitiative: EventEmitter<any>

  @Output()
  onHistoryMode: EventEmitter<any>

  @Output()
  onCombatMode: EventEmitter<any>

  @Output()
  onHandleNewPersonaje: EventEmitter<any>

  @Output()
  onHandleDeletePersonaje: EventEmitter<any>

  maps : any[];
  selectedFile: File;

  yourTurn : boolean;

  private subscription: any;

  constructor(
    private partidasService: PartidasService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private mapaService: MapaService
  ) {
    this.guests = [];
    this.actors = [];
    this.onSetActors = new EventEmitter();
    this.onSetMap = new EventEmitter();
    this.onInitiative = new EventEmitter();
    this.onCombatMode = new EventEmitter();
    this.onHistoryMode = new EventEmitter();
    this.onHandleNewPersonaje = new EventEmitter();
    this.onHandleDeletePersonaje = new EventEmitter();
    this.onSetFile = new EventEmitter();
    this.yourTurn = false;
    this.localStorage = window.localStorage;
  }

  openDeleteTokenDialog(): void {
    let dialogRef = this.dialog.open(DmDialogDeleteTokenComponent, {
      width: '500px',
      data: { actors: this.actors }
    });
    const sub = dialogRef.componentInstance.onDeleteActor.subscribe((data:any) => {
      console.log("DELETE_DIALOG",data)
      this.onHandleDeletePersonaje.emit(data);
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

  setMaps(maps:any){
    console.log("MAPAS", maps)
    this.maps = maps;
  }

  addMap(map:any){
    console.log("MAPAS", map)
    this.maps.push(map)
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
    var file:File = event.target.files[0];
    console.log("EVENT", event);
    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      //this.selectedFile = event.target.files[0]
      //console.log(this.selectedFile);
      //this.maps.push(this.selectedFile);
      var partidaId = this.localStorage.getItem("PARTIDA_ID")
      let gameSetURI = `${AppConfig.endpoints.api}/gameSet/${partidaId}`
      this.mapaService.save({
        base64Data: myReader.result,
        name: file.name,
        gameSet: gameSetURI
      }).then(mapa => {
        this.onSetFile.emit(mapa)
      })
    }
    myReader.readAsDataURL(file)

    //this.http.post()
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
    this.subscription = this.route.params
    .subscribe(params => {
      var partidaId = params['partidaId'];
      this.partidasService.get(partidaId).then(partida => {
        console.log("INITIATIVE", partida.initiative)
        this.onCombatMode.emit(this.actors[0].id)
      })
     })
  }

  enabledTurn(){
    console.log("SETEO TURNO EN TRUE")
    this.yourTurn = true;
  }

}
