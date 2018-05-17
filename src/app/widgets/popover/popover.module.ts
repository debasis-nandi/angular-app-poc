import { NgModule }      from '@angular/core';
import { PopoverModule } from 'ng2-popover';

import { PopoverComponent }   from './popover.component';

@NgModule({
    imports: [PopoverModule],
    declarations: [PopoverComponent],
    exports: [PopoverComponent]
})

export class PopOverModules { }