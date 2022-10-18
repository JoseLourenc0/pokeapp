import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(message: string, color: 'danger' | 'dark' | 'success' | 'primary' | 'secondary' | 'tertiary') {
    const toast = await this.toastController.create({
      message,
      duration: 700,
      color
    });

    await toast.present();

    await toast.onDidDismiss();
  }
}
