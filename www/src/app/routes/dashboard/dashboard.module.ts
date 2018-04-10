import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    TranslateModule,
    DashboardRoutingModule
  ],
  exports: [

  ],
  declarations: [
    DashboardComponent
  ],
  providers: [

  ]
})
export class DashboardModule {

}
