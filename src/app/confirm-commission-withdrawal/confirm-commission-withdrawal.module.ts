import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfirmCommissionWithdrawalPage } from './confirm-commission-withdrawal.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmCommissionWithdrawalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfirmCommissionWithdrawalPage]
})
export class ConfirmCommissionWithdrawalPageModule {}
