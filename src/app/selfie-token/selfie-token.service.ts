import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SelfieTokenService {

  constructor(private http: HttpClient) { }

  getToken(userId): Observable<any> {
    return this.http.get(`${environment.filmsApi}/mobile/v2/SelfieToken/generate/${userId}`);
  }
}
