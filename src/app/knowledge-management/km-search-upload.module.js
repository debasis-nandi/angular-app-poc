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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var primeng_1 = require('primeng/primeng');
var mydaterangepicker_1 = require('mydaterangepicker');
var mydatepicker_1 = require('mydatepicker');
var primeng_2 = require('primeng/primeng');
var km_search_upload_component_1 = require('./km-search-upload.component');
var loader_module_1 = require('../loader/loader.module');
var http_2 = require('@angular/http');
var router_1 = require('@angular/router');
var http_factory_1 = require('../http-interceptor/http.factory');
var KmSearchUploadModule = (function () {
    function KmSearchUploadModule() {
    }
    KmSearchUploadModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                mydaterangepicker_1.MyDateRangePickerModule,
                mydatepicker_1.MyDatePickerModule,
                primeng_1.MultiSelectModule,
                primeng_1.FileUploadModule,
                loader_module_1.LoaderModule,
                primeng_2.GrowlModule,
                primeng_1.RadioButtonModule
            ],
            declarations: [
                km_search_upload_component_1.KmSearchUploadComponent
            ],
            exports: [
                km_search_upload_component_1.KmSearchUploadComponent
            ],
            providers: [
                { provide: http_2.Http, useFactory: http_factory_1.httpFactory, deps: [http_2.XHRBackend, http_2.RequestOptions, router_1.Router] }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], KmSearchUploadModule);
    return KmSearchUploadModule;
}());
exports.KmSearchUploadModule = KmSearchUploadModule;
//# sourceMappingURL=km-search-upload.module.js.map