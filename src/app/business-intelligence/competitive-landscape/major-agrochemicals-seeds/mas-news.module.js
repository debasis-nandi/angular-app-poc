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
var mydaterangepicker_1 = require('mydaterangepicker');
var mydatepicker_1 = require('mydatepicker');
var mas_news_routing_1 = require('./mas-news.routing');
var filter_module_1 = require('../../../widgets/filters/filter.module');
var export_module_1 = require('../../../widgets/export/export.module');
var action_module_1 = require('../../../widgets/actions/action.module');
var loader_module_1 = require('../../../loader/loader.module');
var ng2_popover_1 = require('ng2-popover');
var mas_news_component_1 = require('./mas-news.component');
var primeng_1 = require('primeng/primeng');
var email_module_1 = require('../../../widgets/email/email.module');
var competitormenu_module_1 = require('./competitormenu.module');
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
var http_2 = require('@angular/http');
var router_1 = require('@angular/router');
var http_factory_1 = require('../../../http-interceptor/http.factory');
var MASNewsModule = (function () {
    function MASNewsModule() {
    }
    MASNewsModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                export_module_1.ExportModule,
                mas_news_routing_1.MASNewsRouting,
                primeng_1.AccordionModule,
                loader_module_1.LoaderModule,
                competitormenu_module_1.CompetitorMenuModule,
                filter_module_1.FilterModule,
                action_module_1.ActionModule,
                ng2_popover_1.PopoverModule,
                email_module_1.EmailModule,
                mydaterangepicker_1.MyDateRangePickerModule,
                mydatepicker_1.MyDatePickerModule
            ],
            declarations: [
                mas_news_component_1.MASNewsComponent
            ],
            exports: [
                mas_news_component_1.MASNewsComponent
            ],
            providers: [
                { provide: http_2.Http, useFactory: http_factory_1.httpFactory, deps: [http_2.XHRBackend, http_2.RequestOptions, router_1.Router] }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], MASNewsModule);
    return MASNewsModule;
}());
exports.MASNewsModule = MASNewsModule;
//# sourceMappingURL=mas-news.module.js.map