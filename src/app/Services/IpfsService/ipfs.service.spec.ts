import { TestBed } from '@angular/core/testing';

import { IpfsService } from './ipfs.service';
import { HttpClient } from '@angular/common/http';
import { PinataInterfaceService } from '../PinataInterface/pinata-interface.service';

describe('IpfsService', () => {
  let service: IpfsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    TestBed.inject(HttpClient);
    TestBed.inject(HttpClient);
    TestBed.inject(PinataInterfaceService);
    service = TestBed.inject(IpfsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
