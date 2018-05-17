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
var common_1 = require('@angular/common');
var chart_service_1 = require('../../widgets/charts/chart.service');
var ng2_popover_1 = require('ng2-popover');
var global_config_1 = require('../../global/global.config');
var global_util_1 = require('../../global/global.util');
var Export_service_1 = require('../../widgets/export/Export.service');
var datalist_service_1 = require('../../insights/datalist/datalist.service');
var CurrencyBasketComponent = (function () {
    //let selectedValue: IServiceParams = { pageName: Page.macroeconomicsCurrencyBasket.toString(), companyId: 0, cropId: 0, selectedFilter: this.filterObject, userId: GlobalUtil.getAppSession("UserInfo").userId };
    function CurrencyBasketComponent(chartService, ref, _ExcelExportService, dataListService) {
        this.chartService = chartService;
        this.ref = ref;
        this._ExcelExportService = _ExcelExportService;
        this.dataListService = dataListService;
        this.identificationFlagId = null;
        this.pageInsightHeader = "Add Insights";
        this.fromChartInsight = false;
        this.chartInsights = [];
        this.showInsightHeader = false;
        this.pageInsightEditorId = "";
        this.insightsData = 'Test data';
        this.insightsClasses = [{ className: 'insightScrollDisplay', isAdd: true }, { className: 'insightChartDisplay', isAdd: true }];
        this.initInsightsEditor = false;
        this.pageInsightList = [];
        this.insightFilterValues = { insightId: null, insightData: '', pageName: global_config_1.Page.macroeconomicsCurrencyBasket.toString(), appliedFilterId: null, widgetDetailIds: '', appliedFilters: [], identificationFlag: '', author: '', updatedBy: '', updatedDate: null, isActive: true };
        this.pageName = global_config_1.Page.macroeconomicsCurrencyBasket.toString();
        this.filterObject = [];
        this.exportObject = [];
        this.filterApi = [];
        this.exportApi = [];
        this.exportVisible = true;
        this.paginator = false;
        this.pageLinks = 3;
        this.rowsPerPage = 5;
        this.rowsPerPageOptions = [5, 10, 20];
        this.responsive = true;
        this.loading = false;
        this.isAdmin = (global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
        this.insightDetails = {};
        this.noInsightText = global_config_1.Constants.noInsightText;
        this.noInsightDate = global_config_1.Constants.noInsightDate;
        this.seriveParams = { pageName: global_config_1.Page.macroeconomicsCurrencyBasket, companyId: 0, cropId: 0, selectedFilter: null, userId: global_util_1.GlobalUtil.getAppSession("UserInfo").userId, regionName: global_util_1.GlobalUtil.getAppSession("UserInfo").region };
        this.kpi = [];
    }
    CurrencyBasketComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.chartService.getData(this.seriveParams)
            .subscribe(function (data) {
            _this.data = data.pageDataMapper;
            var period = _this.data.filters.filter(function (k) { return k.filterName == 'Period'; })[0].filterData[0]["defaultValue"];
            _this.insightFilterValues.appliedFilters.push({ filterName: "From Year", filterValue: period[0] });
            _this.insightFilterValues.appliedFilters.push({ filterName: "To Year", filterValue: period[1] });
            //Insight Service calling started
            _this.dataListService.getInsights(_this.insightFilterValues).subscribe(function (data) {
                _this.insightViewModel = data;
                _this.setInsightValues();
                _this.loading = false;
            }, function (error) { return _this.errorMessage = error; });
            //Insight Service calling completed
        }, function (error) { return _this.errorMessage = error; });
    };
    CurrencyBasketComponent.prototype.getPageModuleId = function () {
        return global_util_1.GlobalUtil.getSession("PageModuleId");
    };
    CurrencyBasketComponent.prototype.onFilterEmit = function (filter) {
        this.filterObject = this.filterObject.filter(function (x) { return x.filterName !== filter.filterName; });
        this.filterObject.push(filter);
        return true;
    };
    CurrencyBasketComponent.prototype.onExportEmit = function (exp) {
        this.exportObject = this.exportObject.filter(function (x) { return x.exportName !== exp.exportName; });
        this.exportObject.push(exp);
        return true;
    };
    CurrencyBasketComponent.prototype.initPageInsightEditor = function () {
        if (this.identificationFlagId == 3 && this.fromChartInsight == false) {
            this.collapseChartInsight();
        }
        this.initInsight();
        this.iInsights.identificationFlag = "P";
        this.pageInsightEditorId = "CBPageInsightEditor";
        var s = document.getElementById('insightTargetTitle');
        var collapsed = s.classList.contains("collapsed");
        this.initInsightsEditor = collapsed;
    };
    CurrencyBasketComponent.prototype.initChartInsightEditor = function (widgetId, index) {
        if (this.identificationFlagId == 3 && this.initInsightsEditor) {
            this.fromChartInsight = true;
            this.collapsePageInsight();
            this.fromChartInsight = false;
        }
        var z = this.chartInsights.findIndex(function (x) { return x.widgetId == widgetId; });
        if (z == index) {
            this.collapseChartInsight();
            this.initInsight();
            this.iInsights.insightData = "";
            this.iInsights.identificationFlag = "C";
            this.iInsights.widgetDetailIds = widgetId.toString();
            this.chartInsights[z] = {
                EditorId: 'tinyMce' + z,
                iInsights: this.iInsights,
                initInsightsEditor: true,
                insightsClasses: this.insightsClasses,
                insightsData: '',
                widgetId: widgetId
            };
        }
    };
    CurrencyBasketComponent.prototype.collapseChartInsight = function () {
        this.chartInsights.forEach(function (x, ind) {
            if (x.initInsightsEditor == true) {
                x.initInsightsEditor = false;
                document.getElementById('chart' + ind + 'cc').click();
            }
        });
    };
    CurrencyBasketComponent.prototype.collapsePageInsight = function () {
        var s = document.getElementById('insightTargetTitle');
        if (s != null) {
            s.click();
        }
    };
    CurrencyBasketComponent.prototype.initInsight = function () {
        this.iInsights = {
            insightId: null,
            insightData: this.insightsData,
            pageName: global_config_1.Page.macroeconomicsCurrencyBasket.toString(),
            appliedFilterId: null,
            widgetDetailIds: this.widgetIds,
            appliedFilters: this.appliedFilters,
            identificationFlag: this.identificationFlag,
            author: global_util_1.GlobalUtil.getAppSession("UserInfo").firstName + " " + global_util_1.GlobalUtil.getAppSession("UserInfo").lastName,
            updatedBy: global_util_1.GlobalUtil.getAppSession("UserInfo").userId,
            appliedFiltersDisplay: this.filterObject.map(function (k) { return k.filterName.replace("PeriodYear", "Period") + ': ' + k.selectedData.join(' to '); }).join(', '),
            updatedDate: null,
            isActive: true
        };
    };
    CurrencyBasketComponent.prototype.setAppliedFilters = function (appliedFilters) {
        for (var _i = 0, _a = this.filterObject; _i < _a.length; _i++) {
            var f = _a[_i];
            if (f.filterName == "PeriodYear") {
                appliedFilters.push({ filterName: "From Year", filterValue: f.selectedData[0] });
                appliedFilters.push({ filterName: "To Year", filterValue: f.selectedData[1] });
            }
            else
                appliedFilters.push({ filterName: f.filterName, filterValue: f.selectedData });
        }
    };
    CurrencyBasketComponent.prototype.getFilters = function (filterObject) {
        this.getWidgetIds();
        this.appliedFilters = [];
        this.setAppliedFilters(this.appliedFilters);
        this.initInsight();
        if (this.identificationFlagId == 1) {
            if (this.initInsightsEditor) {
                var s = document.getElementById('insightTargetTitle');
                if (s != null) {
                    s.click();
                }
            }
            this.identificationFlag = "P";
        }
        else if (this.identificationFlagId == 2) {
            this.setChartInsights();
            this.identificationFlag = "C";
        }
        else if (this.identificationFlagId == 3) {
            if (this.initInsightsEditor) {
                var s = document.getElementById('insightTargetTitle');
                if (s != null) {
                    s.click();
                }
            }
            this.setChartInsights();
            this.identificationFlag = "B";
        }
    };
    CurrencyBasketComponent.prototype.setChartInsights = function () {
        this.chartInsights = [];
        var chartsDetails = this.data.exports.filter(function (model) { return model.exportName == "Chart Names"; });
        if (chartsDetails.length > 0) {
            var widgets = chartsDetails[0].exportData;
            if (widgets.length > 0) {
                for (var i = 0; i < widgets.length; i++) {
                    var wt = widgets[i];
                    this.chartInsights.push({
                        iInsights: this.iInsights,
                        initInsightsEditor: false,
                        insightsClasses: this.insightsClasses,
                        insightsData: '',
                        widgetId: wt["value"]
                    });
                }
            }
        }
    };
    CurrencyBasketComponent.prototype.getWidgetIds = function () {
        var chartsDetails = this.data.exports.filter(function (model) { return model.exportName == "Chart Names"; });
        if (chartsDetails.length > 0) {
            var widgets = chartsDetails[0].exportData;
            if (widgets.length > 0) {
                this.widgetIds = (widgets.map(function (x) { return x.value; })).toString();
            }
        }
    };
    //event handler while insightlist change
    CurrencyBasketComponent.prototype.InsightListCount = function (event) {
        var flag = event.identificationFlag;
        if (flag == "P") {
            this.pageInsightList = event.insightList;
            if (event.Count > 0) {
                this.pageInsightHeader = "Insights <span class='insight-notification'>" + event.Count + "</span>";
            }
            else {
                this.pageInsightList = null;
                this.pageInsightHeader = "Add Insights";
            }
        }
        else if (flag == "C") {
            this.data.widgets.forEach(function (obj, index) {
                if (obj.widgetId == event.widgetId) {
                    if (obj.insightsList == undefined && obj.insightsList == null) {
                        obj.insightsList = {
                            widgetId: event.widgetId, insightList: event.insightList
                        };
                    }
                    if (event.Count > 0) {
                        obj.insightHeader = "Insights <span class='insight-notification'>" + event.Count + "</span>";
                    }
                    else {
                        obj.insightsList = null;
                        obj.insightHeader = "Add Insights";
                    }
                }
            });
        }
    };
    CurrencyBasketComponent.prototype.setInsightValues = function () {
        if (this.insightViewModel.pageInsightList.length > 0) {
            this.pageInsightList = this.insightViewModel.pageInsightList;
            this.pageInsightHeader = "Insights <span class='insight-notification'>" + this.insightViewModel.pageInsightList.length + "</span>";
            this.showInsightHeader = true;
        }
        else {
            if (this.isAdmin) {
                this.showInsightHeader = true;
            }
            this.pageInsightList = this.insightViewModel.pageInsightList;
            this.pageInsightHeader = "Add Insights";
        }
        var _loop_1 = function(d) {
            d.showInsightHeader = false;
            if (this_1.insightViewModel.widgetInsightList.length > 0) {
                d.insightsList = this_1.insightViewModel.widgetInsightList.filter(function (k) { return k.widgetId === d.widgetId; })[0];
                if (d.insightsList) {
                    if (d.insightsList.insightList.length > 0) {
                        d.showInsightHeader = true;
                        d.insightHeader = "Insights <span class='insight-notification'>" + d.insightsList.insightList.length + "</span>";
                    }
                }
                else {
                    if (this_1.isAdmin) {
                        d.showInsightHeader = true;
                    }
                    d.insightHeader = "Add Insights";
                }
            }
            else {
                if (this_1.isAdmin) {
                    d.showInsightHeader = true;
                }
                d.insightHeader = "Add Insights";
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.data.widgets; _i < _a.length; _i++) {
            var d = _a[_i];
            _loop_1(d);
        }
        this.identificationFlagId = this.data.insightTypeId;
        if (this.identificationFlagId != null) {
            this.getFilters(this.filterObject);
        }
    };
    CurrencyBasketComponent.prototype.FilterSubmit = function (pagePopover) {
        var _this = this;
        this.loading = true;
        this.insightFilterValues.appliedFilters = [];
        this.setAppliedFilters(this.insightFilterValues.appliedFilters);
        this.dataListService.getInsights(this.insightFilterValues).subscribe(function (data) {
            _this.insightViewModel = data;
            _this.seriveParams.selectedFilter = _this.filterObject;
            _this.seriveParams.regionName = null;
            _this.chartService.getData(_this.seriveParams)
                .subscribe(function (data) {
                _this.data.widgets = data.pageDataMapper.widgets;
                _this.data.exports = data.pageDataMapper.exports;
                _this.exportVisible = true;
                // Setting Insight Data in Widget ViewModel
                _this.setInsightValues();
                //
                _this.loading = false;
            }, function (error) { return _this.errorMessage = error; });
        }, function (error) { return _this.errorMessage = error; });
    };
    CurrencyBasketComponent.prototype.ExportSubmit = function () {
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
            this.arrayFilterdata = { templateName: "Export", fileName: this.pageName + "_" + (global_util_1.GlobalUtil.getAppSession("UserInfo") ? global_util_1.GlobalUtil.getAppSession("UserInfo").userName.split('@')[0].split('.')[0] : ""), kpiData: this.kpi, exportAs: ExportAsData.selectedData };
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
                    var Insights = this.pageInsightList;
                    var PageInsightData_1 = '';
                    this.datePipe = new common_1.DatePipe("en-US");
                    if (Insights.length > 0) {
                        for (var _i = 0, Insights_1 = Insights; _i < Insights_1.length; _i++) {
                            var insightitem = Insights_1[_i];
                            if (insightitem.insightData != null || insightitem.insightData != undefined) {
                                PageInsightData_1 = PageInsightData_1.concat('<strong>').concat("Time Period: ").concat('</strong>').concat(insightitem.insightTitle).concat('<br/>');
                                PageInsightData_1 = PageInsightData_1.concat('<strong>').concat("Insight: ").concat('</strong>').concat(insightitem.insightData.replace('<p>', '').replace('</p>', '')).concat('<br/>');
                                PageInsightData_1 = PageInsightData_1.concat('<strong>').concat('Author: ').concat('</strong>').concat(insightitem.author).concat('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'); // space given to show the next record in the same row
                                PageInsightData_1 = PageInsightData_1.concat('<strong>').concat('Updated Date: ').concat('</strong>').concat(this.datePipe.transform(insightitem.updatedDate, 'dd MMMM yyyy')).concat('<br/><br/><br/>');
                            }
                        }
                    }
                    var loop_1 = function (key) {
                        var InsightNode = document.createElement('div');
                        //InsightNode.innerHTML = this.data.widgets.find(model => model.widgetId == key).insightData;
                        InsightNode.innerHTML = PageInsightData_1;
                        var obj = {
                            Image: onSubmitClick("chart-container-" + key), Insight: (InsightData.selectedData == "1") ? InsightNode.innerHTML.toString() : null,
                            PageFooterDesc: global_util_1.GlobalUtil.getAppSession("UserInfo").userName + ' exported from AgriInsider on ' + _this.datePipe.transform(new Date(), 'dd MMMM yyyy')
                        };
                        _this.kpi[0] = {
                            name: filterdata[count_1].widgetName,
                            data: obj,
                            CurrentChunk: count_1,
                            TotalChunks: FilesCount,
                            Size: 1,
                            ExportLevel: global_config_1.ExportLevel.Page
                        };
                        _this.arrayFilterdata = { templateName: "Export", fileName: _this.pageName, kpiData: _this.kpi, exportAs: ExportAsData.selectedData };
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
    CurrencyBasketComponent.prototype.onExportVisibleEmit = function (visible) {
        this.exportVisible = visible;
    };
    __decorate([
        core_1.ViewChild('pagePopover'), 
        __metadata('design:type', ng2_popover_1.PopoverContent)
    ], CurrencyBasketComponent.prototype, "pagePopover", void 0);
    CurrencyBasketComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'currency-basket.component.html'
        }), 
        __metadata('design:paramtypes', [chart_service_1.ChartService, core_1.ElementRef, Export_service_1.ExcelExportService, datalist_service_1.DataListService])
    ], CurrencyBasketComponent);
    return CurrencyBasketComponent;
}());
exports.CurrencyBasketComponent = CurrencyBasketComponent;
//# sourceMappingURL=currency-basket.component.js.map