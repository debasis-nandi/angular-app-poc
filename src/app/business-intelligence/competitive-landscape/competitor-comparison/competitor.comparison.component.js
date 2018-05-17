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
var chart_service_1 = require('../../../widgets/charts/chart.service');
var common_1 = require('@angular/common');
var ng2_popover_1 = require('ng2-popover');
var Export_service_1 = require('../../../widgets/export/Export.service');
var global_config_1 = require('../../../global/global.config');
var global_util_1 = require('../../../global/global.util');
var FusionCharts = require('fusioncharts');
var CompetitorComparisonComponent = (function () {
    function CompetitorComparisonComponent(chartService, ref, _ExcelExportService) {
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
        this.seriveParams = { pageName: global_config_1.Page.competitorComparison, companyId: 0, cropId: 0, selectedFilter: null };
        this.submitVisible = true;
        this.submitMessage = '';
        this.showFlexi = true;
        this.loading = false;
        this.blankCompaniesArray = [];
        this.blankCompanies = '';
        this.selectedFilters = [];
        this.dynamicMessage = '(You can select maximum range of 7 years)';
        this.kpi = [];
    }
    /*ngOnInit(): void {
        this.loading = true
        this.chartService.getData(this.seriveParams)
            .subscribe(data => { this.data = data.pageDataMapper; this.loading = false }
            //.subscribe(data => this.AfterChanges(data.pageDataMapper)
            , error => this.errorMessage = <any>error);
    }*/
    CompetitorComparisonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        //debugger;
        if (global_util_1.GlobalUtil.getSession("ChartYear") != "" && global_util_1.GlobalUtil.getSession("ChartYear") != null) {
            var chartYear = global_util_1.GlobalUtil.getSession("ChartYear");
            var filterPara = [
                { id: 0, filterType: "", filterName: "PeriodQuarter", isVisible: true, filterData: null, childControlMappingId: 0, sortOrder: 0, selectedData: [(parseInt(chartYear) - 1), parseInt(chartYear)] },
                { id: 0, filterType: "", filterName: "View Data As", isVisible: true, filterData: null, childControlMappingId: 0, sortOrder: 0, selectedData: "Quarterly" }
            ];
            var selectedPara = { pageName: global_config_1.Page.competitorComparison.toString(), companyId: global_util_1.GlobalUtil.getSession("CompetitorId"), cropId: 0, selectedFilter: filterPara, isSearchRedirct: true };
            this.chartService.getData(selectedPara)
                .subscribe(function (data) {
                //debugger;
                if (data) {
                    _this.data = data.pageDataMapper;
                    _this.loading = false;
                    _this.data.filters[0].selectedData = "Quarterly";
                    _this.data.filters[1].isVisible = false;
                    _this.data.filters[2].isVisible = true;
                    global_util_1.GlobalUtil.setSession("ChartYear", "");
                }
            }, function (error) {
                global_util_1.GlobalUtil.setSession("ChartYear", "");
                _this.errorMessage = error;
            });
        }
        else {
            this.chartService.getData(this.seriveParams)
                .subscribe(function (data) {
                _this.data = data.pageDataMapper;
                _this.loading = false;
            }, function (error) { _this.errorMessage = error; });
        }
    };
    CompetitorComparisonComponent.prototype.AfterChanges = function (data) {
        this.data = data;
        this.filter1 = this.data.filters.splice(0, 6);
        this.filter2 = this.data.filters;
    };
    CompetitorComparisonComponent.prototype.onFilterEmit = function (filter) {
        if (filter.filterName === 'View Data As' && filter.selectedData === 'Quarterly') {
            this.dynamicMessage = '(You can select maximum range of 16 quarters)';
        }
        else if (filter.filterName === 'View Data As' && filter.selectedData === 'Yearly') {
            this.dynamicMessage = '(You can select maximum range of 7 years)';
        }
        this.filterObject = this.filterObject.filter(function (x) { return x.filterName !== filter.filterName; });
        this.filterObject.push(filter);
        return true;
        //this.filterObject = filter;
        //return true;
    };
    CompetitorComparisonComponent.prototype.onSubmitEmit = function (visible) {
        this.submitVisible = visible;
    };
    CompetitorComparisonComponent.prototype.onSubmitMessageEmit = function (message) {
        this.submitMessage = message;
    };
    CompetitorComparisonComponent.prototype.Submit = function (pagePopover) {
        //let collapseFilter: HTMLElement = document.getElementById('collapseFilter');
        //collapseFilter.classList.remove('in');
        var _this = this;
        this.loading = true;
        //pagePopover.hide();
        for (var _i = 0, _a = this.filterObject; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry.filterName === 'View Data As' && entry.selectedData === 'Quarterly')
                this.filterApi = this.filterObject.filter(function (x) { return x.filterName !== "PeriodYear"; });
            else if (entry.filterName === 'View Data As' && entry.selectedData === 'Yearly')
                this.filterApi = this.filterObject.filter(function (x) { return x.filterName !== "PeriodQuarter" && x.filterName !== "From Year" && x.filterName !== "To Year" && x.filterName !== "From Quarter" && x.filterName !== "To Quarter"; });
            else if (entry.filterName == 'Parameter')
                var childId = entry.childControlMappingId;
        }
        this.filterApi = this.filterApi.filter(function (x) { return x.id == 0 || x.id == childId; });
        for (var _b = 0, _c = this.filterApi; _b < _c.length; _b++) {
            var entry = _c[_b];
            if (entry.filterName.toLocaleLowerCase() == "parameter" && (entry.selectedData == 2 || entry.selectedData == 7 || entry.selectedData == 9 || entry.selectedData == 11 || entry.selectedData == 13 || entry.selectedData == 18 || entry.selectedData == 21))
                this.filterApi = this.filterApi.filter(function (x) { return x.filterName !== "Currency"; });
        }
        //console.log(this.filterApi);
        var selectedValue = { pageName: global_config_1.Page.competitorComparison.toString(), companyId: 0, cropId: 0, selectedFilter: this.filterApi };
        this.chartService.getData(selectedValue)
            .subscribe(function (data) { return _this.AfterSubmit(data.pageDataMapper); }, function (error) { return _this.errorMessage = error; });
    };
    CompetitorComparisonComponent.prototype.AfterSubmit = function (data) {
        var collapseFilter = document.getElementById('CPFilter');
        collapseFilter.click();
        this.data.widgets = data.widgets;
        this.noDataMessage = "No data to display";
        this.blankCompaniesArray = [];
        this.blankCompanies = '';
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
                this_1.blankCompaniesArray.push(this_1.data.filters.filter(function (x) { return x.filterName == 'Competitors'; })[0].filterData.filter(function (x) { return x["value"] == entry; })[0]["label"]);
            };
            var this_1 = this;
            for (var _i = 0, _a = this.data.widgets[0].blankCompetitors; _i < _a.length; _i++) {
                var entry = _a[_i];
                _loop_1(entry);
            }
            this.blankCompanies = this.blankCompaniesArray.join(",");
        }
        this.GetSelectedFilters(this.filterApi);
        this.loading = false;
    };
    CompetitorComparisonComponent.prototype.ChartTypeChange = function (chart) {
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
    CompetitorComparisonComponent.prototype.Reset = function (pagePopover) {
        var _this = this;
        this.loading = true;
        this.data.filters = null;
        this.submitVisible = true;
        this.submitMessage = '';
        this.chartService.getData(this.seriveParams)
            .subscribe(function (data) { _this.data.filters = data.pageDataMapper.filters; _this.loading = false; }, function (error) { return _this.errorMessage = error; });
    };
    CompetitorComparisonComponent.prototype.GetSelectedFilters = function (filterObject) {
        this.selectedFilters = [];
        if (filterObject != null) {
            var _loop_2 = function(entry) {
                if (entry.filterName == 'From Year' || entry.filterName == 'From Quarter' || entry.filterName == 'To Year' || entry.filterName == 'To Quarter') {
                    entry.sortOrder = this_2.data.filters.filter(function (x) { return x.filterName == 'From Year'; })[0].filterData.filter(function (m) { return m["filterName"] == entry.filterName; })[0]["sortOrder"];
                }
                else if (entry.filterName == 'PeriodYear') {
                    entry.sortOrder = this_2.data.filters.filter(function (k) { return k.filterName == 'Period'; })[0].sortOrder;
                }
                else
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
                this_3.selectedData.filterName = entry.filterName;
                if (entry.filterName == 'Parameter' || entry.filterName == 'Currency') {
                    this_3.selectedData.selectedValues = this_3.data.filters.filter(function (x) { return x.filterName == entry.filterName; })[0].filterData.filter(function (x) { return x["labelId"] == entry.selectedData; })[0]["label"];
                }
                else if (entry.filterName == 'Competitors') {
                    var _loop_4 = function(item) {
                        arr.push(this_3.data.filters.filter(function (x) { return x.filterName == "Competitors"; })[0].filterData.filter(function (x) { return x['value'] == item; })[0]['label']);
                    };
                    for (var _a = 0, _b = this_3.filterObject.filter(function (x) { return x.filterName == "Competitors"; })[0].selectedData; _a < _b.length; _a++) {
                        var item = _b[_a];
                        _loop_4(item);
                    }
                    this_3.selectedData.selectedValues = arr.sort().join(", ");
                }
                else if (entry.filterName == 'PeriodYear') {
                    this_3.selectedData.filterName = 'Period';
                    this_3.selectedData.selectedValues = entry.selectedData.join(" to ");
                }
                else if (entry.filterType == 'DropdownChild') {
                    this_3.selectedData.selectedValues = this_3.data.filters.filter(function (x) { return x.filterType == "DropdownChild" && x.filterName == entry.filterName; })[0].filterData.filter(function (x) { return x["labelId"] == entry.selectedData; })[0]["label"];
                }
                else if (entry.filterName == 'From Quarter' || entry.filterName == 'To Quarter') {
                    this_3.selectedData.selectedValues = 'Q' + entry.selectedData;
                }
                else {
                    this_3.selectedData.selectedValues = entry.selectedData;
                }
                this_3.selectedFilters.push(this_3.selectedData);
            };
            var this_3 = this;
            var arr;
            for (var _c = 0, filterObject_2 = filterObject; _c < filterObject_2.length; _c++) {
                var entry = filterObject_2[_c];
                _loop_3(entry);
            }
        }
    };
    CompetitorComparisonComponent.prototype.onExportVisibleEmit = function (visible) {
        this.exportVisible = visible;
    };
    CompetitorComparisonComponent.prototype.onExportEmit = function (exp) {
        this.exportObject = this.exportObject.filter(function (x) { return x.exportName !== exp.exportName; });
        this.exportObject.push(exp);
        return true;
    };
    CompetitorComparisonComponent.prototype.ExportSubmit = function () {
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
            this.arrayFilterdata = { templateName: "Export", fileName: "CompetitorComparison" + "_" + (global_util_1.GlobalUtil.getAppSession("UserInfo") ? global_util_1.GlobalUtil.getAppSession("UserInfo").userName.split('@')[0].split('.')[0] : ""), kpiData: this.kpi, exportAs: ExportAsData.selectedData };
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
                    var Filters_1 = (this.selectedFilters.length > 0) ? '<strong>Filters applied: </strong>' : '';
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
                        var obj = {
                            Image: onSubmitClick("chart-container-" + key), Insight: (InsightData.selectedData == "1") ? InsightNode.textContent : null,
                            ChartHeaderDesc: Filters_1, ChartFooterDesc: (_this.blankCompanies != '') ? 'Data is not available for ' + _this.blankCompanies + ' against the selected filters' : '',
                            PageFooterDesc: global_util_1.GlobalUtil.getAppSession("UserInfo").userName + ' exported from AgriInsider on ' + _this.datePipe.transform(new Date(), 'dd MMMM yyyy')
                        };
                        //let obj = {
                        //    Image: onSubmitClick("chart-container-" + key), Insight: (InsightData.selectedData == "1") ? InsightNode.textContent : null                            
                        //};
                        _this.kpi[0] = {
                            name: filterdata[count_1].widgetName,
                            data: obj,
                            CurrentChunk: count_1,
                            TotalChunks: FilesCount,
                            ExportLevel: global_config_1.ExportLevel.Chart
                        };
                        _this.arrayFilterdata = { templateName: "Export", fileName: "CompetitorComparison", kpiData: _this.kpi, exportAs: ExportAsData.selectedData };
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
    __decorate([
        core_1.ViewChild('pagePopover'), 
        __metadata('design:type', ng2_popover_1.PopoverContent)
    ], CompetitorComparisonComponent.prototype, "pagePopover", void 0);
    CompetitorComparisonComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-competitor-comparison',
            templateUrl: 'competitor.comparison.component.html',
        }), 
        __metadata('design:paramtypes', [chart_service_1.ChartService, core_1.ElementRef, Export_service_1.ExcelExportService])
    ], CompetitorComparisonComponent);
    return CompetitorComparisonComponent;
}());
exports.CompetitorComparisonComponent = CompetitorComparisonComponent;
//# sourceMappingURL=competitor.comparison.component.js.map