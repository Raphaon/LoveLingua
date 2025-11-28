import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-partner-quiz-session',
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Partner Session</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">Share how you feel</ion-label>
          <ion-textarea aria-label="Partner response" [(ngModel)]="response"></ion-textarea>
        </ion-item>
        <ion-button expand="block" class="ion-margin-top">Submit</ion-button>
      </ion-content>
    </ion-page>
  `,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class PartnerQuizSessionPage {
  response = '';
}
