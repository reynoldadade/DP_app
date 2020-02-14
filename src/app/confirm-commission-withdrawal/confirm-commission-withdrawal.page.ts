import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
    selector: 'app-confirm-commission-withdrawal',
    templateUrl: './confirm-commission-withdrawal.page.html',
    styleUrls: ['./confirm-commission-withdrawal.page.scss'],
})
export class ConfirmCommissionWithdrawalPage implements OnInit {
    withdrawalResponse: string;

    constructor(private shared: SharedService) {}

    ngOnInit() {
        this.withdrawalResponse = sessionStorage.getItem('withdrawalResponse');
        console.log(this.shared.getPhoneNumber());
    }
}
