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
var router_1 = require("@angular/router");
var global_config_1 = require('../global/global.config');
var search_service_1 = require('./search.service');
var SearchComponent = (function () {
    function SearchComponent(searchService, route) {
        this.searchService = searchService;
        this.route = route;
        this.isUnifiedSearch = false;
        this.pageSize = global_config_1.GlobalConfig.rowsPerPage;
        this.searchEndPoint = global_config_1.GlobalConfig.baseElasticEndPoint + global_config_1.GlobalConfig.elasticUnifiedSearchEndpoint;
        this.fileSearchEndPoint = global_config_1.GlobalConfig.baseElasticEndPoint + global_config_1.GlobalConfig.elasticUnifiedfileSearchEndpoint;
        this.loading = false;
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.searchResultFor = params['para'];
            if (_this.searchResultFor != undefined) {
                _this.isUnifiedSearch = false;
                var searchUrl = _this.searchEndPoint.replace("{0}", _this.searchResultFor).replace("{1}", _this.pageSize.toString());
                _this.getSearchItems(searchUrl);
            }
            else {
                _this.isUnifiedSearch = true;
                _this.searchResultFor = params['filepara'];
                var searchUrl = _this.fileSearchEndPoint.replace("{0}", _this.searchResultFor);
                _this.getSearchItems(searchUrl);
                _this.searchResultFor = "";
            }
        });
    };
    SearchComponent.prototype.ngOnChanges = function () {
    };
    SearchComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    SearchComponent.prototype.getSearchItems = function (searchUrl) {
        var _this = this;
        this.loading = true;
        //searchUrl = "./app/search/search.json";
        this.searchService.get(searchUrl)
            .subscribe(function (resItems) {
            _this.searchItems = resItems;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    SearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-search',
            templateUrl: 'search.component.html',
            providers: [search_service_1.SearchService]
        }), 
        __metadata('design:paramtypes', [search_service_1.SearchService, router_1.ActivatedRoute])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map