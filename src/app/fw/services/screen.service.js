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
var Subject_1 = require('rxjs/Subject');
var ScreenService = (function () {
    function ScreenService() {
        var _this = this;
        this.resizeSource = new Subject_1.Subject();
        this.resize$ = this.resizeSource.asObservable();
        this.largeBreakpoint = 800;
        this.screenWidth = 1000;
        this.screenHeight = 800;
        try {
            this.screenWidth = window.innerWidth;
            this.screenHeight = window.innerHeight;
            window.addEventListener('resize', function (event) { return _this.onResize(event); });
        }
        catch (e) {
        }
    }
    ScreenService.prototype.isLarge = function () {
        return this.screenWidth >= this.largeBreakpoint;
    };
    ScreenService.prototype.onResize = function ($event) {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        this.resizeSource.next();
    };
    ScreenService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ScreenService);
    return ScreenService;
}());
exports.ScreenService = ScreenService;
//# sourceMappingURL=screen.service.js.map