import { TestBed } from '@angular/core/testing';

import { CommissionStatementService } from './commission-statement.service';

describe('CommissionStatementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommissionStatementService = TestBed.get(CommissionStatementService);
    expect(service).toBeTruthy();
  });
});
