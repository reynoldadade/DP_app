import { TestBed } from '@angular/core/testing';

import { PendingRequestsService } from './pending-requests.service';

describe('PendingRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PendingRequestsService = TestBed.get(PendingRequestsService);
    expect(service).toBeTruthy();
  });
});
