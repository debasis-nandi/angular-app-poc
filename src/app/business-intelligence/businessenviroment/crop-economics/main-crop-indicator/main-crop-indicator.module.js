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
var action_module_1 = require('../../../../widgets/actions/action.module');
var ng2_popover_1 = require('ng2-popover');
var datatable_module_1 = require('../../../../widgets/datatable/datatable.module');
var crop_menu_module_1 = require('./crop-menu.module');
var export_module_1 = require('../../../../widgets/export/export.module');
var filter_module_1 = require('../../../../widgets/filters/filter.module');
var main_crop_indicator_component_1 = require('./main-crop-indicator.component');
var main_crop_indicator_routing_1 = require('./main-crop-indicator.routing');
var loader_module_1 = require('../../../../loader/loader.module');
var MainCropIndicatorModule = (function () {
    function MainCropIndicatorModule() {
    }
    MainCropIndicatorModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                filter_module_1.FilterModule,
                export_module_1.ExportModule,
                action_module_1.ActionModule,
                ng2_popover_1.PopoverModule,
                datatable_module_1.TableModule,
                crop_menu_module_1.CropMenuModule,
                main_crop_indicator_routing_1.MainCropIndicatorRouting, loader_module_1.LoaderModule
            ],
            declarations: [
                main_crop_indicator_component_1.MainCropIndicatorComponent
            ],
            exports: [
                main_crop_indicator_component_1.MainCropIndicatorComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], MainCropIndicatorModule);
    return MainCropIndicatorModule;
}());
exports.MainCropIndicatorModule = MainCropIndicatorModule;
//# sourceMappingURL=main-crop-indicator.module.js.map