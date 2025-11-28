import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-app>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>LoveLingua</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <h1>Welcome to LoveLingua</h1>
        <p>This starter app is ready for Ionic build and Android sync.</p>
      </ion-content>
    </ion-app>
  `
})
export class AppComponent {}
