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
var filter_module_1 = require('../../../../widgets/filters/filter.module');
var export_module_1 = require('../../../../widgets/export/export.module');
var action_module_1 = require('../../../../widgets/actions/action.module');
var ng2_popover_1 = require('ng2-popover');
var underlying_datatable_module_1 = require('../../../../widgets/underlying-datatable/underlying-datatable.module');
var chart_module_1 = require('../../../../widgets/charts/chart.module');
var loader_module_1 = require('../../../../loader/loader.module');
var email_module_1 = require('../../../../widgets/email/email.module');
var crop_price_routing_1 = require('./crop-price.routing');
var crop_price_component_1 = require('./crop-price.component');
var crop_menu_module_1 = require('./crop-menu.module');
var custompipes_module_1 = require('../../../../pipes/custompipes.module');
var CropPriceModule = (function () {
    function CropPriceModule() {
    }
    CropPriceModule = __decorate([
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
                crop_price_routing_1.CropPriceRouting,
                crop_menu_module_1.CropMenuModule,
                loader_module_1.LoaderModule,
                custompipes_module_1.CustomPipesModule,
                email_module_1.EmailModule
            ],
            declarations: [
                crop_price_component_1.CropPriceComponent
            ],
            exports: [
                crop_price_component_1.CropPriceComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CropPriceModule);
    return CropPriceModule;
}());
exports.CropPriceModule = CropPriceModule;
//# sourceMappingURL=crop-price.module.js.map