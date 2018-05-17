
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';

import { httpFactory } from '../http-interceptor/http.factory';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
    ],
    declarations: [
        LayoutComponent        
    ],
    exports: [
        LayoutComponent
    ],
    providers: [
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]
})
export class LayoutModule { }