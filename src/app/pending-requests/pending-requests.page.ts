import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared/shared.service';
import { LoanInterface } from '../loan-history/loanHistory.interface';
import { PendingRequestsService } from './pending-requests.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pending-requests',
    templateUrl: './pending-requests.page.html',
    styleUrls: ['./pending-requests.page.scss'],
})
export class PendingRequestsPage implements OnInit {
    dealsForm: FormGroup;
    user;
    searchText = '';
    today = new Date().toISOString();
    deals: LoanInterface[];
    found = false;
    spinner = false;

    constructor(
        private fb: FormBuilder,
        private sharedService: SharedService,
        private pendingRequestService: PendingRequestsService,
        private router: Router
    ) {}

    ngOnInit() {
        this.dealsForm = this.fb.group({
            startDate: ['', Validators.compose([Validators.required])],
            endDate: ['', Validators.required],
        });
    }

    getActiveDeals(form: FormGroup) {
        this.found = false;
        this.spinner = true;
        form.value.startDate = new Date(form.value.startDate).toISOString();
        form.value.endDate = new Date(form.value.endDate).toISOString();
        console.log(form.value, '[Iso string]');
        this.pendingRequestService.getTransactions(form.value).subscribe(
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
                    // console.log(deals);
                }
                form.reset();
            },
            () => {
                this.spinner = false;
                this.sharedService.presentToast('Network Failure');
                form.reset();
            }
        );
    }

    viewTransaction(item: LoanInterface) {
        this.sharedService.saveItem('loanDetails', item);
        this.router.navigate(['view-loan']);
    }
}
