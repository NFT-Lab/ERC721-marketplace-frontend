import { Injectable } from '@angular/core';
import { EthProviderService } from "./eth-provider.service";

@Injectable({
  providedIn: 'root'
})
export class EnumerationService {

  constructor(private ethProvider: EthProviderService) {}


}
