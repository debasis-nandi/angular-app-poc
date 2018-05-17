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
var km_upload_doc_routing_1 = require('./km-upload-doc.routing');
var km_upload_doc_component_1 = require('./km-upload-doc.component');
var km_search_upload_module_1 = require('./km-search-upload.module');
var KmUploadDocModule = (function () {
    function KmUploadDocModule() {
    }
    KmUploadDocModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                km_upload_doc_routing_1.KmUploadDocRouting,
                km_search_upload_module_1.KmSearchUploadModule
            ],
            declarations: [
                km_upload_doc_component_1.KmUploadDocComponent
            ],
            exports: [
                km_upload_doc_component_1.KmUploadDocComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], KmUploadDocModule);
    return KmUploadDocModule;
}());
exports.KmUploadDocModule = KmUploadDocModule;
//# sourceMappingURL=km-upload-doc.module.js.map