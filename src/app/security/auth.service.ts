import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { config } from 'process';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor() {}

    getToken() {
        return sessionStorage.getItem('token');
    }
}
