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
var search_template_component_1 = require('./search-template.component');
var news_km_template_component_1 = require('./news-km-template.component');
var chart_template_component_1 = require('./chart-template.component');
var paginator_module_1 = require('../paginator/paginator.module');
var email_module_1 = require('../../widgets/email/email.module');
var SearchTemplateModule = (function () {
    function SearchTemplateModule() {
    }
    SearchTemplateModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpModule,
                router_1.RouterModule,
                paginator_module_1.PaginatorModule,
                email_module_1.EmailModule
            ],
            declarations: [
                search_template_component_1.SearchTemplateComponent,
                news_km_template_component_1.NewsKmTemplateComponent,
                chart_template_component_1.ChartTemplateComponent
            ],
            exports: [
                search_template_component_1.SearchTemplateComponent,
                news_km_template_component_1.NewsKmTemplateComponent,
                chart_template_component_1.ChartTemplateComponent
            ],
            entryComponents: [
                news_km_template_component_1.NewsKmTemplateComponent,
                chart_template_component_1.ChartTemplateComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SearchTemplateModule);
    return SearchTemplateModule;
}());
exports.SearchTemplateModule = SearchTemplateModule;
//# sourceMappingURL=search-template.module.js.map