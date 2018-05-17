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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var action_component_1 = require('./action.component');
var modal_module_1 = require('../modals/modal.module');
var ng2_popover_1 = require('ng2-popover');
var filter_module_1 = require('../filters/filter.module');
var favourites_module_1 = require('../favourites/favourites.module');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var http_factory_1 = require('../../http-interceptor/http.factory');
var ActionModule = (function () {
    function ActionModule() {
    }
    ActionModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                modal_module_1.ModalModule,
                ng2_popover_1.PopoverModule,
                filter_module_1.FilterModule,
                favourites_module_1.FavouriteModule
            ],
            exports: [
                action_component_1.ActionComponent
            ],
            declarations: [
                action_component_1.ActionComponent
            ],
            providers: [
                { provide: http_1.Http, useFactory: http_factory_1.httpFactory, deps: [http_1.XHRBackend, http_1.RequestOptions, router_1.Router] }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ActionModule);
    return ActionModule;
}());
exports.ActionModule = ActionModule;
//# sourceMappingURL=action.module.js.map