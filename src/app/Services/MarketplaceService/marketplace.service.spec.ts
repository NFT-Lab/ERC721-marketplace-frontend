import { TestBed } from '@angular/core/testing';

import { MarketplaceService } from './marketplace.service';
import { Router } from '@angular/router';
import { WalletProviderService } from '../WalletProviderService/wallet-provider.service';

describe('MarketplaceService', () => {
  let service: MarketplaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    TestBed.inject(Router);
    TestBed.inject(Router);
    TestBed.inject(WalletProviderService);
    service = TestBed.inject(MarketplaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
