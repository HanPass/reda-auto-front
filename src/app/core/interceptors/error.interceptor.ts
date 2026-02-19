import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NotifyService } from '../services/notify.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notify: NotifyService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notify.error(error.error?.message ?? 'Une erreur est survenue.');
        return throwError(() => error);
      })
    );
  }
}
