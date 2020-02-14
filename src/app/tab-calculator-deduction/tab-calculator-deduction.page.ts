import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoanCalculatorService} from '../loan-calculator/loan-calculator.service';
import {SharedService} from '../shared/shared.service';

@Component({
  selector: 'app-tab-calculator-deduction',
  templateUrl: './tab-calculator-deduction.page.html',
  styleUrls: ['./tab-calculator-deduction.page.scss'],
})
export class TabCalculatorDeductionPage implements OnInit {
  deductionCalculatorForm: FormGroup;
  deduction;
  loanTenors = [3, 6, 12, 18, 24, 36, 48, 54];
  constructor(private fb: FormBuilder, private loanCalculatorService: LoanCalculatorService, private sharedService: SharedService) {
  }

  ngOnInit() {
      this.deductionCalculatorForm = this.fb.group(
          {
              amount: ['', Validators.compose([Validators.min(0.01), Validators.required])],
              tenor: ['', Validators.compose([Validators.min(1), Validators.required])]
          }
      );
  }

    calculateDeduction(form: FormGroup) {
        this.loanCalculatorService.getRateScheduleDeduction(form.value).subscribe((response) => {
            // console.log(response);
            // form.reset();
            const deduction = JSON.parse(response.Data);
            this.deduction = parseFloat(deduction).toFixed(2);
            // console.log(typeof this.deduction);
        });
    }

}
