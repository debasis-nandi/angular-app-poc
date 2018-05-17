import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExportComponent } from './export.component';
import { NouisliderModule } from 'ng2-nouislider';
import {MultiSelectModule} from 'primeng/primeng';

import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { httpFactory } from '../../http-interceptor/http.factory';

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
        ExportComponent
    ],
    declarations: [
        ExportComponent
    ],
    providers: [
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]

})
export class ExportModule { }