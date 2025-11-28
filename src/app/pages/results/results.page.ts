import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { QuizService } from '../../core/services/quiz.service';
import { TestResult } from '../../core/models/test-result.model';

@Component({
  standalone: true,
  selector: 'app-results',
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Results</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-card *ngFor="let item of results">
          <ion-card-header>
            <ion-card-title>{{ item.title }}</ion-card-title>
            <ion-card-subtitle>{{ item.date | date }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            {{ item.summary }}
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  `,
  imports: [CommonModule, IonicModule]
})
export class ResultsPage {
  results: TestResult[] = [];

  constructor(private quizService: QuizService) {
    this.load();
  }

  private async load() {
    this.results = await this.quizService.loadResults();
  }
}
