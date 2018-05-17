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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
require("rxjs/add/operator/filter");
var breadcrumb_service_1 = require('./breadcrumb.service');
var BreadcrumbComponent = (function () {
    function BreadcrumbComponent(router, activatedRoute, breadcrumbService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.breadcrumbService = breadcrumbService;
        this.breadcrumbs = [];
    }
    BreadcrumbComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.subscribe(function (event) {
            _this.breadcrumbs = [];
            var currentPath = _this.router.url;
            _this.breadcrumbs = _this.breadcrumbService.getBreadcrumbsLink(currentPath);
        });
    };
    BreadcrumbComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-breadcrumb',
            templateUrl: 'breadcrumb.component.html',
            providers: [breadcrumb_service_1.BreadCrumbService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, breadcrumb_service_1.BreadCrumbService])
    ], BreadcrumbComponent);
    return BreadcrumbComponent;
}());
exports.BreadcrumbComponent = BreadcrumbComponent;
//# sourceMappingURL=breadcrumb.component.js.map