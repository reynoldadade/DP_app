import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared/shared.service';
import {SelfieTokenService} from './selfie-token.service';

@Component({
  selector: 'app-selfie-token',
  templateUrl: './selfie-token.page.html',
  styleUrls: ['./selfie-token.page.scss'],
})
export class SelfieTokenPage implements OnInit {
  token = '';
  user;
  spinner;
  constructor(private sharedService: SharedService, private selfieTokenService: SelfieTokenService) {
  }

  ngOnInit() {
  }

    ionViewDidEnter() {
      this.spinner = true;
      this.user = sessionStorage.getItem('userCode');
      console.log(this.user);
      if (this.user) {
          this.getToken();
      } else  {
          this.sharedService.presentToast('Login to generate token');
          this.spinner = false;
      }

    }

    copyToClipboard(item) {
        document.addEventListener('copy', (e: ClipboardEvent) => {
            e.clipboardData.setData('text/plain', (item));
            e.preventDefault();
            document.removeEventListener('copy', null);
        });
        document.execCommand('copy');
        this.sharedService.presentToast(`copied token: ${item}`);
    }

    getToken() {
        this.spinner = true;
        this.selfieTokenService.getToken(this.user).subscribe((response) => {
                this.token = response;
                console.log(response);
                this.spinner = false;
            },
            (error1) => {
            console.log(error1)
                this.sharedService.presentToast('Network Error');
                this.spinner = false;
            } );
    }

}
