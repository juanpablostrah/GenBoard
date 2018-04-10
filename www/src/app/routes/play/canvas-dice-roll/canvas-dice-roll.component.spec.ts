import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasDiceRollComponent } from './canvas-dice-roll.component';

describe('CanvasDiceRollComponent', () => {
  let component: CanvasDiceRollComponent;
  let fixture: ComponentFixture<CanvasDiceRollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasDiceRollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasDiceRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
