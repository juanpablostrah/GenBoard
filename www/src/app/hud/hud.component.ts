import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

const AUTH_TOKEN = 'AUTH_TOKEN';

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

  constructor(private router: Router) {}

  @ViewChild('sidenav')
  private sidenav: MatSidenav;

  public showMenu: boolean = false;

  logout(){
    console.log("cerrando sesion")
    localStorage.removeItem(AUTH_TOKEN);
    this.router.navigateByUrl('/auth')
  }

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
    title:    'Partidas',
    sublist:  [{
      link:   '/partidas/create',
      title:  'Crear'
    },{
      link:   '/partidas',
      title:  'Listado Partidas'
    }]
  }]
}
