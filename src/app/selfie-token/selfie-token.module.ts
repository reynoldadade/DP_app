import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SelfieTokenPage } from './selfie-token.page';

const routes: Routes = [
  {
    path: '',
    component: SelfieTokenPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SelfieTokenPage]
})
export class SelfieTokenPageModule {}
