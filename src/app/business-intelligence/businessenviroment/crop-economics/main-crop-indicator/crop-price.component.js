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
var common_1 = require('@angular/common');
var ng2_popover_1 = require('ng2-popover');
var global_config_1 = require('../../../../global/global.config');
var global_util_1 = require('../../../../global/global.util');
var Export_service_1 = require('../../../../widgets/export/Export.service');
var CropPriceComponent = (function () {
    function CropPriceComponent(chartService, ref, _ExcelExportService) {
        this.chartService = chartService;
        this.ref = ref;
        this._ExcelExportService = _ExcelExportService;
        this.pageName = global_config_1.Page.cropIndicatorUSPrice.toString();
        this.filterObject = [];
        this.exportObject = [];
        this.filterApi = [];
        this.exportApi = [];
        this.exportVisible = true;
        this.submitVisible = false;
        this.paginator = false;
        this.pageLinks = 3;
        this.rowsPerPage = 5;
        this.rowsPerPageOptions = [5, 10, 20];
        this.responsive = true;
        this.loading = false;
        this.cropType = '';
        this.submitMessage = '';
        this.isAdmin = (global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
        this.insightDetails = {};
        this.noInsightText = global_config_1.Constants.noInsightText;
        this.noInsightDate = global_config_1.Constants.noInsightDate;
        this.selectedFilters = [];
        this.noDataMessage = "";
        this.blankCropsArray = [];
        this.blankCrops = '';
        this.seriveParams = { pageName: global_config_1.Page.cropIndicatorUSPrice, companyId: 0, cropId: global_util_1.GlobalUtil.getSession("CropId"), selectedFilter: null, userId: global_util_1.GlobalUtil.getAppSession("UserInfo").userId, regionName: global_util_1.GlobalUtil.getAppSession("UserInfo").region };
        this.kpi = [];
        this.loadScripts();
    }
    CropPriceComponent.prototype.getPageModuleId = function () {
        return global_util_1.GlobalUtil.getSession("PageModuleId");
    };
    CropPriceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.cropType = global_util_1.GlobalUtil.getSession("CropName");
        this.chartService.getData(this.seriveParams)
            .subscribe(function (data) {
            _this.data = data.pageDataMapper;
            _this.DefaultSelectedFilters(_this.data.filters);
            _this.noDataMessage = "No data to display.";
            _this.loading = false;
        }, function (error) { return _this.errorMessage = error; });
    };
    CropPriceComponent.prototype.onFilterEmit = function (filter) {
        this.filterObject = this.filterObject.filter(function (x) { return x.filterName !== filter.filterName; });
        this.filterObject.push(filter);
        //console.log(this.filterObject);
        return true;
        //this.filterObject = filter;
        //return true;
    };
    CropPriceComponent.prototype.onSubmitEmit = function (visible) {
        this.submitVisible = visible;
    };
    CropPriceComponent.prototype.onSubmitMessageEmit = function (message) {
        this.submitMessage = message;
    };
    CropPriceComponent.prototype.onExportEmit = function (exp) {
        this.exportObject = this.exportObject.filter(function (x) { return x.exportName !== exp.exportName; });
        this.exportObject.push(exp);
        return true;
    };
    CropPriceComponent.prototype.FilterSubmit = function (pagePopover) {
        var _this = this;
        tinymce.remove(this.editor);
        //let collapseFilter: HTMLElement = document.getElementById('collapseFilter');
        //collapseFilter.classList.remove('in');
        var list = this.filterObject.filter(function (x) { return x.filterName == "List"; })[0].selectedData;
        this.filterObject = this.filterObject.filter(function (x) { return x.filterType != "Source" || (x.filterType == "Source" && list.indexOf(x.filterName) > -1); });
        this.loading = true;
        var cropsSelected = [];
        var _loop_1 = function(item) {
            cropsSelected.push(this_1.data.filters.filter(function (x) { return x.filterName == "Crop"; })[0].filterData.filter(function (x) { return x['value'] == item; })[0]['label']);
        };
        var this_1 = this;
        for (var _i = 0, _a = this.filterObject.filter(function (x) { return x.filterName == "Crop"; })[0].selectedData; _i < _a.length; _i++) {
            var item = _a[_i];
            _loop_1(item);
        }
        this.cropType = cropsSelected.join();
        var selectedValue = { pageName: global_config_1.Page.cropIndicatorUSPrice.toString(), companyId: 0, cropId: global_util_1.GlobalUtil.getSession("CropId"), selectedFilter: this.filterObject };
        this.chartService.getData(selectedValue)
            .subscribe(function (data) {
            var collapseFilter = document.getElementById('CPFilter');
            collapseFilter.click();
            _this.AfterSubmit(data.pageDataMapper);
        }, function (error) { return _this.errorMessage = error; });
    };
    CropPriceComponent.prototype.AfterSubmit = function (data) {
        var _this = this;
        this.data.widgets = data.widgets;
        this.noDataMessage = "No data to display.";
        this.blankCropsArray = [];
        this.blankCrops = '';
        this.data.exports = data.exports;
        this.exportVisible = true;
        if (this.data.widgets[0]) {
            var _loop_2 = function(entry) {
                if (this_2.data.widgets[0].chartPlottedOn == 'crop') {
                    this_2.blankCropsArray.push(this_2.data.filters.filter(function (x) { return x.filterName == 'Crop'; })[0].filterData.filter(function (x) { return x["value"] == entry; })[0]["label"]);
                }
                else {
                    this_2.blankCropsArray.push(this_2.data.filters.filter(function (x) { return x.filterName == 'Region'; })[0].filterData.filter(function (m) { return m["filterName"].toLowerCase() == _this.data.widgets[0].chartPlottedOn; })[0]["filterData"].filter(function (k) { return k.value == entry; })[0].label);
                }
            };
            var this_2 = this;
            for (var _i = 0, _a = this.data.widgets[0].cropComparisonIds; _i < _a.length; _i++) {
                var entry = _a[_i];
                _loop_2(entry);
            }
            this.blankCrops = this.blankCropsArray.join(",");
        }
        this.GetSelectedFilters(this.filterObject);
        this.loading = false;
    };
    CropPriceComponent.prototype.DefaultSelectedFilters = function (filterObject) {
        var _this = this;
        this.selectedFilters = [];
        if (filterObject != null) {
            var _loop_3 = function(entry) {
                if (entry.filterName == 'Region' || entry.filterName == 'Territory' || entry.filterName == 'Country') {
                    entry.sortOrder = this_3.data.filters.filter(function (x) { return x.filterName == 'Region'; })[0].filterData.filter(function (m) { return m["filterName"] == entry.filterName; })[0]["sortOrder"];
                }
                else if (entry.filterName == 'From Year' || entry.filterName == 'From Month' || entry.filterName == 'To Year' || entry.filterName == 'To Month') {
                    entry.sortOrder = this_3.data.filters.filter(function (x) { return x.filterName == 'From Year'; })[0].filterData.filter(function (m) { return m["filterName"] == entry.filterName; })[0]["sortOrder"];
                }
                else if (entry.filterType.toLowerCase() == "source") {
                    entry.sortOrder = 20;
                }
                else if (this_3.data.filters.filter(function (k) { return k.filterName == entry.filterName; }).length > 0)
                    entry.sortOrder = this_3.data.filters.filter(function (k) { return k.filterName == entry.filterName; })[0].sortOrder;
            };
            var this_3 = this;
            for (var _i = 0, filterObject_1 = filterObject; _i < filterObject_1.length; _i++) {
                var entry = filterObject_1[_i];
                _loop_3(entry);
            }
            filterObject = filterObject.sort(function (obj1, obj2) { return obj1.sortOrder - obj2.sortOrder; });
            var cropSources = { filterName: '', selectedValues: '' }; // for crop's sources
            var _loop_4 = function(entry) {
                this_4.selectedData = { filterName: '', selectedValues: '' };
                arr = [];
                if (entry.filterName.toLowerCase() == "list") {
                    return "continue";
                }
                this_4.selectedData.filterName = entry.filterName;
                if (entry.filterName == 'Source' || entry.filterName == 'Currency') {
                    this_4.selectedData.selectedValues = this_4.data.filters.filter(function (x) { return x.filterName == entry.filterName; })[0].filterData.filter(function (x) { return x["labelId"] == entry.selectedData; })[0]["label"];
                }
                else if (entry.filterName == 'UnitType') {
                    this_4.selectedData.filterName = 'Unit Type';
                    this_4.selectedData.selectedValues = this_4.data.filters.filter(function (x) { return x.filterName == entry.filterName; })[0].filterData.filter(function (x) { return x["labelId"] == entry.selectedData; })[0]["label"];
                }
                else if (entry.filterName == 'Crop') {
                    arr.push(this_4.cropType);
                    this_4.selectedData.selectedValues = arr.sort().join(", ");
                }
                else if (entry.filterType == 'GeographyCascadeMultiselects') {
                    var multiSelects = filterObject.filter(function (x) { return x.filterType == entry.filterType; });
                    if (multiSelects.length > 0) {
                        var filterData = multiSelects[0].filterData;
                        var _loop_5 = function(item) {
                            if (item['filterName'] == 'Region') {
                                if (global_util_1.GlobalUtil.getAppSession("UserInfo").region != '' && global_util_1.GlobalUtil.getAppSession("UserInfo").region != undefined) {
                                    //let sources = { filterName: '', selectedValues: '' };
                                    cropSources.filterName = this_4.cropType + " source";
                                    ;
                                    var cropId_1 = this_4.data.filters.filter(function (x) { return x.filterName == 'Crop'; })[0].filterData.filter(function (x) { return x['label'] == _this.cropType; })[0]['value'];
                                    var regionId_1 = global_util_1.GlobalUtil.getAppSession("UserInfo").regionId;
                                    var relation = this_4.data.filtersRelation.filter(function (k) { return k.cropId == cropId_1 && k.kpiId == 48 && k.regionId == regionId_1 && k.territoryId == 0 && k.countryId == 0; });
                                    //if (relation.length > 0) {
                                    //    cropSources.selectedValues = relation[0].sourceName;
                                    //}
                                    if (relation.length > 0) {
                                        var source = relation.filter(function (k) { return k.defaultSourceId == k.sourceId; });
                                        if (source.length > 0) {
                                            cropSources.selectedValues = source[0].sourceName + ' (recommended)';
                                        }
                                        else {
                                            relation.sort(function (a, b) {
                                                if (a["sourceName"] < b["sourceName"])
                                                    return -1;
                                                else if (a["sourceName"] > b["sourceName"])
                                                    return 1;
                                                else
                                                    return 0;
                                            });
                                            cropSources.selectedValues = relation[0].sourceName;
                                        }
                                    }
                                    else {
                                        cropSources.selectedValues = 'Not available';
                                    }
                                    // adding the region as per its order (coming first before territory and country)
                                    arr.push(global_util_1.GlobalUtil.getAppSession("UserInfo").region);
                                    this_4.selectedData.selectedValues = arr.sort().join(", ");
                                    this_4.selectedFilters.push(this_4.selectedData);
                                }
                            }
                            else if (item['filterName'] == 'Territory' || item['filterName'] == 'Country') {
                                var sources = { filterName: '', selectedValues: '' };
                                sources.filterName = item['filterName'];
                                if (item['selectedData'] == null || item['selectedData'] == 0) {
                                    sources.selectedValues = 'Not available';
                                }
                                this_4.selectedFilters.push(sources);
                            }
                        };
                        for (var _a = 0, filterData_1 = filterData; _a < filterData_1.length; _a++) {
                            var item = filterData_1[_a];
                            _loop_5(item);
                        }
                    }
                    if (arr.length > 0)
                        this_4.selectedData.selectedValues = arr.sort().join(", ");
                    else
                        this_4.selectedData.selectedValues = 'Not available';
                }
                else if (entry.filterType == 'MonthlyDropdowns') {
                    var multiSelects = filterObject.filter(function (x) { return x.filterType == entry.filterType; });
                    if (multiSelects.length > 0) {
                        var filters = multiSelects[0].filterData;
                        var _loop_6 = function(item) {
                            var sources = { filterName: '', selectedValues: '' };
                            sources.filterName = item['filterName'];
                            //console.log(filters.filter(x => x['filterName'] == item['filterName'])[0]);
                            var relation = item['filterData'].filter(function (x) { return x['labelId'] == Number(item['selectedData']); });
                            if (relation.length > 0) {
                                sources.selectedValues = relation[0]['label'];
                            }
                            this_4.selectedFilters.push(sources);
                        };
                        for (var _b = 0, filters_1 = filters; _b < filters_1.length; _b++) {
                            var item = filters_1[_b];
                            _loop_6(item);
                        }
                    }
                }
                else if (entry.filterType.toLowerCase() == "source") {
                    this_4.selectedData.filterName = entry.filterName + " source";
                    if (entry.filterData != null) {
                        if (entry.filterData.length > 0)
                            this_4.selectedData.selectedValues = entry.filterData[0]["sourceName"];
                        else
                            this_4.selectedData.selectedValues = "Not available";
                    }
                    else
                        this_4.selectedData.selectedValues = "Not available";
                }
                else {
                    this_4.selectedData.selectedValues = entry.selectedData;
                }
                if ((entry.filterType != 'MonthlyDropdowns') && (entry.filterType.toString() != 'GeographyCascadeMultiselects')) {
                    this_4.selectedFilters.push(this_4.selectedData);
                }
            };
            var this_4 = this;
            var arr;
            for (var _c = 0, filterObject_2 = filterObject; _c < filterObject_2.length; _c++) {
                var entry = filterObject_2[_c];
                _loop_4(entry);
            }
            this.selectedFilters.push(cropSources); // to display the crop sources at the end that's why it's kept out of loop
        }
    };
    CropPriceComponent.prototype.GetSelectedFilters = function (filterObject) {
        this.selectedFilters = [];
        if (filterObject != null) {
            var _loop_7 = function(entry) {
                if (entry.filterName == 'Region' || entry.filterName == 'Territory' || entry.filterName == 'Country') {
                    entry.sortOrder = this_5.data.filters.filter(function (x) { return x.filterName == 'Region'; })[0].filterData.filter(function (m) { return m["filterName"] == entry.filterName; })[0]["sortOrder"];
                }
                else if (entry.filterName == 'From Year' || entry.filterName == 'From Month' || entry.filterName == 'To Year' || entry.filterName == 'To Month') {
                    entry.sortOrder = this_5.data.filters.filter(function (x) { return x.filterName == 'From Year'; })[0].filterData.filter(function (m) { return m["filterName"] == entry.filterName; })[0]["sortOrder"];
                }
                else if (entry.filterType.toLowerCase() == "source") {
                    entry.sortOrder = 20;
                }
                else if (this_5.data.filters.filter(function (k) { return k.filterName == entry.filterName; }).length > 0)
                    entry.sortOrder = this_5.data.filters.filter(function (k) { return k.filterName == entry.filterName; })[0].sortOrder;
            };
            var this_5 = this;
            for (var _i = 0, filterObject_3 = filterObject; _i < filterObject_3.length; _i++) {
                var entry = filterObject_3[_i];
                _loop_7(entry);
            }
            filterObject = filterObject.sort(function (obj1, obj2) { return obj1.sortOrder - obj2.sortOrder; });
            var _loop_8 = function(entry) {
                this_6.selectedData = { filterName: '', selectedValues: '' };
                arr = [];
                if (entry.filterName.toLowerCase() == "list") {
                    return "continue";
                }
                this_6.selectedData.filterName = entry.filterName;
                if (entry.filterName == 'Source' || entry.filterName == 'Currency') {
                    this_6.selectedData.selectedValues = this_6.data.filters.filter(function (x) { return x.filterName == entry.filterName; })[0].filterData.filter(function (x) { return x["labelId"] == entry.selectedData; })[0]["label"];
                }
                else if (entry.filterName == 'UnitType') {
                    this_6.selectedData.filterName = 'Unit Type';
                    this_6.selectedData.selectedValues = this_6.data.filters.filter(function (x) { return x.filterName == entry.filterName; })[0].filterData.filter(function (x) { return x["labelId"] == entry.selectedData; })[0]["label"];
                }
                else if (entry.filterName == 'Crop') {
                    if ((typeof (entry.selectedData) != "object") || (entry.selectedData == null)) {
                        arr.push(this_6.cropType);
                    }
                    else {
                        var _loop_9 = function(item) {
                            arr.push(this_6.data.filters.filter(function (x) { return x.filterName == "Crop"; })[0].filterData.filter(function (x) { return x['value'] == item; })[0]['label']);
                        };
                        for (var _a = 0, _b = this_6.filterObject.filter(function (x) { return x.filterName == "Crop"; })[0].selectedData; _a < _b.length; _a++) {
                            var item = _b[_a];
                            _loop_9(item);
                        }
                    }
                    this_6.selectedData.selectedValues = arr.sort().join(", ");
                }
                else if (entry.filterName == 'Region' || entry.filterName == 'Territory' || entry.filterName == 'Country') {
                    if ((typeof (entry.selectedData) != "object") || (entry.selectedData == null)) {
                        arr.push(this_6.data.filters.filter(function (x) { return x.filterName == entry.filterName; })[0].filterData.filter(function (m) { return m["filterName"] == entry.filterName; })[0]["filterData"].filter(function (k) { return k.value == entry.selectedData; })[0]["label"]);
                    }
                    else {
                        var _loop_10 = function(item) {
                            arr.push(this_6.data.filters.filter(function (x) { return x.filterName == 'Region'; })[0].filterData.filter(function (m) { return m["filterName"] == entry.filterName; })[0]["filterData"].filter(function (k) { return k.value == item; })[0]["label"]);
                        };
                        for (var _c = 0, _d = this_6.filterObject.filter(function (x) { return x.filterName == entry.filterName; })[0].selectedData; _c < _d.length; _c++) {
                            var item = _d[_c];
                            _loop_10(item);
                        }
                    }
                    if (arr.length > 0)
                        this_6.selectedData.selectedValues = arr.sort().join(", ");
                    else
                        this_6.selectedData.selectedValues = 'Not available';
                }
                else if (entry.filterName == 'From Month' || entry.filterName == 'To Month') {
                    this_6.selectedData.selectedValues = this_6.data.filters.filter(function (x) { return x.filterName == 'From Year'; })[0].filterData.filter(function (k) { return k["filterName"] == entry.filterName; })[0]["filterData"].filter(function (l) { return l.labelId == entry.selectedData; })[0].label;
                }
                else if (entry.filterType.toLowerCase() == "source") {
                    this_6.selectedData.filterName = entry.filterName + " source";
                    if (entry.filterData != null) {
                        if (entry.filterData.length > 0)
                            this_6.selectedData.selectedValues = entry.filterData[0]["sourceName"];
                        else
                            this_6.selectedData.selectedValues = "Not available";
                    }
                    else
                        this_6.selectedData.selectedValues = "Not available";
                }
                else {
                    this_6.selectedData.selectedValues = entry.selectedData;
                }
                this_6.selectedFilters.push(this_6.selectedData);
            };
            var this_6 = this;
            var arr;
            for (var _e = 0, filterObject_4 = filterObject; _e < filterObject_4.length; _e++) {
                var entry = filterObject_4[_e];
                _loop_8(entry);
            }
        }
    };
    CropPriceComponent.prototype.ExportSubmit = function () {
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
                    this.datePipe = new common_1.DatePipe("en-US");
                    var Filters_1 = (this.selectedFilters.length > 0) ? 'Filters applied: ' : 'Filters applied: ' + this.cropType;
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
                            ChartHeaderDesc: Filters_1, ChartFooterDesc: '',
                            PageFooterDesc: global_util_1.GlobalUtil.getAppSession("UserInfo").userName + ' exported from AgriInsider on ' + _this.datePipe.transform(new Date(), 'dd MMMM yyyy')
                        };
                        _this.kpi[0] = {
                            name: filterdata[count_1].widgetName + ' - ' + _this.cropType,
                            data: obj,
                            CurrentChunk: count_1,
                            TotalChunks: FilesCount,
                            Size: "0",
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
    CropPriceComponent.prototype.onExportVisibleEmit = function (visible) {
        this.exportVisible = visible;
    };
    CropPriceComponent.prototype.loadScripts = function () {
        var node = document.createElement('script');
        node.src = global_config_1.GlobalConfig.tinyMceJs;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    };
    CropPriceComponent.prototype.editChartInsight = function (event, widgetId, insightData, richTextNumber) {
        var _this = this;
        var richTextBoxId = document.getElementById('richTextInsight' + richTextNumber);
        if (event.target.classList.contains('fa-pencil-square-o')) {
            if (tinymce.editors.length == 1) {
                alert('Only one insight can be modified at a time');
                return false;
            }
            this.snapshotDesc = insightData;
            var options = {
                height: '80',
                max_chars: '2000',
                selector: '#richTextInsight' + richTextNumber,
                menubar: false,
                statusbar: false,
                inline: true,
                plugins: ['link', 'paste'],
                toolbar: "undo redo | bold italic underline | link | alignleft aligncenter alignright | charmap",
                content_css: [global_config_1.GlobalConfig.bootstrapMin, global_config_1.GlobalConfig.styleCss],
                setup: function (editor) {
                    _this.editor = editor;
                    _this.editor.on('keyup', function (ev) {
                        _this.snapshotDesc = editor.getContent();
                        if (_this.snapshotDesc.length > editor.getParam('max_chars')) {
                            if (ev.keyCode != 8) {
                                alert('Max ' + editor.getParam('max_chars') + ' characters are allowed in richtext area.');
                                ev.preventDefault(); // backspace (8) / delete (46)
                                return false;
                            }
                        }
                    });
                    _this.editor.on('init', function () {
                        editor.setContent(_this.snapshotDesc != null ? _this.snapshotDesc : '');
                    });
                }
            };
            tinymce.init(options);
            //Change the edit button image.
            event.target.classList.add('fa-check-circle');
            event.target.classList.remove('fa-pencil-square-o');
            event.target.title = "Save changes";
            richTextBoxId.classList.add('richTextBoxStyle');
            richTextBoxId.classList.remove('insightScrollDisplay');
        }
        else if (event.target.classList.contains('fa-check-circle')) {
            if (this.editor.getContent().length > this.editor.getParam('max_chars')) {
                alert('Max ' + this.editor.getParam('max_chars') + ' characters are allowed in richtext area.');
                return false;
            }
            this.insightDetails.insightData = this.editor.getContent();
            this.insightDetails.widgetDetailId = widgetId.toString();
            this.chartService.updateInsightData(this.insightDetails).subscribe(function (result) {
                _this.data.widgets[richTextNumber].insightData = _this.insightDetails.insightData;
                _this.data.widgets[richTextNumber].insightLastUpdated = global_util_1.GlobalUtil.getFormattedDate();
            });
            tinymce.remove(this.editor);
            //Change the edit button image.
            event.target.classList.add('fa-pencil-square-o');
            event.target.classList.remove('fa-check-circle');
            event.target.title = "Add/Edit insight";
            richTextBoxId.classList.remove('richTextBoxStyle');
        }
        return true;
    };
    CropPriceComponent.prototype.ngOnDestroy = function () {
        tinymce.remove(this.editor);
    };
    CropPriceComponent.prototype.Reset = function (pagePopover) {
        var _this = this;
        this.loading = true;
        this.data.filters = null;
        this.submitVisible = false;
        this.submitMessage = "";
        this.chartService.getData(this.seriveParams)
            .subscribe(function (data) { _this.data.filters = data.pageDataMapper.filters; _this.loading = false; }, function (error) { return _this.errorMessage = error; });
    };
    __decorate([
        core_1.ViewChild('pagePopover'), 
        __metadata('design:type', ng2_popover_1.PopoverContent)
    ], CropPriceComponent.prototype, "pagePopover", void 0);
    CropPriceComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'crop-price.component.html'
        }), 
        __metadata('design:paramtypes', [chart_service_1.ChartService, core_1.ElementRef, Export_service_1.ExcelExportService])
    ], CropPriceComponent);
    return CropPriceComponent;
}());
exports.CropPriceComponent = CropPriceComponent;
//# sourceMappingURL=crop-price.component.js.map