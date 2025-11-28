import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-history',
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>History</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <p>Track your previous activities and milestones.</p>
      </ion-content>
    </ion-page>
  `,
  imports: [CommonModule, IonicModule]
})
export class HistoryPage {}
