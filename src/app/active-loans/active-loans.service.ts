import { GetActiveLoansDto } from './getActiveloans.dto';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEligibiity } from './eligibility.model';

@Injectable({
    providedIn: 'root',
})
export class ActiveLoansService {
    constructor(private http: HttpClient) {}

    getActiveLoans(data: any): Observable<any> {
        const httpParams = new HttpParams().set('id', data.id.toUpperCase());
        const options = { params: httpParams };
        return this.http.post(
            `${environment.filmsApi}/mobile/getNavStaffLoansBulk`,
            null,
            options
        );
    }

    creditCheck(data): Observable<any> {
        const httpParams = new HttpParams().set(
            'staffId',
            data.id.toUpperCase()
        );
        const options = { params: httpParams };
        return this.http.post(
            `${environment.filmsApi}/mobile/creditcheck`,
            null,
            options
        );
    }
}
