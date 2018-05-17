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
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
var global_config_1 = require('../../global/global.config');
var UserProfileService = (function () {
    function UserProfileService(_http) {
        this._http = _http;
        this.getUserProfileUrl = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.getUserProfile;
    }
    UserProfileService.prototype.getUserProfile = function (userId) {
        var params = new http_1.URLSearchParams();
        params.set("userId", userId);
        return this._http.get(this.getUserProfileUrl, { search: params }).map(function (response) { return response.json(); });
    };
    UserProfileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserProfileService);
    return UserProfileService;
}());
exports.UserProfileService = UserProfileService;
//# sourceMappingURL=userprofile.service.js.map