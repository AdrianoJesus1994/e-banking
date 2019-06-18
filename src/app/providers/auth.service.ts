import { Injectable } from '@angular/core';
import { RestProxyService, RequestOptions } from './rest-proxy.service';
import { environment } from 'src/environments/environment';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private rest: RestProxyService
  ) { }

  private userLogged: User = null;

  doLogin(accountNumber: string, password: string, holder: number): Promise<any> {
    console.log('doLogin() called');
    const options = this.buildRequestLogin();

    // tslint:disable:no-string-literal
    options.body['account'] = accountNumber;
    options.body['password'] = password;
    options.body['holder'] = holder;
    options.serialize = 'urlencoded';

    return this.rest.request(options).then((data) => {
      this.userLogged = new User(data.json.data);
    });
  }

  doLogout() {
    console.log('doLogout() called');
    localStorage.clear();
  }

  getUserLogged() {
    return this.userLogged;
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
