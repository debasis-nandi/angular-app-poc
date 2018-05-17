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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var export_component_1 = require('./export.component');
var ng2_nouislider_1 = require('ng2-nouislider');
var primeng_1 = require('primeng/primeng');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var http_factory_1 = require('../../http-interceptor/http.factory');
var ExportModule = (function () {
    function ExportModule() {
    }
    ExportModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                ng2_nouislider_1.NouisliderModule,
                primeng_1.MultiSelectModule
            ],
            exports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                export_component_1.ExportComponent
            ],
            declarations: [
                export_component_1.ExportComponent
            ],
            providers: [
                { provide: http_1.Http, useFactory: http_factory_1.httpFactory, deps: [http_1.XHRBackend, http_1.RequestOptions, router_1.Router] }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ExportModule);
    return ExportModule;
}());
exports.ExportModule = ExportModule;
//# sourceMappingURL=export.module.js.map