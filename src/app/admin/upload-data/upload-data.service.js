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
var UploadDataService = (function () {
    function UploadDataService(_http) {
        this._http = _http;
    }
    UploadDataService.prototype.get = function (url) {
        var headers = this.handleHeaders();
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.get(url, options)
            .map(function (response) { return response.json(); });
    };
    UploadDataService.prototype.postUploadData = function (url, formData, moduleId, isUpdate, userRegion) {
        //let headers = new Headers({
        //    'ModuleId': moduleId
        //});
        var params = new http_1.URLSearchParams();
        params.set('isUpdate', isUpdate.toString());
        params.set('moduleId', moduleId.toString());
        params.set('userRegion', userRegion.toString());
        // let options = new RequestOptions({ headers: headers });
        return this._http.post(url, formData, { search: params })
            .map(function (response) {
            return response.json();
        });
    };
    UploadDataService.prototype.handleHeaders = function () {
        return new http_1.Headers({
            'Content-Type': 'application/json'
        });
    };
    UploadDataService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error);
    };
    UploadDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UploadDataService);
    return UploadDataService;
}());
exports.UploadDataService = UploadDataService;
//# sourceMappingURL=upload-data.service.js.map