import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../../core/services/storage.service';

@Component({
  standalone: true,
  selector: 'app-shared-wishlist',
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Shared Wishlist</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item *ngFor="let wish of wishes">
            <ion-label>{{ wish }}</ion-label>
            <ion-button fill="clear" slot="end" (click)="remove(wish)" aria-label="Remove">Remove</ion-button>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  `,
  imports: [CommonModule, IonicModule]
})
export class SharedWishlistPage {
  wishes: string[] = [];

  constructor(private storage: StorageService) {
    this.load();
  }

  async load() {
    this.wishes = (await this.storage.get('local_favorites')) ?? [];
  }

  async remove(item: string) {
    this.wishes = this.wishes.filter((w) => w !== item);
    await this.storage.set('local_favorites', this.wishes);
  }
}
