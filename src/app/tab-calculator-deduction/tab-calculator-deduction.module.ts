import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabCalculatorDeductionPage } from './tab-calculator-deduction.page';

const routes: Routes = [
  {
    path: '',
    component: TabCalculatorDeductionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabCalculatorDeductionPage]
})
export class TabCalculatorDeductionPageModule {}
