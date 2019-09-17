import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAvailableCardsComponent } from './view-available-cards.component';

describe('ViewAvailableCardsComponent', () => {
  let component: ViewAvailableCardsComponent;
  let fixture: ComponentFixture<ViewAvailableCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAvailableCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAvailableCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
