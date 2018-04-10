import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent} from './auth.component';
import { LoginComponent} from './login/login.component';

@NgModule({
  imports: [
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
