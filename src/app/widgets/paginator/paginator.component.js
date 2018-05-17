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
var paginator_service_1 = require('./paginator.service');
var PaginatorComponent = (function () {
    function PaginatorComponent(pagerService) {
        this.pagerService = pagerService;
        this.pager = {}; // pager object
    }
    PaginatorComponent.prototype.ngOnChanges = function () {
        //debugger;
        //var dd = this.itemList;
        this.setPage(1);
    };
    PaginatorComponent.prototype.setPage = function (page) {
        /*if (page < 1 || page > this.pager.totalPages) {
            return;
        }*/
        // get pager object from service
        this.pager = this.pagerService.getPager(this.itemList.length, page);
        // get current page of items
        this.pagedItems = this.itemList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PaginatorComponent.prototype, "itemList", void 0);
    PaginatorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-paginator',
            templateUrl: 'paginator.component.html',
            providers: [paginator_service_1.PaginatorService]
        }), 
        __metadata('design:paramtypes', [paginator_service_1.PaginatorService])
    ], PaginatorComponent);
    return PaginatorComponent;
}());
exports.PaginatorComponent = PaginatorComponent;
//# sourceMappingURL=paginator.component.js.map