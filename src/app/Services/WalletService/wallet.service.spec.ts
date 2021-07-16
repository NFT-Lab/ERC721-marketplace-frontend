import { TestBed } from '@angular/core/testing';

import { WalletService } from './wallet.service';
import { Router } from '@angular/router';
import { WalletProviderService } from '../WalletProviderService/wallet-provider.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('WalletService', () => {
  let service: WalletService;

  const fakeRouter = jasmine.createSpyObj('Router', ['navigate']);
  const fakeWalletProvider = jasmine.createSpyObj('WalletProiderService', [
    'wallet',
    'provider',
    'signer',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, value: fakeRouter },
        { provide: WalletProviderService, value: fakeWalletProvider },
      ],
    });
    TestBed.inject(Router);
    TestBed.inject(WalletProviderService);
    service = TestBed.inject(WalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
