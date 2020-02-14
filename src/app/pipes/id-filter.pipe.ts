import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idFilter'
})
export class IdFilterPipe implements PipeTransform {

    transform(details: any[], filter: string): any[] {
        if (!details || !filter) {
            return details;
        }
        return details.filter(detail => detail.ClientRefId.indexOf(filter) !== -1);
    }

}
