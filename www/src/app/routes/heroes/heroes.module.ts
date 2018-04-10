import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeroRoutingModule } from './heroes-routing.module';

import { RemoveHeroDialogComponent } from './hero-list/hero-list.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes.component';
import { HeroTopComponent } from './hero-top/hero-top.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'app/shared/modules/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeroRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialModule
  ],
  declarations: [
    HeroesComponent,
    HeroListComponent,
    RemoveHeroDialogComponent,
    HeroDetailComponent,
    HeroTopComponent
  ],
  entryComponents: [
    RemoveHeroDialogComponent
  ],
  providers: []
})
export class HeroesModule {}
