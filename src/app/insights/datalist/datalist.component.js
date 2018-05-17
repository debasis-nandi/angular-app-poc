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
var global_util_1 = require('../../global/global.util');
var datalist_service_1 = require('./datalist.service');
var DataListComponent = (function () {
    function DataListComponent(router, datalistService) {
        this.router = router;
        this.datalistService = datalistService;
        this.paginator = false;
        this.IsAdmin = (global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
        this.userId = global_util_1.GlobalUtil.getAppSession("UserInfo").userId;
        this.showInsightButton = true;
        this.showContent = true;
        this.bodyClass = 'panel-body';
        this.headerClass = 'panel-heading';
    }
    DataListComponent.prototype.ngOnChanges = function () {
        this.insights = this.insightObj;
    };
    DataListComponent.prototype.showMoreContent = function (insight) {
        this.contentDefinition = insight;
        this.showContent = !this.showContent;
        ;
    };
    DataListComponent.prototype.onClose = function () {
        this.showContent = !this.showContent;
        ;
        this.contentDefinition = '';
    };
    DataListComponent.prototype.onEditClick = function (insight) {
        alert('Edit clicked');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataListComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataListComponent.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataListComponent.prototype, "header", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataListComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataListComponent.prototype, "insightObj", void 0);
    DataListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ngdatalist',
            templateUrl: 'datalist.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, datalist_service_1.DataListService])
    ], DataListComponent);
    return DataListComponent;
}());
exports.DataListComponent = DataListComponent;
//# sourceMappingURL=datalist.component.js.map