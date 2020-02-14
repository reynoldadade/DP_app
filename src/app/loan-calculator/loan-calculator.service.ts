import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanCalculatorService {

  httpHeaders = new HttpHeaders(
        {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        });
  constructor(private http: HttpClient) {
  }

  getRateScheduleAmount(data): Observable < any > {
    const httpParams = {fromObject: data};
    const options = {params: new HttpParams(httpParams), headers: this.httpHeaders};
    return this.http.post(`${environment.filmsApi}/mobile/getratescheduletotalamount`, null, options);
  }

  getRateScheduleDeduction(data): Observable < any > {
      const httpParams = {fromObject: data};
      const options = {params: new HttpParams(httpParams), headers: this.httpHeaders};
      return this.http.post(`${environment.filmsApi}/mobile/getrateschedulededuction`, null, options);
  }
}
