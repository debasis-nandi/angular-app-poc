//In order to make charting component pluggable, we need to make it a module and plug it wherever required with expected dependencies.
// It's dependencies are as follows:
// 1.
// 2.

//Common dependencies.
import { NgModule } from '@angular/core';

//Parts of Module.
import { ChartComponent } from './chart.component';

//****Module specific dependencies.***********
import { FusionChartsModule } from 'angular2-fusioncharts';
import * as FusionCharts from 'fusioncharts'; // Import FusionCharts library
import Charts = require('fusioncharts/fusioncharts.charts'); // Import FusionCharts Charts module 

import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { httpFactory } from '../../http-interceptor/http.factory';

@NgModule({
    imports:
    [
        FusionChartsModule.forRoot(FusionCharts, Charts)

    ],
    exports: [
        ChartComponent
    ],
    declarations: [
        ChartComponent
    ],
    providers: [
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]
})
export class ChartModule { } 
