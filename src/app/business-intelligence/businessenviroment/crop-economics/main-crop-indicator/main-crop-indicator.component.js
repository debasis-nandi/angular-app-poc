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
var common_1 = require('@angular/common');
var main_crop_indicator_service_1 = require('./main-crop-indicator.service');
var global_config_1 = require('../../../../global/global.config');
var global_util_1 = require('../../../../global/global.util');
var Export_service_1 = require('../../../../widgets/export/Export.service');
var MainCropIndicatorComponent = (function () {
    function MainCropIndicatorComponent(service, router, _ExcelExportService) {
        this.service = service;
        this.router = router;
        this._ExcelExportService = _ExcelExportService;
        this.tabularViewModel = {
            widget: [],
            tableHead: [],
            kpiData: [],
            kpiSourceData: [],
            actions: [],
            filters: []
        };
        this.seriveParams = { pageName: global_config_1.Page.MainCropIndicator, companyId: 0, cropId: 0, selectedFilter: null };
        this.filterObject = [];
        this.filterApi = [];
        this.loading = false;
        this.styleClass = 'ui-datatable table table-hover comp-table';
        this.hyperLinkUrl = "/layout/agribusinessoverview/cropoverview";
        this.exportObject = [];
        this.kpi = [];
        this.pageName = global_config_1.Page.MainCropIndicator.toString();
        //ExportSubmit(): void {
        //    this.loading = true;
        //    let ExportAsData = this.exportObject.find(model => model.exportName == "Export As");
        //    //if excel
        //    if (ExportAsData.selectedData == 1) {
        //       var filteredData = this._ExcelExportService.constructTabularDataForExport(this.tabularViewModel.tableHead, this.tabularViewModel.kpiData);
        //        this.kpi[0] = { name: this.tabularViewModel.widget[0].name, data: filteredData };
        //        this.arrayFilterdata = { templateName: "Export", fileName: this.tabularViewModel.widget[0].name, kpiData: this.kpi, exportAs: ExportAsData.selectedData };
        //        this._ExcelExportService.ExcelExportedFilePath(this.arrayFilterdata).subscribe(data => { this.exportData = data; this.loading = false; });
        //    }
        //}
        this.exportedExcelData = [];
    }
    /*getPageModuleId(): string {
        return GlobalUtil.getSession("PageModuleId");
    }*/
    MainCropIndicatorComponent.prototype.getPageModuleId = function () {
        return parseInt(global_util_1.GlobalUtil.getSession("PageModuleId"));
    };
    MainCropIndicatorComponent.prototype.ngOnInit = function () {
        this.loading = true;
        this.setPageData();
    };
    MainCropIndicatorComponent.prototype.setPageData = function () {
        this.paginator = false;
        this.pageLinks = 3;
        this.rowsPerPage = 5;
        this.rowsPerPageOptions = [5, 10, 20];
        this.responsive = null;
        //debugger;
        this.getPageData();
    };
    MainCropIndicatorComponent.prototype.getPageData = function () {
        var _this = this;
        this.service.getPageData(this.seriveParams).subscribe(function (result) {
            _this.tabularViewModel = result;
            global_config_1.GlobalConfig.kpiActionState = _this.tabularViewModel.actions;
            global_config_1.GlobalConfig.kpiFilterState = _this.tabularViewModel.filters;
            _this.loading = false;
        });
    };
    MainCropIndicatorComponent.prototype.onFilterEmit = function (filter) {
        this.filterObject = this.filterObject.filter(function (x) { return x.filterName !== filter.filterName; });
        this.filterObject.push(filter);
        return true;
        //this.filterObject = filter;
        //return true;
    };
    MainCropIndicatorComponent.prototype.onExportEmit = function (exp) {
        this.exportObject = this.exportObject.filter(function (x) { return x.exportName !== exp.exportName; });
        this.exportObject.push(exp);
        return true;
    };
    MainCropIndicatorComponent.prototype.ExportSubmit = function () {
        var _this = this;
        this.loading = true;
        this.datePipe = new common_1.DatePipe("en-US");
        var ExportAsData = this.exportObject.find(function (model) { return model.exportName == "Export As"; });
        var ChartData = this.exportObject.find(function (model) { return model.exportName == "Chart Names"; });
        var InsightData = this.exportObject.find(function (model) { return model.exportName == "Insights"; });
        if (ExportAsData.selectedData == 1) {
            this.exportedExcelData = [];
            for (var item in this.tabularViewModel.kpiData) {
                this.exportedExcelData[item] = {
                    'CROP NAME': this.tabularViewModel.kpiData[item]['cropName'],
                    'YEAR': this.tabularViewModel.kpiData[item]['year'],
                    'AREA HARVESTED': this.tabularViewModel.kpiData[item]['areaHarvestedValues'],
                    'AREA HARVESTED UNITS': this.tabularViewModel.kpiData[item]['areaHarvestedUnit'],
                    'DEMAND': this.tabularViewModel.kpiData[item]['demandValues'],
                    'DEMAND UNITS': this.tabularViewModel.kpiData[item]['demandUnit'],
                    'PRODUCTION': this.tabularViewModel.kpiData[item]['productionValues'],
                    'PRODUCTION UNITS': this.tabularViewModel.kpiData[item]['productionUnit'],
                    'STU': this.tabularViewModel.kpiData[item]['stuValues'],
                    'STU UNITS': this.tabularViewModel.kpiData[item]['stuUnit'],
                    'PRICE(MONTHLY)': this.tabularViewModel.kpiData[item]['priceValues'],
                    'PRICE UNITS': this.tabularViewModel.kpiData[item]['priceUnit']
                };
            }
            //var filteredData = this._ExcelExportService.constructTabularDataForExport(this.tabularViewModel.tableHead, this.tabularViewModel.kpiData);
            this.kpi[0] = { name: this.tabularViewModel.widget[0].name, data: this.exportedExcelData };
            this.arrayFilterdata = { templateName: "Export", fileName: this.tabularViewModel.widget[0].name + "_" + (global_util_1.GlobalUtil.getAppSession("UserInfo") ? global_util_1.GlobalUtil.getAppSession("UserInfo").userName.split('@')[0].split('.')[0] : ""), kpiData: this.kpi, exportAs: ExportAsData.selectedData };
            this._ExcelExportService.ExcelExportedFilePath(this.arrayFilterdata).subscribe(function (data) { _this.exportData = data; _this.loading = false; });
        }
        if (ExportAsData.selectedData == 2) {
            var _self_1 = this;
            html2canvas([document.getElementById("content")], {
                onrendered: function (canvas) {
                    var imagedata = canvas.toDataURL('image/png');
                    var obj = {
                        Image: imagedata, Insight: "",
                        PageFooterDesc: global_util_1.GlobalUtil.getAppSession("UserInfo").userName + ' exported from AgriInsider on ' + _self_1.datePipe.transform(new Date(), 'dd MMMM yyyy') };
                    _self_1.kpi[0] = {
                        //name: GlobalUtil.getSession("CompanyName"),
                        name: "Global Crop Indicator",
                        data: obj,
                        CurrentChunk: 0,
                        TotalChunks: 1,
                        ExportLevel: global_config_1.ExportLevel.Page,
                        Size: 1
                    };
                    var arrayFilterdata = { templateName: "Export", fileName: _self_1.pageName, kpiData: _self_1.kpi, exportAs: 2 };
                    _self_1._ExcelExportService.ExcelExportedFilePath(arrayFilterdata)
                        .subscribe(function (data) {
                        //console.log(data); 
                        _self_1.loading = false;
                    });
                }
            });
        }
    };
    MainCropIndicatorComponent.prototype.FilterSubmit = function (pagePopover) {
        var _this = this;
        this.loading = true;
        for (var _i = 0, _a = this.filterObject; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry.filterName === 'View Data As' && entry.selectedData === 'Quarterly')
                this.filterApi = this.filterObject.filter(function (x) { return x.filterName !== "PeriodYear"; });
            else if (entry.filterName === 'View Data As' && entry.selectedData === 'Yearly')
                this.filterApi = this.filterObject.filter(function (x) { return x.filterName !== "PeriodQuarter"; });
            else if (entry.filterName === 'Currency')
                this.filterApi = this.filterObject;
            else if (entry.filterName === 'Unit Type')
                this.filterApi = this.filterObject;
        }
        var selectedValue = { pageName: global_config_1.Page.MainCropIndicator, companyId: 0, cropId: 0, selectedFilter: this.filterApi, userId: global_util_1.GlobalUtil.getAppSession("UserInfo").userId };
        this.service.getPageData(selectedValue)
            .subscribe(function (data) {
            _this.tabularViewModel.tableHead = data.tableHead;
            _this.tabularViewModel.kpiData = data.kpiData;
            _this.tabularViewModel.actions = global_config_1.GlobalConfig.kpiActionState;
            _this.tabularViewModel.filters = global_config_1.GlobalConfig.kpiFilterState;
            _this.loading = false;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    MainCropIndicatorComponent.prototype.Submit = function (pagePopover) {
        var _this = this;
        this.loading = true;
        pagePopover.hide();
        //debugger;
        for (var _i = 0, _a = this.filterObject; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry.filterName === 'View Data As' && entry.selectedData === 'Quarterly')
                this.filterApi = this.filterObject.filter(function (x) { return x.filterName !== "PeriodYear"; });
            else if (entry.filterName === 'View Data As' && entry.selectedData === 'Yearly')
                this.filterApi = this.filterObject.filter(function (x) { return x.filterName !== "PeriodQuarter"; });
            else if (entry.filterName === 'Currency')
                this.filterApi = this.filterObject;
        }
        //console.log(this.filterApi);
        var selectedValue = { pageName: global_config_1.Page.MainCropIndicator, companyId: 0, cropId: 0, selectedFilter: this.filterApi };
        //debugger;
        this.service.getPageData(selectedValue)
            .subscribe(function (data) {
            //debugger;
            _this.tabularViewModel.tableHead = data.tableHead;
            _this.tabularViewModel.kpiData = data.kpiData;
            _this.tabularViewModel.actions = global_config_1.GlobalConfig.kpiActionState;
            _this.tabularViewModel.filters = global_config_1.GlobalConfig.kpiFilterState;
            _this.loading = false;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    MainCropIndicatorComponent.prototype.ngOnChanges = function () {
    };
    MainCropIndicatorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            //selector: 'my-major-agrochemicals-seeds',
            templateUrl: 'main-crop-indicator.component.html',
            providers: [main_crop_indicator_service_1.MainCropIndicatorService]
        }), 
        __metadata('design:paramtypes', [main_crop_indicator_service_1.MainCropIndicatorService, router_1.Router, Export_service_1.ExcelExportService])
    ], MainCropIndicatorComponent);
    return MainCropIndicatorComponent;
}());
exports.MainCropIndicatorComponent = MainCropIndicatorComponent;
//# sourceMappingURL=main-crop-indicator.component.js.map