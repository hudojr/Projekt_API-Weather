import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  loadingDialog: any

  constructor(public loadingController: LoadingController, public toastController: ToastController) { }

    //funkcia Toast pre Tab3
    async presentToastClear() {
      const toast = await this.toastController.create({
        message: 'Your favorite locations have been removed.',
        duration: 1500
      });
      toast.present();
    }

  //funkcia Toast pre Tab2
  async presentToastForecast() {
    const toast = await this.toastController.create({
      message: 'Your favorite forecast have been saved.',
      duration: 1500
    });
    toast.present();
  }

  //funkcia Toast pre Tab1
  async presentToastWeather() {
    const toast = await this.toastController.create({
      message: 'Your favorite location have been saved.',
      duration: 1500
    });
    toast.present();
  }

  //funkcia LoadingDialogu pre Tab2
  async presentLoadingForecast() {
    this.loadingDialog = await this.loadingController.create(
      {
        message: 'Loading forecast.',
      });
    await this.loadingDialog.present();
  }


  //funkcia LoadingDialogu pre Tab1
  async presentLoadingWeather() {
    this.loadingDialog = await this.loadingController.create(
      {
        message: 'Loading weather.',
      });
    return await this.loadingDialog.present();
  }

  //funkcia pre vypnutie LoadingDialogu
  async dismiss() {
    while (await this.loadingController.getTop() !== undefined) {
      await this.loadingController.dismiss();
    }
  }
}
