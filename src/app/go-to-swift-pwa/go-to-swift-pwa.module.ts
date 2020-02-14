import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GoToSwiftPwaPage } from './go-to-swift-pwa.page';

const routes: Routes = [
  {
    path: '',
    component: GoToSwiftPwaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GoToSwiftPwaPage]
})
export class GoToSwiftPwaPageModule {}
