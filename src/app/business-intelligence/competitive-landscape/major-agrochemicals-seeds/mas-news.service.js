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
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
var global_config_1 = require('../../../global/global.config');
var MASNewsService = (function () {
    function MASNewsService(_http) {
        this._http = _http;
        this._baseUrl = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.CiNewsApi;
    }
    MASNewsService.prototype.get = function (ModuleId) {
        return this._http.get(this._baseUrl + '/' + ModuleId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    MASNewsService.prototype.extractData = function (response) {
        var body = response.json();
        return body || {};
    };
    MASNewsService.prototype.handleError = function (error) {
        console.log(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    MASNewsService.prototype.getUrlInfo = function (url) {
        var params = new http_1.URLSearchParams();
        params.set('url', url);
        params.set('isValid', "true");
        return this._http.get(global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.GetUrlExists, { search: params }).map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    MASNewsService.prototype.getPageData = function (pageParamsObject) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.CiNewsApi, pageParamsObject, options).map(function (response) { return response.json(); });
    };
    MASNewsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MASNewsService);
    return MASNewsService;
}());
exports.MASNewsService = MASNewsService;
//# sourceMappingURL=mas-news.service.js.map