import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  private async initializeApp() {
    await this.platform.ready();
    await SplashScreen.hide();
    await StatusBar.setStyle({ style: Style.Light });
  }
}
