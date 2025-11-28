import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-gratitude-wall',
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Gratitude Wall</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">Share gratitude</ion-label>
          <ion-textarea [(ngModel)]="entry" aria-label="Gratitude entry"></ion-textarea>
        </ion-item>
        <ion-button expand="block" class="ion-margin-top" (click)="addEntry()">Post</ion-button>
        <ion-list>
          <ion-item *ngFor="let item of entries">
            <ion-label>{{ item }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  `,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class GratitudeWallPage {
  entry = '';
  entries: string[] = [];

  addEntry() {
    if (this.entry.trim()) {
      this.entries = [this.entry, ...this.entries];
      this.entry = '';
    }
  }
}
