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
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
var addinsights_component_1 = require('./addinsights.component');
var insights_service_1 = require('./insights.service');
var tinymce_module_1 = require('../widgets/tinymce/tinymce.module');
var primeng_1 = require('primeng/primeng');
var modal_module_1 = require('../widgets/modals/modal.module');
var custompipes_module_1 = require('../pipes/custompipes.module');
var http_factory_1 = require('../http-interceptor/http.factory');
var http_2 = require('@angular/http');
var router_1 = require('@angular/router');
var InsightsModule = (function () {
    function InsightsModule() {
    }
    InsightsModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                tinymce_module_1.TinyMCEModule,
                primeng_1.DataListModule,
                primeng_1.GrowlModule,
                custompipes_module_1.CustomPipesModule,
                modal_module_1.ModalModule
            ],
            declarations: [
                addinsights_component_1.AddInsightsComponent,
            ],
            exports: [
                addinsights_component_1.AddInsightsComponent
            ],
            providers: [
                insights_service_1.InsightsService,
                { provide: http_2.Http, useFactory: http_factory_1.httpFactory, deps: [http_2.XHRBackend, http_2.RequestOptions, router_1.Router] }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], InsightsModule);
    return InsightsModule;
}());
exports.InsightsModule = InsightsModule;
//# sourceMappingURL=insights.module.js.map