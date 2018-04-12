import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'app/app.translate.factory';
import { ProgressBarService } from 'app/core/progress-bar.service';
import { ProgressInterceptor } from 'app/shared/interceptors/progress.interceptor';
import { TimingInterceptor } from 'app/shared/interceptors/timing.interceptor';
import { APP_CONFIG } from '../app/config/app.config';
import { AppConfig } from 'app/config/app.config';
import { RoutingModule } from 'app/routing/routing.module';
import { ServicesModule } from 'app/services/services.module';
import { SharedModule } from 'app/shared/modules/shared.module';
import { CoreModule } from 'app/core/core.module';
import { AppComponent } from 'app/app.component';
import { RoutesModule } from 'app/routes/routes.module';
import { MaterialModule } from 'app/shared/modules/material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { PlayModule } from 'app/routes/play/play.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule,
    CoreModule,
    RoutingModule,
    ServicesModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [{
   provide: APP_CONFIG,
   useValue: AppConfig
  }
  , {
    provide: HTTP_INTERCEPTORS,
    useClass: ProgressInterceptor,
    multi: true,
    deps: [ProgressBarService]
  },{
    provide: HTTP_INTERCEPTORS,
    useClass: TimingInterceptor,
    multi: true
  }],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
