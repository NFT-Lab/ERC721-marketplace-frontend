import { Injectable } from '@angular/core';
import { PinataInterfaceService } from '../PinataInterface/pinata-interface.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  readonly baseURL = 'https://cloudflare.ipfs.com/ipfs/';

  constructor(
    private pinata: PinataInterfaceService,
    private http: HttpClient
  ) {}

  addFile(
    file: File,
    metadata: { name: string; categories: string[] }
  ): Promise<Object> {
    return this.pinata.addFile(file, metadata);
  }

  addJson(json: string) {
    return this.pinata.addJson(JSON.parse(json));
  }

  getFile(cid: string) {
    return this.http.get(this.baseURL + cid);
  }

  getMetadata(cid: string) {
    return this.http.get(this.baseURL + cid);
  }
}
