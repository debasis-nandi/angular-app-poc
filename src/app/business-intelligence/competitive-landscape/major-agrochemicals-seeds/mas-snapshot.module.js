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
var mas_snapshot_routing_1 = require('./mas-snapshot.routing');
var export_module_1 = require('../../../widgets/export/export.module');
var filter_module_1 = require('../../../widgets/filters/filter.module');
var action_module_1 = require('../../../widgets/actions/action.module');
var ng2_popover_1 = require('ng2-popover');
var datatable_module_1 = require('../../../widgets/datatable/datatable.module');
var competitormenu_module_1 = require('./competitormenu.module');
var mas_snapshot_component_1 = require('./mas-snapshot.component');
var loader_module_1 = require('../../../loader/loader.module');
var MASSnapshotModule = (function () {
    function MASSnapshotModule() {
    }
    MASSnapshotModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                export_module_1.ExportModule,
                filter_module_1.FilterModule,
                export_module_1.ExportModule,
                action_module_1.ActionModule,
                ng2_popover_1.PopoverModule,
                datatable_module_1.TableModule,
                competitormenu_module_1.CompetitorMenuModule,
                mas_snapshot_routing_1.MASSnapshotRouting,
                loader_module_1.LoaderModule
            ],
            declarations: [
                mas_snapshot_component_1.MASSnapshotComponent
            ],
            exports: [
                mas_snapshot_component_1.MASSnapshotComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], MASSnapshotModule);
    return MASSnapshotModule;
}());
exports.MASSnapshotModule = MASSnapshotModule;
//# sourceMappingURL=mas-snapshot.module.js.map