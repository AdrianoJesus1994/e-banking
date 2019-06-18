import { DialogService } from './../../utils/dialog.service';
import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';

export default class UserAuth {
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

  user: UserAuth = new UserAuth();

  constructor(
    private auth: AuthService,
    private dialog: DialogService
  ) { }

  doLogin(): void {
    console.log('doLogin() called');
    if (!this.validateInput()) {
      this.dialog.alert('Campos obrigatórios não foram preenchidos.');
      return;
    }

    this.dialog.exibirLoading();
    this.auth.doLogin(this.user.account, this.user.pasword, this.user.holder)
      .then((res) => {
        console.log('Success Login', res);
        this.dialog.esconderLoading();
      })
      .catch((e) => {
        console.log('Login Failed', e);
        this.dialog.alert(e.mensagem);
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
