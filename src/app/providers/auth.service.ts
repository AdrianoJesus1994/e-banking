import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { RequestOptions, RestProxyService } from './rest-proxy.service';

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
    };
    return req;
  }
}
