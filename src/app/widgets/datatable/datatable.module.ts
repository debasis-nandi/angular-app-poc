
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DataTableModule, PaginatorModule } from 'primeng/primeng';
import { DataTableComponent } from './datatable.component';
import { EmptyStringPipe } from './EmptyStringPipe.filter';

import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { httpFactory } from '../../http-interceptor/http.factory';

@NgModule({
    imports:[
        CommonModule,
        HttpModule,
        DataTableModule,
        PaginatorModule,
        RouterModule
    ],
    declarations:[   
        DataTableComponent, EmptyStringPipe
    ],
    exports: [
        DataTableComponent
    ],
    providers: [
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]
})
export class TableModule { }
