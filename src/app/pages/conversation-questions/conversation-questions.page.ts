import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { QuestionsService } from '../../core/services/questions.service';

@Component({
  standalone: true,
  selector: 'app-conversation-questions',
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Conversation Starters</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item *ngFor="let q of questions">
            <ion-label>{{ q.prompt }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  `,
  imports: [CommonModule, IonicModule]
})
export class ConversationQuestionsPage {
  questions: any[] = [];

  constructor(private questionsService: QuestionsService) {
    this.load();
  }

  private async load() {
    this.questions = await this.questionsService.loadConversationQuestions('conversation');
  }
}
