import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProgressService } from '../../core/services/progress.service';
import { Quest } from '../../core/models/quest.model';

@Component({
  standalone: true,
  selector: 'app-quest-history',
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Quest history</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item *ngFor="let quest of quests">
            <ion-label>
              <h3>{{ quest.title }}</h3>
              <p>{{ quest.status }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  `,
  imports: [CommonModule, IonicModule]
})
export class QuestHistoryPage {
  quests: Quest[] = [];

  constructor(private progressService: ProgressService) {
    this.load();
  }

  private async load() {
    this.quests = await this.progressService.loadQuestHistory();
  }
}
