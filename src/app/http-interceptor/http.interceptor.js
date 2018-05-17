"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var Observable_1 = require('rxjs/Observable');
var router_1 = require('@angular/router');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
var global_util_1 = require('../global/global.util');
var global_config_1 = require('../global/global.config');
var InterceptedHttp = (function (_super) {
    __extends(InterceptedHttp, _super);
    function InterceptedHttp(backend, defaultOptions, router) {
        _super.call(this, backend, defaultOptions);
        this.router = router;
    }
    InterceptedHttp.prototype.request = function (url, options) {
        return this.intercept(_super.prototype.request.call(this, url, options));
        //return super.request(url, options);
    };
    InterceptedHttp.prototype.get = function (url, options) {
        return this.intercept(_super.prototype.get.call(this, url, this.getRequestOptionArgs(options)));
        //return super.get(url, options);
    };
    InterceptedHttp.prototype.post = function (url, body, options) {
        return this.intercept(_super.prototype.post.call(this, url, body, this.getRequestOptionArgs(options)));
        //return super.post(url, body, options);
    };
    InterceptedHttp.prototype.put = function (url, body, options) {
        return this.intercept(_super.prototype.put.call(this, url, body, this.getRequestOptionArgs(options)));
        //return super.put(url, body, options);
    };
    InterceptedHttp.prototype.delete = function (url, options) {
        return this.intercept(_super.prototype.delete.call(this, url, this.getRequestOptionArgs(options)));
        //return super.delete(url, options);
    };
    InterceptedHttp.prototype.getRequestOptionArgs = function (options) {
        if (options == null) {
            options = new http_1.RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new http_1.Headers();
        }
        //options.headers.append('UserId', GlobalUtil.getAppSession("UserInfo").userId);
        //options.headers.append('UserAuthToken', GlobalUtil.getAppSession("UserInfo").userToken);
        if (global_util_1.GlobalUtil.getAppSession("UserInfo").userRoles) {
            options.headers.append('RoleId', global_util_1.GlobalUtil.getAppSession("UserInfo").userRoles[0].id);
        }
        return options;
    };
    InterceptedHttp.prototype.intercept = function (observable) {
        var _this = this;
        return observable.catch(function (err, source) {
            if ((err.status == 401 || err.status == 403)) {
                //return Observable.empty();
                global_util_1.GlobalUtil.clearAppSession("UserInfo");
                global_util_1.GlobalUtil.clearAppSession("RequestedUrl");
                if (global_config_1.GlobalConfig.isAadAuth) {
                    global_util_1.GlobalUtil.clearSession("IsAppAuthenticated");
                    if (AuthenticationContext._user == undefined) {
                        AuthenticationContext = new AuthenticationContext(global_config_1.GlobalConfig.adalConfig());
                    }
                    AuthenticationContext.logOut();
                }
                else {
                    _this.router.navigateByUrl('login');
                }
            }
            return Observable_1.Observable.throw(err);
        });
    };
    InterceptedHttp = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.ConnectionBackend, http_1.RequestOptions, router_1.Router])
    ], InterceptedHttp);
    return InterceptedHttp;
}(http_1.Http));
exports.InterceptedHttp = InterceptedHttp;
//# sourceMappingURL=http.interceptor.js.map