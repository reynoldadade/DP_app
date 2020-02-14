import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLoanPage } from './post-loan.page';

describe('PostLoanPage', () => {
  let component: PostLoanPage;
  let fixture: ComponentFixture<PostLoanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostLoanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLoanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
