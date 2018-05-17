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
var router_1 = require("@angular/router");
var menu_service_1 = require('./menu.service');
var global_config_1 = require('../../global/global.config');
var global_util_1 = require('../../global/global.util');
var MenuComponent = (function () {
    function MenuComponent(service, router) {
        this.service = service;
        this.router = router;
        this.isToogle = false;
        this.styles = { 'display': 'none' };
        this.isOpenClose = 'hamburger is-closed animated fadeInLeft';
        this.loading = false;
        this.cssToggled = 'hidden-md hidden-sm hidden-lg visible-xs';
        this.endPoint = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.menuApi;
    }
    MenuComponent.prototype.ngOnInit = function () {
        this.loading = true;
        this.getMenuItems();
        this.loading = false;
    };
    MenuComponent.prototype.getMenuItems = function () {
        var _this = this;
        this.userRole = global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0];
        this.userName = global_util_1.GlobalUtil.getAppSession("UserInfo") ? global_util_1.GlobalUtil.getAppSession("UserInfo").userName.split('@')[0].split('.')[0] : "";
        var url = this.endPoint.replace("{0}", this.userRole);
        this.service.get(url).subscribe(function (result) {
            _this.menuItems = result;
        });
    };
    MenuComponent.prototype.downloadAdminGuide = function () {
        this.loading = true;
        var a = window.document.createElement("a");
        a.href = global_config_1.GlobalConfig.baseEndpointExport + global_config_1.GlobalConfig.DownloadDocApi + "?FileName=" + global_config_1.GlobalConfig.adminGuideFileName;
        a.download = global_config_1.GlobalConfig.adminGuideFileName;
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.loading = false;
    };
    MenuComponent.prototype.onLogout = function () {
        global_util_1.GlobalUtil.clearAppSession("UserInfo");
        global_util_1.GlobalUtil.clearAppSession("RequestedUrl");
        this.router.navigateByUrl('login');
    };
    MenuComponent.prototype.toogleClass = function (event) {
        //debugger;
        var target = event.currentTarget;
        var flag = target.classList.contains('is-closed') ? true : false;
        this.isToogle = flag;
        this.styles = { 'display': flag ? 'block' : 'none' };
        this.isOpenClose = flag ? 'hamburger is-open animated fadeInLeft' : 'hamburger is-closed animated fadeInLeft';
        this.cssToggled = flag ? 'hidden-md hidden-sm hidden-lg visible-xs toggled' : 'hidden-md hidden-sm hidden-lg visible-xs';
    };
    MenuComponent.prototype.onScroll = function (event) {
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (scrollTop >= 97) {
            var myMenuH = document.getElementById("myMenuH");
            if (myMenuH.classList.contains("affix-top")) {
                myMenuH.classList.remove("affix-top");
                myMenuH.classList.add("affix");
            }
        }
        else {
            var myMenuH = document.getElementById("myMenuH");
            if (myMenuH.classList.contains("affix")) {
                myMenuH.classList.remove("affix");
                myMenuH.classList.add("affix-top");
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MenuComponent.prototype, "menuItems", void 0);
    MenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-menu',
            templateUrl: 'menu.component.html',
            providers: [menu_service_1.MenuService]
        }), 
        __metadata('design:paramtypes', [menu_service_1.MenuService, router_1.Router])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map