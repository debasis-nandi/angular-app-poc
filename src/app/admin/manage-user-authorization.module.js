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
var router_1 = require('@angular/router');
var manageuser_routing_1 = require('./manageuser.routing');
var admin_module_1 = require('./admin.module');
var common_1 = require('@angular/common');
var manage_user_authorization_component_1 = require('./manage-user-authorization.component');
var ManageUserAuthorizationModule = (function () {
    function ManageUserAuthorizationModule() {
    }
    ManageUserAuthorizationModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpModule,
                router_1.RouterModule,
                manageuser_routing_1.ManageUserRouting,
                admin_module_1.AdminModule
            ],
            declarations: [
                manage_user_authorization_component_1.ManageUserAuthorizationComponent
            ],
            exports: [
                manage_user_authorization_component_1.ManageUserAuthorizationComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ManageUserAuthorizationModule);
    return ManageUserAuthorizationModule;
}());
exports.ManageUserAuthorizationModule = ManageUserAuthorizationModule;
//# sourceMappingURL=manage-user-authorization.module.js.map