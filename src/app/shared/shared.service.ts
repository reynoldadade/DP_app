import { EventEmitter, Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { IToken } from '../security/token.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableInput } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    loading;
    constructor(
        public loadingController: LoadingController,
        public toastController: ToastController,
        private http: HttpClient
    ) {}

    open() {
        this.loadingController
            .create({
                message: 'Loading',
            })
            .then(event => {
                this.loading = event;
                this.loading.present();
            });
    }

    close() {
        if (this.loading) {
            this.loading.dismiss();
        }
    }

    saveUser(item) {
        sessionStorage.setItem('user', item);
    }

    getUser(item) {
        const user = sessionStorage.getItem(item);
        return JSON.parse(user);
    }

    saveItem(name, item) {
        const itemString = JSON.stringify(item);
        sessionStorage.setItem(name, itemString);
    }

    getItem(name) {
        const item = sessionStorage.getItem(name);
        return JSON.parse(item);
    }

    saveString(name, item) {
        sessionStorage.setItem(name, item);
    }

    getString(name) {
        const item = sessionStorage.getItem(name);
        return item;
    }

    async presentToast(message) {
        const toast = await this.toastController.create({
            message,
            duration: 2000,
        });
        toast.present();
    }

    saveTokenInfo(data: IToken) {
        const expiry = new Date(data['.expires']).getTime();
        console.log(expiry, 'expiry');
        sessionStorage.setItem('token', data.access_token);
        sessionStorage.setItem('userCode', data.userName);
        sessionStorage.setItem('expiry', expiry.toString());
        sessionStorage.setItem('rToken', data.refresh_token);
    }

    getRefreshToken(): Observable<any> {
        const body = {
            grant_type: 'refresh_token',
            refresh_token: sessionStorage.getItem('rToken'),
        };
        return this.http.post(`${environment.filmsApi}/token`, body);
    }

    getUserInfo(): Observable<any> {
        return this.http.get(`${environment.filmsApi}/dalexpaddies/userInfo`);
    }

    getPhoneNumber(): string {
        const identityObject: Array<any> = JSON.parse(
            sessionStorage.getItem('userInfo')
        );
        return identityObject[5].Value;
    }
}
