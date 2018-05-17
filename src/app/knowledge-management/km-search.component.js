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
var km_search_upload_service_1 = require('./km-search-upload.service');
var global_config_1 = require('../global/global.config');
var global_util_1 = require('../global/global.util');
var KmSearchComponent = (function () {
    function KmSearchComponent(kmSearchService) {
        this.kmSearchService = kmSearchService;
        //kmSearchEndPoint: string = GlobalConfig.baseEndpont + GlobalConfig.kmSearchApi;
        this.KMRequest = {};
        this.KMSearchEndPoint = global_config_1.GlobalConfig.baseElasticEndPoint + global_config_1.GlobalConfig.elasticKMSearchEndpoint;
        this.searchItems = null;
        this.isAdmin = false;
        this.loading = false;
    }
    KmSearchComponent.prototype.ngOnInit = function () {
        this.isAdmin = (global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
    };
    KmSearchComponent.prototype.onSearchEmit = function (inputModel) {
        var _this = this;
        if (inputModel.isReset) {
            this.searchItems = null;
        }
        else {
            this.KMRequest.keyword = inputModel.keyword;
            this.KMRequest.docModules = inputModel.docModules;
            this.KMRequest.docRegions = inputModel.docRegions;
            this.KMRequest.docCountries = inputModel.docCountries;
            this.KMRequest.docCompetitors = inputModel.docCompetitors;
            this.KMRequest.uploadby = inputModel.uploadby;
            this.KMRequest.uploadedDateTime = inputModel.uploadedDateTime;
            this.KMRequest.publicationDate = inputModel.publicationDate;
            this.KMRequest.docType = inputModel.docType;
            this.KMRequest.docRestrictedGroup = inputModel.docRestrictedGroup;
            this.KMRequest.docTypeList = inputModel.documentTypeList;
            var kmPageSize = global_config_1.GlobalConfig.rowsPerPage;
            var kmSearchEndPoint = this.KMSearchEndPoint.replace("{0}", kmPageSize.toString()).replace("{1}", "1");
            this.loading = true;
            this.kmSearchService.post(kmSearchEndPoint, this.KMRequest)
                .subscribe(function (resItems) {
                //debugger;
                _this.searchItems = resItems;
                _this.pageSize = kmPageSize;
                setTimeout(function () {
                    document.getElementById('content').scrollIntoView();
                }, 200);
                _this.loading = false;
            }, function (error) {
                _this.loading = false;
            });
        }
    };
    KmSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-km-search',
            templateUrl: 'km-search.component.html',
            providers: [km_search_upload_service_1.KmSearchService]
        }), 
        __metadata('design:paramtypes', [km_search_upload_service_1.KmSearchService])
    ], KmSearchComponent);
    return KmSearchComponent;
}());
exports.KmSearchComponent = KmSearchComponent;
//# sourceMappingURL=km-search.component.js.map