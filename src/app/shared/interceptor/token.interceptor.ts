import { HttpInterceptor, HttpHandler, HttpRequest, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from "@angular/common/http";
import { KjkApiService } from "../services/kjk-api.service";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, switchMap, finalize, filter, take, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private kjkApiService: KjkApiService) { }

  isRefreshingToken: boolean = false;
  tokenRefreshSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {

    return next.handle(this.addTokenToRequest(request))
      .pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>err).status) {
              case 401:
                return this.handle401Error(request, next);
              case 400:
                return <any>this.kjkApiService.logout();
            }
          } else {
            return throwError(err);
          }
        }));
  }
  
  private addTokenToRequest(request: HttpRequest<any>) : HttpRequest<any> {
    let currentUser = this.kjkApiService.currentUserValue;

    if (currentUser && currentUser.auth_token) {
        request = request.clone({
            setHeaders: { 
                Authorization: `Bearer ${currentUser.auth_token}`
            }
        });
    }
  
    return request;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    if(!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      
      this.tokenRefreshSubject.next(false);

      return this.kjkApiService.refreshToken()
        .pipe(
          switchMap((isSuccess: boolean) => {
            if(isSuccess) {
              this.tokenRefreshSubject.next(isSuccess);
              return next.handle(this.addTokenToRequest(request));
            }

            return <any>this.kjkApiService.logout();
          }),
          catchError(err => {
            return <any>this.kjkApiService.logout();
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        );
    } else {
      this.isRefreshingToken = false;

      return this.tokenRefreshSubject
        .pipe(filter(token => token != null),
          take(1),
          switchMap( result => {
            if (result){
              return next.handle(this.addTokenToRequest(request));  
            }else {
              return throwError("error");
            }
        }));
    }
  }
}