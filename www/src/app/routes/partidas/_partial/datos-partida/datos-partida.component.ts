import { Component, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { Partida } from 'app/services/partidas/partida.model';
import { PartidasService } from 'app/services/partidas/partidas.service';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AppConfig } from 'app/config/app.config';
import { LoggerService } from 'app/core/logger.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-partidas-datos-partida',
  templateUrl: './datos-partida.component.html',
  styleUrls: ['./datos-partida.component.scss']
})
export class DatosPartidaComponent {
  @Input()
  partida: any

  @ViewChild(NgForm)
  form:NgForm

  constructor() {}

}
