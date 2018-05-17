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
var QueryService = (function () {
    function QueryService(_http) {
        this._http = _http;
    }
    QueryService.prototype.get = function (url) {
        var headers = this.handleHeaders();
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.get(url, options)
            .map(function (response) { return response.json(); });
    };
    QueryService.prototype.post = function (url, model) {
        var body = JSON.stringify(model);
        var headers = this.handleHeaders();
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map(function (response) { return response.json(); });
    };
    QueryService.prototype.handleHeaders = function () {
        return new http_1.Headers({
            'Content-Type': 'application/json'
        });
    };
    QueryService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error);
    };
    QueryService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], QueryService);
    return QueryService;
}());
exports.QueryService = QueryService;
//# sourceMappingURL=query.service.js.map