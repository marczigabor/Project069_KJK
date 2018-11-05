import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { KjkApiService } from '../services/kjk-api.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    constructor(private kjkApiService: KjkApiService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.kjkApiService.currentUserValue;

        if (currentUser && currentUser.auth_token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.auth_token}`
                }
            });
        }

        return next.handle(request);
    }
}