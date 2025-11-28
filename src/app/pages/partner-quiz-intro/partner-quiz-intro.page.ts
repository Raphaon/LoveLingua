import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-partner-quiz-intro',
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Partner Quiz</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <p>Invite your partner to answer the same questions to compare insights.</p>
        <ion-button expand="block" color="primary" (click)="start()">Start partner quiz</ion-button>
      </ion-content>
    </ion-page>
  `,
  imports: [CommonModule, IonicModule]
})
export class PartnerQuizIntroPage {
  constructor(private router: Router) {}

  start() {
    this.router.navigateByUrl('/partner-quiz-session');
  }
}
