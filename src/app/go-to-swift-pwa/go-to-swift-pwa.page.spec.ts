import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToSwiftPwaPage } from './go-to-swift-pwa.page';

describe('GoToSwiftPwaPage', () => {
  let component: GoToSwiftPwaPage;
  let fixture: ComponentFixture<GoToSwiftPwaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoToSwiftPwaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoToSwiftPwaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
