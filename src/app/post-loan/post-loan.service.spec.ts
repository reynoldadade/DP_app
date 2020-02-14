import { TestBed } from '@angular/core/testing';

import { PostLoanService } from './post-loan.service';

describe('PostLoanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostLoanService = TestBed.get(PostLoanService);
    expect(service).toBeTruthy();
  });
});
