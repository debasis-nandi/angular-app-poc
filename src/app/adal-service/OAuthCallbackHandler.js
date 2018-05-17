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
var global_util_1 = require('../global/global.util');
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/map');
require('rxjs/add/observable/of');
var global_config_1 = require('../global/global.config');
var router_1 = require('@angular/router');
var login_service_1 = require('../login/login.service');
var OAuthCallbackHandler = (function () {
    function OAuthCallbackHandler(router, loginService) {
        this.router = router;
        this.loginService = loginService;
        this.userInfo = {};
        AuthenticationContext = new AuthenticationContext(global_config_1.GlobalConfig.adalConfig());
    }
    OAuthCallbackHandler.prototype.canActivate = function (route, state) {
        AuthenticationContext.handleWindowCallback();
        if (AuthenticationContext._user) {
            global_util_1.GlobalUtil.setSession("IsAppAuthenticated", true);
            //Moved this code from OAuthCallbackComponent to resolve null in url issue'.
            var userProfile = AuthenticationContext._user["profile"];
            if (userProfile) {
                global_util_1.GlobalUtil.setAppSession("userProfile", userProfile);
                var data = {};
                data.userName = userProfile.given_name + ' ' + userProfile.family_name;
                data.firstName = userProfile.given_name;
                data.lastName = userProfile.family_name;
                data.validUser = true;
                data.imageUrl = "./app/assets/images/profile-pic.png";
                data.token = JSON.stringify(userProfile);
                //Fill details according to environment.
                if (global_config_1.GlobalConfig.environment == global_config_1.Constants.qaEnvironment || global_config_1.GlobalConfig.environment == global_config_1.Constants.devEnvironment) {
                    data.userId = userProfile.oid;
                    data.id = userProfile.oid;
                    data.tid = userProfile.oid;
                    data.email = userProfile.name.split('/')[1];
                    data.region = userProfile.name.split('/')[2];
                }
                else {
                    data.userId = userProfile.upn;
                    data.id = userProfile.upn;
                    data.tid = userProfile.upn;
                    // data.region = userProfile.locality.split('\')[0];
                    data.region = userProfile.locality.split('\\')[0];
                    data.email = userProfile.WindowsAccountName;
                }
                global_util_1.GlobalUtil.setAppSession("UserInfo", data);
                window.location.href = global_config_1.GlobalConfig.urlForBridgeToMyPage;
            }
            return true;
        }
        else {
            if (AuthenticationContext._user == undefined) {
                AuthenticationContext = new AuthenticationContext(global_config_1.GlobalConfig.adalConfig());
            }
            this.router.navigate(['login']);
            return false;
        }
    };
    OAuthCallbackHandler.prototype.adalConfig = function () {
        return {
            tenant: 'synclientaad.com',
            clientId: '3cbba47b-f30f-4bf5-9b04-c05bb89cccee',
            redirectUri: window.location.origin + '/',
            postLogoutRedirectUri: window.location.origin + '/',
            tenantId: '34d8d078-1dd9-479c-9dcb-838a670081b3'
        };
    };
    OAuthCallbackHandler.prototype.extractData = function (response) {
        var body = response.json();
        return body || {};
    };
    OAuthCallbackHandler.prototype.handleError = function (error) {
        console.log(error);
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    OAuthCallbackHandler = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService])
    ], OAuthCallbackHandler);
    return OAuthCallbackHandler;
}());
exports.OAuthCallbackHandler = OAuthCallbackHandler;
//# sourceMappingURL=OAuthCallbackHandler.js.map