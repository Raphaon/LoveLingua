import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SuggestionsService } from '../../core/services/suggestions.service';

@Component({
  standalone: true,
  selector: 'app-suggestions',
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Suggestions</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-searchbar placeholder="Search" [(ngModel)]="query" aria-label="Search suggestions"></ion-searchbar>
        <ion-list>
          <ion-item *ngFor="let suggestion of filteredSuggestions()">
            <ion-label>
              <h3>{{ suggestion.title }}</h3>
              <p>{{ suggestion.description }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  `,
  imports: [CommonModule, IonicModule]
})
export class SuggestionsPage {
  suggestions: any[] = [];
  query = '';

  constructor(private suggestionsService: SuggestionsService) {
    this.load();
  }

  private async load() {
    this.suggestions = await this.suggestionsService.loadSuggestions();
  }

  filteredSuggestions() {
    const term = this.query.toLowerCase();
    return this.suggestions.filter((s) => s.title.toLowerCase().includes(term));
  }
}
