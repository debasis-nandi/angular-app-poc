import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'RegexReplace' })
export class RegexReplacePipe implements PipeTransform {
    constructor() { }
    transform(html: string, pattern: string, value: string, replaceMultiple?: boolean) {
        if (replaceMultiple) {
            let patterns = pattern.split(",");
            patterns.forEach(x => {
                html=html.replace(new RegExp(x, 'g'), value);
            });
            return html;
        }
       return html.replace(new RegExp(pattern, 'g'), value);
    }
}