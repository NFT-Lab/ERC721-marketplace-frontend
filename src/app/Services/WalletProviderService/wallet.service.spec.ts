import { TestBed } from '@angular/core/testing';

import { WalletProviderService } from './wallet-provider.service';
import { Router } from '@angular/router';

describe('WalletProviderService', () => {
  let service: WalletProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    TestBed.inject(Router);
    TestBed.inject(Router);
    service = TestBed.inject(WalletProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
