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
var chart_module_1 = require('../../../widgets/charts/chart.module');
var filter_module_1 = require('../../../widgets/filters/filter.module');
var underlying_datatable_module_1 = require('../../../widgets/underlying-datatable/underlying-datatable.module');
var competitor_comparison_component_1 = require('./competitor.comparison.component');
var action_module_1 = require('../../../widgets/actions/action.module');
var export_module_1 = require('../../../widgets/export/export.module');
var competitor_comparison_routing_1 = require('./competitor-comparison.routing');
var loader_module_1 = require('../../../loader/loader.module');
var CompetitorComparisonModule = (function () {
    function CompetitorComparisonModule() {
    }
    CompetitorComparisonModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpModule,
                chart_module_1.ChartModule,
                underlying_datatable_module_1.UnderlyingDatatableModule,
                filter_module_1.FilterModule,
                competitor_comparison_routing_1.CompetitorComparisonRouting,
                loader_module_1.LoaderModule,
                action_module_1.ActionModule,
                export_module_1.ExportModule
            ],
            declarations: [
                competitor_comparison_component_1.CompetitorComparisonComponent
            ],
            exports: [
                competitor_comparison_component_1.CompetitorComparisonComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CompetitorComparisonModule);
    return CompetitorComparisonModule;
}());
exports.CompetitorComparisonModule = CompetitorComparisonModule;
//# sourceMappingURL=competitor-comparison.module.js.map