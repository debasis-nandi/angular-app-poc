
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule, FileUploadModule, RadioButtonModule } from 'primeng/primeng';

import { MyDateRangePickerModule } from 'mydaterangepicker';
import { MyDatePickerModule } from 'mydatepicker';
import { GrowlModule } from 'primeng/primeng';

import { KmSearchUploadComponent } from './km-search-upload.component';
import { LoaderModule } from '../loader/loader.module';

import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { httpFactory } from '../http-interceptor/http.factory';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        MyDateRangePickerModule,
        MyDatePickerModule,
        MultiSelectModule,
        FileUploadModule,
        LoaderModule,
        GrowlModule,
        RadioButtonModule
    ],
    declarations: [
        KmSearchUploadComponent
    ],
    exports: [
        KmSearchUploadComponent
    ],
    providers: [
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]
})
export class KmSearchUploadModule { }