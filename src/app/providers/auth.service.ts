import { Injectable } from '@angular/core';
import { RestProxyService, RequestOptions } from './rest-proxy.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private rest: RestProxyService
  ) { }

  doLogin(accountNumber: string, password: string, holder: number): Promise<any> {
    console.log('doLogin() called');
    const options = this.buildRequestLogin();

    // tslint:disable:no-string-literal
    options.body['account'] = accountNumber;
    options.body['password'] = password;
    options.body['holder'] = holder;

    return this.rest.request(options);
  }

  doLogout() {
    console.log('doLogout() called');
    localStorage.clear();
  }

  private buildRequestLogin(): RequestOptions {
    const req: RequestOptions = {
      url: `${environment.BASE}${environment.AUTH_PATH}`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: {}
    };
    return req;
  }
}
