//In order to make charting component pluggable, we need to make it a module and plug it wherever required with expected dependencies.
// It's dependencies are as follows:
// 1.
// 2.
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Common dependencies.
var core_1 = require('@angular/core');
//Parts of Module.
var chart_component_1 = require('./chart.component');
//****Module specific dependencies.***********
var angular2_fusioncharts_1 = require('angular2-fusioncharts');
var FusionCharts = require('fusioncharts'); // Import FusionCharts library
var Charts = require('fusioncharts/fusioncharts.charts'); // Import FusionCharts Charts module 
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var http_factory_1 = require('../../http-interceptor/http.factory');
var ChartModule = (function () {
    function ChartModule() {
    }
    ChartModule = __decorate([
        core_1.NgModule({
            imports: [
                angular2_fusioncharts_1.FusionChartsModule.forRoot(FusionCharts, Charts)
            ],
            exports: [
                chart_component_1.ChartComponent
            ],
            declarations: [
                chart_component_1.ChartComponent
            ],
            providers: [
                { provide: http_1.Http, useFactory: http_factory_1.httpFactory, deps: [http_1.XHRBackend, http_1.RequestOptions, router_1.Router] }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ChartModule);
    return ChartModule;
}());
exports.ChartModule = ChartModule;
//# sourceMappingURL=chart.module.js.map