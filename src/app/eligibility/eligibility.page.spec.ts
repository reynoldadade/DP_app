import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibilityPage } from './eligibility.page';

describe('EligibilityPage', () => {
  let component: EligibilityPage;
  let fixture: ComponentFixture<EligibilityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EligibilityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibilityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
