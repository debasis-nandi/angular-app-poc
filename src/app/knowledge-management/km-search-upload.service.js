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
var KmSearchService = (function () {
    function KmSearchService(_http) {
        this._http = _http;
    }
    KmSearchService.prototype.get = function (url) {
        var headers = this.handleHeaders();
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.get(url, options)
            .map(function (response) { return response.json(); });
    };
    KmSearchService.prototype.getDocumentById = function (url, docId) {
        var headers = this.handleHeaders();
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.get(url + '/' + docId, options)
            .map(function (response) { return response.json(); });
    };
    KmSearchService.prototype.getRecentDocs = function (url) {
        var params = new http_1.URLSearchParams();
        params.set('DocumentId', "");
        params.set('TotalCount', "0");
        return this._http.get(url, { search: params })
            .map(function (response) { return response.json(); });
    };
    KmSearchService.prototype.post = function (url, model) {
        var body = JSON.stringify(model);
        var headers = this.handleHeaders();
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map(function (response) { return response.json(); });
    };
    KmSearchService.prototype.saveUploadDoc = function (url, formData) {
        var headers = new http_1.Headers();
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url, formData, options)
            .map(function (res) { res.json(); });
    };
    KmSearchService.prototype.handleHeaders = function () {
        return new http_1.Headers({
            'Content-Type': 'application/json'
        });
    };
    KmSearchService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error);
    };
    KmSearchService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], KmSearchService);
    return KmSearchService;
}());
exports.KmSearchService = KmSearchService;
//# sourceMappingURL=km-search-upload.service.js.map