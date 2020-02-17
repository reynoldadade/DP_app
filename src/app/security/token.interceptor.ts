import { IToken } from './token.interface';
import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorDialogService } from './error-dialog.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        public errorDialogService: ErrorDialogService,
        private router: Router,
        private sharedService: SharedService
    ) {}
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // get token
        let refreshToken: IToken;
        let token: string = sessionStorage.getItem('token');
        let expiry: number = Number(sessionStorage.getItem('expiry'));
        let rToken: string = this.sharedService.getString('rToken');
        let timeRemaining = expiry - Date.now();

        // add token to header
        if (token) {
            request = request.clone({
                headers: request.headers.set(
                    'Authorization',
                    'Bearer ' + token
                ),
            });

            if (timeRemaining > 0 && timeRemaining <= 300000) {
                console.log('almost time');
                this.sharedService.getRefreshToken(rToken).subscribe(
                    response => {
                        this.sharedService.saveTokenInfo(response);
                        refreshToken = response;
                        token = refreshToken.access_token;
                        expiry = new Date(refreshToken['.expires']).getTime();
                        rToken = refreshToken.refresh_token;
                        timeRemaining = expiry - Date.now();
                    },
                    () => {
                        timeRemaining = 0;
                        this.router.navigate(['home']);
                    }
                );
            }
        }
        // check and add content type

        const ignore =
            request.body !== null &&
            request.body.toString() === '[object FormData]';
        if (ignore) {
            return next.handle(request);
        }
        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                headers: request.headers.set(
                    'Content-Type',
                    'application/json'
                ),
            });
        }

        // add accept type
        if (!request.headers.has('Accept')) {
            request = request.clone({
                headers: request.headers.set('Accept', 'application/json'),
            });
        }
        return next.handle(request).pipe(
            // map((event: HttpEvent<any>) => {
            //     if (event instanceof HttpResponse) {
            //         console.log('event--->>>', event);
            //     }
            //     return event;
            // }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.router.navigate(['home']);
                    this.sharedService.presentToast('App has timed out');
                }
                return throwError(error);
            })
        );
    }
}
