import { Component, OnInit } from '@angular/core';
import { EligibilityService } from './eligibility.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared/shared.service';

@Component({
    selector: 'app-eligibility',
    templateUrl: './eligibility.page.html',
    styleUrls: ['./eligibility.page.scss'],
})
export class EligibilityPage implements OnInit {
    eligibilityForm: FormGroup;
    eligibility;
    eligible;
    message = false;
    spinner = false;
    constructor(
        private eligibilityService: EligibilityService,
        private fb: FormBuilder,
        private sharedService: SharedService
    ) {}

    ngOnInit() {
        this.eligibilityForm = this.fb.group({
            staffId: ['', Validators.required],
        });
    }

    creditCheck(form: FormGroup) {
        this.spinner = true;
        this.eligible = false;
        this.message = false;
        this.eligibilityService.creditCheck(form.value).subscribe(
            response => {
                this.message = true;
                if (response.Status === 'true') {
                    this.eligibility = JSON.parse(response.Data);
                    if (this.eligibility.Status === 'ELIGIBLE') {
                        this.eligible = true;
                    }
                } else {
                    this.sharedService.presentToast('Client Not Found');
                }
            },
            error => {
                this.spinner = false;
                this.sharedService.presentToast('Network Error');
            },
            () => (this.spinner = false)
        );
    }
}
