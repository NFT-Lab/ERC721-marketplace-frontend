import { TestBed } from '@angular/core/testing';

import { EthProviderServiceService } from './eth-provider-service.service';

describe('EthProviderServiceService', () => {
  let service: EthProviderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EthProviderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
