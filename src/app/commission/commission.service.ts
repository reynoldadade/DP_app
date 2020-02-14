import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommissionService {
  constructor(private http: HttpClient) {}

  getCommissionBalance(): Observable<any> {
    return this.http.get(`${environment.filmsApi}/dalexpaddies/balance`);
  }

  getOtp(): Observable<any> {
    return this.http.get(`${environment.filmsApi}/dalexpaddies/Otp`);
  }
}
