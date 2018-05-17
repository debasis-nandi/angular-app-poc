
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminService } from "./admin.service";
import { RouterModule } from '@angular/router';
import { GrowlModule } from 'primeng/primeng';
import { PaginatorModule } from '../widgets/paginator/paginator.module';
import { LoaderModule } from '../loader/loader.module';

import { httpFactory } from '../http-interceptor/http.factory';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule,
        GrowlModule,
        PaginatorModule,
        LoaderModule
    ],
    declarations: [
        AdminComponent
    ],
    exports: [
        AdminComponent
    ],
    providers: [
        AdminService,
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]
})
export class AdminModule { }
