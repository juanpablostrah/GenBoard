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
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-partidas-datos-partida',
  templateUrl: './datos-partida.component.html',
  styleUrls: ['./datos-partida.component.scss']
})
export class DatosPartidaComponent {
  @Input()
  partida: any

  nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  historyControl = new FormControl('', [Validators.required, Validators.minLength(5)]);

  @ViewChild(NgForm)
  form:NgForm

  constructor() {}

  getNameErrorMessage() {
    return this.nameControl.hasError('required') ? 'Ingresa un nombre para la partida' :
           this.nameControl.hasError('minlength') ? 'Debes ingresar al menos 3 caracteres' :
            '';
  }

  getHistoryErrorMessage(){
    return this.historyControl.hasError('required') ? 'Ingresa un nombre para la historia' :
           this.historyControl.hasError('minlength') ? 'Debes ingresar al menos 5 caracteres' :
            '';
  }

}
