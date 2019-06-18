import { Router } from '@angular/router';
import { AuthService } from './../../providers/auth.service';
import { BalanceService } from './../../providers/balance.service';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/utils/dialog.service';
import User from 'src/app/models/user';
import Balance from 'src/app/models/balance';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {

  user: User;
  balance: Balance;

  constructor(
    private balanceService: BalanceService,
    private auth: AuthService,
    private dialog: DialogService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserData();
    this.balanceService.getBalance().then((res) => {
      this.dialog.esconderLoading();
      this.balance = new Balance(res.json);
      console.log('EXTRATO SUCCESS', res);
    }).catch((e) => {
      this.dialog.esconderLoading();
      this.dialog.alert(e.mensagem);
      console.error('Error ao obter EXTRATO', e);
    });
  }

  private getUserData() {
    this.user = this.auth.getUserLogged();
  }

  onLogout() {
    this.auth.doLogout();
    this.router.navigateByUrl('/');
  }

}
