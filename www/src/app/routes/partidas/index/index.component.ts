import { Component, ViewChild, OnInit } from '@angular/core';
import { Partida } from 'app/services/partidas/partida.model';
import { PartidasService } from 'app/services/partidas/partidas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { AppConfig } from 'app/config/app.config';
import { LoggerService } from 'app/core/logger.service';
import { MatSort , MatSortable, MatTableDataSource } from '@angular/material';

const PARTIDA_ID = 'PARTIDA_ID';

@Component({
  selector: 'app-partidas-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit{

  @ViewChild('MatSort')
  dataSource : MatTableDataSource<Partida>;

  localStorage: Storage;

  displayedColumns : String[];

  partidas : Partida[];

  partida : Partida;

  @ViewChild('form')
  myNgForm; // just to call resetForm method

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private partidasService: PartidasService,
    private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.displayedColumns = ['id', 'name', 'history', 'cant-players', 'join']
    this.dataSource = new MatTableDataSource(this.partidas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.localStorage = window.localStorage;
  }

  ngOnInit(): void {
    var promise: Promise<Partida[]> = this.partidasService.getPartidas();
    var afterThenPromise: Promise<void> = promise.then((partidas) => {
      this.partidas = partidas;
      console.log(this.partidas)
    });
  }

  join(partida : Partida){
    this.partida = partida
    console.log(this.partida);
    //this.localStorage.setItem(PARTIDA_ID, this.partida.id.toString())
    this.localStorage.setItem(PARTIDA_ID, partida.id.toString())
    //this.partidaService.get()
    this.router.navigateByUrl('/partidas/create-actor')
  }

}
