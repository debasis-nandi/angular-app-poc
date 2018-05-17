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
var chart_service_1 = require('../../../widgets/charts/chart.service');
var global_config_1 = require('../../../global/global.config');
var global_util_1 = require('../../../global/global.util');
var mas_competitorreports_service_1 = require('./mas-competitorreports.service');
var MASCompetitorReportsComponent = (function () {
    function MASCompetitorReportsComponent(chartService, service, route, router) {
        this.chartService = chartService;
        this.service = service;
        this.route = route;
        this.router = router;
        this.filterObject = [];
        this.exportObject = [];
        this.isAdmin = (global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
        this.loading = false;
        this.rowsPerPage = 5;
        this.rowsPerPageOptions = [5, 10, 20];
        this.paginator = false;
        this.searchItems1 = null;
        this.pageName = global_config_1.Page.ciCompetitorReports.toString();
        this.tabularViewModel = {
            widget: [],
            tableHead: [],
            actions: [],
            filters: []
        };
        this.seriveParams = { pageName: global_config_1.Page.ciCompetitorReports, companyId: global_util_1.GlobalUtil.getSession("CompetitorId"), cropId: 0, selectedFilter: null };
    }
    MASCompetitorReportsComponent.prototype.ngOnInit = function () {
        if (global_util_1.GlobalUtil.getSession("CompetitorId")) {
            this.loading = true;
            this.companyName = global_util_1.GlobalUtil.getSession("CompanyName");
            this.ModuleID = global_util_1.GlobalUtil.getSession("CompetitorId");
            this.getPageData();
        }
        else {
            this.router.navigateByUrl('layout/majoragroandseeds');
        }
    };
    MASCompetitorReportsComponent.prototype.getPageData = function () {
        var _this = this;
        this.KMRequest = [];
        this.service.getPageData(this.seriveParams).subscribe(function (resItems) {
            var docs = JSON.parse(resItems);
            _this.tabularViewModel = docs;
            for (var i = 0; i < docs["KPIData"].length; i++) {
                docs["KPIData"][i]["DocModules"] = JSON.parse(docs["KPIData"][i]["DocModules"]);
                docs["KPIData"][i]["DocCompetitors"] = JSON.parse(docs["KPIData"][i]["DocCompetitors"]);
                docs["KPIData"][i]["DocRegions"] = JSON.parse(docs["KPIData"][i]["DocRegions"]);
                docs["KPIData"][i]["DocCountries"] = JSON.parse(docs["KPIData"][i]["DocCountries"]);
            }
            _this.searchItems1 = {
                "elasticResponseData": [
                    {
                        "type": "knowledgemanagement",
                        "templateType": "other",
                        "typeName": "Knowledge Management",
                        "count": docs["KPIData"].length,
                        "data": docs["KPIData"]
                    }
                ]
            };
            //this.pageSize = 50;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    MASCompetitorReportsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-mascompetitorreport',
            templateUrl: 'mas-competitorreports.component.html',
            providers: [mas_competitorreports_service_1.MASCompetitorReportsService]
        }), 
        __metadata('design:paramtypes', [chart_service_1.ChartService, mas_competitorreports_service_1.MASCompetitorReportsService, router_1.ActivatedRoute, router_1.Router])
    ], MASCompetitorReportsComponent);
    return MASCompetitorReportsComponent;
}());
exports.MASCompetitorReportsComponent = MASCompetitorReportsComponent;
//# sourceMappingURL=mas-competitorreports.component.js.map