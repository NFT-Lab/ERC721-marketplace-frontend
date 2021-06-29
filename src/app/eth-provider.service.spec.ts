import { TestBed } from '@angular/core/testing';

import { EthProviderService } from './eth-provider.service';

describe('EthProviderServiceService', () => {
  let service: EthProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EthProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
