import { Component, ViewChild } from '@angular/core';
import { EventEmitter }         from '@angular/core';
import { Input }                from '@angular/core';
import { Output }               from '@angular/core';
import { Partida } from 'app/services/partidas/partida.model';
import { PartidasService } from 'app/services/partidas/partidas.service';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AppConfig } from 'app/config/app.config';
import { LoggerService } from 'app/core/logger.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-partidas-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent {
  
  @Input()
  partida: any

  @ViewChild(NgForm)
  form:NgForm

  @Output()
  onFinish: EventEmitter<void>

  constructor() {
    this.onFinish = new EventEmitter();
  }

  submit():void{
    if(!this.form.valid){
      return
    }
    this.onFinish.emit()
  }

  addItem():void{
    this.partida.players.push({})
  }

}
