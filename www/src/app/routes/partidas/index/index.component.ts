import { Component, ViewChild } from '@angular/core';
import { Partida } from 'app/services/partidas/partida.model';
import { PartidasService } from 'app/services/partidas/partidas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AppConfig } from 'app/config/app.config';
import { LoggerService } from 'app/core/logger.service';

@Component({
  selector: 'app-partidas-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  @ViewChild('form') myNgForm; // just to call resetForm method

  constructor(
    private partidasService: PartidasService,
    private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }


}
