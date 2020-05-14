import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IChangePassword } from './change-password.interface';

@Injectable({
    providedIn: 'root',
})
export class ChangePasswordService {
    constructor(private http: HttpClient) {}

    changePassword(data: IChangePassword): Observable<any> {
        const httpParams = new HttpParams()
            .set('userid', data.userid.trim())
            .set('oldpass', data.oldpass.trim())
            .set('newpass', data.newpass.trim());

        const options = { params: httpParams };
        return this.http.post(
            `${environment.filmsApi}/web/changepassword`,
            null,
            options
        );
    }
}
