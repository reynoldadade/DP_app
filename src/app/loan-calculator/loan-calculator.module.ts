import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoanCalculatorPage } from './loan-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: LoanCalculatorPage,
    children: [
        {
          path: 'amount',
          children:
          [
              {
                path: '',
                loadChildren: '../tab-calculator-amount/tab-calculator-amount.module#TabCalculatorAmountPageModule',
              }
          ]
        },
        {
            path: 'deduction',
            children:
                [
                    {
                        path: '',
                        loadChildren: '../tab-calculator-deduction/tab-calculator-deduction.module#TabCalculatorDeductionPageModule',
                    }
                ]
        },
        {
            path: '',
            redirectTo: '/loan-calculator/deduction',
            pathMatch: 'full'
        }
    ]
  },
    {
      path: '',
      redirectTo: '/loan-calculator/deduction',
      pathMatch: 'full'
    }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoanCalculatorPage]
})
export class LoanCalculatorPageModule {}
