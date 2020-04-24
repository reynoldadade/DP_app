import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { WithdrawFundsService } from './withdraw-funds.service';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { INetworkProviders } from './network.model';
import { throttleTime } from 'rxjs/operators';

@Component({
    selector: 'app-withdraw-funds',
    templateUrl: './withdraw-funds.page.html',
    styleUrls: ['./withdraw-funds.page.scss'],
})
export class WithdrawFundsPage implements OnInit {
    withdrawFundsForm: FormGroup;
    withdrawalAmount: string;
    phoneNumber: string;
    PROVIDERS: Array<INetworkProviders>;
    spinner = false;
    constructor(
        private fb: FormBuilder,
        private withDrawFundsService: WithdrawFundsService,
        private shared: SharedService,
        private router: Router
    ) {}

    ngOnInit() {
        this.getNetworkProviders();
        this.withdrawalAmount = sessionStorage.getItem('withdrawalAmount');
        this.phoneNumber = this.shared.getPhoneNumber();
        this.withdrawFundsForm = this.fb.group({
            amount: [
                this.withdrawalAmount,
                Validators.compose([Validators.required]),
            ],
            networkProvider: ['', Validators.required],
            otp: [
                '',
                Validators.compose([
                    Validators.minLength(6),
                    Validators.required,
                ]),
            ],
        });
    }

    withdrawFunds(form: FormGroup) {
        this.shared.presentToast('Sending request....');
        this.spinner = true;
        this.withDrawFundsService
            .withdrawFunds(form.value)
            .pipe(throttleTime(15000))
            .subscribe(
                (response) => {
                    sessionStorage.setItem(
                        'withdrawalResponse',
                        response.Message
                    );
                    this.spinner = false;
                    this.router.navigate(['confirm-commission-withdrawal']);
                },
                (error) => {
                    this.shared.presentToast('Withdrawal Failed');
                    this.spinner = false;
                }
            );
    }

    getNetworkProviders() {
        this.withDrawFundsService.getNetworkProviders().subscribe(
            (response) => {
                this.PROVIDERS = response;
            },
            (err) => {
                console.log(err);
            }
        );
    }
}
