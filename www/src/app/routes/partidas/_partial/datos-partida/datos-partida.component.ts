import { Component, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { Partida } from 'app/services/partidas/partida.model';
import { PartidasService } from 'app/services/partidas/partidas.service';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
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
  cantPlayerControl = new FormControl('', [Validators.required, Validators.min(2), Validators.max(20)]);

  @ViewChild(NgForm)
  form:NgForm

  localStorage: Storage;

  constructor(private partidasService: PartidasService,
    private route: ActivatedRoute, private router: Router) {
      this.localStorage = window.localStorage;
    }

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

  getCantPlayerErrorMessage(){
    return this.cantPlayerControl.hasError('required') ? 'Ingresa la cantidad maxima de jugadores' :
           this.cantPlayerControl.hasError('min') ? 'La cantidad maxima debe ser mayor a 0' :
           this.cantPlayerControl.hasError('max') ? 'La cantidad maxima debe ser menor a 20' :
            '';
  }

  save():void{
    var playerId = this.localStorage.getItem("PLAYER_ID")
    let playerOwnerURI = `${AppConfig.endpoints.api}/player/${playerId}`
    this.partida.owner = playerOwnerURI;
    this.partidasService.save(this.partida).then((data) => {
      console.log('respuesta',data)
      this.router.navigate(['/play/'+data['id']+'/1'])
    })
  }

}
