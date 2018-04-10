import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Partida } from 'app/services/partidas/partida.model';
import { PartidasService } from 'app/services/partidas/partidas.service';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from 'app/config/app.config';
import { LoggerService } from 'app/core/logger.service';

@Component({
  selector: 'app-partidas-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy{
  @ViewChild('form') myNgForm; // just to call resetForm method

  partida: any;
  private subscription: any;

  constructor(
    private partidasService: PartidasService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      //TODO comprobar si se llema al listener cuando se cambia en la ruta por el mismo valor
      var partidaId = params['partidaId']
      //TODO mostrar loading
      //TODO resetear stepper
      console.log('obteniendo partida: '+ partidaId);
      this.partidasService.get(partidaId)
      .then((partida)=>{
        this.partida = partida;
        this.partida.players = [{}];
        console.log(partida);
      })
      .catch(()=>{
        console.log('partida no existe');
      })
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  update():void{
    console.log(this.partida)
  }



}
