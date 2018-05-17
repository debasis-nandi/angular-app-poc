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
var global_config_1 = require('../../global/global.config');
var paginator_service_1 = require('../paginator/paginator.service');
var km_search_upload_model_1 = require('../../knowledge-management/km-search-upload.model');
var global_util_1 = require('../../global/global.util');
var NewsKmTemplateComponent = (function () {
    function NewsKmTemplateComponent(pagerService, router) {
        this.pagerService = pagerService;
        this.router = router;
        this.isKMSearchComponent = false;
        this.showCustomPaging = false;
        this.pager = {};
        this.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.rowPerPage = global_config_1.GlobalConfig.rowsPerPage;
        this.maxCharLimit = global_config_1.GlobalConfig.maxCharLimit;
        this.hideToggle = true;
        this.isCollapsed = true;
        this.docpath = global_config_1.GlobalConfig.docdownloadlink;
        this.isAdmin = (global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
        this.userGroup = global_util_1.GlobalUtil.getAppSession("UserInfo").userGroup;
    }
    NewsKmTemplateComponent.prototype.ngOnInit = function () {
    };
    NewsKmTemplateComponent.prototype.ngOnChanges = function () {
        this.setPage(1, true);
    };
    NewsKmTemplateComponent.prototype.getDay = function (date) {
        if (date) {
            var dateObj = new Date(date);
            return dateObj.getDate();
        }
    };
    NewsKmTemplateComponent.prototype.getMonthYear = function (date) {
        if (date) {
            var dateObj = new Date(date);
            var month = this.monthNames[dateObj.getMonth()];
            var year = dateObj.getFullYear().toString();
            return month + ' ' + year;
        }
    };
    NewsKmTemplateComponent.prototype.getDocType = function (fileName) {
        //debugger;
        var fileType = global_util_1.GlobalUtil.getFileExtension(fileName);
        var docType = "";
        if (fileType) {
            switch (fileType.toLowerCase()) {
                case global_config_1.DocType.doc:
                case global_config_1.DocType.docx: {
                    docType = "fa fa-file-word-o green2 size20 marginR5";
                    break;
                }
                case global_config_1.DocType.xls:
                case global_config_1.DocType.xlsx: {
                    docType = "fa fa-file-excel-o green2 size20 marginR5";
                    break;
                }
                case global_config_1.DocType.pdf: {
                    docType = "fa fa-file-pdf-o green2 size20 marginR5";
                    break;
                }
                case global_config_1.DocType.ppt:
                case global_config_1.DocType.pptx: {
                    docType = "fa fa-file-powerpoint-o green2 size20 marginR5";
                    break;
                }
                case global_config_1.DocType.csv: {
                    docType = "fa fa-file-text-o green2 size20 marginR5";
                    break;
                }
                case global_config_1.DocType.png:
                case global_config_1.DocType.jpg:
                case global_config_1.DocType.jpeg:
                case global_config_1.DocType.gif: {
                    docType = "fa fa-file-image-o green2 size20 marginR5";
                    break;
                }
                case global_config_1.DocType.msg: {
                    docType = "fa fa-envelope-o green2 size20 marginR5";
                    break;
                }
                case global_config_1.DocType.txt: {
                    docType = "fa fa-file-text-o green2 size20 marginR5";
                    break;
                }
                default: {
                    docType = "fa fa-file-word-o green2 size20 marginR5";
                    break;
                }
            }
        }
        return docType;
    };
    NewsKmTemplateComponent.prototype.getDownloadPath = function (fileUniqueName, fileOriginalName, restrictedGroup) {
        if (restrictedGroup === void 0) { restrictedGroup = null; }
        var isAllowed = true;
        if (restrictedGroup && restrictedGroup.length > 0) {
            var isAdmin = (global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
            if (!isAdmin) {
                var userGroup = global_util_1.GlobalUtil.getAppSession("UserInfo").userGroup;
                if (userGroup && userGroup.length > 0) {
                    for (var count = 0; count < restrictedGroup.length; count++) {
                        var isExist = userGroup.filter(function (x) { return x.groupName == restrictedGroup[count]; }).length > 0 ? true : false;
                        if (isExist) {
                            isAllowed = true;
                            break;
                        }
                        else {
                            isAllowed = false;
                        }
                    }
                }
                else {
                    isAllowed = false; // user not map with any restricted group
                }
            }
        }
        if (isAllowed) {
            var a = window.document.createElement("a");
            a.href = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.kmSaveDownloadDocApi + "?FileUniqueName=" + fileUniqueName + "&FileOriginalName=" + fileOriginalName;
            a.download = fileOriginalName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        else {
            alert("Access Restricted!\nPlease write an email to the GlobalBI.AgriInsider@syngenta.com to receive this file.");
        }
    };
    NewsKmTemplateComponent.prototype.setPage = function (page, isFirstLoad) {
        var _this = this;
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.totalSize, page);
        // get current page of items
        if (isFirstLoad) {
            this.pagedItems = this.newsKmItems;
            this.pagedItems = this.pagedItems.filter(function (x) {
                if (x['DocRestrictedGroup'] != null && x['DocRestrictedGroup'].length > 0) {
                    if (_this.userGroup != null) {
                        if (_this.userGroup.some(function (r) { return x['DocRestrictedGroup'].indexOf(r["groupName"]) > -1; })) {
                            return x;
                        }
                    }
                }
                else {
                    return x;
                }
            });
        }
        else {
            if (this.isKMSearchComponent) {
                var pagingUrl = global_config_1.GlobalConfig.baseElasticEndPoint + global_config_1.GlobalConfig.elasticKMSearchEndpoint
                    .replace("{0}", global_config_1.GlobalConfig.rowsPerPage.toString())
                    .replace("{1}", page.toString())
                    .replace("{2}", this.typeName);
                this.pagerService.post(pagingUrl, this.KMRequest)
                    .subscribe(function (resItems) {
                    _this.pagedItems = resItems.elasticResponseData[0].data;
                    _this.pagedItems = _this.pagedItems.filter(function (x) {
                        if (x['DocRestrictedGroup'] != null && x['DocRestrictedGroup'].length > 0) {
                            if (_this.userGroup != null) {
                                if (_this.userGroup.some(function (r) { return x['DocRestrictedGroup'].indexOf(r["groupName"]) > -1; })) {
                                    return x;
                                }
                            }
                        }
                        else {
                            return x;
                        }
                    });
                });
            }
            else {
                var pagingUrl = global_config_1.GlobalConfig.baseElasticEndPoint + global_config_1.GlobalConfig.elasticTypeWiseSearchEndpoint
                    .replace("{0}", this.searchResultFor)
                    .replace("{1}", this.type)
                    .replace("{2}", global_config_1.GlobalConfig.rowsPerPage.toString())
                    .replace("{3}", page.toString());
                this.pagerService.get(pagingUrl).subscribe(function (resItems) {
                    if (resItems) {
                        _this.pagedItems = resItems.elasticResponseData[0].data;
                        _this.pagedItems = _this.pagedItems.filter(function (x) {
                            if (x['DocRestrictedGroup'] != null && x['DocRestrictedGroup'].length > 0) {
                                if (_this.userGroup != null) {
                                    if (_this.userGroup.some(function (r) { return x['DocRestrictedGroup'].indexOf(r["groupName"]) > -1; })) {
                                        return x;
                                    }
                                }
                            }
                            else {
                                return x;
                            }
                        });
                    }
                });
            }
        }
        //this.pagedItems = this.chartItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    NewsKmTemplateComponent.prototype.setCustomPage = function (page) {
        var _this = this;
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.newsKmItems.length, page);
        // get current page of items
        this.pagedItems = this.newsKmItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
        this.pagedItems = this.pagedItems.filter(function (x) {
            if (x['DocRestrictedGroup'] != null && x['DocRestrictedGroup'].length > 0) {
                if (_this.userGroup != null) {
                    if (_this.userGroup.some(function (r) { return x['DocRestrictedGroup'].indexOf(r["groupName"]) > -1; })) {
                        return x;
                    }
                }
            }
            else {
                return x;
            }
        });
    };
    NewsKmTemplateComponent.prototype.ngExpandText = function (index, id, event) {
        readmore(index, id);
    };
    NewsKmTemplateComponent.prototype.isAriaHidden = function (des) {
        var result = false;
        if (des != '') {
            if (des.length > this.maxCharLimit) {
                result = true;
            }
        }
        return result;
    };
    NewsKmTemplateComponent.prototype.isRestricted = function (restrictedGroup) {
        var isRes = false;
        if (restrictedGroup && restrictedGroup.length > 0) {
            isRes = true;
        }
        return isRes;
    };
    NewsKmTemplateComponent.prototype.getRestrictedDocType = function (fileName) {
        var fileType = global_util_1.GlobalUtil.getFileExtension(fileName);
        var docType = "";
        if (fileType) {
            switch (fileType.toLowerCase()) {
                case global_config_1.DocType.doc:
                case global_config_1.DocType.docx: {
                    docType = "fa fa-file-word-o orange size20 marginR5";
                    break;
                }
                case global_config_1.DocType.xls:
                case global_config_1.DocType.xlsx: {
                    docType = "fa fa-file-excel-o orange size20 marginR5";
                    break;
                }
                case global_config_1.DocType.pdf: {
                    docType = "fa fa-file-pdf-o orange size20 marginR5";
                    break;
                }
                case global_config_1.DocType.ppt:
                case global_config_1.DocType.pptx: {
                    docType = "fa fa-file-powerpoint-o orange size20 marginR5";
                    break;
                }
                case global_config_1.DocType.csv: {
                    docType = "fa fa-file-text-o orange size20 marginR5";
                    break;
                }
                case global_config_1.DocType.png:
                case global_config_1.DocType.jpg:
                case global_config_1.DocType.jpeg:
                case global_config_1.DocType.gif: {
                    docType = "fa fa-file-image-o orange size20 marginR5";
                    break;
                }
                case global_config_1.DocType.msg: {
                    docType = "fa fa-envelope-o orange size20 marginR5";
                    break;
                }
                default: {
                    docType = "fa fa-file-word-o orange size20 marginR5";
                    break;
                }
            }
        }
        return docType;
    };
    NewsKmTemplateComponent.prototype.showAlert = function () {
        alert("Access Restricted!\nPlease write an email to the GlobalBI.AgriInsider@syngenta.com to receive this file.");
    };
    NewsKmTemplateComponent.prototype.getArrayData = function (items) {
        var finalItems = '';
        if (items) {
            for (var count = 0; count < items.length; count++) {
                finalItems = finalItems + items[count] + ', ';
            }
        }
        finalItems = finalItems.replace(/,\s*$/, "");
        return finalItems;
    };
    NewsKmTemplateComponent.prototype.onEditDocument = function (id) {
        global_util_1.GlobalUtil.setSession("docId", id);
        this.router.navigate(['layout/kmupload/']);
    };
    NewsKmTemplateComponent.prototype.onDeleteDocument = function (id) {
        var _this = this;
        var confirmationMessage;
        confirmationMessage = "Are you sure, you want to delete?";
        var res = confirm(confirmationMessage);
        if (res) {
            var deleteUrl = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.kmDeleteDocumentApi;
            this.pagerService.delete(deleteUrl, id)
                .subscribe(function (result) {
                if (result == true) {
                    var index = _this.pagedItems.findIndex(function (x) { return x.Id == id; });
                    if (index != -1) {
                        _this.pagedItems.splice(index, 1);
                        alert("Record have been deleted successfully");
                    }
                }
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NewsKmTemplateComponent.prototype, "newsKmItems", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NewsKmTemplateComponent.prototype, "searchResultFor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], NewsKmTemplateComponent.prototype, "totalSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NewsKmTemplateComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NewsKmTemplateComponent.prototype, "typeName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], NewsKmTemplateComponent.prototype, "dataIndex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], NewsKmTemplateComponent.prototype, "isKMSearchComponent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], NewsKmTemplateComponent.prototype, "showCustomPaging", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', km_search_upload_model_1.KmSearchUploadModel)
    ], NewsKmTemplateComponent.prototype, "KMRequest", void 0);
    NewsKmTemplateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-news-km-template',
            templateUrl: 'news-km-template.component.html',
            providers: [paginator_service_1.PaginatorService]
        }), 
        __metadata('design:paramtypes', [paginator_service_1.PaginatorService, router_1.Router])
    ], NewsKmTemplateComponent);
    return NewsKmTemplateComponent;
}());
exports.NewsKmTemplateComponent = NewsKmTemplateComponent;
//# sourceMappingURL=news-km-template.component.js.map