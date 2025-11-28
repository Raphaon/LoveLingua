import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CoupleService } from '../../core/services/couple.service';

@Component({
  standalone: true,
  selector: 'app-couple-comparison',
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Couple comparison</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item *ngFor="let trait of overlaps">
            <ion-label>
              <h3>{{ trait.label }}</h3>
              <p>{{ trait.detail }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  `,
  imports: [CommonModule, IonicModule]
})
export class CoupleComparisonPage {
  overlaps: { label: string; detail: string }[] = [];

  constructor(private coupleService: CoupleService) {
    this.load();
  }

  private async load() {
    this.overlaps = await this.coupleService.compareCouplePreferences();
  }
}
