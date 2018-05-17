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
var global_config_1 = require('../../global/global.config');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/map');
require('rxjs/add/observable/of');
var http_1 = require('@angular/http');
var ExcelExportService = (function () {
    function ExcelExportService(http) {
        this.http = http;
        this.baseUrl = global_config_1.GlobalConfig.baseEndpointExport + global_config_1.GlobalConfig.ExcelExportAPI;
    }
    ExcelExportService.prototype.constructTabularDataForExport = function (tableHead, kpiData) {
        var visibleHeaders = tableHead.filter(function (header) { return header.isHidden == false || header.header.toLocaleLowerCase() == 'year'; });
        var filterdata = [];
        for (var i = 0; i < kpiData.length; i++) {
            var customObj = {};
            var rdata = kpiData[i];
            for (var j = 0; j < visibleHeaders.length; j++) {
                var rval = rdata[visibleHeaders[j].header];
                customObj[visibleHeaders[j].headerText] = rval !== null && rval !== undefined && typeof rval === 'string' ? rval.split("|")[0] : rval;
            }
            filterdata.push(customObj);
        }
        return filterdata;
    };
    ExcelExportService.prototype.constructChartDataForExport = function (tableHead, kpiData) {
        //let visibleHeaders: ITableHeader[] = tableHead.filter(header => header.isHidden == false || header.header.toLocaleLowerCase() == 'year');
        var filterdata = [];
        for (var i = 0; i < kpiData.length; i++) {
            var customObj = {};
            var rdata = kpiData[i];
            for (var j = 0; j < tableHead.length; j++) {
                var rval = rdata[tableHead[j].header];
                customObj[tableHead[j].headerText] = rval !== null && rval !== undefined && typeof rval === 'string' ? rval.split("|")[0] : rval;
            }
            filterdata.push(customObj);
        }
        return filterdata;
    };
    ExcelExportService.prototype.ExcelExportedFilePath = function (exportda) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl, exportda, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ExcelExportService.prototype.extractData = function (response) {
        var body = response.json();
        if (body != "") {
            var ext = body.substring(body.lastIndexOf('.') + 1, body.length);
            if (ext.toLowerCase() != "pdf") {
                window.open(global_config_1.GlobalConfig.baseDownLoadedEndPoint + body);
            }
            else {
                var a = window.document.createElement("a");
                a.href = global_config_1.GlobalConfig.baseEndpointExport + global_config_1.GlobalConfig.DownloadDocApi + "?FileName=" + body;
                a.download = body;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        }
        //return body || {};
        return body || Observable_1.Observable.of([]);
    };
    ExcelExportService.prototype.handleError = function (error) {
        console.log(error);
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    ExcelExportService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ExcelExportService);
    return ExcelExportService;
}());
exports.ExcelExportService = ExcelExportService;
//# sourceMappingURL=Export.service.js.map