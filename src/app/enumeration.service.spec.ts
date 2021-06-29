import { TestBed } from '@angular/core/testing';

import { EnumerationService } from './enumeration.service';

describe('EnumerationServiceService', () => {
  let service: EnumerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnumerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
