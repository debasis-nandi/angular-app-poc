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
var router_1 = require('@angular/router');
var global_config_1 = require('../global/global.config');
var login_service_1 = require('../login/login.service');
var OAuthCallbackComponent = (function () {
    function OAuthCallbackComponent(router, loginService) {
        this.router = router;
        this.loginService = loginService;
        this.data = {};
        this.userInfo = {};
        if (AuthenticationContext) {
            AuthenticationContext.config.redirectUri = global_config_1.GlobalConfig.redirectUri;
            var token = AuthenticationContext.getCachedToken(global_config_1.GlobalConfig.clientId);
            if (token) {
            }
        }
    }
    OAuthCallbackComponent.prototype.ngOnInit = function () {
        /*if (AuthenticationContext._user) {
            //this.router.navigate(['mypage']);
            //this.router.navigate(['login']);
        } else {
            //this.router.navigate(['mypage']);
            //this.router.navigate(['login']);
        }*/
    };
    OAuthCallbackComponent = __decorate([
        core_1.Component({
            template: '<div></div>',
            providers: [login_service_1.LoginService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService])
    ], OAuthCallbackComponent);
    return OAuthCallbackComponent;
}());
exports.OAuthCallbackComponent = OAuthCallbackComponent;
//# sourceMappingURL=OAuthCallbackComponent.js.map