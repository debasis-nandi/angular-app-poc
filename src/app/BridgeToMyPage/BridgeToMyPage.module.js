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
//import { BrowserModule } from '@angular/platform-browser';
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
var BridgeToMyPage_component_1 = require('../BridgeToMyPage/BridgeToMyPage.component');
var BridgeToMyPage_service_1 = require('../BridgeToMyPage/BridgeToMyPage.service');
var BridgeToMyPage_routing_1 = require('../BridgeToMyPage/BridgeToMyPage.routing');
var loader_module_1 = require('../loader/loader.module');
var BridgeToMyPageModule = (function () {
    function BridgeToMyPageModule() {
    }
    BridgeToMyPageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                BridgeToMyPage_routing_1.BridgeToMyPageRouting,
                loader_module_1.LoaderModule
            ],
            declarations: [
                BridgeToMyPage_component_1.BridgeToMyPageComponent
            ],
            exports: [
                BridgeToMyPage_component_1.BridgeToMyPageComponent
            ],
            providers: [BridgeToMyPage_service_1.BridgeToMyPageService]
        }), 
        __metadata('design:paramtypes', [])
    ], BridgeToMyPageModule);
    return BridgeToMyPageModule;
}());
exports.BridgeToMyPageModule = BridgeToMyPageModule;
//# sourceMappingURL=BridgeToMyPage.module.js.map