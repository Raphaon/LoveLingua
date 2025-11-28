import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-onboarding',
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Welcome to LoveLingua</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-text>
          <h2>Discover deeper connections</h2>
          <p>Learn more about your partner with guided quizzes and thoughtful prompts.</p>
        </ion-text>
        <ion-button expand="block" color="secondary" (click)="navigate('profile-setup')">
          Get Started
        </ion-button>
        <ion-button fill="clear" expand="block" (click)="navigate('dashboard')" aria-label="Skip onboarding">Skip</ion-button>
      </ion-content>
    </ion-page>
  `,
  imports: [CommonModule, IonicModule]
})
export class OnboardingPage {
  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigateByUrl('/' + path);
  }
}
