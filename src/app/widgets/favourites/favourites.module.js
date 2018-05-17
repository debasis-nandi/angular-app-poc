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
var favourites_component_1 = require('./favourites.component');
var favourites_service_1 = require('./favourites.service');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var http_factory_1 = require('../../http-interceptor/http.factory');
var FavouriteModule = (function () {
    function FavouriteModule() {
    }
    FavouriteModule = __decorate([
        core_1.NgModule({
            imports: [],
            exports: [
                favourites_component_1.FavouritesComponent
            ],
            declarations: [
                favourites_component_1.FavouritesComponent
            ],
            providers: [
                favourites_service_1.FavouritesService,
                { provide: http_1.Http, useFactory: http_factory_1.httpFactory, deps: [http_1.XHRBackend, http_1.RequestOptions, router_1.Router] }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], FavouriteModule);
    return FavouriteModule;
}());
exports.FavouriteModule = FavouriteModule;
//# sourceMappingURL=favourites.module.js.map