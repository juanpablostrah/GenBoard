import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmDialogDeleteTokenComponent } from './dm-dialog-delete-token.component';

describe('DmDialogDeleteTokenComponent', () => {
  let component: DmDialogDeleteTokenComponent;
  let fixture: ComponentFixture<DmDialogDeleteTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmDialogDeleteTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmDialogDeleteTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
