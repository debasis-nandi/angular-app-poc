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
var search_template_module_1 = require('../../../widgets/search-template/search-template.module');
var ng2_popover_1 = require('ng2-popover');
var datatable_module_1 = require('../../../widgets/datatable/datatable.module');
var competitormenu_module_1 = require('./competitormenu.module');
var major_agrochemicals_seeds_component_1 = require('./major.agrochemicals-seeds.component');
var major_agrochemicals_seeds_routing_1 = require('./major.agrochemicals-seeds.routing');
var loader_module_1 = require('../../../loader/loader.module');
var MajorAgrochemicalsSeedsModule = (function () {
    function MajorAgrochemicalsSeedsModule() {
    }
    MajorAgrochemicalsSeedsModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                filter_module_1.FilterModule,
                action_module_1.ActionModule,
                ng2_popover_1.PopoverModule,
                datatable_module_1.TableModule,
                competitormenu_module_1.CompetitorMenuModule,
                major_agrochemicals_seeds_routing_1.MajorAgroRouting, loader_module_1.LoaderModule,
                export_module_1.ExportModule,
                search_template_module_1.SearchTemplateModule
            ],
            declarations: [
                major_agrochemicals_seeds_component_1.MajorAgrochemicalsSeedsComponent
            ],
            exports: [
                major_agrochemicals_seeds_component_1.MajorAgrochemicalsSeedsComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], MajorAgrochemicalsSeedsModule);
    return MajorAgrochemicalsSeedsModule;
}());
exports.MajorAgrochemicalsSeedsModule = MajorAgrochemicalsSeedsModule;
//# sourceMappingURL=major-agrochemicals-seeds.module.js.map