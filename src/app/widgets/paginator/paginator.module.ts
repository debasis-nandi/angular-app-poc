
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PaginatorComponent } from './paginator.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule
    ],
    declarations: [
        PaginatorComponent
    ],
    exports: [
        PaginatorComponent
    ]
})
export class PaginatorModule { }
