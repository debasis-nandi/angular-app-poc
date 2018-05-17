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
var chart_service_1 = require('../../../widgets/charts/chart.service');
var ng2_popover_1 = require('ng2-popover');
var global_config_1 = require('../../../global/global.config');
var global_util_1 = require('../../../global/global.util');
var Export_service_1 = require('../../../widgets/export/Export.service');
var datalist_service_1 = require('../../../insights/datalist/datalist.service');
var AgribusinessOverviewComponent = (function () {
    function AgribusinessOverviewComponent(chartService, ref, _ExcelExportService, dataListService) {
        this.chartService = chartService;
        this.ref = ref;
        this._ExcelExportService = _ExcelExportService;
        this.dataListService = dataListService;
        //**Insight variables
        this.identificationFlagId = null;
        this.pageInsightHeader = "Add Insights";
        this.showInsightHeader = false;
        this.fromChartInsight = false;
        this.chartInsights = [];
        this.pageInsightEditorId = "";
        this.insightsData = 'Test data';
        this.insightsClasses = [{ className: 'insightScrollDisplay', isAdd: true }, { className: 'insightChartDisplay', isAdd: true }];
        this.initInsightsEditor = false;
        this.pageInsightList = [];
        this.insightFilterValues = { insightId: null, insightData: '', pageName: global_config_1.Page.agribusinessOverview.toString(), appliedFilterId: null, widgetDetailIds: '', appliedFilters: [], identificationFlag: '', author: '', updatedBy: '', updatedDate: null, isActive: true };
        this.pageName = global_config_1.Page.agribusinessOverview.toString();
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
        //currentInsightData: string;
        //currentWidgetId: number;
        //editor: any;
        //snapshotDesc: string;
        //insightDetails: IInisghts = {};
        //noInsightText = Constants.noInsightText;
        //noInsightDate = Constants.noInsightDate;
        this.submitVisible = false;
        this.selectedFilters = [];
        this.seriveParams = { pageName: global_config_1.Page.agribusinessOverview, companyId: 0, cropId: 0, selectedFilter: null, userId: global_util_1.GlobalUtil.getAppSession("UserInfo").userId, regionName: global_util_1.GlobalUtil.getAppSession("UserInfo").region };
        this.kpi = [];
    }
    AgribusinessOverviewComponent.prototype.getPageModuleId = function () {
        return global_util_1.GlobalUtil.getSession("PageModuleId");
    };
    AgribusinessOverviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.chartService.getData(this.seriveParams)
            .subscribe(function (data) {
            _this.data = data.pageDataMapper;
            _this.DefaultSelectedFilters(_this.data.filters);
            //**Insight Service calling started
            _this.dataListService.getInsights(_this.insightFilterValues).subscribe(function (data) {
                _this.insightViewModel = data;
                _this.setInsightValues();
                _this.loading = false;
            }, function (error) { return _this.errorMessage = error; });
            //--Insight Service calling completed
        }, function (error) { return _this.errorMessage = error; });
        //this.chartService.getData(this.seriveParams)
        //    .subscribe(data => { this.data = data.pageDataMapper; this.DefaultSelectedFilters(this.data.filters); this.loading = false }
        //    , error => this.errorMessage = <any>error
        //    );
    };
    AgribusinessOverviewComponent.prototype.onFilterEmit = function (filter) {
        this.filterObject = this.filterObject.filter(function (x) { return x.filterName !== filter.filterName; });
        this.filterObject.push(filter);
        return true;
        //this.filterObject = filter;
        //return true;
    };
    AgribusinessOverviewComponent.prototype.onExportEmit = function (exp) {
        this.exportObject = this.exportObject.filter(function (x) { return x.exportName !== exp.exportName; });
        this.exportObject.push(exp);
        return true;
    };
    AgribusinessOverviewComponent.prototype.onSubmitEmit = function (visible) {
        this.submitVisible = visible;
    };
    //** insight methods
    AgribusinessOverviewComponent.prototype.initPageInsightEditor = function () {
        if (this.identificationFlagId == 3 && this.fromChartInsight == false) {
            this.collapseChartInsight();
        }
        this.initInsight();
        this.iInsights.identificationFlag = "P";
        this.pageInsightEditorId = "AgriPageInsightEditor";
        var s = document.getElementById('insightTargetTitle');
        var collapsed = s.classList.contains("collapsed");
        this.initInsightsEditor = collapsed;
    };
    AgribusinessOverviewComponent.prototype.initChartInsightEditor = function (widgetId, index) {
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
    AgribusinessOverviewComponent.prototype.collapseChartInsight = function () {
        this.chartInsights.forEach(function (x, ind) {
            if (x.initInsightsEditor == true) {
                x.initInsightsEditor = false;
                document.getElementById('chart' + ind + 'cc').click();
            }
        });
    };
    AgribusinessOverviewComponent.prototype.collapsePageInsight = function () {
        var s = document.getElementById('insightTargetTitle');
        if (s != null) {
            s.click();
        }
    };
    AgribusinessOverviewComponent.prototype.initInsight = function () {
        this.iInsights = {
            insightId: null,
            insightData: this.insightsData,
            pageName: global_config_1.Page.agribusinessOverview.toString(),
            appliedFilterId: null,
            widgetDetailIds: this.widgetIds,
            appliedFilters: this.appliedFilters,
            identificationFlag: this.identificationFlag,
            author: global_util_1.GlobalUtil.getAppSession("UserInfo").firstName + " " + global_util_1.GlobalUtil.getAppSession("UserInfo").lastName,
            updatedBy: global_util_1.GlobalUtil.getAppSession("UserInfo").userId,
            appliedFiltersDisplay: this.selectedFilters.map(function (k) { return k.filterName + ': ' + k.selectedValues; }).join(', '),
            updatedDate: null,
            isActive: true
        };
    };
    AgribusinessOverviewComponent.prototype.setAppliedFilters = function (appliedFilters) {
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
    AgribusinessOverviewComponent.prototype.getFilters = function (filterObject) {
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
    AgribusinessOverviewComponent.prototype.setChartInsights = function () {
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
    AgribusinessOverviewComponent.prototype.getWidgetIds = function () {
        var chartsDetails = this.data.exports.filter(function (model) { return model.exportName == "Chart Names"; });
        if (chartsDetails.length > 0) {
            var widgets = chartsDetails[0].exportData;
            if (widgets.length > 0) {
                this.widgetIds = (widgets.map(function (x) { return x.value; })).toString();
            }
        }
    };
    AgribusinessOverviewComponent.prototype.InsightListCount = function (event) {
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
    AgribusinessOverviewComponent.prototype.setInsightValues = function () {
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
    //-- insight methods
    AgribusinessOverviewComponent.prototype.FilterSubmit = function (pagePopover) {
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
                _this.GetSelectedFilters(_this.filterObject);
                // Setting Insight Data in Widget ViewModel
                _this.setInsightValues();
                //
                _this.loading = false;
            }, function (error) { return _this.errorMessage = error; });
        }, function (error) { return _this.errorMessage = error; });
        //let selectedValue: IServiceParams = { pageName: Page.agribusinessOverview.toString(), companyId: 0, cropId: 0, selectedFilter: this.filterObject, userId: GlobalUtil.getAppSession("UserInfo").userId  };
        //this.chartService.getData(selectedValue)
        //    .subscribe(data => { this.data.widgets = data.pageDataMapper.widgets; this.data.exports = data.pageDataMapper.exports; this.exportVisible = true; this.GetSelectedFilters(this.filterObject); this.loading = false }
        //    , error => this.errorMessage = <any>error
        //    );
    };
    AgribusinessOverviewComponent.prototype.GetSelectedFilters = function (filterObject) {
        this.selectedFilters = [];
        if (filterObject != null) {
            var _loop_2 = function(entry) {
                if (entry.filterName == 'PeriodYear') {
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
                if (entry.filterName == 'Region' || entry.filterName == 'Currency' || entry.filterName == 'Country' || entry.filterName == 'Source') {
                    if (entry.selectedData != null && entry.selectedData != 0)
                        this_3.selectedData.selectedValues = this_3.data.filters.filter(function (x) { return x.filterName == entry.filterName; })[0].filterData.filter(function (x) { return x["labelId"] == entry.selectedData; })[0]["label"];
                    else
                        this_3.selectedData.selectedValues = 'Not available';
                }
                else if ((entry.filterName == 'PeriodYear') || (entry.filterName == 'Period')) {
                    this_3.selectedData.filterName = 'Period';
                    //this.selectedData.selectedValues = entry.selectedData.join(" to ");
                    if ((typeof (entry.selectedData) != "object") || (entry.selectedData == null)) {
                        this_3.selectedData.selectedValues = entry.filterData[0]['defaultValue'].join(" to ");
                    }
                    else {
                        this_3.selectedData.selectedValues = entry.selectedData.join(" to ");
                    }
                }
                this_3.selectedFilters.push(this_3.selectedData);
            };
            var this_3 = this;
            var arr;
            for (var _a = 0, filterObject_2 = filterObject; _a < filterObject_2.length; _a++) {
                var entry = filterObject_2[_a];
                _loop_3(entry);
            }
        }
    };
    AgribusinessOverviewComponent.prototype.DefaultSelectedFilters = function (filterObject) {
        this.selectedFilters = [];
        if (filterObject != null) {
            var _loop_4 = function(entry) {
                if (entry.filterName == 'PeriodYear') {
                    entry.sortOrder = this_4.data.filters.filter(function (k) { return k.filterName == 'Period'; })[0].sortOrder;
                }
                else
                    entry.sortOrder = this_4.data.filters.filter(function (k) { return k.filterName == entry.filterName; })[0].sortOrder;
            };
            var this_4 = this;
            for (var _i = 0, filterObject_3 = filterObject; _i < filterObject_3.length; _i++) {
                var entry = filterObject_3[_i];
                _loop_4(entry);
            }
            filterObject = filterObject.sort(function (obj1, obj2) { return obj1.sortOrder - obj2.sortOrder; });
            var _loop_5 = function(entry) {
                this_5.selectedData = { filterName: '', selectedValues: '' };
                var insightAppliedFilterObj = { filterName: '', filterValue: '' }; // Insight Filters
                arr = [];
                this_5.selectedData.filterName = entry.filterName;
                insightAppliedFilterObj.filterName = entry.filterName; // Insight Filters
                if (entry.filterName == 'Region' || entry.filterName == 'Currency' || entry.filterName == 'Country' || entry.filterName == 'Source') {
                    if (entry.filterName == 'Region') {
                        this_5.selectedData.selectedValues = global_util_1.GlobalUtil.getAppSession("UserInfo").region;
                        insightAppliedFilterObj.filterValue = global_util_1.GlobalUtil.getAppSession("UserInfo").regionId; // Insight Filters
                    }
                    else {
                        if (entry.selectedData != null && entry.selectedData != 0) {
                            this_5.selectedData.selectedValues = this_5.data.filters.filter(function (x) { return x.filterName == entry.filterName; })[0].filterData.filter(function (x) { return x["labelId"] == entry.selectedData; })[0]["label"];
                            insightAppliedFilterObj.filterValue = entry.selectedData; // Insight Filters
                        }
                        else {
                            this_5.selectedData.selectedValues = 'Not available';
                            insightAppliedFilterObj.filterValue = "0"; // Insight Filters
                        }
                    }
                }
                else if ((entry.filterName == 'PeriodYear') || (entry.filterName == 'Period')) {
                    this_5.selectedData.filterName = 'Period';
                    if ((typeof (entry.selectedData) != "object") || (entry.selectedData == null)) {
                        this_5.selectedData.selectedValues = entry.filterData[0]['defaultValue'].join(" to ");
                    }
                    else {
                        this_5.selectedData.selectedValues = entry.selectedData.join(" to ");
                    }
                    var insightFilterFromYear = { filterName: '', filterValue: '' }; // Insight Filters
                    insightFilterFromYear.filterName = "From Year"; // Insight Filters
                    insightFilterFromYear.filterValue = entry.filterData[0]['defaultValue'][0]; // Insight Filters
                    this_5.insightFilterValues.appliedFilters.push(insightFilterFromYear); // Insight Filters
                    insightAppliedFilterObj.filterName = "To Year"; // Insight Filters
                    insightAppliedFilterObj.filterValue = entry.filterData[0]['defaultValue'][1]; // Insight Filters
                }
                this_5.insightFilterValues.appliedFilters.push(insightAppliedFilterObj); // Insight Filters
                this_5.selectedFilters.push(this_5.selectedData);
            };
            var this_5 = this;
            var arr;
            for (var _a = 0, filterObject_4 = filterObject; _a < filterObject_4.length; _a++) {
                var entry = filterObject_4[_a];
                _loop_5(entry);
            }
        }
    };
    AgribusinessOverviewComponent.prototype.ExportSubmit = function () {
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
                    var Filters_1 = (this.selectedFilters.length > 0) ? 'Filters applied: ' : '';
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
                        //InsightNode.innerHTML = this.data.widgets.find(model => model.widgetId == key).insightData;
                        var Insights = _this.data.widgets.filter(function (x) { return x.widgetId == key; });
                        if (Insights.length > 0) {
                            var WidgetInsightData = '';
                            _this.datePipe = new common_1.DatePipe("en-US");
                            for (var _i = 0, Insights_1 = Insights; _i < Insights_1.length; _i++) {
                                var insightitem = Insights_1[_i];
                                if (insightitem.insightsList != null || insightitem.insightsList != undefined) {
                                    if (insightitem.insightsList.insightList.length > 0) {
                                        for (var _a = 0, _b = insightitem.insightsList.insightList; _a < _b.length; _a++) {
                                            var item = _b[_a];
                                            WidgetInsightData = WidgetInsightData.concat('<strong>').concat("Time Period: ").concat('</strong>').concat(item.insightTitle).concat('<br/>');
                                            WidgetInsightData = WidgetInsightData.concat('<strong>').concat("Insight: ").concat('</strong>').concat(item.insightData.replace('<p>', '').replace('</p>', '')).concat('<br/>');
                                            WidgetInsightData = WidgetInsightData.concat('<strong>').concat('Author: ').concat('</strong>').concat(item.author).concat('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'); // space given to show the next record in the same row
                                            WidgetInsightData = WidgetInsightData.concat('<strong>').concat('Updated Date: ').concat('</strong>').concat(_this.datePipe.transform(item.updatedDate, 'dd MMMM yyyy')).concat('<br/><br/><br/>');
                                        }
                                    }
                                }
                            }
                            InsightNode.innerHTML = WidgetInsightData;
                        }
                        var obj = {
                            Image: onSubmitClick("chart-container-" + key), Insight: (InsightData.selectedData == "1") ? InsightNode.innerHTML.toString() : null,
                            ChartHeaderDesc: Filters_1,
                            PageFooterDesc: global_util_1.GlobalUtil.getAppSession("UserInfo").userName + ' exported from AgriInsider on ' + _this.datePipe.transform(new Date(), 'dd MMMM yyyy')
                        };
                        _this.kpi[0] = {
                            name: filterdata[count_1].widgetName,
                            data: obj,
                            CurrentChunk: count_1,
                            TotalChunks: FilesCount,
                            ExportLevel: global_config_1.ExportLevel.Chart
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
    AgribusinessOverviewComponent.prototype.onExportVisibleEmit = function (visible) {
        this.exportVisible = visible;
    };
    __decorate([
        core_1.ViewChild('pagePopover'), 
        __metadata('design:type', ng2_popover_1.PopoverContent)
    ], AgribusinessOverviewComponent.prototype, "pagePopover", void 0);
    AgribusinessOverviewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'agribusiness-overview.component.html'
        }), 
        __metadata('design:paramtypes', [chart_service_1.ChartService, core_1.ElementRef, Export_service_1.ExcelExportService, datalist_service_1.DataListService])
    ], AgribusinessOverviewComponent);
    return AgribusinessOverviewComponent;
}());
exports.AgribusinessOverviewComponent = AgribusinessOverviewComponent;
//# sourceMappingURL=agribusiness-overview.component.js.map