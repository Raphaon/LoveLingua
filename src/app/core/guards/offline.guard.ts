import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Network } from '@capacitor/network';

@Injectable({ providedIn: 'root' })
export class OfflineGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    const status = await Network.getStatus();
    if (!status.connected) {
      await this.router.navigateByUrl('/history');
      return false;
    }
    return true;
  }
}
