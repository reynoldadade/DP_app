import { SanitizerPipe } from './../sanitizer.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdFilterPipe } from '../id-filter.pipe';
import { NumberFilterPipe } from '../number-filter.pipe';

@NgModule({
    declarations: [IdFilterPipe, SanitizerPipe, NumberFilterPipe],
    imports: [CommonModule],
    exports: [IdFilterPipe, SanitizerPipe, NumberFilterPipe],
})
export class PipesModule {}
