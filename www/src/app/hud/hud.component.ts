import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  templateUrl: './hud.component.html',
  styleUrls: [
    './styles/stepper.scss',
    './styles/layout.scss',
    './styles/navbar.scss',
    './styles/sidenav.scss',
    './styles/forms.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class HUDComponent implements  AfterViewInit{

  constructor() {

  }

  @ViewChild('sidenav')

  private sidenav: MatSidenav;

  public showMenu: boolean = false;

  ngAfterViewInit(): void {

  }

  //TODO revisar este evento
  onResize(event: any): void {

  }
  //TODO revisar, no es correcto resolver por atributo title
  setStep(title: any): void {

  }
  //TODO revisar, no se deberia cerrar el sidebar al presionar un elemento
  hideSide(): void {

  }

  menuList = [{
    icon:     'dashboard',
    title:    'Dashboard',
    link:     '/',
  },{
    icon:     'business',
    title:    'Entidades',
    sublist:  [{
      link:   '/entidad1',
      title:  'Entidad1'
    },{
      link:   '/partidas',
      title:  'partidas'
    }]
  },{
    icon:     'business',
    title:    'Entidades2',
    sublist:  [{
      link:   '/entidad3',
      title:  'Entidad3'
    },{
      link:   '/entidad4',
      title:  'Entidad4'
    }]
  }]
}
