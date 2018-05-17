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
var km_search_routing_1 = require('./km-search.routing');
var km_search_component_1 = require('./km-search.component');
var km_search_upload_module_1 = require('./km-search-upload.module');
var search_template_module_1 = require('../widgets/search-template/search-template.module');
var loader_module_1 = require('../loader/loader.module');
var KmSearchModule = (function () {
    function KmSearchModule() {
    }
    KmSearchModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                km_search_routing_1.KmSearchRouting,
                km_search_upload_module_1.KmSearchUploadModule,
                search_template_module_1.SearchTemplateModule,
                loader_module_1.LoaderModule
            ],
            declarations: [
                km_search_component_1.KmSearchComponent
            ],
            exports: [
                km_search_component_1.KmSearchComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], KmSearchModule);
    return KmSearchModule;
}());
exports.KmSearchModule = KmSearchModule;
//# sourceMappingURL=km-search.module.js.map