import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RollerControlComponent } from './roller-control.component';

describe('RollerControlComponent', () => {
  let component: RollerControlComponent;
  let fixture: ComponentFixture<RollerControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollerControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollerControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
