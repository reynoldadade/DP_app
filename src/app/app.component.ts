import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SharedService } from './shared/shared.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    public appPages = [
        {
            title: 'Home',
            url: '/landing',
            icon: 'home',
        },
        {
            title: 'Loan Calculator',
            url: '/loan-calculator',
            icon: 'calculator',
        },
        {
            title: 'Selfie Token',
            url: '/selfie-token',
            icon: 'pricetags',
        },
        {
            title: 'Pending Requests',
            url: '/pending-requests',
            icon: 'play',
        },
        {
            title: 'Loan History',
            url: '/loan-history',
            icon: 'document-outline',
        },
        {
            title: 'Commission',
            url: '/commission',
            icon: 'cash',
        },
        {
            title: 'Post Loan',
            url: '/active-loans',
            icon: 'trending-up',
        },
        {
            title: 'Commission Statement',
            url: '/commission-statement',
            icon: 'list',
        },
        {
            title: 'Go to Swift App',
            url: '/go-to-swift-pwa',
            icon: 'walk',
        },
        {
            title: 'Logout',
            url: '/home',
            icon: 'power',
        },
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
