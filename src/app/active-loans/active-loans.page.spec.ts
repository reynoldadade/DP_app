import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveLoansPage } from './active-loans.page';

describe('ActiveLoansPage', () => {
  let component: ActiveLoansPage;
  let fixture: ComponentFixture<ActiveLoansPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveLoansPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveLoansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
