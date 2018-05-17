
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CompetitorMenuComponent } from './competitormenu.component';

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
        CompetitorMenuComponent
    ],
    exports: [
        CompetitorMenuComponent
    ]

})
export class CompetitorMenuModule { }