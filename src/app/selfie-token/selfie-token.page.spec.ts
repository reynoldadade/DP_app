import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfieTokenPage } from './selfie-token.page';

describe('SelfieTokenPage', () => {
  let component: SelfieTokenPage;
  let fixture: ComponentFixture<SelfieTokenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfieTokenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfieTokenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
