import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../shared/shared.service';
import {LoanHistoryService} from './loan-history.service';
import {LoanInterface, LoanSummary} from './loanHistory.interface';

@Component({
  selector: 'app-loan-history',
  templateUrl: './loan-history.page.html',
  styleUrls: ['./loan-history.page.scss'],
})
export class LoanHistoryPage implements OnInit {
    dealsForm: FormGroup;
    user;
    searchText = '';
    today = new Date().toISOString();
    deals: LoanInterface[];
    loanSummary: LoanSummary = {
        TotalCommission: 0,
        TotalLoans: 0,
        TotalOverider: 0
    };
    found =  false;
    spinner = false;

    constructor(private fb: FormBuilder, private sharedService: SharedService, private loanHistoryService: LoanHistoryService) {
    }

    ngOnInit() {
        this.user = sessionStorage.getItem('userCode');
        if (!this.user) {
            this.user = '56-0001-00004';
        }
        if (this.user) {
            this.dealsForm = this.fb.group({
                start: [this.today, Validators.compose([Validators.required])],
                end: [this.today, Validators.required],
                type: ['DP'],
                usercode: [this.user]
            });
        }
    }


    getPaidDeals(form: FormGroup) {
        this.found = false;
        this.spinner = true;
        this.loanHistoryService.getDeals(form.value).subscribe((response) => {
            this.spinner = false;
            if (response.Status === 'fail') {
                this.sharedService.presentToast(response.Message);
            } else {
                this.found = true;
                const deals = JSON.parse(response.Data);
                this.deals = deals.ActiveLoans;
                this.loanSummary = deals.LoanSummary;
                console.log(deals);
            }
        }, () => {
            this.spinner = false;
            this.sharedService.presentToast('Network Failure');
        });
    }

}
