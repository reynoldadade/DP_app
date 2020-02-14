import { IPaymentMethods } from './paymentMethods.model';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class PostLoanService {
    loading: any;
    constructor(
        private http: HttpClient,
        private loadingController: LoadingController
    ) {}

    getPaymentMethods(): Observable<any> {
        return this.http.get(`${environment.filmsApi}/paymentMethods`);
    }

    getBranches(): Observable<any> {
        return this.http.get(`${environment.filmsApi}/web/getBranch`);
    }

    requestLoan(request): Observable<any> {
        return this.http.post(
            `${environment.filmsApi}/mobile/requestloan`,
            request
        );
    }

    async presentLoadingWithOptions(message) {
        this.loading = await this.loadingController.create({
            message,
            translucent: true,
        });
        return await this.loading.present();
    }

    configureNetAmount(loanRequests): Observable<any> {
        return this.http.post(
            `${environment.filmsApi}/mobile/setnavloanidbulk`,
            loanRequests
        );
    }

    // get team members
    getTeamMembers(): Observable<any> {
        return this.http.get(
            `${environment.filmsApi}/dalexpaddies/TeamMembers`
        );
    }
}
