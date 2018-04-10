import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { HeroesModule } from './heroes/heroes.module';

@NgModule({
  imports: [
    AuthModule,
    HeroesModule
  ],
  exports: [
    AuthModule,
    HeroesModule
  ],
  providers: []
})
export class RoutesModule {

}
