
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FileUploadModule } from 'primeng/primeng';

import { LoaderModule } from '../../loader/loader.module';
import { UploadDataRouting } from './upload-data.routing';
import { UploadDataComponent } from './upload-data.component';

import { httpFactory } from '../../http-interceptor/http.factory';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        FileUploadModule,
        LoaderModule,
        UploadDataRouting
    ],
    declarations: [
        UploadDataComponent
    ],
    exports: [
        UploadDataComponent
    ],
    providers: [
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]
})
export class UploadDataModule { }