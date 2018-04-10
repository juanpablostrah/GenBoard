import {async, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {AuthModule} from '../auth.module';
import {TestsModule} from '../../../shared/modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import { LoginComponent } from './login.component';

describe('HeroListComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
  }));

  it('should create hero list component', (() => {
    expect(component).toBeTruthy();
  }));
});
