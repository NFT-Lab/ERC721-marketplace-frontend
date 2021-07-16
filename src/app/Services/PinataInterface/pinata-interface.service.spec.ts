import { TestBed } from '@angular/core/testing';

import { PinataInterfaceService } from './pinata-interface.service';
import { HttpClient } from '@angular/common/http';

describe('PinataInterfaceService', () => {
  let service: PinataInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    TestBed.inject(HttpClient);
    service = TestBed.inject(PinataInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
