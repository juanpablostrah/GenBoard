import { NgModule } from '@angular/core';
import { HeroService } from './hero/hero.service';
import { AuthService } from './auth/auth.service';
import { PartidasService } from './partidas/partidas.service';

@NgModule({
  imports: [
  ],
  exports: [
  ],
  providers: [
    HeroService,
    AuthService,
    PartidasService
  ]
})
export class ServicesModule {

}
