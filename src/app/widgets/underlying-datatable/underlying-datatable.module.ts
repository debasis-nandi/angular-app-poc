
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DataTableModule, PaginatorModule } from 'primeng/primeng';
import { UnderlyingDatatableComponent } from './underlying-datatable.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        DataTableModule,
        PaginatorModule,
        RouterModule
    ],
    declarations: [
        UnderlyingDatatableComponent
    ],
    exports: [
        UnderlyingDatatableComponent
    ]
})
export class UnderlyingDatatableModule { }
