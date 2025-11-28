import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CoupleService } from '../../core/services/couple.service';

@Component({
  standalone: true,
  selector: 'app-couple-setup',
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Couple setup</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <form [formGroup]="form" (ngSubmit)="save()" novalidate>
          <ion-item>
            <ion-label position="floating">Partner name</ion-label>
            <ion-input formControlName="partnerName" aria-label="Partner name"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Shared goal</ion-label>
            <ion-input formControlName="goal" aria-label="Shared goal"></ion-input>
          </ion-item>
          <ion-button class="ion-margin-top" type="submit" expand="block" [disabled]="form.invalid">Save</ion-button>
        </form>
      </ion-content>
    </ion-page>
  `,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class CoupleSetupPage {
  form = this.fb.group({
    partnerName: ['', Validators.required],
    goal: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private coupleService: CoupleService) {}

  async save() {
    if (this.form.valid) {
      await this.coupleService.saveCouple(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
