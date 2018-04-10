import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HUDRoutingModule } from './hud-routing.module';
import { HUDComponent } from './hud.component';
import { MaterialModule } from 'app/shared/modules/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    HUDRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    HUDComponent
  ],
  entryComponents: [
  ],
  providers: []
})
export class HUDModule {}
