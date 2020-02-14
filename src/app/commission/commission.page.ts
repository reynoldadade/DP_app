import { Router } from '@angular/router';
import { CommissionService } from './commission.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-commission',
    templateUrl: './commission.page.html',
    styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit {
    commissionForm: FormGroup;
    userCode: string;
    commissionBalance: number;
    withdrawalForm = false;
    constructor(
        private fb: FormBuilder,
        private commissionService: CommissionService,
        private router: Router
    ) {}

    ngOnInit() {
        this.commissionForm = this.fb.group({
            amount: [
                '',
                Validators.compose([Validators.min(1), Validators.required]),
            ],
        });
        this.userCode = sessionStorage.getItem('userCode');
        this.getCommissionBalance();
    }

    getCommissionBalance() {
        this.commissionService.getCommissionBalance().subscribe(response => {
            this.commissionBalance = response;
            console.log(response);
        });
    }

    getOtp() {
        this.commissionService.getOtp().subscribe(response => {
            console.log(response);
        });
    }

    enterWithdrawalAmount(form: FormGroup) {
        sessionStorage.setItem('withdrawalAmount', form.value.amount);
        this.getOtp();
        this.router.navigate(['/withdraw-funds']);
    }

    openWithdrawalForm() {
        this.withdrawalForm = true;
    }
}
