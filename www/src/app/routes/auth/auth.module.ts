import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent} from './auth.component';
import { LoginComponent} from './login/login.component';
import { MaterialModule } from 'app/shared/modules/material.module';
import { FlexLayoutModule } from "@angular/flex-layout";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  entryComponents: [],
  providers: []
})
export class AuthModule {}
