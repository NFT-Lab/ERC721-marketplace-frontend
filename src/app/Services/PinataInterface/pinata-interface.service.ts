import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PinataInterfaceService {
  readonly baseURL: string = 'https://api.pinata.cloud/';

  constructor(private http: HttpClient) {
    http.get(this.baseURL + 'data/testAuthentication', {
      headers: { Authorization: 'Bearer ' + environment.pinataJWT },
    });
  }

  addFile(
    file: File,
    metadata: { name: string; categories: string[] }
  ): Promise<Object> {
    let data = new FormData();
    data.append('file', file);
    if (metadata) data.append('pinataMetadata', JSON.stringify(metadata));
    return this.http
      .post(this.baseURL + 'pinning/pinFileToIPFS', data, {
        headers: {
          Authorization: 'Bearer ' + environment.pinataJWT,
        },
      })
      .toPromise();
  }

  addJson(json: object): Promise<Object> {
    return this.http
      .post(this.baseURL + 'pinning/pinJSONToIPFS', json, {
        headers: {
          Authorization: 'Bearer ' + environment.pinataJWT,
        },
      })
      .toPromise();
  }
}
