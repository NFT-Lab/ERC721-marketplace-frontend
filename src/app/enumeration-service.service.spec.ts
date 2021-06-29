import { TestBed } from '@angular/core/testing';

import { EnumerationServiceService } from './enumeration-service.service';

describe('EnumerationServiceService', () => {
  let service: EnumerationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnumerationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
