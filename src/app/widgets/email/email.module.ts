

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FilterModule } from '../../widgets/filters/filter.module';
import { ActionModule } from '../../widgets/actions/action.module';
import { ChartModule } from '../../widgets/charts/chart.module'

import { EmailComponent } from './email.component';
import { EmailService } from './email.service';

import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { httpFactory } from '../../http-interceptor/http.factory';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        FormsModule,
        CommonModule,
        FilterModule,
        ActionModule,
        ChartModule
    ],
    declarations: [
        EmailComponent
    ],
    exports: [
        EmailComponent
    ],
    providers: [
        EmailService,
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]
})
export class EmailModule { }


