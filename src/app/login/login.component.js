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
var login_service_1 = require('./login.service');
var global_config_1 = require('../global/global.config');
var global_util_1 = require('../global/global.util');
require('../adal-service/adal');
var LoginComponent = (function () {
    function LoginComponent(loginService, router) {
        this.loginService = loginService;
        this.router = router;
        this.data = {};
        this.user = { username: "", password: "" };
        this.errorMsg = '';
        this.loading = false;
        this.logoPath = global_config_1.GlobalConfig.loginLogo;
        this.isAadAuth = global_config_1.GlobalConfig.isAadAuth;
        this.userInfo = {};
        if (this.isAadAuth) {
            var isAppAuthenticated = global_util_1.GlobalUtil.getSession("IsAppAuthenticated");
            if (!isAppAuthenticated) {
                AuthenticationContext = new AuthenticationContext(global_config_1.GlobalConfig.adalConfig());
                AuthenticationContext.config.redirectUri = global_config_1.GlobalConfig.redirectUri;
                AuthenticationContext.login();
            }
        }
    }
    LoginComponent.prototype.Submit = function () {
        var _this = this;
        //console.log(this.user.username);
        this.loading = true;
        this.loginService.getUserDetails(this.user)
            .subscribe(function (data) {
            _this.data = data;
            global_util_1.GlobalUtil.setAppSession("UserInfo", data);
            global_config_1.GlobalConfig.environment = data.environment;
            _this.redirect(data);
        }, function (error) { return _this.errorMessage = error; });
    };
    LoginComponent.prototype.redirect = function (data) {
        if (data.validUser == true) {
            if (global_util_1.GlobalUtil.getAppSession("RequestedUrl"))
                this.router.navigateByUrl(global_util_1.GlobalUtil.getAppSession("RequestedUrl"));
            else
                this.router.navigateByUrl('layout/mypage');
        }
        else {
            this.errorMsg = data.message;
            this.loading = false;
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-login',
            templateUrl: 'login.component.html'
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map