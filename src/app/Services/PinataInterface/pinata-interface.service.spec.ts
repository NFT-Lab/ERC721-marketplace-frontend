import { TestBed } from '@angular/core/testing';

import { PinataInterfaceService } from './pinata-interface.service';

describe('PinataInterfaceService', () => {
  let service: PinataInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinataInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
