import { IActiveLoans, IReplacement } from './active-loans.model';
import { SharedService } from './../shared/shared.service';
import { ActiveLoansService } from './active-loans.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEligibiity } from './eligibility.model';

@Component({
    selector: 'app-active-loans',
    templateUrl: './active-loans.page.html',
    styleUrls: ['./active-loans.page.scss'],
})
export class ActiveLoansPage implements OnInit {
    activeLoansForm: FormGroup;
    spin = false;
    activeLoans: Array<IActiveLoans>;
    loanButtonText = 'Post New Loan';
    replacementLoanArray = [] as Array<IActiveLoans>;
    eligibility: IEligibiity;
    eligible: boolean;
    message: boolean;
    constructor(
        private fb: FormBuilder,
        private activeloansService: ActiveLoansService,
        private shared: SharedService,
        private router: Router
    ) {}

    ngOnInit() {
        this.activeLoans = [];
        this.eligibility = null;
        this.eligible = false;
        this.activeLoansForm = this.fb.group({
            id: ['', Validators.required],
        });
    }

    getActiveLoans(form: FormGroup) {
        sessionStorage.setItem('clientId', form.value.id);
        this.creditCheck(form.value);
        // this.callActiveLoansService(form.value);
    }

    callActiveLoansService(data) {
        // this.spin = true;
        this.activeloansService.getActiveLoans(data).subscribe(
            response => {
                const loanArray: [] = JSON.parse(response.Data);
                console.log(loanArray);
                if (loanArray.length === 0) {
                    // console.log('id not found');
                    this.shared.presentToast('Loan not found for this ID');
                }
                this.activeLoans = loanArray;
                sessionStorage.setItem('activeloans', response.Data);
                this.spin = false;
                this.loanButtonText = 'Post a new/replacement loan';
                // console.log(response.Data);
            },
            () => {
                this.shared.presentToast('Server Error');
                this.spin = false;
            }
        );
    }

    getLoan(loan: IActiveLoans, e) {
        const index = this.replacementLoanArray.indexOf(loan);
        if (!e.target.checked) {
            this.replacementLoanArray.push(loan);
        } else {
            this.replacementLoanArray.splice(index, 1);
        }
        console.log(this.replacementLoanArray);
    }

    checkIfLoanIsReplacementAndChangeText() {
        if (this.replacementLoanArray.length > 0) {
            this.loanButtonText = 'Post a replacement loan';
        } else {
            this.loanButtonText = 'Post a new loan';
        }
    }

    moveToLoanProcessPage() {
        sessionStorage.setItem(
            'loansToReplace',
            JSON.stringify(this.replacementLoanArray)
        );
        this.router.navigate(['post-loan']);
    }

    creditCheck(data) {
        this.spin = true;
        this.activeLoans = null;
        this.activeloansService.creditCheck(data).subscribe(
            response => {
                this.message = true;
                if (response.Status === 'true') {
                    this.eligibility = JSON.parse(response.Data);
                    if (this.eligibility.Status === 'ELIGIBLE') {
                        this.eligible = true;
                        sessionStorage.setItem(
                            'eligibilityData',
                            response.Data
                        );
                        this.callActiveLoansService(data);
                    } else {
                        this.spin = false;
                    }
                } else {
                    this.shared.presentToast('Client Not Found');
                    this.spin = false;
                }
                // this.spin = false;
            },
            error => {
                this.shared.presentToast('Network Error');
                this.spin = false;
            }
        );
    }
}
