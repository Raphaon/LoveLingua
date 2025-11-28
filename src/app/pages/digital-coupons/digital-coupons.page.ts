import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-digital-coupons',
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Digital Coupons</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-card *ngFor="let coupon of coupons">
          <ion-card-header>
            <ion-card-title>{{ coupon.title }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>{{ coupon.detail }}</ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  `,
  imports: [CommonModule, IonicModule]
})
export class DigitalCouponsPage {
  coupons = [
    { title: 'Breakfast in bed', detail: 'Redeem for a cozy morning together.' },
    { title: 'Tech-free evening', detail: 'Two hours of no screens and full attention.' }
  ];
}
