import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'EmptyString'
})
export class EmptyStringPipe implements PipeTransform {
    // passing another argument
    transform(value: any, valueToReplace: string): string {
        if (value == null || value == undefined || (typeof value === 'string' && value.length  == 0))
        {
            return valueToReplace;
        }
        else {
            return value;
        }
    }
}