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
var global_config_1 = require('../../global/global.config');
var global_config_2 = require('../../global/global.config');
var paginator_service_1 = require('../paginator/paginator.service');
var ChartTemplateComponent = (function () {
    function ChartTemplateComponent(router, pagerService) {
        this.router = router;
        this.pagerService = pagerService;
        this.pager = {};
        this.rowPerPage = global_config_1.GlobalConfig.rowsPerPage;
    }
    ChartTemplateComponent.prototype.ngOnInit = function () {
    };
    ChartTemplateComponent.prototype.ngOnChanges = function () {
        this.setPage(1, true);
    };
    ChartTemplateComponent.prototype.onRedirect = function (pageName, Id, chartYear, companyName) {
        //debugger;
        if (pageName) {
            global_util_1.GlobalUtil.setSession("ChartYear", chartYear != 0 ? chartYear.toString() : "");
            if (pageName == global_config_2.Page.ciFinancials) {
                global_util_1.GlobalUtil.setSession("CompanyName", companyName);
                global_util_1.GlobalUtil.setSession("CompetitorId", Id);
                this.router.navigate(['layout/majoragroandseeds/masfinancials']);
            }
            if (pageName == global_config_2.Page.ciFinancialsRatio) {
                global_util_1.GlobalUtil.setSession("CompanyName", companyName);
                global_util_1.GlobalUtil.setSession("CompetitorId", Id);
                this.router.navigate(['layout/majoragroandseeds/masfinancialsratio']);
            }
            if (pageName == global_config_2.Page.competitorComparison) {
                global_util_1.GlobalUtil.setSession("CompanyName", companyName);
                global_util_1.GlobalUtil.setSession("CompetitorId", Id);
                this.router.navigate(['layout/competitorcomparison']);
            }
            if (pageName == global_config_2.Page.cropIndicatorOverview) {
                global_util_1.GlobalUtil.setSession("CropName", companyName);
                global_util_1.GlobalUtil.setSession("CropId", Id);
                this.router.navigate(['layout/agribusinessoverview/cropoverview']);
            }
            if (pageName == global_config_2.Page.cropIndicatorUSPrice) {
                global_util_1.GlobalUtil.setSession("CropName", companyName);
                global_util_1.GlobalUtil.setSession("CropId", Id);
                this.router.navigate(['layout/agribusinessoverview/cropprice']);
            }
            if (pageName == global_config_2.Page.biofuels) {
                this.router.navigate(['layout/biofuels']);
            }
            if (pageName == global_config_2.Page.macroeconomicsIndicators) {
                this.router.navigate(['layout/economicindicators']);
            }
            if (pageName == global_config_2.Page.macroeconomicsCurrencyBasket) {
                this.router.navigate(['layout/currencybasket']);
            }
            if (pageName == global_config_2.Page.agribusinessOverview) {
                this.router.navigate(['layout/agribusinessoverview']);
            }
        }
    };
    ChartTemplateComponent.prototype.setPage = function (page, isFirstLoad) {
        var _this = this;
        //debugger;
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.totalSize, page);
        // get current page of items
        if (isFirstLoad) {
            this.pagedItems = this.chartItems;
        }
        else {
            var pagingUrl = global_config_1.GlobalConfig.baseElasticEndPoint + global_config_1.GlobalConfig.elasticTypeWiseSearchEndpoint
                .replace("{0}", this.searchResultFor)
                .replace("{1}", this.type)
                .replace("{2}", global_config_1.GlobalConfig.rowsPerPage.toString())
                .replace("{3}", page.toString());
            this.pagerService.get(pagingUrl).subscribe(function (resItems) {
                if (resItems) {
                    _this.pagedItems = resItems.elasticResponseData[0].data;
                }
            });
            ;
        }
        //this.pagedItems = this.chartItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartTemplateComponent.prototype, "chartItems", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ChartTemplateComponent.prototype, "searchResultFor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ChartTemplateComponent.prototype, "totalSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ChartTemplateComponent.prototype, "type", void 0);
    ChartTemplateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-chart-template',
            templateUrl: 'chart-template.component.html',
            providers: [paginator_service_1.PaginatorService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, paginator_service_1.PaginatorService])
    ], ChartTemplateComponent);
    return ChartTemplateComponent;
}());
exports.ChartTemplateComponent = ChartTemplateComponent;
//# sourceMappingURL=chart-template.component.js.map