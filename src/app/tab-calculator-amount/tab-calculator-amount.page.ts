import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoanCalculatorService} from '../loan-calculator/loan-calculator.service';
import {SharedService} from '../shared/shared.service';

@Component({
  selector: 'app-tab-calculator-amount',
  templateUrl: './tab-calculator-amount.page.html',
  styleUrls: ['./tab-calculator-amount.page.scss'],
})
export class TabCalculatorAmountPage implements OnInit {
  amount = 0;
  amountCalculatorForm: FormGroup;
  loanTenors = [3, 6, 12, 18, 24, 36, 48, 54];
  constructor(private fb: FormBuilder, private loanCalculatorService: LoanCalculatorService, private sharedService: SharedService) {
  }

  ngOnInit() {
    this.amountCalculatorForm = this.fb.group(
        {
            deduction: ['', Validators.compose([Validators.min(0.01), Validators.required])],
            tenor: ['', Validators.compose([Validators.min(1), Validators.required])]
        }
    );

  }

  calculateAmount(form: FormGroup) {
      this.loanCalculatorService.getRateScheduleAmount(form.value).subscribe((response) => {
          // console.log(response);
          // form.reset();
          this.amount = response.Data;
      });
  }
}
