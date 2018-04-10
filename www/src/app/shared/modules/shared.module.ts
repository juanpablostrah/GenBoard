import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
//import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    MaterialModule,
    //FlexLayoutModule,
    TranslateModule,
    ApolloModule,
    HttpLinkModule
  ],
  exports: [
    MaterialModule,
    //FlexLayoutModule,
    TranslateModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class SharedModule {
  
}
