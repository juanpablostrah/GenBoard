import { Component, OnInit } from '@angular/core';
import { Player } from 'app/routes/player/player';
import { PartidasService } from 'app/services/partidas/partidas.service';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DmDialogComponent } from '../dm-dialog/dm-dialog.component';


@Component({
  selector: 'app-dm-panel',
  templateUrl: './dm-panel.component.html',
  styleUrls: ['./dm-panel.component.css']
})
export class DmPanelComponent implements OnInit {

  guests : Player[];
  private subscription: any;

  constructor(
    private partidasService: PartidasService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.guests = [];
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DmDialogComponent, {
      width: '600px',
      data: 'This text is passed into the dialog!'
    });
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
    var partidaId = params['id']
    console.log('obteniendo partida: '+ partidaId);
      var promise: Promise<Player[]> = this.partidasService.getGuest(partidaId);
      var afterThenPromise: Promise<void> = promise.then((guests) => {
        console.log(guests);
        this.guests = guests;
      });
    });
  }

  showPopUp(){

  }

}
