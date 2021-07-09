import { Injectable } from '@angular/core';
import { PinataInterfaceService } from '../PinataInterface/pinata-interface.service';

@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  constructor(private pinata: PinataInterfaceService) {}
}
