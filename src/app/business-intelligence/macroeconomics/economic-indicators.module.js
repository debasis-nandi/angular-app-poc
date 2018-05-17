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
var filter_module_1 = require('../../widgets/filters/filter.module');
var export_module_1 = require('../../widgets/export/export.module');
var action_module_1 = require('../../widgets/actions/action.module');
var ng2_popover_1 = require('ng2-popover');
var underlying_datatable_module_1 = require('../../widgets/underlying-datatable/underlying-datatable.module');
var chart_module_1 = require('../../widgets/charts/chart.module');
var loader_module_1 = require('../../loader/loader.module');
var economic_indicators_routing_1 = require('./economic-indicators.routing');
var economic_indicators_component_1 = require('./economic-indicators.component');
var macroeconomics_menu_module_1 = require('./macroeconomics-menu.module');
var custompipes_module_1 = require('../../pipes/custompipes.module');
var email_module_1 = require('../../widgets/email/email.module');
var insights_module_1 = require('../../insights/insights.module');
var EconomicIndicatorsModule = (function () {
    function EconomicIndicatorsModule() {
    }
    EconomicIndicatorsModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                chart_module_1.ChartModule,
                filter_module_1.FilterModule,
                export_module_1.ExportModule,
                action_module_1.ActionModule,
                ng2_popover_1.PopoverModule,
                underlying_datatable_module_1.UnderlyingDatatableModule,
                economic_indicators_routing_1.EconomicIndicatorsRouting,
                macroeconomics_menu_module_1.MacroeconomicsMenuModule,
                loader_module_1.LoaderModule,
                custompipes_module_1.CustomPipesModule,
                email_module_1.EmailModule,
                insights_module_1.InsightsModule
            ],
            declarations: [
                economic_indicators_component_1.EconomicIndicatorsComponent
            ],
            exports: [
                economic_indicators_component_1.EconomicIndicatorsComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], EconomicIndicatorsModule);
    return EconomicIndicatorsModule;
}());
exports.EconomicIndicatorsModule = EconomicIndicatorsModule;
//# sourceMappingURL=economic-indicators.module.js.map