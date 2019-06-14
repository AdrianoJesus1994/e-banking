import { Injectable } from '@angular/core';
import { RestProxyService } from './rest-proxy.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(
    private rest: RestProxyService
  ) { }

  getBalance(): Promise<any> {
    return this.rest.request({
      method: 'GET',
      url: `${environment.BASE}`,
      headers: this.prepareHeaders()
    });
  }

  private prepareHeaders() {
    // tslint:disable:object-literal-key-quotes
    const { client, uid, accessToken } = JSON.parse(localStorage.getItem('CREDENTIALS'));
    return {
      'Content-Type': 'multipart/form-data',
      'uid' : `${uid}`,
      'client': `${client}`,
      'access-token': `${accessToken}`
    };
  }
}
