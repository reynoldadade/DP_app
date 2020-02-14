import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCalculatorDeductionPage } from './tab-calculator-deduction.page';

describe('TabCalculatorDeductionPage', () => {
  let component: TabCalculatorDeductionPage;
  let fixture: ComponentFixture<TabCalculatorDeductionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCalculatorDeductionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCalculatorDeductionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
