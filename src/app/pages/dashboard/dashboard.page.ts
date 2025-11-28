import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { SuggestionsService } from '../../core/services/suggestions.service';
import { UserProgress } from '../../core/models/user-progress.model';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar color="light">
          <ion-title>Dashboard</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Today's connection goals</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-chip color="success" *ngFor="let item of quickLinks" (click)="navigate(item.path)" role="button">
              {{ item.label }}
            </ion-chip>
          </ion-card-content>
        </ion-card>
        <ion-list>
          <ion-list-header>
            <ion-label>Recent suggestions</ion-label>
          </ion-list-header>
          <ion-item *ngFor="let idea of ideas">
            <ion-label>{{ idea.title }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  `,
  imports: [CommonModule, IonicModule]
})
export class DashboardPage {
  quickLinks = [
    { label: 'Quiz', path: 'quiz' },
    { label: 'Suggestions', path: 'suggestions' },
    { label: 'Gratitude', path: 'gratitude-wall' }
  ];
  ideas: { title: string }[] = [];

  constructor(private router: Router, private suggestions: SuggestionsService) {
    this.load();
  }

  navigate(path: string) {
    this.router.navigateByUrl('/' + path);
  }

  private async load() {
    this.ideas = await this.suggestions.loadSuggestions();
  }
}
