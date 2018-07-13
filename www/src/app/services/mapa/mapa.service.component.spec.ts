import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mapa.ServiceComponent } from './mapa.service.component';

describe('Mapa.ServiceComponent', () => {
  let component: Mapa.ServiceComponent;
  let fixture: ComponentFixture<Mapa.ServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mapa.ServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mapa.ServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
