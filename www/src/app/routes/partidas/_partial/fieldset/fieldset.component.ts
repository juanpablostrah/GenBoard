import { Component }     from '@angular/core';
import { ViewChild }     from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { Input }         from '@angular/core';
import { Output }        from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Partida } from 'app/services/partidas/partida.model';
import { PartidasService } from 'app/services/partidas/partidas.service';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AppConfig } from 'app/config/app.config';
import { LoggerService } from 'app/core/logger.service';
import { NgForm } from '@angular/forms';

import { DatosPartidaComponent } from '../datos-partida/datos-partida.component';
import { PlayersComponent } from '../players/players.component';

@Component({
  selector: 'app-partidas-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.scss']
})
export class FieldsetComponent implements AfterViewInit {

  @Input()
  partida:any

  @Output()
  onFinish: EventEmitter<void>

  @ViewChild(DatosPartidaComponent)
  datosPartida:DatosPartidaComponent

  @ViewChild(PlayersComponent)
  players:PlayersComponent

  datosPartidaForm:NgForm
  playersForm:NgForm

  constructor(
    private changeDetectorRef:ChangeDetectorRef
  ) {
    this.onFinish = new EventEmitter();
  }

  onFinishCallback() {
    this.onFinish.emit()
  }

  ngAfterViewInit() {
    this.datosPartidaForm = this.datosPartida.form
    this.playersForm = this.players.form
    this.changeDetectorRef.detectChanges();
  }


}
