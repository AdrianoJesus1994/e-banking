import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { Injectable } from '@angular/core';

export interface RequestOptions {
  url: string;
  body?: any;
  method?: string;
  headers?: any;
  queryParams?: any;
  responseType?: string;
  serialize?: string;
}

export interface ErroHttp {
  status: number;
  tipo: TipoErro;
  mensagem: string;
}

export enum TipoErro {
  SEM_INTERNET = 0,
  API // erro enviado da api?
}

@Injectable({
  providedIn: 'root'
})
export class RestProxyService {

  constructor(
    private http: HTTP
  ) { }

  private isOnline(): boolean {
    return navigator.onLine;
  }

  request(reqOptions: RequestOptions): Promise<any> {
    if (!this.isOnline()) {
      return Promise.reject(this.prepareTypeError(TipoErro.SEM_INTERNET));
    }

    const url = reqOptions.url;
    const body = reqOptions.body;
    const method = reqOptions.method ? reqOptions.method.toUpperCase() : 'GET';

    this.http.setDataSerializer( reqOptions.serialize ? reqOptions.serialize : 'json' );

    const options = {
      headers: null,
      params: null,
    };

    // headers:
    if ( reqOptions.headers ) {
      options.headers = {};
      for (const key in reqOptions.headers) {
        if ( key ) {
          options.headers[key] = reqOptions.headers[key];
        }
      }
    }

    // query params:
    if ( reqOptions.queryParams ) {
      options.params = {};
      for (const key in reqOptions.queryParams) {
        if ( key ) {
          options.params[key] = reqOptions.queryParams[key] + '';
        }
      }
    }

    let promise: Promise<HTTPResponse>;
    switch (method) {
      case 'DELETE':
        promise = this.http.delete(url, options.params, options.headers);
        break;
      case 'PATCH':
        promise = this.http.patch(url, body, options.headers);
        break;
      case 'PUT':
        promise = this.http.put(url, body, options.headers);
        break;
      case 'POST':
        promise = this.http.post(url, body, options.headers);
        break;
      // case 'GET':
      default:
        promise = this.http.get(url, options.params, options.headers);
        break;
    }

    const responseJson = reqOptions.responseType !== 'text';

    return new Promise<any>((resolve, reject) => {
      promise
        .then((res) => {
          const response = { ...res };
          this.storeCredentials(res);
          if (responseJson && !!res.data) {
            response['json'] = JSON.parse(res.data);
          }
          resolve(response);
        })
        .catch((error: HTTPResponse) => {
          reject(this.prepareErrorHttp(error));
        });
    });
  }

  private storeCredentials( data: HTTPResponse) {
    const { client, uid } = data.headers;
    const accessToken = data.headers['access-token'];
    localStorage.setItem('CREDENTIALS', JSON.stringify({
      client,
      uid,
      accessToken
    }));
  }

  private prepareErrorHttp(erroHttp: HTTPResponse): ErroHttp {
    console.log('montarErroHttp erroHttp = ', erroHttp);

    const erro = {
      status : erroHttp.status,
      tipo: TipoErro.API,
      // TODO verificar mensagem de erro genérico
      mensagem: 'Ops! Ocorreu um erro. Tente novamente.'
    };

    return erro;
  }

  private prepareTypeError(error: TipoErro): ErroHttp {
    return {
      status: 0,
      tipo: error,
      mensagem: 'Não há conexão com a internet!'
    };
  }
}
