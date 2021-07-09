import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PinataInterfaceService {
  readonly baseURL: string = 'https://api.pinata.cloud/';

  constructor(private http: HttpClient) {
    console.log(environment.pinataJWT);
    http
      .get(this.baseURL + 'data/testAuthentication', {
        headers: { Authorization: 'Bearer ' + environment.pinataJWT },
      })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
