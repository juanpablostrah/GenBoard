import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { HeroesModule } from './heroes/heroes.module';
import { NgForm } from '@angular/forms';

@NgModule({
  imports: [
    AuthModule,
    HeroesModule
  ],
  exports: [
    NgForm,
    AuthModule,
    HeroesModule
  ],
  providers: []
})
export class RoutesModule {

}
