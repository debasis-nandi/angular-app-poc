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
var chart_service_1 = require('../../../../widgets/charts/chart.service');
var ng2_popover_1 = require('ng2-popover');
var common_1 = require('@angular/common');
var Export_service_1 = require('../../../../widgets/export/Export.service');
var global_config_1 = require('../../../../global/global.config');
var global_util_1 = require('../../../../global/global.util');
var FusionCharts = require('fusioncharts');
var CropComparisonComponent = (function () {
    function CropComparisonComponent(chartService, ref, _ExcelExportService) {
        this.chartService = chartService;
        this.ref = ref;
        this._ExcelExportService = _ExcelExportService;
        this.filterObject = [];
        this.exportObject = [];
        this.exportVisible = true;
        this.filterApi = [];
        this.noDataMessage = "";
        this.filter1 = [];
        this.filter2 = [];
        this.isColumn = true;
        this.paginator = false;
        this.pageLinks = 3;
        this.rowsPerPage = 5;
        this.rowsPerPageOptions = [5, 10, 20];
        this.responsive = true;
        this.seriveParams = { pageName: global_config_1.Page.cropComparison, companyId: 0, cropId: 0, selectedFilter: null };
        this.submitVisible = true;
        this.showFlexi = true;
        this.loading = false;
        this.blankCropsArray = [];
        this.blankCrops = '';
        this.selectedFilters = [];
        this.kpi = [];
    }
    CropComparisonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.chartService.getData(this.seriveParams)
            .subscribe(function (data) { _this.data = data.pageDataMapper; _this.loading = false; }, function (error) { return _this.errorMessage = error; });
    };
    CropComparisonComponent.prototype.AfterChanges = function (data) {
        this.data = data;
        this.filter1 = this.data.filters.splice(0, 6);
        this.filter2 = this.data.filters;
    };
    CropComparisonComponent.prototype.onFilterEmit = function (filter) {
        this.filterObject = this.filterObject.filter(function (x) { return x.filterName !== filter.filterName; });
        this.filterObject.push(filter);
        return true;
        //this.filterObject = filter;
        //return true;
    };
    CropComparisonComponent.prototype.onSubmitEmit = function (visible) {
        this.submitVisible = visible;
    };
    CropComparisonComponent.prototype.Submit = function (pagePopover) {
        var _this = this;
        //let collapseFilter: HTMLElement = document.getElementById('collapseFilter');
        //collapseFilter.classList.remove('in');
        var list = this.filterObject.filter(function (x) { return x.filterName == "List"; })[0].selectedData;
        this.filterObject = this.filterObject.filter(function (x) { return x.filterType != "Source" || (x.filterType == "Source" && list.indexOf(x.filterName) > -1); });
        this.loading = true;
        //console.log(this.filterObject);
        //pagePopover.hide();
        //for (let entry of this.filterObject) {
        //    if (entry.filterName === 'View Data As' && entry.selectedData === 'Quarterly')
        //        this.filterApi = this.filterObject.filter(
        //            x => x.filterName !== "PeriodYear");
        //    else if (entry.filterName === 'View Data As' && entry.selectedData === 'Yearly')
        //        this.filterApi = this.filterObject.filter(
        //            x => x.filterName !== "PeriodQuarter");
        //    else if (entry.filterName == 'Parameter')
        //        var childId = entry.childControlMappingId;
        //}
        //this.filterApi = this.filterApi.filter(
        //    x => x.id == 0 || x.id == childId);
        //for (let entry of this.filterApi) {
        //    if (entry.filterName.toLocaleLowerCase() == "parameter" && (entry.selectedData == 22 || entry.selectedData == 23 || entry.selectedData == 24))
        //        this.filterApi = this.filterApi.filter(
        //            x => x.filterName !== "Currency");
        //}
        //console.log(this.filterApi);
        var selectedValue = { pageName: global_config_1.Page.cropComparison.toString(), companyId: 0, cropId: 0, selectedFilter: this.filterObject };
        this.chartService.getData(selectedValue)
            .subscribe(function (data) { return _this.AfterSubmit(data.pageDataMapper); }, function (error) { return _this.errorMessage = error; });
    };
    CropComparisonComponent.prototype.AfterSubmit = function (data) {
        var _this = this;
        var collapseFilter = document.getElementById('CPFilter');
        collapseFilter.click();
        this.data.widgets = data.widgets;
        this.noDataMessage = "No data to display.";
        this.blankCropsArray = [];
        this.blankCrops = '';
        if (this.data.widgets.length > 0) {
            this.showFlexi = true;
            if (this.data.widgets[0].chartComponentViewModel.chartType == 'mscolumn2d') {
                this.isColumn = true;
            }
            else if (this.data.widgets[0].chartComponentViewModel.chartType == 'msline') {
                this.isColumn = false;
            }
        }
        this.data.exports = data.exports;
        this.exportVisible = true;
        if (this.data.widgets[0]) {
            var _loop_1 = function(entry) {
                if (this_1.data.widgets[0].chartPlottedOn == 'crop') {
                    this_1.blankCropsArray.push(this_1.data.filters.filter(function (x) { return x.filterName == 'Crop'; })[0].filterData.filter(function (x) { return x["value"] == entry; })[0]["label"]);
                }
                else {
                    this_1.blankCropsArray.push(this_1.data.filters.filter(function (x) { return x.filterName == 'Region'; })[0].filterData.filter(function (m) { return m["filterName"].toLowerCase() == _this.data.widgets[0].chartPlottedOn; })[0]["filterData"].filter(function (k) { return k.value == entry; })[0]["label"]);
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = this.data.widgets[0].cropComparisonIds; _i < _a.length; _i++) {
                var entry = _a[_i];
                _loop_1(entry);
            }
            this.blankCrops = this.blankCropsArray.join(",");
        }
        this.GetSelectedFilters(this.filterObject);
        this.loading = false;
    };
    CropComparisonComponent.prototype.GetSelectedFilters = function (filterObject) {
        this.selectedFilters = [];
        if (filterObject != null) {
            var _loop_2 = function(entry) {
                if (entry.filterName == 'Region' || entry.filterName == 'Territory' || entry.filterName == 'Country') {
                    entry.sortOrder = this_2.data.filters.filter(function (x) { return x.filterName == 'Region'; })[0].filterData.filter(function (m) { return m["filterName"] == entry.filterName; })[0]["sortOrder"];
                }
                else if (entry.filterName == 'PeriodYear') {
                    entry.sortOrder = this_2.data.filters.filter(function (k) { return k.filterName == 'Period'; })[0].sortOrder;
                }
                else if (entry.filterType.toLowerCase() == "source") {
                    entry.sortOrder = 20;
                }
                else if (this_2.data.filters.filter(function (k) { return k.filterName == entry.filterName; }).length > 0)
                    entry.sortOrder = this_2.data.filters.filter(function (k) { return k.filterName == entry.filterName; })[0].sortOrder;
            };
            var this_2 = this;
            for (var _i = 0, filterObject_1 = filterObject; _i < filterObject_1.length; _i++) {
                var entry = filterObject_1[_i];
                _loop_2(entry);
            }
            filterObject = filterObject.sort(function (obj1, obj2) { return obj1.sortOrder - obj2.sortOrder; });
            var _loop_3 = function(entry) {
                this_3.selectedData = { filterName: '', selectedValues: '' };
                arr = [];
                if (entry.filterName.toLowerCase() == "list") {
                    return "continue";
                }
                this_3.selectedData.filterName = entry.filterName;
                if (entry.filterName == 'Source' || entry.filterName == 'Parameter') {
                    this_3.selectedData.selectedValues = this_3.data.filters.filter(function (x) { return x.filterName == entry.filterName; })[0].filterData.filter(function (x) { return x["labelId"] == entry.selectedData; })[0]["label"];
                }
                else if (entry.filterName == 'UnitType') {
                    this_3.selectedData.filterName = 'Unit Type';
                    this_3.selectedData.selectedValues = this_3.data.filters.filter(function (x) { return x.filterName == entry.filterName; })[0].filterData.filter(function (x) { return x["labelId"] == entry.selectedData; })[0]["label"];
                }
                else if (entry.filterName == 'Crop') {
                    var _loop_4 = function(item) {
                        arr.push(this_3.data.filters.filter(function (x) { return x.filterName == "Crop"; })[0].filterData.filter(function (x) { return x['value'] == item; })[0]['label']);
                    };
                    for (var _a = 0, _b = this_3.filterObject.filter(function (x) { return x.filterName == "Crop"; })[0].selectedData; _a < _b.length; _a++) {
                        var item = _b[_a];
                        _loop_4(item);
                    }
                    this_3.selectedData.selectedValues = arr.sort().join(", ");
                }
                else if (entry.filterName == 'Region' || entry.filterName == 'Territory' || entry.filterName == 'Country') {
                    var _loop_5 = function(item) {
                        arr.push(this_3.data.filters.filter(function (x) { return x.filterName == 'Region'; })[0].filterData.filter(function (m) { return m["filterName"] == entry.filterName; })[0]["filterData"].filter(function (k) { return k.value == item; })[0]["label"]);
                    };
                    for (var _c = 0, _d = this_3.filterObject.filter(function (x) { return x.filterName == entry.filterName; })[0].selectedData; _c < _d.length; _c++) {
                        var item = _d[_c];
                        _loop_5(item);
                    }
                    if (arr.length > 0)
                        this_3.selectedData.selectedValues = arr.sort().join(", ");
                    else
                        this_3.selectedData.selectedValues = 'Not available';
                }
                else if (entry.filterName == 'PeriodYear') {
                    this_3.selectedData.filterName = 'Period';
                    this_3.selectedData.selectedValues = entry.selectedData.join(" to ");
                }
                else if (entry.filterType.toLowerCase() == "source") {
                    this_3.selectedData.filterName = entry.filterName + " source";
                    if (entry.filterData != null) {
                        if (entry.filterData.length > 0)
                            this_3.selectedData.selectedValues = entry.filterData.filter(function (k) { return k['sourceId'] == entry.selectedData; })[0]['sourceName'];
                        else
                            this_3.selectedData.selectedValues = "Not available";
                    }
                    else
                        this_3.selectedData.selectedValues = "Not available";
                }
                else {
                    this_3.selectedData.selectedValues = entry.selectedData;
                }
                this_3.selectedFilters.push(this_3.selectedData);
            };
            var this_3 = this;
            var arr;
            for (var _e = 0, filterObject_2 = filterObject; _e < filterObject_2.length; _e++) {
                var entry = filterObject_2[_e];
                _loop_3(entry);
            }
        }
    };
    CropComparisonComponent.prototype.ChartTypeChange = function (chart) {
        if (chart == 'line') {
            this.data.widgets[0].chartComponentViewModel.chartType = "msline";
            this.isColumn = false;
        }
        else if (chart == 'column') {
            this.data.widgets[0].chartComponentViewModel.chartType = "mscolumn2d";
            this.isColumn = true;
        }
        FusionCharts.ready(function () {
        });
    };
    CropComparisonComponent.prototype.Reset = function (pagePopover) {
        var _this = this;
        this.loading = true;
        this.data.filters = null;
        this.submitVisible = true;
        this.chartService.getData(this.seriveParams)
            .subscribe(function (data) { _this.data.filters = data.pageDataMapper.filters; _this.loading = false; }, function (error) { return _this.errorMessage = error; });
    };
    CropComparisonComponent.prototype.onExportVisibleEmit = function (visible) {
        this.exportVisible = visible;
    };
    CropComparisonComponent.prototype.onExportEmit = function (exp) {
        this.exportObject = this.exportObject.filter(function (x) { return x.exportName !== exp.exportName; });
        this.exportObject.push(exp);
        return true;
    };
    CropComparisonComponent.prototype.ExportSubmit = function () {
        var _this = this;
        this.loading = true;
        var index;
        var parser = new DOMParser();
        var ExportAsData = this.exportObject.find(function (model) { return model.exportName == "Export As"; });
        var ChartData = this.exportObject.find(function (model) { return model.exportName == "Chart Names"; });
        var InsightData = this.exportObject.find(function (model) { return model.exportName == "Insights"; });
        //if excel
        if (ExportAsData.selectedData == 1) {
            //selected Ids  
            var selectedIds = ChartData.selectedData;
            //filter data on the basis of selected ids
            var filterdata = this.data.widgets.filter(function (e) { return selectedIds.indexOf(e.widgetId) >= 0; });
            for (index = 0; index < filterdata.length; ++index) {
                var filteredData = this._ExcelExportService.constructChartDataForExport(filterdata[index].underlyingChartDataViewModel.tableHeaders, filterdata[index].underlyingChartDataViewModel.tableRows);
                this.kpi[index] = { name: filterdata[index].widgetName, data: filteredData };
            }
            this.arrayFilterdata = { templateName: "Export", fileName: "CropComparison" + "_" + (global_util_1.GlobalUtil.getAppSession("UserInfo") ? global_util_1.GlobalUtil.getAppSession("UserInfo").userName.split('@')[0].split('.')[0] : ""), kpiData: this.kpi, exportAs: ExportAsData.selectedData };
            this._ExcelExportService.ExcelExportedFilePath(this.arrayFilterdata).subscribe(function (data) { _this.exportData = data; _this.loading = false; });
        }
        // for word export
        if (this.exportObject.length > 0) {
            if (ExportAsData.selectedData == 2 || ExportAsData.selectedData == 3) {
                if (ChartData.selectedData.length > 0) {
                    this.kpi = [];
                    var filterdata = this.data.widgets.filter(function (e) {
                        return ChartData.selectedData.indexOf(e.widgetId) >= 0;
                    });
                    var count_1 = 0;
                    var FilesCount = ChartData.selectedData.length;
                    this.datePipe = new common_1.DatePipe("en-US");
                    var Filters_1 = (this.selectedFilters.length > 0) ? 'Filters applied: ' : 'Filters applied: ';
                    if (this.selectedFilters != null) {
                        if (this.selectedFilters.length > 0) {
                            for (var _i = 0, _a = this.selectedFilters; _i < _a.length; _i++) {
                                var item = _a[_i];
                                Filters_1 = Filters_1.concat('<strong>').concat(item.filterName).concat('</strong>').concat(': ').concat(item.selectedValues).concat('; ');
                            }
                        }
                    }
                    var loop_1 = function (key) {
                        var InsightNode = document.createElement('div');
                        InsightNode.innerHTML = _this.data.widgets.find(function (model) { return model.widgetId == key; }).insightData;
                        //let obj = { Image: onSubmitClick("chart-container-" + key), Insight: (InsightData.selectedData == "1") ? InsightNode.textContent : null };
                        var obj = {
                            Image: onSubmitClick("chart-container-" + key), Insight: (InsightData.selectedData == "1") ? InsightNode.textContent : null,
                            ChartHeaderDesc: Filters_1, ChartFooterDesc: (_this.blankCrops != '') ? 'Data is not available for ' + _this.blankCrops + ' against the selected filters' : '',
                            PageFooterDesc: global_util_1.GlobalUtil.getAppSession("UserInfo").userName + ' exported from AgriInsider on ' + _this.datePipe.transform(new Date(), 'dd MMMM yyyy')
                        };
                        _this.kpi[0] = {
                            name: filterdata[count_1].widgetName,
                            data: obj,
                            CurrentChunk: count_1,
                            TotalChunks: FilesCount,
                            ExportLevel: global_config_1.ExportLevel.Chart,
                            Size: "1",
                        };
                        _this.arrayFilterdata = { templateName: "Export", fileName: "CropComparison", kpiData: _this.kpi, exportAs: ExportAsData.selectedData };
                        _this._ExcelExportService.ExcelExportedFilePath(_this.arrayFilterdata)
                            .subscribe(function (data) {
                            _this.exportData = data;
                            _this.loading = false;
                            //if (this.exportData.value.length == 0) {
                            count_1++;
                            if (count_1 < FilesCount) {
                                //loop(ChartData.selectedData.shift());
                                loop_1(ChartData.selectedData[count_1]);
                            }
                            //}
                        });
                    };
                    //loop(ChartData.selectedData.shift());
                    loop_1(ChartData.selectedData[count_1]);
                }
                else {
                    this.loading = false;
                }
            }
        }
    };
    CropComparisonComponent.prototype.getPageModuleId = function () {
        return global_util_1.GlobalUtil.getSession("PageModuleId");
    };
    __decorate([
        core_1.ViewChild('pagePopover'), 
        __metadata('design:type', ng2_popover_1.PopoverContent)
    ], CropComparisonComponent.prototype, "pagePopover", void 0);
    CropComparisonComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-crop-comparison',
            templateUrl: 'crop-comparison.component.html',
        }), 
        __metadata('design:paramtypes', [chart_service_1.ChartService, core_1.ElementRef, Export_service_1.ExcelExportService])
    ], CropComparisonComponent);
    return CropComparisonComponent;
}());
exports.CropComparisonComponent = CropComparisonComponent;
//# sourceMappingURL=crop-comparison.component.js.map