import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Partida } from 'app/services/partidas/partida.model';
import { PartidasService } from 'app/services/partidas/partidas.service';
//import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AppConfig } from 'app/config/app.config';
import { LoggerService } from 'app/core/logger.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  partida: any;

  constructor(private partidasService: PartidasService, private route: ActivatedRoute, private router: Router)
  {
    this.partida = {
      players: [{}]
    };
  }

  save():void{
    console.log(this.partida)
    this.partidasService.save(this.partida).then((data) => {
      console.log(data)
  })


  }

}
