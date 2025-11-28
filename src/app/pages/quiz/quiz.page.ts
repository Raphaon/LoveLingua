import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../core/services/quiz.service';
import { QuestionsService } from '../../core/services/questions.service';

@Component({
  standalone: true,
  selector: 'app-quiz',
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Daily Quiz</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list *ngIf="questions.length">
          <ion-item *ngFor="let item of questions; let i = index">
            <ion-label>
              <h3>Question {{ i + 1 }}</h3>
              <p>{{ item.prompt }}</p>
              <ion-textarea aria-label="answer" [(ngModel)]="responses[i]" placeholder="Write your thoughts"></ion-textarea>
            </ion-label>
          </ion-item>
        </ion-list>
        <ion-button expand="block" color="primary" (click)="submit()">Submit answers</ion-button>
      </ion-content>
    </ion-page>
  `,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class QuizPage {
  questions: any[] = [];
  responses: string[] = [];

  constructor(private quizService: QuizService, private questionsService: QuestionsService) {
    this.load();
  }

  private async load() {
    this.questions = await this.questionsService.loadConversationQuestions('quiz');
    this.responses = this.questions.map(() => '');
  }

  async submit() {
    await this.quizService.saveResponses(this.questions, this.responses);
  }
}
