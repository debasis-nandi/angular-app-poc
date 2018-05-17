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
var forms_1 = require('@angular/forms');
var modal_module_1 = require('../widgets/modals/modal.module');
var datatable_module_1 = require('../widgets/datatable/datatable.module');
var admin_module_1 = require('../admin/admin.module');
var query_component_1 = require('./query.component');
var query_service_1 = require('./query.service');
var query_routing_1 = require('./query.routing');
var loader_module_1 = require('../loader/loader.module');
var QueryModule = (function () {
    function QueryModule() {
    }
    QueryModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                datatable_module_1.TableModule,
                modal_module_1.ModalModule,
                admin_module_1.AdminModule,
                query_routing_1.QueryRouting,
                loader_module_1.LoaderModule
            ],
            declarations: [
                query_component_1.QueryComponent
            ],
            exports: [
                query_component_1.QueryComponent
            ],
            providers: [
                query_service_1.QueryService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], QueryModule);
    return QueryModule;
}());
exports.QueryModule = QueryModule;
//# sourceMappingURL=query.module.js.map