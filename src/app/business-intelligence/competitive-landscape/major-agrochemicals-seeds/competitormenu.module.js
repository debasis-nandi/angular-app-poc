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
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var competitormenu_component_1 = require('./competitormenu.component');
var CompetitorMenuModule = (function () {
    function CompetitorMenuModule() {
    }
    CompetitorMenuModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                router_1.RouterModule
            ],
            declarations: [
                competitormenu_component_1.CompetitorMenuComponent
            ],
            exports: [
                competitormenu_component_1.CompetitorMenuComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CompetitorMenuModule);
    return CompetitorMenuModule;
}());
exports.CompetitorMenuModule = CompetitorMenuModule;
//# sourceMappingURL=competitormenu.module.js.map