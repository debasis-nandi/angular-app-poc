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
var login_service_1 = require('../login/login.service');
var global_config_1 = require('../global/global.config');
var global_util_1 = require('../global/global.util');
require('../adal-service/adal');
var BridgeToMyPageComponent = (function () {
    function BridgeToMyPageComponent(loginService, router) {
        var _this = this;
        this.loginService = loginService;
        this.router = router;
        this.data = {};
        this.user = { username: "", password: "" };
        this.errorMsg = '';
        this.loading = false;
        this.logoPath = global_config_1.GlobalConfig.loginLogo;
        this.isAadAuth = global_config_1.GlobalConfig.isAadAuth;
        this.userInfo = {};
        this.userInfo = global_util_1.GlobalUtil.getAppSession("UserInfo");
        //Fill session.
        this.loginService.getUserInfo(this.userInfo).subscribe(function (info) {
            var tempUserInfo = info;
            _this.userInfo.region = tempUserInfo.region;
            _this.userInfo.regionId = tempUserInfo.regionId;
            _this.userInfo.accessLevel = tempUserInfo.accessLevel;
            _this.userInfo.roles = tempUserInfo.userRoles.map(function (x) { return x.role; });
            _this.userInfo.userGroup = tempUserInfo.userGroup;
            _this.userInfo.email = tempUserInfo.email;
            _this.userInfo.userRoles = tempUserInfo.userRoles;
            global_util_1.GlobalUtil.setAppSession("UserInfo", _this.userInfo);
            global_config_1.GlobalConfig.environment = _this.userInfo.environment;
            //Call mypage.
            //this.router.navigateByUrl('layout/mypage');
            if (global_util_1.GlobalUtil.getAppSession("RequestedUrl")) {
                _this.router.navigateByUrl(global_util_1.GlobalUtil.getAppSession("RequestedUrl"));
            }
            else {
                _this.router.navigateByUrl('layout/mypage');
            }
        }, function (error) {
        });
    }
    BridgeToMyPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-login',
            templateUrl: 'BridgeToMyPage.component.html'
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.Router])
    ], BridgeToMyPageComponent);
    return BridgeToMyPageComponent;
}());
exports.BridgeToMyPageComponent = BridgeToMyPageComponent;
//# sourceMappingURL=BridgeToMyPage.component.js.map