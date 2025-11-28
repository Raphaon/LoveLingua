import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-multiplayer-session',
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Live Session</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <p>Waiting for partner responses...</p>
        <ion-progress-bar value="0.3"></ion-progress-bar>
      </ion-content>
    </ion-page>
  `,
  imports: [CommonModule, IonicModule]
})
export class MultiplayerSessionPage {}
