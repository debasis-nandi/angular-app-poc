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
var useranalytics_service_1 = require('./useranalytics.service');
var global_util_1 = require('../../global/global.util');
var global_config_1 = require('../../global/global.config');
var UserAnalyticsComponent = (function () {
    function UserAnalyticsComponent(userAnalyticsService) {
        this.userAnalyticsService = userAnalyticsService;
        this.tabularViewModel = {
            tableHead: [],
            kpiData: [],
            actions: [],
            filters: []
        };
        this.seriveParams = { pageName: global_config_1.Page.UserAnalytics.toString(), companyId: 0, cropId: 0, selectedFilter: null, userId: global_util_1.GlobalUtil.getAppSession("UserInfo").userId };
        this.filterObject = [];
        this.loading = false;
        this.columnNameToGroupBy = "modules";
        this.styleClass = 'ui-datatable table table-hover comp-table';
        this.userAnalyticsData = [];
        this.myDateRangePickerOptions = {
            dateFormat: 'dd-mm-yyyy'
        };
    }
    UserAnalyticsComponent.prototype.onDropdownChange = function (filterValue) {
        this.regionId = filterValue.target.value;
    };
    UserAnalyticsComponent.prototype.onSave = function () {
        var _this = this;
        //debugger;
        if (this.fromDate == null) {
            this.publicationDateeMsg = "Please select a 'from' date";
            setTimeout(function () {
                _this.publicationDateeMsg = "";
            }, 3000);
            return null;
        }
        if (this.toDate == null) {
            this.publicationDateeMsg = "Please select a 'to' date";
            setTimeout(function () {
                _this.publicationDateeMsg = "";
            }, 3000);
            return null;
        }
        var leftdate;
        var rightdate;
        leftdate = this.extractDate(this.fromDate.date);
        rightdate = this.extractDate(this.toDate.date);
        if (leftdate > rightdate) {
            this.publicationDateeMsg = "'From' date cannot be greater than the 'to' date";
            setTimeout(function () {
                _this.publicationDateeMsg = "";
            }, 3000);
            return null;
        }
        if (this.publicationDateeMsg == "" || this.publicationDateeMsg == undefined) {
            this.loading = true;
            this.getPageData();
        }
    };
    UserAnalyticsComponent.prototype.onReset = function () {
        this.loading = true;
        this.setDefaults();
        this.getPageData();
    };
    UserAnalyticsComponent.prototype.ngOnInit = function () {
        //if (GlobalConfig.kpiActionState != undefined && GlobalConfig.kpiActionState != null) {
        //    this.fromDate = GlobalConfig.kpiActionState;
        //    this.toDate = GlobalConfig.kpiFilterState;
        //    GlobalConfig.kpiActionState = null;
        //    GlobalConfig.kpiFilterState = null;
        //}
        //else {
        this.loading = true;
        this.setDefaults();
        this.setPageData();
        //}
    };
    UserAnalyticsComponent.prototype.setDefaults = function () {
        var d = new Date();
        d.setDate(d.getDate() - 6);
        this.fromDate = { date: { year: d.getFullYear(), month: (d.getMonth() + 1), day: d.getDate() } };
        d = new Date();
        this.toDate = { date: { year: d.getFullYear(), month: (d.getMonth() + 1), day: d.getDate() } };
        this.regionId = global_util_1.GlobalUtil.getAppSession("UserInfo").regionId;
    };
    UserAnalyticsComponent.prototype.setPageData = function () {
        this.paginator = false;
        this.pageLinks = 3;
        this.rowsPerPage = 10;
        this.rowsPerPageOptions = [10, 20];
        this.responsive = null;
        this.scrollable = false;
        this.getPageData();
    };
    UserAnalyticsComponent.prototype.formatUserAnalyticsArray = function () {
        var gdata = global_util_1.GlobalUtil.GroupBy(this.columnNameToGroupBy, this.tabularViewModel.kpiData);
        var _userAnalytics = [];
        for (var k in gdata) {
            for (var j = 0; j < gdata[k].length; j++) {
                var _pages = gdata[k][j];
                if (j == 0) {
                    _userAnalytics.push(_pages);
                }
                else {
                    _pages[this.columnNameToGroupBy] = "";
                    _userAnalytics.push(_pages);
                }
            }
        }
        return _userAnalytics;
    };
    UserAnalyticsComponent.prototype.extractDate = function (d) {
        return new Date(d.year, (+d.month) - 1, d.day);
    };
    UserAnalyticsComponent.prototype.getPageData = function () {
        var _this = this;
        var d1;
        var d2;
        d1 = this.extractDate(this.fromDate.date);
        d2 = this.extractDate(this.toDate.date);
        this.userAnalyticsService.getPageData({ fromDate: d1, toDate: d2, regionId: this.regionId }).subscribe(function (result) {
            _this.tabularViewModel = result;
            _this.tabularViewModel.kpiData = _this.formatUserAnalyticsArray();
            //GlobalConfig.kpiActionState = this.fromDate;
            //GlobalConfig.kpiFilterState = this.toDate;
            _this.loading = false;
        });
    };
    UserAnalyticsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-user-analytics',
            templateUrl: 'useranalytics.component.html',
            styles: [
                "#mydate .mydp .selection:focus { border-color:#66afe9  !important; \n        box-shadow:  inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.8) !important;}"
            ],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [useranalytics_service_1.UserAnalyticsService])
    ], UserAnalyticsComponent);
    return UserAnalyticsComponent;
}());
exports.UserAnalyticsComponent = UserAnalyticsComponent;
//# sourceMappingURL=useranalytics.component.js.map