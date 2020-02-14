import { TestBed } from '@angular/core/testing';

import { SelfieTokenService } from './selfie-token.service';

describe('SelfieTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelfieTokenService = TestBed.get(SelfieTokenService);
    expect(service).toBeTruthy();
  });
});
