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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var primeng_1 = require('primeng/primeng');
var datatable_component_1 = require('./datatable.component');
var EmptyStringPipe_filter_1 = require('./EmptyStringPipe.filter');
var http_2 = require('@angular/http');
var router_2 = require('@angular/router');
var http_factory_1 = require('../../http-interceptor/http.factory');
var TableModule = (function () {
    function TableModule() {
    }
    TableModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpModule,
                primeng_1.DataTableModule,
                primeng_1.PaginatorModule,
                router_1.RouterModule
            ],
            declarations: [
                datatable_component_1.DataTableComponent, EmptyStringPipe_filter_1.EmptyStringPipe
            ],
            exports: [
                datatable_component_1.DataTableComponent
            ],
            providers: [
                { provide: http_2.Http, useFactory: http_factory_1.httpFactory, deps: [http_2.XHRBackend, http_2.RequestOptions, router_2.Router] }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], TableModule);
    return TableModule;
}());
exports.TableModule = TableModule;
//# sourceMappingURL=datatable.module.js.map