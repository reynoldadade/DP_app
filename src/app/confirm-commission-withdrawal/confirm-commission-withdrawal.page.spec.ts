import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCommissionWithdrawalPage } from './confirm-commission-withdrawal.page';

describe('ConfirmCommissionWithdrawalPage', () => {
  let component: ConfirmCommissionWithdrawalPage;
  let fixture: ComponentFixture<ConfirmCommissionWithdrawalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmCommissionWithdrawalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCommissionWithdrawalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
