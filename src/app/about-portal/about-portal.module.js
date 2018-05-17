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
var about_portal_routing_1 = require('./about-portal.routing');
var about_portal_component_1 = require('./about-portal.component');
var glossary_module_1 = require('../widgets/glossary/glossary.module');
var custompipes_module_1 = require('../pipes/custompipes.module');
var loader_module_1 = require('../loader/loader.module');
var http_factory_1 = require('../http-interceptor/http.factory');
var http_2 = require('@angular/http');
var router_1 = require('@angular/router');
var AboutPortalModule = (function () {
    function AboutPortalModule() {
    }
    AboutPortalModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                about_portal_routing_1.AboutPortalRouting,
                glossary_module_1.GlossaryModule,
                custompipes_module_1.CustomPipesModule,
                loader_module_1.LoaderModule
            ],
            declarations: [
                about_portal_component_1.AboutPortalComponent
            ],
            exports: [
                about_portal_component_1.AboutPortalComponent
            ],
            providers: [
                { provide: http_2.Http, useFactory: http_factory_1.httpFactory, deps: [http_2.XHRBackend, http_2.RequestOptions, router_1.Router] }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AboutPortalModule);
    return AboutPortalModule;
}());
exports.AboutPortalModule = AboutPortalModule;
//# sourceMappingURL=about-portal.module.js.map