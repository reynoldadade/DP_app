import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionStatementPage } from './commission-statement.page';

describe('CommissionStatementPage', () => {
  let component: CommissionStatementPage;
  let fixture: ComponentFixture<CommissionStatementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionStatementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionStatementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
