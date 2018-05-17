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
var mypage_component_1 = require('./mypage.component');
var chart_module_1 = require('../widgets/charts/chart.module');
var action_module_1 = require('../widgets/actions/action.module');
var filter_module_1 = require('../widgets/filters/filter.module');
var export_module_1 = require('../widgets/export/export.module');
var ng2_popover_1 = require('ng2-popover');
var underlying_datatable_module_1 = require('../widgets/underlying-datatable/underlying-datatable.module');
var mypage_routing_1 = require('./mypage.routing');
var loader_module_1 = require('../loader/loader.module');
var email_module_1 = require('../widgets/email/email.module');
var event_calendar_module_1 = require('../widgets/event-calendar/event-calendar.module');
var custompipes_module_1 = require('../pipes/custompipes.module');
var MyPageModule = (function () {
    function MyPageModule() {
    }
    MyPageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpModule,
                chart_module_1.ChartModule,
                underlying_datatable_module_1.UnderlyingDatatableModule,
                mypage_routing_1.MyPageRouting,
                loader_module_1.LoaderModule,
                email_module_1.EmailModule,
                action_module_1.ActionModule,
                ng2_popover_1.PopoverModule,
                filter_module_1.FilterModule,
                custompipes_module_1.CustomPipesModule,
                export_module_1.ExportModule,
                event_calendar_module_1.EventCalendarModule
            ],
            declarations: [
                mypage_component_1.MyPageComponent
            ],
            exports: [
                mypage_component_1.MyPageComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], MyPageModule);
    return MyPageModule;
}());
exports.MyPageModule = MyPageModule;
//# sourceMappingURL=mypage.module.js.map