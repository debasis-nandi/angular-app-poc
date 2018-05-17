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
//import {Observable} from 'rxjs/Rx';
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/map');
require('rxjs/add/observable/of');
var global_config_1 = require('../../global/global.config');
var ChartService = (function () {
    function ChartService(http) {
        this.http = http;
        //private baseUrl = 'http://localhost:56833/api/CropCorn';
        this.baseUrl = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.competitorPagesApi;
        this.saveInsightUrl = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.saveInsight;
    }
    ChartService.prototype.getData = function (serviceParams) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl, serviceParams, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ChartService.prototype.getChartSpecificData = function (serviceParams) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl, serviceParams, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ChartService.prototype.getMockData = function () {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ChartService.prototype.extractData = function (response) {
        var body = response.json();
        return body || {};
        //let obj = JSON.parse(body)
        //return obj || [];
    };
    ChartService.prototype.handleError = function (error) {
        console.log(error);
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    ChartService.prototype.updateInsightData = function (insight) {
        return this.http.post(this.saveInsightUrl, insight).map(function (response) { });
    };
    ChartService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ChartService);
    return ChartService;
}());
exports.ChartService = ChartService;
//# sourceMappingURL=chart.service.js.map