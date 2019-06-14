import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';

export interface UserAuth {
  account: string;
  pasword: string;
  holder: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: UserAuth;

  constructor(
    private auth: AuthService
  ) { }

  doLogin(): void {
    console.log('doLogin() called');
    if (!this.validateInput()) { return; }

    this.auth.doLogin(this.user.account, this.user.account, this.user.holder)
      .then((res) => {
        console.log('Success Login', res);
      })
      .catch((e) => {
        console.log('Login Failed', e);
      });
  }

  validateInput(): boolean {
    if (!this.user.account || this.user.account.trim() === '') {
      return;
    } else if (!this.user.pasword || this.user.pasword.trim() === '') {
      return;
    } else if (!this.user.holder) {
      return;
    }
    return true;
  }

}
