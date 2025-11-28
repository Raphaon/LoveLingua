import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-multiplayer-lobby',
  template: `
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Multiplayer Lobby</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-text>Invite your partner to join a live session.</ion-text>
        <ion-item>
          <ion-label position="stacked">Room code</ion-label>
          <ion-input aria-label="Room code" placeholder="ABC123"></ion-input>
        </ion-item>
        <ion-button class="ion-margin-top" expand="block">Create room</ion-button>
      </ion-content>
    </ion-page>
  `,
  imports: [CommonModule, IonicModule]
})
export class MultiplayerLobbyPage {}
