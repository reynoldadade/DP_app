import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetLegderDTO } from './commision.dto';

@Injectable({
    providedIn: 'root',
})
export class CommissionStatementService {
    constructor(private http: HttpClient) {}

    getAgentLegder(dateParams: GetLegderDTO): Observable<any> {
        const params = new HttpParams()
            .append('startDate', dateParams.startDate.toString())
            .append('endDate', dateParams.endDate.toString());

        const options = { params };
        return this.http.get(
            `${environment.filmsApi}/dalexpaddies/agentLedger`,
            options
        );
    }
}
