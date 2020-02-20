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
    isLoading = false;
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

    async present() {
        this.isLoading = true;
        return await this.loadingController
            .create({
                translucent: true,
                message: 'Posting Loan',
            })
            .then(a => {
                a.present().then(() => {
                    console.log('presented');
                    if (!this.isLoading) {
                        a.dismiss().then(() => console.log('abort presenting'));
                    }
                });
            });
    }

    async dismiss() {
        this.isLoading = false;
        return await this.loadingController
            .dismiss()
            .then(() => console.log('dismissed'));
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
