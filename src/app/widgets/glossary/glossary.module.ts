import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlossaryComponent } from './glossary.component';
import { LoaderModule } from '../../loader/loader.module'

import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { httpFactory } from '../../http-interceptor/http.factory';

@NgModule({
    imports:
    [
        CommonModule,
        FormsModule,
        LoaderModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        GlossaryComponent
    ],
    declarations: [
        GlossaryComponent
    ],
    providers: [
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]
})
export class GlossaryModule { }