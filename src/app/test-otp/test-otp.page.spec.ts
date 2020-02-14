import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOtpPage } from './test-otp.page';

describe('TestOtpPage', () => {
  let component: TestOtpPage;
  let fixture: ComponentFixture<TestOtpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestOtpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestOtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
