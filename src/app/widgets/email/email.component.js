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
var email_service_1 = require('./email.service');
var global_config_1 = require('../../global/global.config');
var global_util_1 = require('../../global/global.util');
var chart_service_1 = require('../../widgets/charts/chart.service');
var EmailComponent = (function () {
    function EmailComponent(chartService, emailservice) {
        this.chartService = chartService;
        this.emailservice = emailservice;
        this._response = false;
        this.selectedFilters = [];
        this.show = true;
        this.Data = {
            dataType: "", name: "", subject: "", description: "", worldMapImageData: "",
            documenturl: "", sourceurl: "", chartData: null, newsData: null, documentData: null, competitorName: "",
            source: "", lastUpdated: "", firstName: "", lastName: "", selectedFilters: ""
        };
        this.ChartData = { chartName: "", userName: "", toUserName: "", roleId: null };
        this.NewsData = { title: "", description: "", subNewsType: "", sourceName: "", publishedDate: null };
        this.DocumentData = { title: "", description: "", documentName: "" };
    }
    EmailComponent.prototype.ngOnInit = function () {
    };
    // on share button click
    EmailComponent.prototype.Submit = function () {
        var _this = this;
        if (this.Data.name == "") {
            this.errorMsg = "Email address is mandatory";
            this.index = "1";
            setTimeout(function () {
                _this.errorMsg = "";
                _this.index = "0";
            }, 3000);
            return null;
        }
        else {
            var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            this.EmailVal = expr.test(this.Data.name);
            if (!this.EmailVal) {
                this.errorMsg = "You have provided an invalid email address";
                this.index = "1";
                setTimeout(function () {
                    _this.errorMsg = "";
                    _this.index = "0";
                }, 3000);
                return null;
            }
            else {
                var mailTrail = this.Data.name.substring(this.Data.name.indexOf("@") + 1, this.Data.name.length);
                if (mailTrail.toLowerCase() != global_config_1.GlobalConfig.mailAddressTrail.toLowerCase()) {
                    this.errorMsg = "Email address should belong to the domain @syngenta.com";
                    this.index = "1";
                    setTimeout(function () {
                        _this.errorMsg = "";
                        _this.index = "0";
                    }, 3000);
                }
            }
        }
        if (this.Data.subject == "") {
            this.errorMsg = "Subject is mandatory";
            this.index = "2";
            setTimeout(function () {
                _this.errorMsg = "";
                _this.index = "0";
            }, 3000);
            return null;
        }
        if (this.errorMsg == undefined || this.errorMsg == "") {
            var id;
            //this.ChartData.chartName = this.ChartName;
            this.ChartData.chartName = (this.ChartObject != null) ? this.ChartObject.widgetName : this.ChartName;
            this.ChartData.userName = global_util_1.GlobalUtil.getAppSession("UserInfo").email;
            this.ChartData.roleId = global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0];
            this.Data.chartData = this.ChartData;
            this.Data.firstName = global_util_1.GlobalUtil.getAppSession("UserInfo").firstName;
            this.Data.lastName = global_util_1.GlobalUtil.getAppSession("UserInfo").lastName;
            var Filters = (this.selectedFilters.length > 0) ? 'Filters applied: ' : '';
            if (this.selectedFilters != null) {
                if (this.selectedFilters.length > 0) {
                    for (var _i = 0, _a = this.selectedFilters; _i < _a.length; _i++) {
                        var item = _a[_i];
                        Filters = Filters.concat('<strong>').concat(item.filterName).concat('</strong>').concat(': ').concat(item.selectedValues).concat('; ');
                    }
                }
            }
            this.Data.selectedFilters = Filters;
            this.Data.competitorName = this.CompetitorName != undefined ? this.CompetitorName : '';
            if (this.DataType === "Chart") {
                this.Data.dataType = this.DataType;
                this.Data.worldMapImageData = onSubmitClick("chart-container-" + ((this.ChartObject != null) ? this.ChartObject.widgetId : ''));
                this.Data.lastUpdated = (this.ChartObject != null) ? this.ChartObject.lastUpdated : '';
                this.Data.source = (this.ChartObject != null) ? this.ChartObject.sourceName : '';
            }
            else if (this.DataType == "News") {
                this.Data.dataType = this.DataType;
                this.NewsData.title = this.Title;
                this.NewsData.description = this.Description;
                this.NewsData.subNewsType = this.SubNewsType;
                this.NewsData.sourceName = this.Name;
                this.NewsData.publishedDate = this.SharedDate;
                this.Data.sourceurl = this.SourceUrl;
                this.Data.newsData = this.NewsData;
            }
            else if (this.DataType == "Document") {
                this.Data.dataType = this.DataType;
                this.DocumentData.title = this.Title;
                this.DocumentData.description = this.Description;
                this.DocumentData.documentName = this.Name;
                this.Data.documenturl = this.SourceUrl;
                this.Data.documentData = this.DocumentData;
            }
            //console.log(this.Data);
            this.emailservice.sendMail(this.Data)
                .subscribe(function (data) {
                _this._response = data,
                    _this.errorMsg = "Mail has been sent successfully";
                _this.index = "0";
                setTimeout(function () {
                    _this.errorMsg = "";
                    _this.index = "0";
                    _this.Data.name = "";
                    _this.Data.subject = "";
                    _this.Data.description = "";
                    _this.Data.worldMapImageData = "";
                    _this.Data.sourceurl = "";
                    _this.Data.documenturl = "";
                    _this.Data.newsData = null;
                    _this.Data.documentData = null;
                    var s = document.querySelectorAll('div.toggleContentShare');
                    if (s) {
                        if (s.length > 0) {
                            for (var i = 0; i < s.length; i++) {
                                s[i].style.display = 'none';
                            }
                        }
                    }
                }, 4000);
            });
        }
    };
    EmailComponent.prototype.ngOnChanges = function () {
        this.errorMsg = "";
        this.Data.name = "";
        this.Data.subject = "";
        this.Data.description = "";
        this.Data.worldMapImageData = "";
        this.Data.sourceurl = "";
        this.Data.documenturl = "";
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], EmailComponent.prototype, "DataType", void 0);
    __decorate([
        // to decide the type of data to export such as fusion charts , news link , document link.
        core_1.Input(), 
        __metadata('design:type', Number)
    ], EmailComponent.prototype, "ChartID", void 0);
    __decorate([
        // ID for the chart component in case of multiple rows
        core_1.Input(), 
        __metadata('design:type', String)
    ], EmailComponent.prototype, "ChartName", void 0);
    __decorate([
        // for concatenating with the file name
        core_1.Input(), 
        __metadata('design:type', String)
    ], EmailComponent.prototype, "SourceUrl", void 0);
    __decorate([
        // for exporting the news & document link 
        core_1.Input(), 
        __metadata('design:type', String)
    ], EmailComponent.prototype, "Title", void 0);
    __decorate([
        // for exporting the title
        core_1.Input(), 
        __metadata('design:type', String)
    ], EmailComponent.prototype, "Description", void 0);
    __decorate([
        // for exporting the title
        core_1.Input(), 
        __metadata('design:type', String)
    ], EmailComponent.prototype, "SubNewsType", void 0);
    __decorate([
        // for exporting the title
        core_1.Input(), 
        __metadata('design:type', String)
    ], EmailComponent.prototype, "Name", void 0);
    __decorate([
        // for exporting the Name such as Document name etc
        core_1.Input(), 
        __metadata('design:type', String)
    ], EmailComponent.prototype, "CompetitorName", void 0);
    __decorate([
        //for News CompetitorName would be as per defined in News CompetitorName parameter
        core_1.Input(), 
        __metadata('design:type', Date)
    ], EmailComponent.prototype, "SharedDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EmailComponent.prototype, "ChartObject", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EmailComponent.prototype, "selectedFilters", void 0);
    EmailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-email',
            templateUrl: 'email.component.html'
        }), 
        __metadata('design:paramtypes', [chart_service_1.ChartService, email_service_1.EmailService])
    ], EmailComponent);
    return EmailComponent;
}());
exports.EmailComponent = EmailComponent;
//# sourceMappingURL=email.component.js.map