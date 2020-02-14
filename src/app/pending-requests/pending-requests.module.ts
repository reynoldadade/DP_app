import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PendingRequestsPage } from './pending-requests.page';
import {IdFilterPipe} from '../pipes/id-filter.pipe';
import {PipesModule} from '../pipes/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: PendingRequestsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    PipesModule,
  ],
  declarations: [PendingRequestsPage]
})
export class PendingRequestsPageModule {}
