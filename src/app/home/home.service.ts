import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    private headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: '*/*',
    });
    constructor(private http: HttpClient) {}

    login(data): Observable<any> {
        const body = new HttpParams({ fromObject: data });
        const options = { headers: this.headers };
        // console.log(body.toString());
        return this.http.post(
            `${environment.filmsApi}/token`,
            body.toString(),
            options
        );
    }

    loginToken(data): Observable<any> {
        const httpParams = { fromObject: data };
        const options = { params: new HttpParams(httpParams) };
        return this.http.get(
            `${environment.filmsApi}/dalexpaddies/login`,
            options
        );
    }

    getUser(): Observable<any> {
        return this.http.get(`${environment.filmsApi}/dalexpaddies/UserInfo`);
    }
}
