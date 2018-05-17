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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
var global_config_1 = require('../global/global.config');
var global_util_1 = require('../global/global.util');
var LayoutService = (function () {
    function LayoutService(_http) {
        this._http = _http;
        this.getFootnoteUrl = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.getFootnote;
        this.saveFootnoteUrl = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.saveFootnote;
        this.getUserProfileUrl = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.getUserProfile;
    }
    LayoutService.prototype.saveFootnote = function (footnote) {
        return this._http.post(this.saveFootnoteUrl, footnote).map(function (response) { return response.json(); });
    };
    /*getData(): Observable<any> {
        console.log("Here");
        // Parameters obj-
        let params: URLSearchParams = new URLSearchParams();
        params.set('pageName', GlobalUtil.getSession("pagename"));

        return this._http.get(this.getFootnoteUrl, { search: params })
            .map((response: Response) => {
            debugger;
            console.log(response.json());
            response.json();
        });
    }*/
    LayoutService.prototype.getData = function () {
        var params = new http_1.URLSearchParams();
        params.set('pageName', global_util_1.GlobalUtil.getSession("pagename"));
        return this._http.get(this.getFootnoteUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    };
    LayoutService.prototype.getNotification = function (url) {
        var headers = this.handleHeaders();
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.get(url, options)
            .map(function (response) { return response.json(); });
    };
    LayoutService.prototype.setNotification = function (url, formData) {
        var headers = new http_1.Headers();
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url, formData, options)
            .map(function (res) { res.json(); });
    };
    LayoutService.prototype.killUserToken = function (userId) {
        var killTokenUrl = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.killUserTokenApi;
        var params = new http_1.URLSearchParams();
        params.set('UserId', userId);
        return this._http.delete(killTokenUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    };
    LayoutService.prototype.extractData = function (response) {
        var body = response.json();
        return body || {};
    };
    LayoutService.prototype.handleError = function (error) {
        console.log(error);
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    LayoutService.prototype.handleHeaders = function () {
        return new http_1.Headers({
            'Content-Type': 'application/json'
        });
    };
    LayoutService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LayoutService);
    return LayoutService;
}());
exports.LayoutService = LayoutService;
//# sourceMappingURL=layout.service.js.map