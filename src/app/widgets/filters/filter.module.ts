import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './filter.component';  
import { NouisliderModule } from 'ng2-nouislider';
import {MultiSelectModule} from 'primeng/primeng';

@NgModule({
    imports:
    [
        CommonModule,
        FormsModule,
        NouisliderModule,
        MultiSelectModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        FilterComponent
    ],
    declarations: [
        FilterComponent
    ]


})
export class FilterModule { }