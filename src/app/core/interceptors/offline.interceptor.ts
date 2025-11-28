import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { from } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Network } from '@capacitor/network';

@Injectable()
export class OfflineInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(Network.getStatus()).pipe(
      switchMap((status) => {
        if (!status.connected) {
          return throwError(() => new Error('Offline mode: request deferred'));
        }
        return next.handle(req);
      }),
      catchError((err) => throwError(() => err))
    );
  }
}
