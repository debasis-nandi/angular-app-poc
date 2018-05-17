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
var router_1 = require("@angular/router");
var upload_data_service_1 = require('./upload-data.service');
var global_config_1 = require('../../global/global.config');
var global_util_1 = require('../../global/global.util');
var UploadDataComponent = (function () {
    function UploadDataComponent(route, httpRequest) {
        this.route = route;
        this.httpRequest = httpRequest;
        this.isUpdate = false;
        this.pageDataEndPoint = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.uploadDataPageBindApi;
        this.maxUploadedFileSize = global_config_1.GlobalConfig.maxUploadedDataFileSize;
        this.uploadedFiles = [];
        this.model = {};
        this.loading = false;
    }
    UploadDataComponent.prototype.ngOnInit = function () {
        this.getPageData();
    };
    UploadDataComponent.prototype.getPageData = function () {
        var _this = this;
        this.httpRequest.get(this.pageDataEndPoint)
            .subscribe(function (resItems) {
            _this.model = resItems;
            _this.setAsDefault();
        });
    };
    UploadDataComponent.prototype.onUpload = function () {
        var _this = this;
        this.isValidPage = 1;
        this.moduleMsg = "";
        this.uploadFileMsg = "";
        this.successMsg = "";
        if (!this.model.moduleId || this.model.moduleId == 0) {
            this.moduleMsg = "You have to select a module first";
            this.isValidPage = 0;
        }
        if (this.uploadedFiles.length == 0) {
            this.uploadFileMsg = "You have to browse the file";
            this.isValidPage = 0;
        }
        if (this.isValidPage > 0) {
            var formData = new FormData();
            if (this.uploadedFiles.length > 0) {
                for (var _i = 0, _a = this.uploadedFiles; _i < _a.length; _i++) {
                    var file = _a[_i];
                    formData.append('files', file, file.name);
                }
            }
            var url = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.uploadDataFileApi;
            this.loading = true;
            this.userRegion = global_util_1.GlobalUtil.getAppSession("UserInfo").region;
            this.httpRequest.postUploadData(url, formData, this.model.moduleId, this.isUpdate, this.userRegion).subscribe(function (success) {
                _this.UploadStatus = success.status;
                if (success.status) {
                    _this.successMsgClass = { mandatory: false, green1: true };
                }
                else
                    _this.successMsgClass = { mandatory: true, green1: false };
                _this.successMsg = success.statusDescription; //success._body;
                //this.successMsg = "Success";
                _this.setAsDefault();
                _this.loading = false;
                //setTimeout(() => {
                //    this.successMsg = "";
                //}, 5000);
            }, function (error) {
                _this.successMsgClass = { mandatory: true, green1: false };
                _this.successMsg = "The file upload has failed";
                _this.loading = false;
                setTimeout(function () {
                    _this.successMsg = "";
                }, 5000);
            });
        }
    };
    UploadDataComponent.prototype.setAsDefault = function () {
        this.model.moduleId = 0;
        this.uploadedFiles = [];
        this.moduleMsg = "";
        this.uploadFileMsg = "";
    };
    UploadDataComponent.prototype.onCancel = function () {
        this.setAsDefault();
    };
    UploadDataComponent.prototype.onSelect = function (event) {
        this.uploadFileMsg = "";
        var isValidType = false;
        var isValidSize = false;
        for (var _i = 0, _a = event.files; _i < _a.length; _i++) {
            var file = _a[_i];
            isValidType = this.isFileTypeValid(file);
            isValidSize = this.isFileSizeValid(file);
            if (!isValidType) {
                this.uploadFileMsg = "You can only upload an excel file";
            }
            else if (!isValidSize) {
                this.uploadFileMsg = "You have uploaded an invalid file size.";
            }
            else {
                this.uploadedFiles = [];
                this.uploadedFiles.push(file);
            }
        }
    };
    UploadDataComponent.prototype.onFileDownload = function (fileName) {
        var a = window.document.createElement("a");
        a.href = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.uploadDataTemplateDownloadApi.replace("{0}", fileName);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    UploadDataComponent.prototype.onErroFileDownload = function (errorFileName) {
        var a = window.document.createElement("a");
        a.href = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.DownloadErroFileApi.replace("{0}", errorFileName);
        a.download = errorFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    UploadDataComponent.prototype.onRemove = function (event, index) {
        if (index != -1) {
            // remove file from batch.
            this.uploadedFiles.splice(index, 1);
        }
    };
    UploadDataComponent.prototype.isFileTypeValid = function (file) {
        var isValid = false;
        if (file) {
            var fileType = this.getFileExtension(file.name).toLowerCase();
            if (fileType == global_config_1.DocType.xls || fileType == global_config_1.DocType.xlsx) {
                isValid = true;
            }
        }
        return isValid;
    };
    UploadDataComponent.prototype.getFileExtension = function (filename) {
        return filename.split('.').pop();
    };
    UploadDataComponent.prototype.isFileSizeValid = function (file) {
        var isValid = false;
        if (file) {
            // check for indivisual file size
            if (file.size <= this.maxUploadedFileSize) {
                isValid = true;
            }
            else {
                isValid = false;
            }
        }
        return isValid;
    };
    UploadDataComponent.prototype.formatSize = function (bytes) {
        if (bytes == 0) {
            return '0 B';
        }
        var k = 1000, dm = 3, sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };
    UploadDataComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-upload-data',
            templateUrl: 'upload-data.component.html',
            styleUrls: ['upload-data.component.css'],
            providers: [upload_data_service_1.UploadDataService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, upload_data_service_1.UploadDataService])
    ], UploadDataComponent);
    return UploadDataComponent;
}());
exports.UploadDataComponent = UploadDataComponent;
//# sourceMappingURL=upload-data.component.js.map