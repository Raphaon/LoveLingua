import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Device } from '@capacitor/device';
import { StorageService } from '../services/storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DeviceIdInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.ensureDeviceId()).pipe(
      switchMap((deviceId) => {
        const cloned = req.clone({ setHeaders: { 'X-Device-Id': deviceId } });
        return next.handle(cloned);
      })
    );
  }

  private async ensureDeviceId(): Promise<string> {
    const existing = await this.storage.get<string>('device_id');
    if (existing) {
      return existing;
    }
    const info = await Device.getId();
    const id = info?.identifier ?? uuidv4();
    await this.storage.set('device_id', id);
    return id;
  }
}
