import { TestBed } from '@angular/core/testing';

import { ActiveLoansService } from './active-loans.service';

describe('ActiveLoansService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActiveLoansService = TestBed.get(ActiveLoansService);
    expect(service).toBeTruthy();
  });
});
