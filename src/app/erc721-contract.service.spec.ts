import { TestBed } from '@angular/core/testing';

import { Erc721ContractService } from './erc721-contract.service';

describe('Erc721ContractService', () => {
  let service: Erc721ContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Erc721ContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
