import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MacroeconomicsMenuComponent } from './macroeconomics-menu.component';

@NgModule({
    imports:
    [
        HttpModule,
        FormsModule,
        CommonModule,
        RouterModule
    ],
    declarations:
    [
        MacroeconomicsMenuComponent
    ],
    exports: [
        MacroeconomicsMenuComponent
    ]

})
export class MacroeconomicsMenuModule { }