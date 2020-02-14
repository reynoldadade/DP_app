import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommissionStatementService } from './commission-statement.service';
import { ICommissionStatement } from './commission.statement.model';
import { SharedService } from '../shared/shared.service';

@Component({
    selector: 'app-commission-statement',
    templateUrl: './commission-statement.page.html',
    styleUrls: ['./commission-statement.page.scss'],
})
export class CommissionStatementPage implements OnInit {
    ledgerForm: FormGroup;
    today = new Date().toISOString();
    spinner: boolean;
    ledger: Array<ICommissionStatement>;

    constructor(
        private fb: FormBuilder,
        private csService: CommissionStatementService,
        private shared: SharedService
    ) {}

    ngOnInit() {
        this.ledgerForm = this.fb.group({
            startDate: [this.today, Validators.compose([Validators.required])],
            endDate: [this.today, Validators.required],
        });
    }

    getAgentLedger(form: FormGroup) {
        this.spinner = true;
        this.ledger = [];
        this.csService.getAgentLegder(form.value).subscribe(
            response => {
                this.ledger = response;
                if (response.length === 0) {
                    this.shared.presentToast(
                        'No transactions found for this duration'
                    );
                }
                this.spinner = false;
            },
            err => {
                this.spinner = false;
                this.shared.presentToast('Failed to get statement');
            }
        );
    }
}
