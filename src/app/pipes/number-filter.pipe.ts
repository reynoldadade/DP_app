import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberFilter',
})
export class NumberFilterPipe implements PipeTransform {
    transform(value: string, ...args: any[]): any {
        return parseInt(value, 10);
    }
}
