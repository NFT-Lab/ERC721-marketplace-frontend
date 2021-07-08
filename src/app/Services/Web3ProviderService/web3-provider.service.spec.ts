import { TestBed } from '@angular/core/testing';

import { Web3ProviderService } from './web3-provider.service';

describe('Web3ProviderService', () => {
  let service: Web3ProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Web3ProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
