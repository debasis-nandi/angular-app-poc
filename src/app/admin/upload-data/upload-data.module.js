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
var loader_module_1 = require('../../loader/loader.module');
var upload_data_routing_1 = require('./upload-data.routing');
var upload_data_component_1 = require('./upload-data.component');
var http_factory_1 = require('../../http-interceptor/http.factory');
var http_2 = require('@angular/http');
var router_1 = require('@angular/router');
var UploadDataModule = (function () {
    function UploadDataModule() {
    }
    UploadDataModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                primeng_1.FileUploadModule,
                loader_module_1.LoaderModule,
                upload_data_routing_1.UploadDataRouting
            ],
            declarations: [
                upload_data_component_1.UploadDataComponent
            ],
            exports: [
                upload_data_component_1.UploadDataComponent
            ],
            providers: [
                { provide: http_2.Http, useFactory: http_factory_1.httpFactory, deps: [http_2.XHRBackend, http_2.RequestOptions, router_1.Router] }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], UploadDataModule);
    return UploadDataModule;
}());
exports.UploadDataModule = UploadDataModule;
//# sourceMappingURL=upload-data.module.js.map