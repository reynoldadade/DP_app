import { TestBed } from '@angular/core/testing';

import { WithdrawFundsService } from './withdraw-funds.service';

describe('WithdrawFundsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WithdrawFundsService = TestBed.get(WithdrawFundsService);
    expect(service).toBeTruthy();
  });
});
