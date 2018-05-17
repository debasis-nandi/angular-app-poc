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
var export_module_1 = require('../../../widgets/export/export.module');
var filter_module_1 = require('../../../widgets/filters/filter.module');
var action_module_1 = require('../../../widgets/actions/action.module');
var ng2_popover_1 = require('ng2-popover');
var underlying_datatable_module_1 = require('../../../widgets/underlying-datatable/underlying-datatable.module');
var competitormenu_module_1 = require('./competitormenu.module');
var mas_financials_ratio_component_1 = require('./mas-financials-ratio.component');
var chart_module_1 = require('../../../widgets/charts/chart.module');
var email_module_1 = require('../../../widgets/email/email.module');
var mas_financials_ratio_routing_1 = require('./mas-financials-ratio.routing');
var loader_module_1 = require('../../../loader/loader.module');
var custompipes_module_1 = require('../../../pipes/custompipes.module');
var favourites_module_1 = require('../../../widgets/favourites/favourites.module');
var insights_module_1 = require('../../../insights/insights.module');
var datalist_module_1 = require('../../../insights/datalist/datalist.module');
var MASFinancialsRatioModule = (function () {
    function MASFinancialsRatioModule() {
    }
    MASFinancialsRatioModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                chart_module_1.ChartModule,
                filter_module_1.FilterModule,
                action_module_1.ActionModule,
                ng2_popover_1.PopoverModule,
                underlying_datatable_module_1.UnderlyingDatatableModule,
                competitormenu_module_1.CompetitorMenuModule,
                mas_financials_ratio_routing_1.MASFinancialsRatioRouting,
                loader_module_1.LoaderModule,
                export_module_1.ExportModule,
                custompipes_module_1.CustomPipesModule,
                email_module_1.EmailModule,
                favourites_module_1.FavouriteModule,
                insights_module_1.InsightsModule,
                datalist_module_1.DataGridModule
            ],
            declarations: [
                mas_financials_ratio_component_1.MASFinancialsRatioComponent
            ],
            exports: [
                mas_financials_ratio_component_1.MASFinancialsRatioComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], MASFinancialsRatioModule);
    return MASFinancialsRatioModule;
}());
exports.MASFinancialsRatioModule = MASFinancialsRatioModule;
//# sourceMappingURL=mas-financials-ratio.module.js.map