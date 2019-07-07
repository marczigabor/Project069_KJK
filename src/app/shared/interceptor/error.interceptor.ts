import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { KjkApiService } from '../services/kjk-api.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(private kjkApiService: KjkApiService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
      let req = request;

        return next.handle(request)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            
            let errorMessage = '';

            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // server-side error
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
              window.alert(errorMessage);
              return throwError(errorMessage);
            }
        )
      )
  }

}

