import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../../core/services/storage.service';

@Component({
  standalone: true,
  selector: 'app-profile-setup',
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Profile setup</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <form [formGroup]="profileForm" (ngSubmit)="save()" novalidate>
          <ion-item>
            <ion-label position="floating">Name</ion-label>
            <ion-input formControlName="name" aria-label="Name"></ion-input>
          </ion-item>
          <ion-note color="danger" *ngIf="profileForm.get('name')?.invalid && profileForm.get('name')?.touched">
            Name is required
          </ion-note>
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input type="email" formControlName="email" aria-label="Email"></ion-input>
          </ion-item>
          <ion-note color="danger" *ngIf="profileForm.get('email')?.invalid && profileForm.get('email')?.touched">
            Please enter a valid email
          </ion-note>
          <ion-item>
            <ion-label position="floating">Preferred Language</ion-label>
            <ion-input formControlName="language" aria-label="Preferred language"></ion-input>
          </ion-item>
          <ion-button class="ion-margin-top" type="submit" expand="block" [disabled]="profileForm.invalid">
            Save profile
          </ion-button>
        </form>
      </ion-content>
    </ion-page>
  `,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class ProfileSetupPage {
  profileForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    language: ['English']
  });

  constructor(private fb: FormBuilder, private storage: StorageService) {}

  async save() {
    if (this.profileForm.valid) {
      await this.storage.upsert('local_user_profile', this.profileForm.value);
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}
