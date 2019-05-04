import { TestBed } from '@angular/core/testing';

import { PlaidLinkService } from './plaid-link.service';

describe('PlaidLinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaidLinkService = TestBed.get(PlaidLinkService);
    expect(service).toBeTruthy();
  });
});
