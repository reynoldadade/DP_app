import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { throttleTime } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class WithdrawFundsService {
    constructor(private http: HttpClient) {}

    withdrawFunds(data): Observable<any> {
        const httpParams = { fromObject: data };
        const options = { params: new HttpParams(httpParams) };
        return this.http
            .post(
                `${environment.filmsApi}/dalexpaddies/withdrawFunds`,
                null,
                options
            )
            .pipe(throttleTime(10000));
    }
}
