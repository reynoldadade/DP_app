import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared/shared.service';
import { LoanHistoryService } from './loan-history.service';
import { LoanInterface, LoanSummary } from './loanHistory.interface';

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
        TotalOverider: 0,
    };
    found = false;
    spinner = false;

    constructor(
        private fb: FormBuilder,
        private sharedService: SharedService,
        private loanHistoryService: LoanHistoryService
    ) {}

    ngOnInit() {
        console.log(this.today, 'today');
        this.dealsForm = this.fb.group({
            startDate: [this.today, Validators.compose([Validators.required])],
            endDate: [this.today, Validators.required],
        });
    }

    getPaidDeals(form: FormGroup) {
        this.found = false;
        this.spinner = true;
        form.value.startDate = new Date(form.value.startDate).toISOString();
        form.value.endDate = new Date(form.value.endDate).toISOString();
        this.loanHistoryService.getDeals(form.value).subscribe(
            (response) => {
                this.spinner = false;
                console.log(response);
                if (response.length < 1) {
                    this.sharedService.presentToast(
                        'No deals found during this period'
                    );
                } else {
                    this.found = true;
                    this.deals = response.reverse();
                    this.loanSummary.TotalCommission = this.getTotalCommission(
                        this.deals
                    );
                    this.loanSummary.TotalLoans = this.deals.length;
                }
            },
            () => {
                this.spinner = false;
                this.sharedService.presentToast('Network Failure');
            }
        );
    }

    getTotalCommission(data: LoanInterface[]) {
        return data
            .map((loan) => loan.Commission)
            .reduce((prev, next) => prev + next);
    }
}
