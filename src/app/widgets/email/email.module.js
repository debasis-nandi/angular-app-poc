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
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var filter_module_1 = require('../../widgets/filters/filter.module');
var action_module_1 = require('../../widgets/actions/action.module');
var chart_module_1 = require('../../widgets/charts/chart.module');
var email_component_1 = require('./email.component');
var email_service_1 = require('./email.service');
var http_2 = require('@angular/http');
var router_2 = require('@angular/router');
var http_factory_1 = require('../../http-interceptor/http.factory');
var EmailModule = (function () {
    function EmailModule() {
    }
    EmailModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                filter_module_1.FilterModule,
                action_module_1.ActionModule,
                chart_module_1.ChartModule
            ],
            declarations: [
                email_component_1.EmailComponent
            ],
            exports: [
                email_component_1.EmailComponent
            ],
            providers: [
                email_service_1.EmailService,
                { provide: http_2.Http, useFactory: http_factory_1.httpFactory, deps: [http_2.XHRBackend, http_2.RequestOptions, router_2.Router] }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], EmailModule);
    return EmailModule;
}());
exports.EmailModule = EmailModule;
//# sourceMappingURL=email.module.js.map