import { NgModule } from '@angular/core';
import { SafeHtmlsPipe } from './SafeHtmls.pipe'
import { RegexReplacePipe } from './RegexReplace.pipe';

@NgModule({
    imports:
    [

    ],
    exports: [
        SafeHtmlsPipe,
        RegexReplacePipe
    ],
    declarations: [
        SafeHtmlsPipe,
        RegexReplacePipe
    ],
    providers: [SafeHtmlsPipe, RegexReplacePipe]
})
export class CustomPipesModule { }