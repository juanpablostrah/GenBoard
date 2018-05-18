import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmPanelComponent } from './dm-panel.component';

describe('DmPanelComponent', () => {
  let component: DmPanelComponent;
  let fixture: ComponentFixture<DmPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
