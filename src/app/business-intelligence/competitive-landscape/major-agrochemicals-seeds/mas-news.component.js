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
var global_config_1 = require('../../../global/global.config');
var global_util_1 = require('../../../global/global.util');
var mas_news_service_1 = require('./mas-news.service');
var Export_service_1 = require('../../../widgets/export/Export.service');
var MASNewsComponent = (function () {
    function MASNewsComponent(service, route, _ExcelExportService, router) {
        this.service = service;
        this.route = route;
        this._ExcelExportService = _ExcelExportService;
        this.router = router;
        this.seriveParams = { pageName: global_config_1.Page.ciNews, companyId: global_util_1.GlobalUtil.getSession("CompetitorId"), cropId: 0, selectedFilter: null };
        this.tabularViewModel = {
            widget: [],
            tableHead: [],
            actions: [],
            filters: [],
            ciNewsData: []
        };
        this.kpi = [];
        this.exportObject = [];
        this.loading = false;
        this.myDateRangePickerOptions = {
            dateFormat: 'dd-mm-yyyy'
        };
        this.myDatePickerOptions = {
            dateFormat: 'dd-mm-yyyy',
        };
        this.exportedData = [];
        this.Data = [];
    }
    MASNewsComponent.prototype.ngOnInit = function () {
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
    MASNewsComponent.prototype.OnSourceUrlClick = function (url, news_id, event) {
        var _this = this;
        event.preventDefault();
        this.loading = true;
        this.service.getUrlInfo(url).subscribe(function (res) {
            _this.loading = false;
            if (res.isUrlValid == true) {
                window.open(url, '_blank');
            }
            else if (res.isUrlValid == false) {
                var newsLinkItem = _this.ciNewsData.filter(function (x) { return x.id == news_id; });
                if (newsLinkItem.length == 1) {
                    if (res.urlStatus == "404" || res.urlStatus == "NotFound") {
                        alert('The page no longer exists');
                    }
                    else if (res.urlStatus == "502" || res.urlStatus == "BadGateway" || res.urlStatus == "503" || res.urlStatus == "ServiceUnavailable") {
                        // window.open(url, '_blank');
                        alert('The page no longer exists');
                    }
                    else {
                        alert('The page no longer exists');
                    }
                }
                else {
                    window.open(url, '_blank');
                }
            }
        }, function (err) {
            _this.loading = false;
            window.open(url, '_blank');
        });
    };
    MASNewsComponent.prototype.getPageData = function () {
        var _this = this;
        this.ciNewsData = [];
        this.service.getPageData(this.seriveParams).subscribe(function (result) {
            _this.tabularViewModel = result;
            _this.ciNewsData = _this.tabularViewModel.ciNewsData;
            if (_this.ciNewsData.length > 0) {
                var first = _this.ciNewsData[0].typeId;
                _this.commonFilter(first);
            }
            _this.loading = false;
        });
    };
    MASNewsComponent.prototype.ngExpands = function (index, id) {
        this.newsFilter(id);
    };
    MASNewsComponent.prototype.commonFilter = function (id) {
        this.filternewsData = this.ciNewsData.filter(function (item, index, array) {
            if (item.typeId === id) {
                return item;
            }
        });
    };
    MASNewsComponent.prototype.newsFilter = function (id) {
        this.filternewsData = this.ciNewsData;
        this.filternewsData = this.filternewsData.filter(function (item, index, array) {
            if (item.typeId === id) {
                return item;
            }
        });
    };
    MASNewsComponent.prototype.ngExpandText = function (index, id, event) {
        readmore(index, id);
        this.id = id;
    };
    MASNewsComponent.prototype.onExportEmit = function (exp) {
        this.exportObject = this.exportObject.filter(function (x) { return x.exportName !== exp.exportName; });
        this.exportObject.push(exp);
        return true;
    };
    MASNewsComponent.prototype.ExportSubmit = function () {
        var _this = this;
        this.loading = true;
        var ExportAsData = this.exportObject.find(function (model) { return model.exportName == "Export As"; });
        var ChartData = this.exportObject.find(function (model) { return model.exportName == "Chart Names"; });
        var InsightData = this.exportObject.find(function (model) { return model.exportName == "Insights"; });
        if (ExportAsData.selectedData == 1) {
            this.exportedData = [];
            for (var item in this.ciNewsData) {
                this.exportedData[item] = {
                    'News Type': this.ciNewsData[item]['name'],
                    'Sub News Type': this.ciNewsData[item]['subNewsType'],
                    Title: this.ciNewsData[item]['title'],
                    Description: this.ciNewsData[item]['description'],
                    Source: this.ciNewsData[item]['sourceName'],
                    'Source Link': this.ciNewsData[item]['sourceLink'],
                    'Published Date': this.ciNewsData[item]['publishedDate']
                };
            }
            this.kpi[0] = { name: "News", data: this.exportedData };
            this.arrayFilterdata = { templateName: "Export", fileName: "News" + "_" + (global_util_1.GlobalUtil.getAppSession("UserInfo") ? global_util_1.GlobalUtil.getAppSession("UserInfo").userName.split('@')[0].split('.')[0] : ""), kpiData: this.kpi, exportAs: ExportAsData.selectedData };
            this._ExcelExportService.ExcelExportedFilePath(this.arrayFilterdata).subscribe(function (data) { _this.exportData = data; _this.loading = false; });
        }
    };
    MASNewsComponent.prototype.onReset = function () {
        this.topublicationDate = null;
        this.fromPublicationDate = null;
        this.getPageData();
    };
    MASNewsComponent.prototype.getPublicationDate = function (selectedDate) {
        var reggie = /(\d{4})-(\d{2})-(\d{2})/;
        var dateArray = reggie.exec(selectedDate);
        var dateObject = new Date((+dateArray[1]), ((+dateArray[2])) - 1, // Careful, month starts at 0!
        (+dateArray[3]));
        return dateObject;
    };
    MASNewsComponent.prototype.removeDuplicates = function (originalArray, prop) {
        var newArray = [];
        var lookupObject = {};
        for (var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }
        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    };
    MASNewsComponent.prototype.onSave = function () {
        var _this = this;
        if (this.fromPublicationDate == null) {
            this.publicationDateeMsg = "Please select a 'from' date";
            setTimeout(function () {
                _this.publicationDateeMsg = "";
            }, 3000);
            return null;
        }
        if (this.topublicationDate == null) {
            this.publicationDateeMsg = "Please select a 'to' date";
            setTimeout(function () {
                _this.publicationDateeMsg = "";
            }, 3000);
            return null;
        }
        var ldate = this.fromPublicationDate["formatted"].split("-").reverse().join("-");
        var rdate = this.topublicationDate["formatted"].split("-").reverse().join("-");
        var leftdate = this.getPublicationDate(ldate);
        var rightdate = this.getPublicationDate(rdate);
        //let leftdate = this.fromPublicationDate['formatted'];
        //let rightdate = this.topublicationDate['formatted'];
        if (leftdate > rightdate) {
            this.publicationDateeMsg = "'From' date cannot be greater than the 'to' date";
            setTimeout(function () {
                _this.publicationDateeMsg = "";
            }, 3000);
            return null;
        }
        if (this.publicationDateeMsg == "" || this.publicationDateeMsg == undefined) {
            this.loading = true;
            this.service.getPageData(this.seriveParams).subscribe(function (result) {
                _this.tabularViewModel = result;
                _this.ciNewsData = _this.tabularViewModel.ciNewsData;
                if (_this.ciNewsData.length > 0) {
                    var first = _this.ciNewsData[0].typeId;
                    _this.commonFilter(first);
                }
                var _self = _this;
                _self.Data = [];
                _this.ciNewsData = _this.ciNewsData.filter(function (item, index, array) {
                    var update = item['publishedDate'];
                    //                    let uploadeddate = item['uploadedDate'].split("-").reverse().join("-");
                    //let fromdate = _self.fromPublicationDate['formatted'];
                    //let todate = _self.topublicationDate['formatted'];
                    var uploadeddate = _self.getPublicationDate(update);
                    if ((leftdate <= uploadeddate) && (uploadeddate <= rightdate)) {
                        var _data = { newsTypeId: item.typeId, newsTypeName: item['name'] };
                        _self.Data.push(_data);
                        return true;
                    }
                });
                // removing duplicate values 
                var valData = _self.removeDuplicates(_self.Data, "newsTypeId");
                _this.ciNewsData.forEach(function (item, index, array) {
                    item.listnewstype = valData;
                });
                _this.filternewsData = [];
                _this.filternewsData = _this.ciNewsData;
                _this.loading = false;
            });
        }
    };
    MASNewsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-masnews',
            templateUrl: 'mas-news.component.html',
            providers: [mas_news_service_1.MASNewsService]
        }), 
        __metadata('design:paramtypes', [mas_news_service_1.MASNewsService, router_1.ActivatedRoute, Export_service_1.ExcelExportService, router_1.Router])
    ], MASNewsComponent);
    return MASNewsComponent;
}());
exports.MASNewsComponent = MASNewsComponent;
//# sourceMappingURL=mas-news.component.js.map