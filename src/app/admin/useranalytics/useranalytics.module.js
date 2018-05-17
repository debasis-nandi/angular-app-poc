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
var ng2_popover_1 = require('ng2-popover');
var useranalytics_component_1 = require('./useranalytics.component');
var loader_module_1 = require('../../loader/loader.module');
var action_module_1 = require('../../widgets/actions/action.module');
//import { TableModule } from '../../widgets/datatable/datatable.module';
var filter_module_1 = require('../../widgets/filters/filter.module');
var underlying_datatable_module_1 = require('../../widgets/underlying-datatable/underlying-datatable.module');
var useranalytics_routing_1 = require('./useranalytics.routing');
var mydatepicker_1 = require('mydatepicker');
var UserAnalyticsModule = (function () {
    function UserAnalyticsModule() {
    }
    UserAnalyticsModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                filter_module_1.FilterModule,
                action_module_1.ActionModule,
                ng2_popover_1.PopoverModule,
                underlying_datatable_module_1.UnderlyingDatatableModule,
                useranalytics_routing_1.UserAnalyticsRouting,
                loader_module_1.LoaderModule,
                mydatepicker_1.MyDatePickerModule
            ],
            declarations: [
                useranalytics_component_1.UserAnalyticsComponent
            ],
            exports: [
                useranalytics_component_1.UserAnalyticsComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], UserAnalyticsModule);
    return UserAnalyticsModule;
}());
exports.UserAnalyticsModule = UserAnalyticsModule;
//# sourceMappingURL=useranalytics.module.js.map