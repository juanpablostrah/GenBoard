import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { AppConfig } from './config/app.config';
import { MatSnackBar } from '@angular/material';

declare const Modernizr;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(
    private translateService: TranslateService,
    private title: Title,
    private meta: Meta,
    private snackBar: MatSnackBar,
    private router: Router
  ) {

    this.translateService = translateService;
    this.translateService.setDefaultLang('es');
    this.translateService.use('es');
    this.title.setTitle('GenBoard');
    this.checkBrowserFeatures();
  }

  checkBrowserFeatures() {
    let supported = true;
    for (const feature in Modernizr) {
      if (Modernizr.hasOwnProperty(feature) &&
        typeof Modernizr[feature] === 'boolean' && Modernizr[feature] === false) {
        supported = false;
        break;
      }
    }
    if (!supported) {
      this.translateService.get(['updateBrowser']).subscribe((texts) => {
        this.snackBar.open(texts['updateBrowser'], 'OK');
      });
    }
    return supported;
  }
}
