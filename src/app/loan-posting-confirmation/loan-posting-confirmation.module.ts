import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoanPostingConfirmationPage } from './loan-posting-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: LoanPostingConfirmationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoanPostingConfirmationPage]
})
export class LoanPostingConfirmationPageModule {}
