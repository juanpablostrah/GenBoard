import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmDialogTokenComponent } from './dm-dialog-token.component';

describe('DmDialogTokenComponent', () => {
  let component: DmDialogTokenComponent;
  let fixture: ComponentFixture<DmDialogTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmDialogTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmDialogTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
