import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMoreAccountsComponent } from './dialog-add-more-accounts.component';

describe('DialogAddMoreAccountsComponent', () => {
  let component: DialogAddMoreAccountsComponent;
  let fixture: ComponentFixture<DialogAddMoreAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddMoreAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddMoreAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
