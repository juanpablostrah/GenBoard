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
import { PlayerService } from 'app/services/player/player.service';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  partida: any;
  players: [{}];

  constructor(private partidasService: PartidasService, private route: ActivatedRoute, private router: Router,
    private playerService: PlayerService)
  {
    this.partida = {
      players: [{}]
    };
  }

  save():void{
    console.log(this.partida)
    var playerId = window.localStorage.getItem("PLAYER_ID")
    var player = this.playerService.get(playerId).then((player) =>{
        this.partida.owner = player.id;
        this.partidasService.save(this.partida).then((data) => {
          console.log(data)
        })
        //no funciona, hay que setearle la partida en el back
    })
  }

}
