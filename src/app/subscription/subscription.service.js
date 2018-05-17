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
var SubscriptionService = (function () {
    function SubscriptionService(_http) {
        this._http = _http;
        this.saveUserSubscriptionUrl = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.saveUserSubscription;
        this.getUserSubscriptionPageUrl = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.getUserSubscription;
        this.removeUserSubscriptionPageUrl = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.removeUserSubscription;
    }
    SubscriptionService.prototype.saveUserSubscription = function (iUserSubscription) {
        return this._http.post(this.saveUserSubscriptionUrl, iUserSubscription)
            .map(function (response) { response.json(); })
            .catch(this.handleError);
    };
    SubscriptionService.prototype.getPageData = function (userId, moduleId) {
        var params = new http_1.URLSearchParams();
        params.set('userId', userId);
        params.set('moduleId', moduleId.toString());
        return this._http.get(this.getUserSubscriptionPageUrl, { search: params }).map(function (response) { return response.json(); });
    };
    SubscriptionService.prototype.removeSubscription = function (subscriptionId) {
        var params = new http_1.URLSearchParams();
        params.set('subscriptionId', subscriptionId.toString());
        return this._http.delete(this.saveUserSubscriptionUrl, { search: params })
            .map(function (response) { response.json(); })
            .catch(this.handleError);
    };
    SubscriptionService.prototype.handleError = function (error) {
        console.log(error);
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    SubscriptionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SubscriptionService);
    return SubscriptionService;
}());
exports.SubscriptionService = SubscriptionService;
//# sourceMappingURL=subscription.service.js.map