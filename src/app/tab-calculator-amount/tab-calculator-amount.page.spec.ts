import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCalculatorAmountPage } from './tab-calculator-amount.page';

describe('TabCalculatorAmountPage', () => {
  let component: TabCalculatorAmountPage;
  let fixture: ComponentFixture<TabCalculatorAmountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCalculatorAmountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCalculatorAmountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
