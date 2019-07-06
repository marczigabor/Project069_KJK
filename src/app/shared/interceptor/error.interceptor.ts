import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(request)
        .pipe(
          //retry(1),
          catchError((error: HttpErrorResponse) => {
            console.log("error interceptor");
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
          })
        )
    }
}