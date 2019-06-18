import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private loading: HTMLIonLoadingElement = null;
  private isLoading = false;

  constructor(
    private loadingController: LoadingController,
    public alertController: AlertController
  ) { }

  async exibirLoading() {
    this.esconderLoading();
    this.isLoading = true;
    this.loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    await this.loading.present()
      .then(() => {
        if (!this.isLoading) {
          this.esconderLoading();
        }
      });
  }

  async esconderLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
    this.loading = null;
    this.isLoading = false;
  }

  async alert(msm: string) {
    this.esconderLoading();
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: msm,
      buttons: ['OK']
    });

    await alert.present();
  }
}
