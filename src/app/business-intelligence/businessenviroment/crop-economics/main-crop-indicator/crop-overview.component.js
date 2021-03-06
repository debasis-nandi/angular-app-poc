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
var chart_service_1 = require('../../../../widgets/charts/chart.service');
var ng2_popover_1 = require('ng2-popover');
var global_config_1 = require('../../../../global/global.config');
var global_util_1 = require('../../../../global/global.util');
var Export_service_1 = require('../../../../widgets/export/Export.service');
var datalist_service_1 = require('../../../../insights/datalist/datalist.service');
var CropOverviewComponent = (function () {
    function CropOverviewComponent(chartService, ref, _ExcelExportService, dataListService) {
        this.chartService = chartService;
        this.ref = ref;
        this._ExcelExportService = _ExcelExportService;
        this.dataListService = dataListService;
        //**Insight variables
        this.identificationFlagId = null;
        this.pageInsightHeader = "Add Insights";
        this.fromChartInsight = false;
        this.showInsightHeader = false;
        this.chartInsights = [];
        this.maxMin = [];
        this.pageInsightEditorId = "";
        this.insightsData = 'Test data';
        this.insightsClasses = [{ className: 'insightScrollDisplay', isAdd: true }, { className: 'insightChartDisplay', isAdd: true }];
        this.initInsightsEditor = false;
        this.pageInsightList = [];
        this.insightFilterValues = { insightId: null, insightData: '', pageName: global_config_1.Page.cropIndicatorOverview, appliedFilterId: null, widgetDetailIds: '', appliedFilters: [], identificationFlag: '', author: '', updatedBy: '', updatedDate: null, isActive: true };
        this.pageName = global_config_1.Page.cropIndicatorOverview.toString();
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
        this.cropType = '';
        this.isAdmin = (global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
        this.crop = '';
        this.submitVisible = false;
        this.selectedFilters = [];
        this.seriveParams = { pageName: global_config_1.Page.cropIndicatorOverview, companyId: 0, cropId: global_util_1.GlobalUtil.getSession("CropId"), selectedFilter: null, userId: global_util_1.GlobalUtil.getAppSession("UserInfo").userId, regionName: global_util_1.GlobalUtil.getAppSession("UserInfo").region };
        this.kpi = [];
    }
    CropOverviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.cropType = global_util_1.GlobalUtil.getSession("CropName");
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
    };
    CropOverviewComponent.prototype.getPageModuleId = function () {
        return global_util_1.GlobalUtil.getSession("PageModuleId");
    };
    CropOverviewComponent.prototype.onFilterEmit = function (filter) {
        this.filterObject = this.filterObject.filter(function (x) { return x.filterName !== filter.filterName; });
        this.filterObject.push(filter);
        return true;
        //this.filterObject = filter;
        //return true;
    };
    CropOverviewComponent.prototype.onSubmitEmit = function (visible) {
        this.submitVisible = visible;
    };
    CropOverviewComponent.prototype.onExportEmit = function (exp) {
        this.exportObject = this.exportObject.filter(function (x) { return x.exportName !== exp.exportName; });
        this.exportObject.push(exp);
        return true;
    };
    //** insight methods
    CropOverviewComponent.prototype.initPageInsightEditor = function () {
        if (this.identificationFlagId == 3 && this.fromChartInsight == false) {
            this.collapseChartInsight();
        }
        this.initInsight();
        this.iInsights.identificationFlag = "P";
        this.pageInsightEditorId = "COPageInsightEditor";
        var s = document.getElementById('insightTargetTitle');
        var collapsed = s.classList.contains("collapsed");
        this.initInsightsEditor = collapsed;
    };
    CropOverviewComponent.prototype.initChartInsightEditor = function (widgetId, index) {
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
    CropOverviewComponent.prototype.collapseChartInsight = function () {
        this.chartInsights.forEach(function (x, ind) {
            if (x.initInsightsEditor == true) {
                x.initInsightsEditor = false;
                document.getElementById('chart' + ind + 'cc').click();
            }
        });
    };
    CropOverviewComponent.prototype.collapsePageInsight = function () {
        var s = document.getElementById('insightTargetTitle');
        if (s != null) {
            s.click();
        }
    };
    CropOverviewComponent.prototype.initInsight = function () {
        this.iInsights = {
            insightId: null,
            insightData: this.insightsData,
            pageName: global_config_1.Page.cropIndicatorOverview,
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
    CropOverviewComponent.prototype.setAppliedFilters = function (appliedFilters) {
        for (var _i = 0, _a = this.filterObject; _i < _a.length; _i++) {
            var f = _a[_i];
            //if (f.filterName == "Crop" || f.filterName == "Region" || f.filterName == "Territory" ||f.filterName == "Country" || f.filterName == "PeriodYear"){
            var y = f.filterName;
            if (y == "PeriodYear") {
                appliedFilters.push({ filterName: "From Year", filterValue: f.selectedData[0] });
                appliedFilters.push({ filterName: "To Year", filterValue: f.selectedData[1] });
            }
            else
                appliedFilters.push({ filterName: f.filterName, filterValue: f.selectedData });
        }
    };
    CropOverviewComponent.prototype.getFilters = function (filterObject) {
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
    CropOverviewComponent.prototype.setChartInsights = function () {
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
    CropOverviewComponent.prototype.getWidgetIds = function () {
        var chartsDetails = this.data.exports.filter(function (model) { return model.exportName == "Chart Names"; });
        if (chartsDetails.length > 0) {
            var widgets = chartsDetails[0].exportData;
            if (widgets.length > 0) {
                this.widgetIds = (widgets.map(function (x) { return x.value; })).toString();
            }
        }
    };
    CropOverviewComponent.prototype.InsightListCount = function (event) {
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
    CropOverviewComponent.prototype.setInsightValues = function () {
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
    CropOverviewComponent.prototype.FilterSubmit = function (pagePopover) {
        var _this = this;
        this.loading = true;
        this.crop = this.filterObject.filter(function (x) { return x.filterName == "Crop"; })[0].filterData[0]['label'];
        if (this.crop !== null && this.crop !== '') {
            this.cropType = this.crop;
        }
        //for (let item of this.filterObject.filter(x => x.filterName == "Crop")[0].selectedData)
        //{
        //    this.data.filters.filter(x => x.filterName == "Crop")[0].filterData.filter(x => x['labelId'] == 23)[0]['label'];
        //}
        //let selectedValue: IServiceParams = { pageName: Page.cropIndicatorOverview.toString(), companyId: 0, cropId: GlobalUtil.getSession("CropId"), selectedFilter: this.filterObject, userId: GlobalUtil.getAppSession("UserInfo").userId };
        this.insightFilterValues.appliedFilters = [];
        this.setAppliedFilters(this.insightFilterValues.appliedFilters);
        this.dataListService.getInsights(this.insightFilterValues).subscribe(function (data) {
            _this.insightViewModel = data;
            _this.seriveParams.selectedFilter = _this.filterObject;
            _this.seriveParams.regionName = null;
            _this.chartService.getData(_this.seriveParams)
                .subscribe(function (data) {
                var collapseFilter = document.getElementById('CIFilter');
                collapseFilter.click();
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
    };
    CropOverviewComponent.prototype.DefaultSelectedFilters = function (filterObject) {
        this.selectedFilters = [];
        if (filterObject != null) {
            var _loop_2 = function(entry) {
                if (entry.filterName == 'PeriodYear') {
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
                var insightAppliedFilterObj = { filterName: '', filterValue: '' }; // Insight Filters
                arr = [];
                if (entry.filterName.toLowerCase() == "list") {
                    return "continue";
                }
                if (entry.filterType.toLowerCase() != 'dropdownmultiplesource') {
                    this_3.selectedData.filterName = entry.filterName;
                    insightAppliedFilterObj.filterName = entry.filterName; // Insight Filters
                }
                if (entry.filterName == 'Currency' || entry.filterName == 'Territory' || entry.filterName == 'Country' || entry.filterName == 'Unit Type' || entry.filterName == 'Source') {
                    if (entry.selectedData != null && entry.selectedData != 0) {
                        insightAppliedFilterObj.filterValue = entry.selectedData;
                        arr.push(this_3.data.filters.filter(function (x) { return x.filterName == entry.filterName; })[0].filterData.filter(function (x) { return x["labelId"] == entry.selectedData; })[0]["label"]);
                    }
                    else {
                        arr.push('Not available');
                        insightAppliedFilterObj.filterValue = '0';
                    }
                }
                else if (entry.filterName == "Region") {
                    if (global_util_1.GlobalUtil.getAppSession("UserInfo").region != '') {
                        arr.push(global_util_1.GlobalUtil.getAppSession("UserInfo").region);
                        insightAppliedFilterObj.filterValue = global_util_1.GlobalUtil.getAppSession("UserInfo").regionId; // Insight Filters
                    }
                }
                else if (entry.filterName == "Crop") {
                    arr.push(this_3.cropType);
                    insightAppliedFilterObj.filterValue = global_util_1.GlobalUtil.getSession("CropId");
                }
                else if (entry.filterName == "Period") {
                    var _loop_4 = function(item) {
                        var Sources = { filterName: '', selectedValues: '' };
                        var cropId = global_util_1.GlobalUtil.getSession("CropId"); // this.data.filters.filter(x => x.filterName == 'Crop')[0].filterData.filter(x => x['label'] == this.cropType)[0]['labelId'];
                        var regionId = global_util_1.GlobalUtil.getAppSession("UserInfo").regionId;
                        var widgetId = 0;
                        var _loop_5 = function(item_1) {
                            var sources = this_3.data.filtersRelation.filter(function (k) { return k.cropId == cropId && k.regionId == regionId && k.territoryId == 0 && k.countryId == 0 && k.widgetId == item_1.widgetId; });
                            if (sources.length > 0) {
                                var source = sources.filter(function (k) { return k.defaultSourceId == k.sourceId; });
                                if (source.length > 0) {
                                    this_3.maxMin.push({ minYear: source[0].minYear, maxYear: source[0].maxYear });
                                }
                                else {
                                    sources.sort(function (a, b) {
                                        if (a["sourceName"] < b["sourceName"])
                                            return -1;
                                        else if (a["sourceName"] > b["sourceName"])
                                            return 1;
                                        else
                                            return 0;
                                    });
                                    this_3.maxMin.push({ minYear: sources[0].minYear, maxYear: sources[0].maxYear });
                                }
                            }
                        };
                        for (var _a = 0, _b = this_3.data.widgets; _a < _b.length; _a++) {
                            var item_1 = _b[_a];
                            _loop_5(item_1);
                        }
                    };
                    for (var _c = 0, _d = entry.filterData; _c < _d.length; _c++) {
                        var item = _d[_c];
                        _loop_4(item);
                    }
                    var min = 0;
                    var max = 0;
                    var DefaultValue = entry.filterData[0]['defaultValue'];
                    if (this_3.maxMin.length > 0) {
                        for (var _e = 0, _f = this_3.maxMin; _e < _f.length; _e++) {
                            var i = _f[_e];
                            if (Number(i['minYear']) < min) {
                                min = Number(i['minYear']);
                            }
                        }
                        for (var _g = 0, _h = this_3.maxMin; _g < _h.length; _g++) {
                            var i = _h[_g];
                            if (Number(i['maxYear']) > max) {
                                max = Number(i['maxYear']);
                            }
                        }
                        if (DefaultValue[0] < min) {
                            DefaultValue[0] = min;
                        }
                        if (DefaultValue[1] > max) {
                            DefaultValue[1] = max;
                        }
                    }
                    arr.push(DefaultValue.join(" to "));
                    var insightFilterFromYear = { filterName: '', filterValue: '' }; // Insight Filters
                    insightFilterFromYear.filterName = "From Year"; // Insight Filters
                    insightFilterFromYear.filterValue = entry.filterData[0]['defaultValue'][0]; // Insight Filters
                    this_3.insightFilterValues.appliedFilters.push(insightFilterFromYear); // Insight Filters
                    insightAppliedFilterObj.filterName = "To Year"; // Insight Filters
                    insightAppliedFilterObj.filterValue = entry.filterData[0]['defaultValue'][1]; // Insight Filters
                }
                else if (entry.filterType.toLowerCase() == 'dropdownmultiplesource') {
                    var _loop_6 = function(item) {
                        var Sources = { filterName: '', selectedValues: '' };
                        var insightAppliedFilterObj_1 = { filterName: '', filterValue: '' }; // Insight Filters
                        arr = [];
                        Sources.filterName = item['filterName'] + " source";
                        insightAppliedFilterObj_1.filterName = item['filterName'];
                        var cropId = global_util_1.GlobalUtil.getSession("CropId"); // this.data.filters.filter(x => x.filterName == 'Crop')[0].filterData.filter(x => x['label'] == this.cropType)[0]['labelId'];
                        var regionId = global_util_1.GlobalUtil.getAppSession("UserInfo").regionId;
                        var widgetId = 0;
                        if (this_3.data.widgets.filter(function (x) { return x.widgetName == item['filterName']; }).length > 0) {
                            widgetId = this_3.data.widgets.filter(function (x) { return x.widgetName == item['filterName']; })[0].widgetId;
                            var sources = this_3.data.filtersRelation.filter(function (k) { return k.cropId == cropId && k.regionId == regionId && k.territoryId == 0 && k.countryId == 0 && k.widgetId == widgetId; });
                            if (sources.length > 0) {
                                var source = sources.filter(function (k) { return k.defaultSourceId == k.sourceId; });
                                if (source.length > 0) {
                                    arr.push(source[0].sourceName + ' (recommended)');
                                    insightAppliedFilterObj_1.filterValue = "" + source[0].sourceId;
                                }
                                else {
                                    sources.sort(function (a, b) {
                                        if (a["sourceName"] < b["sourceName"])
                                            return -1;
                                        else if (a["sourceName"] > b["sourceName"])
                                            return 1;
                                        else
                                            return 0;
                                    });
                                    arr.push(sources[0].sourceName);
                                }
                            }
                            else {
                                arr.push('Not available');
                                insightAppliedFilterObj_1.filterValue = '0';
                            }
                        }
                        if (arr.length == 0) {
                            arr.push('Not available');
                            insightAppliedFilterObj_1.filterValue = '0';
                        }
                        Sources.selectedValues = arr.sort().join(", ");
                        this_3.selectedFilters.push(Sources);
                        this_3.insightFilterValues.appliedFilters.push(insightAppliedFilterObj_1); // Insight Filters
                    };
                    for (var _j = 0, _k = entry.filterData; _j < _k.length; _j++) {
                        var item = _k[_j];
                        _loop_6(item);
                    }
                }
                else if ((entry.filterName == 'PeriodYear')) {
                    this_3.selectedData.filterName = 'Period';
                    var _loop_7 = function(item) {
                        var Sources = { filterName: '', selectedValues: '' };
                        var cropId = global_util_1.GlobalUtil.getSession("CropId"); // this.data.filters.filter(x => x.filterName == 'Crop')[0].filterData.filter(x => x['label'] == this.cropType)[0]['labelId'];
                        var regionId = global_util_1.GlobalUtil.getAppSession("UserInfo").regionId;
                        var widgetId = 0;
                        var _loop_8 = function(item_2) {
                            var sources = this_3.data.filtersRelation.filter(function (k) { return k.cropId == cropId && k.regionId == regionId && k.territoryId == 0 && k.countryId == 0 && k.widgetId == item_2.widgetId; });
                            if (sources.length > 0) {
                                var source = sources.filter(function (k) { return k.defaultSourceId == k.sourceId; });
                                if (source.length > 0) {
                                    this_3.maxMin.push({ minYear: source[0].minYear, maxYear: source[0].maxYear });
                                }
                                else {
                                    sources.sort(function (a, b) {
                                        if (a["sourceName"] < b["sourceName"])
                                            return -1;
                                        else if (a["sourceName"] > b["sourceName"])
                                            return 1;
                                        else
                                            return 0;
                                    });
                                    this_3.maxMin.push({ minYear: sources[0].minYear, maxYear: sources[0].maxYear });
                                }
                            }
                        };
                        for (var _l = 0, _m = this_3.data.widgets; _l < _m.length; _l++) {
                            var item_2 = _m[_l];
                            _loop_8(item_2);
                        }
                    };
                    for (var _o = 0, _p = entry.filterData; _o < _p.length; _o++) {
                        var item = _p[_o];
                        _loop_7(item);
                    }
                    var min = 0;
                    var max = 0;
                    var DefaultValue = entry.filterData[0]['defaultValue'];
                    if (DefaultValue[0] < min) {
                        DefaultValue[0] = min;
                    }
                    if (DefaultValue[1] > max) {
                        DefaultValue[1] = max;
                    }
                    arr.push(DefaultValue.join(" to "));
                    //this.selectedData.selectedValues = entry.selectedData.join(" to ");
                    var insightFilterFromYear = { filterName: '', filterValue: '' }; // Insight Filters
                    insightFilterFromYear.filterName = "From Year"; // Insight Filters
                    insightFilterFromYear.filterValue = entry.filterData[0]['defaultValue'][0]; // Insight Filters
                    this_3.insightFilterValues.appliedFilters.push(insightFilterFromYear); // Insight Filters
                    insightAppliedFilterObj.filterName = "To Year"; // Insight Filters
                    insightAppliedFilterObj.filterValue = entry.filterData[0]['defaultValue'][1]; // Insight Filters
                }
                else {
                    arr.push('Not available');
                }
                if (entry.filterType.toLowerCase() != 'dropdownmultiplesource') {
                    this_3.selectedData.selectedValues = arr.sort().join(", ");
                }
                if (entry.filterType.toLowerCase() != 'dropdownmultiplesource') {
                    this_3.selectedFilters.push(this_3.selectedData);
                }
                if (insightAppliedFilterObj.filterName != "" && insightAppliedFilterObj.filterName != "Unit Type") {
                    this_3.insightFilterValues.appliedFilters.push(insightAppliedFilterObj); // Insight Filters
                }
            };
            var this_3 = this;
            var arr;
            for (var _q = 0, filterObject_2 = filterObject; _q < filterObject_2.length; _q++) {
                var entry = filterObject_2[_q];
                _loop_3(entry);
            }
        }
    };
    CropOverviewComponent.prototype.GetSelectedFilters = function (filterObject) {
        var _this = this;
        this.selectedFilters = [];
        if (filterObject != null) {
            var _loop_9 = function(entry) {
                if (entry.filterName == 'PeriodYear') {
                    entry.sortOrder = this_4.data.filters.filter(function (k) { return k.filterName == 'Period'; })[0].sortOrder;
                }
                else if (entry.filterType.toLowerCase() == "source") {
                    entry.sortOrder = 20;
                }
                else if (this_4.data.filters.filter(function (k) { return k.filterName == entry.filterName; }).length > 0)
                    entry.sortOrder = this_4.data.filters.filter(function (k) { return k.filterName == entry.filterName; })[0].sortOrder;
            };
            var this_4 = this;
            for (var _i = 0, filterObject_3 = filterObject; _i < filterObject_3.length; _i++) {
                var entry = filterObject_3[_i];
                _loop_9(entry);
            }
            filterObject = filterObject.sort(function (obj1, obj2) { return obj1.sortOrder - obj2.sortOrder; });
            var _loop_10 = function(entry) {
                this_5.selectedData = { filterName: '', selectedValues: '' };
                arr = [];
                if (entry.filterName.toLowerCase() == "list") {
                    return "continue";
                }
                if (entry.filterType.toLowerCase() != 'dropdownmultiplesource') {
                    this_5.selectedData.filterName = entry.filterName;
                }
                if (entry.filterName == 'Region' || entry.filterName == 'Currency' || entry.filterName == 'Territory' || entry.filterName == 'Country' || entry.filterName == 'Crop' || entry.filterName == 'Unit Type' || entry.filterName == 'Source') {
                    if (entry.selectedData != null && entry.selectedData != 0) {
                        this_5.selectedData.selectedValues = this_5.data.filters.filter(function (x) { return x.filterName == entry.filterName; })[0].filterData.filter(function (x) { return x["labelId"] == entry.selectedData; })[0]["label"];
                    }
                    else if (entry.filterName == 'Crop') {
                        this_5.cropType = this_5.data.filters.filter(function (x) { return x.filterName == entry.filterName; })[0].filterData.filter(function (x) { return x["labelId"] == entry.selectedData; })[0]["label"];
                    }
                    else {
                        this_5.selectedData.selectedValues = 'Not available';
                    }
                }
                else if (entry.filterType.toLowerCase() == "source") {
                    var insightAppliedFilterObj = { filterName: '', filterValue: '' }; // Insight Filters
                    this_5.selectedData.filterName = entry.filterName + " source";
                    insightAppliedFilterObj.filterName = entry['filterName'];
                    if (entry.selectedData != null) {
                        arr = [];
                        var cropId_1 = this_5.data.filters.filter(function (x) { return x.filterName == 'Crop'; })[0].filterData.filter(function (x) { return x['label'] == _this.cropType; })[0]['labelId'];
                        var regionId_1 = filterObject.filter(function (x) { return x.filterName == 'Region'; })[0].selectedData;
                        var territoryId_1 = filterObject.filter(function (x) { return x.filterName == 'Territory'; })[0].selectedData;
                        var countryId_1 = filterObject.filter(function (x) { return x.filterName == 'Country'; })[0].selectedData;
                        var widgetId_1 = 0;
                        if (this_5.data.widgets.filter(function (x) { return x.widgetName == entry.filterName; }).length > 0) {
                            widgetId_1 = this_5.data.widgets.filter(function (x) { return x.widgetName == entry.filterName; })[0].widgetId;
                            var sources = this_5.data.filtersRelation.filter(function (k) { return k.cropId == cropId_1 && k.regionId == Number(regionId_1) && k.territoryId == territoryId_1 && k.countryId == countryId_1 && k.widgetId == widgetId_1; });
                            if (sources.length > 0) {
                                var source = sources.filter(function (k) { return k.defaultSourceId == k.sourceId; });
                                if (source.length > 0) {
                                    if (!source[0].sourceName.includes("recommended")) {
                                        arr.push(source[0].sourceName + ' (recommended)');
                                    }
                                    else {
                                        arr.push(source[0].sourceName);
                                    }
                                    insightAppliedFilterObj.filterValue = "" + source[0].sourceId;
                                }
                                else {
                                    sources.sort(function (a, b) {
                                        if (a["sourceName"] < b["sourceName"])
                                            return -1;
                                        else if (a["sourceName"] > b["sourceName"])
                                            return 1;
                                        else
                                            return 0;
                                    });
                                    arr.push(sources[0].sourceName);
                                }
                            }
                            else {
                                arr.push('Not available');
                                insightAppliedFilterObj.filterValue = '0';
                            }
                            //if (entry.selectedData != null && entry.selectedData != undefined && entry.selectedData != 0) {
                            //    if (sources.findIndex(x => x.sourceId == entry.selectedData)) {
                            //        arr.push(this.data.filtersRelation.filter(k => k.cropId == cropId && k.regionId == regionId && k.territoryId == territoryId && k.sourceId == entry.selectedData && k.countryId == countryId && k.widgetId == widgetId)[0].sourceName);
                            //    } else {
                            //        arr.push(this.data.filtersRelation.filter(k => k.cropId == cropId && k.regionId == regionId && k.territoryId == territoryId && k.countryId == countryId && k.widgetId == widgetId)[0].sourceName);
                            //    }
                            //} else {
                            //    arr.push(this.data.filtersRelation.filter(k => k.cropId == cropId && k.regionId == regionId && k.territoryId == territoryId && k.countryId == countryId && k.widgetId == widgetId)[0].sourceName);
                            //}
                            //arr.push(this.data.filtersRelation.filter(k => k.cropId == cropId && k.regionId == regionId && k.territoryId == territoryId && k.sourceId == entry.selectedData && k.countryId == countryId && k.widgetId == widgetId)[0].sourceName)
                            this_5.selectedData.selectedValues = arr.sort().join(", ");
                        }
                        else {
                            this_5.selectedData.selectedValues = "Not available";
                        }
                    }
                    else {
                        this_5.selectedData.selectedValues = "Not available";
                    }
                }
                else if ((entry.filterName == 'PeriodYear')) {
                    this_5.selectedData.filterName = 'Period';
                    this_5.selectedData.selectedValues = entry.selectedData.join(" to ");
                }
                if (entry.filterType.toLowerCase() != 'dropdownmultiplesource') {
                    this_5.selectedFilters.push(this_5.selectedData);
                }
            };
            var this_5 = this;
            var arr;
            for (var _a = 0, filterObject_4 = filterObject; _a < filterObject_4.length; _a++) {
                var entry = filterObject_4[_a];
                _loop_10(entry);
            }
        }
    };
    CropOverviewComponent.prototype.ExportSubmit = function () {
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
                    var Filters_1 = (this.selectedFilters.length > 0) ? 'Filters applied: ' : 'Filters applied: ' + this.cropType;
                    if (this.selectedFilters != null) {
                        if (this.selectedFilters.length > 0) {
                            for (var _i = 0, _a = this.selectedFilters; _i < _a.length; _i++) {
                                var item = _a[_i];
                                Filters_1 = Filters_1.concat('<strong>').concat(item.filterName).concat('</strong>').concat(': ').concat(item.selectedValues).concat('; ');
                            }
                        }
                    }
                    var Insights = this.pageInsightList;
                    var PageInsightData_1 = '';
                    this.datePipe = new common_1.DatePipe("en-US");
                    if (Insights.length > 0) {
                        for (var _b = 0, Insights_1 = Insights; _b < Insights_1.length; _b++) {
                            var insightitem = Insights_1[_b];
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
                            ChartHeaderDesc: Filters_1,
                            PageFooterDesc: global_util_1.GlobalUtil.getAppSession("UserInfo").userName + ' exported from AgriInsider on ' + _this.datePipe.transform(new Date(), 'dd MMMM yyyy')
                        };
                        _this.kpi[0] = {
                            name: filterdata[count_1].widgetName + ' - ' + _this.cropType,
                            data: obj,
                            CurrentChunk: count_1,
                            TotalChunks: FilesCount,
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
    CropOverviewComponent.prototype.onExportVisibleEmit = function (visible) {
        this.exportVisible = visible;
    };
    __decorate([
        core_1.ViewChild('pagePopover'), 
        __metadata('design:type', ng2_popover_1.PopoverContent)
    ], CropOverviewComponent.prototype, "pagePopover", void 0);
    CropOverviewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'crop-overview.component.html'
        }), 
        __metadata('design:paramtypes', [chart_service_1.ChartService, core_1.ElementRef, Export_service_1.ExcelExportService, datalist_service_1.DataListService])
    ], CropOverviewComponent);
    return CropOverviewComponent;
}());
exports.CropOverviewComponent = CropOverviewComponent;
//# sourceMappingURL=crop-overview.component.js.map