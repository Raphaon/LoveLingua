import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DeviceIdInterceptor } from './core/interceptors/device-id.interceptor';
import { OfflineInterceptor } from './core/interceptors/offline.interceptor';
import { StorageService } from './core/services/storage.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), HttpClientModule, AppRoutingModule],
  providers: [
    StorageService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: DeviceIdInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: OfflineInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
