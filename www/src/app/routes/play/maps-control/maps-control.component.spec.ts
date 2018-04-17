import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsControlComponent } from './maps-control.component';

describe('MapsControlComponent', () => {
  let component: MapsControlComponent;
  let fixture: ComponentFixture<MapsControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
