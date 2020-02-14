import { ComponentModule } from './../components/component/component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PostLoanPage } from './post-loan.page';
import { PipesModule } from '../pipes/pipes/pipes.module';

const routes: Routes = [
    {
        path: '',
        component: PostLoanPage,
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        ComponentModule,
        RouterModule.forChild(routes),
        PipesModule,
    ],
    declarations: [PostLoanPage],
})
export class PostLoanPageModule {}
