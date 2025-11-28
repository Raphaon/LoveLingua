import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-emotional-checkin',
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Emotional Check-in</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-range min="1" max="5" step="1" snaps="true" [(ngModel)]="mood" aria-label="Mood">
          <ion-label slot="start">Low</ion-label>
          <ion-label slot="end">High</ion-label>
        </ion-range>
        <ion-item>
          <ion-label position="stacked">Notes</ion-label>
          <ion-textarea aria-label="Notes" [(ngModel)]="notes"></ion-textarea>
        </ion-item>
        <ion-button expand="block" class="ion-margin-top">Save check-in</ion-button>
      </ion-content>
    </ion-page>
  `,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class EmotionalCheckinPage {
  mood = 3;
  notes = '';
}
