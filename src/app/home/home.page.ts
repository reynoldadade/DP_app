import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { SharedService } from '../shared/shared.service';
import { IToken } from '../security/token.interface';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    loginForm: FormGroup;
    passwordType = 'password';
    passwordIcon = 'eye-off';
    spinner: boolean;
    complete: boolean;
    constructor(
        private fb: FormBuilder,
        private homeService: HomeService,
        private router: Router,
        public toastController: ToastController,
        private sharedService: SharedService,
        public menuCtrl: MenuController
    ) {
        this.menuCtrl.enable(false);
    }

    ngOnInit(): void {
        sessionStorage.clear();
        this.loginForm = this.fb.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
            grant_type: ['password'],
        });
    }
    login(form: FormGroup) {
        this.spinner = true;
        this.homeService.login(form.value).subscribe(
            (response: IToken) => {
                this.sharedService.saveTokenInfo(response);
                this.router.navigate(['landing']);
                this.spinner = false;
                console.log(response);
                this.getUserInfo();
            },
            error1 => {
                this.complete = false;
                console.log(error1, 'error');
                if (error1.status === 400) {
                    this.presentToast('Incorrect Credentials');
                } else {
                    this.presentToast('Network Error');
                }
                this.spinner = false;
            }
        );
    }

    hideShowPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }

    async presentToast(data) {
        const toast = await this.toastController.create({
            message: data,
            duration: 2000,
        });
        toast.present();
    }

    getUserInfo() {
        this.sharedService.getUserInfo().subscribe(response => {
            sessionStorage.setItem('userInfo', JSON.stringify(response));
            console.log(response, 'userinfo');
        });
    }
}
