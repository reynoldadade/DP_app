import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PendingRequestsService {
  constructor(private http: HttpClient) {}

  getTransactions(data): Observable<any> {
    const httpParams = { fromObject: data };
    const options = { params: new HttpParams(httpParams) };
    return this.http.get(
      `${environment.filmsApi}/dalexpaddies/PendingDeals`,
      options
    );
  }
}
