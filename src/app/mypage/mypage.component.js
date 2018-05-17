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
var chart_service_1 = require('../widgets/charts/chart.service');
var common_1 = require('@angular/common');
var global_config_1 = require('../global/global.config');
var global_util_1 = require('../global/global.util');
var ng2_popover_1 = require('ng2-popover');
var Export_service_1 = require('../widgets/export/Export.service');
var MyPageComponent = (function () {
    function MyPageComponent(chartService, _ExcelExportService) {
        this.chartService = chartService;
        this._ExcelExportService = _ExcelExportService;
        this.pageName = global_config_1.Page.myPage.toString();
        this.paginator = false;
        this.pageLinks = 3;
        this.rowsPerPage = 5;
        this.rowsPerPageOptions = [5, 10, 20];
        this.responsive = true;
        this.clicked = true;
        this.loading = false;
        this.isAdmin = (global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
        this.insightDetails = {};
        this.selectedCropId = 0;
        this.filterObject = [];
        this.filterObjectArray = [];
        this.filterApi = [];
        this.exportObject = [];
        this.exportVisible = true;
        this.goodGrowthImagePath = global_config_1.GlobalConfig.mYPageGoodGrowth;
        this.homeTextImagePath = global_config_1.GlobalConfig.mYPageHomeText;
        this.noInsightText = global_config_1.Constants.noInsightText;
        this.noInsightDate = global_config_1.Constants.noInsightDate;
        this.widgetCount = 0;
        //submitVisible: boolean = false;
        //submitMessage: string = '';
        this.submitVisible = [false, false, false, false, false, false, false, false];
        this.submitMessage = ['', '', '', '', '', '', '', ''];
        this.seriveParams = { pageName: global_config_1.Page.myPage, companyId: 2, cropId: 0, selectedFilter: null, userId: global_util_1.GlobalUtil.getAppSession("UserInfo").userId, regionName: global_util_1.GlobalUtil.getAppSession("UserInfo").region, widgetId: 0 };
        this.kpi = [];
    }
    MyPageComponent.prototype.OnFavoriteSaved = function (widget) {
        for (var k = 0; k < this.data[0].exports[1].exportData.length; k++) {
            var cuurentChartName = this.data[0].exports[1].exportData[k];
            if (cuurentChartName.label === widget.widgetName) {
                this.data[0].exports[1].exportData.splice(k, 1);
            }
        }
        this.widgetCount = 0;
        for (var i = 0; i < this.data.length; i++) {
            var pd = this.data[i];
            for (var j = 0; j < pd.widgets.length; j++) {
                var w = pd.widgets[j];
                this.widgetCount++;
                if (w.widgetId === widget.widgetId && w.widgetName === widget.widgetName) {
                    this.data[i].widgets.splice(j, 1);
                    this.widgetCount--;
                }
            }
        }
    };
    MyPageComponent.prototype.GetChangedId = function (widgetKey) {
        var listOfWidgetIds = [];
        //for (let i = 0; i < this.data.length; i++) {
        //    let pd: IPageDataMapper = this.data[i];
        //    for (let j = 0; j < pd.widgets.length; j++) {
        //        let w = pd.widgets[j];
        //        if (widgetKey == w.widgetId) {
        //            filterdata.push(w);
        //        }
        //    }
        //}
        for (var i = 0; i < this.data[0].exports[1].exportData.length; i++) {
            var item = this.data[0].exports[1].exportData[i];
            var search = item.value;
            var count = listOfWidgetIds.reduce(function (n, val) {
                return n + (val === search);
            }, 0);
            if (count > 0) {
                item.value = item.value + count + parseInt("0000001");
            }
            listOfWidgetIds.push(item.value);
        }
        return 0;
    };
    MyPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.chartService.getData(this.seriveParams)
            .subscribe(function (data) {
            _this.data = data.pageDataMapper;
            for (var i = 0; i < _this.data.length; i++) {
                _this.widgetCount += _this.data[i].widgets.length;
            }
            var listOfWidgetIds = [];
            if (_this.data.length > 0) {
                for (var i = 0; i < _this.data[0].exports[1].exportData.length; i++) {
                    var item = _this.data[0].exports[1].exportData[i];
                    var search = item.value;
                    var count = listOfWidgetIds.reduce(function (n, val) {
                        return n + (val === search);
                    }, 0);
                    if (count > 0) {
                    }
                    _this.data[0].exports[1].exportData[i] = item;
                    listOfWidgetIds.push(item.value);
                }
            }
            global_util_1.GlobalUtil.setSession('favouriteCount', '' + _this.widgetCount.toString());
            _this.loading = false;
        }, function (error) { return _this.errorMessage = error; });
    };
    MyPageComponent.prototype.isInsightLastUpdatedVisible = function (currentInsightData) {
        if (this.currentInsightData != null && this.currentInsightData != "") {
            return true;
        }
        else {
            return false;
        }
    };
    MyPageComponent.prototype.onFilterEmit = function (filter, widgetId, cropId, competitorId) {
        //this.filterObject = this.filterObject.filter(x => x.filterName !== filter.filterName);
        //this.filterObject.push(filter);
        //let test = this.filterObjectArray[widgetId];
        //this.filterObjectArray[widgetId]
        var combineId = widgetId + "" + cropId + "" + competitorId;
        if (this.filterObjectArray[+combineId]) {
            this.filterObjectArray[+combineId] = this.filterObjectArray[+combineId].filter(function (x) { return x["filterName"] !== filter["filterName"]; });
            this.filterObjectArray[+combineId].push(filter);
        }
        else {
            this.filterObjectArray[+combineId] = [];
            this.filterObjectArray[+combineId] = this.filterObjectArray[+combineId].filter(function (x) { return x["filterName"] !== filter["filterName"]; });
            this.filterObjectArray[+combineId].push(filter);
        }
        //this.filterObjectArray[widgetId]=this.filterObject
        return true;
    };
    MyPageComponent.prototype.onSubmitEmit = function (visible, j) {
        this.submitVisible[j] = visible;
    };
    MyPageComponent.prototype.onSubmitMessageEmit = function (message, j) {
        this.submitMessage[j] = message;
    };
    MyPageComponent.prototype.FilterSubmit = function (pagePopover, pageName, cropId, competitorId, argWidgetId, index) {
        var _this = this;
        this.loading = true;
        var combineId = argWidgetId + "" + cropId + "" + competitorId;
        for (var _i = 0, _a = this.filterObjectArray[+combineId]; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry.filterName === 'View Data As' && entry.selectedData === 'Quarterly') {
                this.filterApi = this.filterObjectArray[+combineId].filter(function (x) { return x.filterName !== "PeriodYear"; });
                break;
            }
            else if (entry.filterName === 'View Data As' && entry.selectedData === 'Yearly') {
                this.filterApi = this.filterObjectArray[+combineId].filter(function (x) { return x.filterName !== "PeriodQuarter" && x.filterName !== "From Year" && x.filterName !== "To Year" && x.filterName !== "From Quarter" && x.filterName !== "To Quarter"; });
                break;
            }
            else {
                this.filterApi = this.filterObjectArray[+combineId];
                if (entry.filterName === "Crop") {
                    this.selectedCropName = entry.filterData[0]["label"];
                    this.selectedCropId = entry.filterData[0]["labelId"];
                }
            }
        }
        var newWidgetId = 0;
        if (cropId > 0) {
            newWidgetId = argWidgetId - cropId - 10000000;
        }
        else if (competitorId > 0) {
            newWidgetId = argWidgetId - competitorId - 10000000;
        }
        else {
            newWidgetId = argWidgetId;
        }
        var selectedValue = {
            pageName: pageName + "#" + global_config_1.Page.myPageWidgetFilter.toString(), companyId: competitorId,
            cropId: this.selectedCropId > 0 ? this.selectedCropId : cropId, selectedFilter: this.filterApi, widgetId: newWidgetId
        };
        this.chartService.getChartSpecificData(selectedValue)
            .subscribe(function (dataReturned) {
            for (var i = 0; i < _this.data.length; i++) {
                var pd = _this.data[i];
                for (var j = 0; j < pd.widgets.length; j++) {
                    var w = pd.widgets[j];
                    if (w.widgetId === argWidgetId && w.cropId === cropId && w.competitorId === competitorId && dataReturned.pageDataMapperFilterResult.widgets.length > 0) {
                        _this.widgetPrefix = _this.data[i].widgets[j].widgetName.substr(0, _this.data[i].widgets[j].widgetName.indexOf('-'));
                        //this.data[i].widgets[j].widgetId = dataReturned.pageDataMapperFilterResult.widgets[0].widgetId;
                        _this.data[i].widgets[j].widgetType = dataReturned.pageDataMapperFilterResult.widgets[0].widgetType;
                        _this.data[i].widgets[j].sortOrder = dataReturned.pageDataMapperFilterResult.widgets[0].sortOrder;
                        _this.data[i].widgets[j].cropId = cropId;
                        _this.data[i].widgets[j].competitorId = competitorId;
                        _this.data[i].widgets[j].chartComponentViewModel = dataReturned.pageDataMapperFilterResult.widgets[0].chartComponentViewModel;
                        _this.data[i].widgets[j].underlyingChartDataViewModel = dataReturned.pageDataMapperFilterResult.widgets[0].underlyingChartDataViewModel;
                        _this.data[i].widgets[j].sourceName = dataReturned.pageDataMapperFilterResult.widgets[0].sourceName;
                        _this.data[i].widgets[j].lastUpdated = dataReturned.pageDataMapperFilterResult.widgets[0].lastUpdated;
                        if (_this.widgetPrefix) {
                            _this.data[i].widgets[j].widgetName = _this.widgetPrefix + '- ' + dataReturned.pageDataMapperFilterResult.widgets[0].widgetName;
                        }
                        if (cropId > 0) {
                            var index_1 = dataReturned.pageDataMapperFilterResult.widgets[0].widgetName.indexOf('-');
                            if (index_1 < 0) {
                                _this.data[i].widgets[j].widgetName = _this.selectedCropName + ' - ' + dataReturned.pageDataMapperFilterResult.widgets[0].widgetName;
                            }
                            else {
                                _this.data[i].widgets[j].widgetName = _this.selectedCropName + ' ' + dataReturned.pageDataMapperFilterResult.widgets[0].widgetName.substr(index_1);
                            }
                        }
                        document.getElementById('graphBoxes').classList.add('width100');
                        document.getElementById(j.toString() + i.toString() + 'u').classList.remove('active');
                        document.getElementById(j.toString() + i.toString() + 'uActive').classList.remove('active');
                        document.getElementById(j.toString() + i.toString() + 'cActive').classList.add('active');
                        //console.log(this.data);
                        _this.loading = false;
                        return;
                    }
                    else if (w.widgetId === argWidgetId && w.cropId === cropId && w.competitorId === competitorId) {
                        //this.data[i].widgets[j].widgetId = argWidgetId;
                        //this.data[i].widgets[j].widgetId = this.data[i].widgets[j].widgetId;
                        _this.data[i].widgets[j].chartComponentViewModel = _this.emptyChartViewModelObject;
                        _this.data[i].widgets[j].underlyingChartDataViewModel = _this.emptyUnderlyingViewModelObject;
                        if (cropId > 0) {
                            var index_2 = _this.data[i].widgets[j].widgetName.indexOf('-');
                            if (index_2 < 0) {
                                _this.data[i].widgets[j].widgetName = _this.selectedCropName + ' - ' + _this.data[i].widgets[j].widgetName;
                            }
                            else {
                                _this.data[i].widgets[j].widgetName = _this.selectedCropName + ' ' + _this.data[i].widgets[j].widgetName.substr(index_2);
                            }
                        }
                        document.getElementById('graphBoxes').classList.add('width100');
                        document.getElementById(j.toString() + i.toString() + 'u').classList.remove('active');
                        document.getElementById(j.toString() + i.toString() + 'uActive').classList.remove('active');
                        document.getElementById(j.toString() + i.toString() + 'cActive').classList.add('active');
                    }
                }
            }
            _this.loading = false;
        }, function (error) { return _this.errorMessage = error; });
    };
    MyPageComponent.prototype.onExportEmit = function (exp) {
        this.exportObject = this.exportObject.filter(function (x) { return x.exportName !== exp.exportName; });
        this.exportObject.push(exp);
        return true;
    };
    MyPageComponent.prototype.ExportSubmit = function () {
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
            var filterdata = [];
            for (var i = 0; i < this.data.length; i++) {
                var pd = this.data[i];
                for (var j = 0; j < pd.widgets.length; j++) {
                    var w = pd.widgets[j];
                    if (selectedIds.indexOf(w.widgetId) >= 0) {
                        filterdata.push(w);
                    }
                }
            }
            //var filterdata = this.data.widgets.filter(function (e) { return selectedIds.indexOf(e.widgetId) >= 0; });
            for (index = 0; index < filterdata.length; ++index) {
                var filteredData = this._ExcelExportService.constructChartDataForExport(filterdata[index].underlyingChartDataViewModel.tableHeaders, filterdata[index].underlyingChartDataViewModel.tableRows);
                this.kpi[index] = { name: filterdata[index].widgetName, data: filteredData };
            }
            this.arrayFilterdata = { templateName: "Export", fileName: this.pageName, kpiData: this.kpi, exportAs: ExportAsData.selectedData };
            this._ExcelExportService.ExcelExportedFilePath(this.arrayFilterdata).subscribe(function (data) { _this.exportData = data; _this.loading = false; });
        }
        // for word export
        if (this.exportObject.length > 0) {
            if (ExportAsData.selectedData == 2 || ExportAsData.selectedData == 3) {
                if (InsightData.selectedData == "1") {
                    InsightData.selectedData = "2";
                }
                if (ChartData.selectedData.length > 0) {
                    this.kpi = [];
                    //var filterdata = this.data.widgets.filter(function (e) {
                    //    return ChartData.selectedData.indexOf(e.widgetId) >= 0;
                    //});
                    var filterdata = [];
                    var selectedIds = ChartData.selectedData;
                    for (var i = 0; i < this.data.length; i++) {
                        var pd = this.data[i];
                        for (var j = 0; j < pd.widgets.length; j++) {
                            var w = pd.widgets[j];
                            if (selectedIds.indexOf(w.widgetId) >= 0) {
                                filterdata.push(w);
                            }
                        }
                    }
                    var count_1 = 0;
                    this.datePipe = new common_1.DatePipe("en-US");
                    var FilesCount = ChartData.selectedData.length;
                    var loop_1 = function (key) {
                        var InsightNode = document.createElement('div');
                        for (var i = 0; i < filterdata.length; i++) {
                            var currentWidget = filterdata[i];
                            if (currentWidget.widgetId == key) {
                                InsightNode.innerHTML = currentWidget.insightData;
                            }
                        }
                        //InsightNode.innerHTML = filterdata.find(model => model.widgetId == key).insightData;
                        var obj = {
                            Image: onSubmitClick("chart-container-" + key), Insight: (InsightData.selectedData == "1") ? InsightNode.textContent : null,
                            ChartHeaderDesc: '',
                            PageFooterDesc: global_util_1.GlobalUtil.getAppSession("UserInfo").userName + ' exported from AgriInsider on ' + _this.datePipe.transform(new Date(), 'dd MMMM yyyy')
                        };
                        _this.kpi[0] = {
                            name: filterdata[count_1].widgetName,
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
    MyPageComponent.prototype.onExportVisibleEmit = function (visible) {
        this.exportVisible = visible;
    };
    __decorate([
        core_1.ViewChild('pagePopover'), 
        __metadata('design:type', ng2_popover_1.PopoverContent)
    ], MyPageComponent.prototype, "pagePopover", void 0);
    MyPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-page',
            templateUrl: 'mypage.component.html',
        }), 
        __metadata('design:paramtypes', [chart_service_1.ChartService, Export_service_1.ExcelExportService])
    ], MyPageComponent);
    return MyPageComponent;
}());
exports.MyPageComponent = MyPageComponent;
//# sourceMappingURL=mypage.component.js.map