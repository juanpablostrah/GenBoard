import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Partida } from 'app/services/partidas/partida.model';
import { PartidasService } from 'app/services/partidas/partidas.service';
//import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AppConfig } from 'app/config/app.config';
import { LoggerService } from 'app/core/logger.service';


@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent /*implements OnInit*/ {

  partida: any;

  constructor() {
    this.partida = {
      players: [{}]
    };
  }

  save():void{
    console.log(this.partida)
  }

}
