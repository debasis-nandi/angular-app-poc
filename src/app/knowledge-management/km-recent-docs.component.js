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
var KmRecentDocsComponent = (function () {
    function KmRecentDocsComponent(kmSearchService) {
        this.kmSearchService = kmSearchService;
        this.KMSearchEndPoint = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.getRecentUploadedDocs;
        this.searchItems = null;
        this.searchItems1 = null;
        this.isAdmin = false;
        this.loading = false;
    }
    KmRecentDocsComponent.prototype.ngOnInit = function () {
        this.isAdmin = (global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
        this.getRecent();
    };
    KmRecentDocsComponent.prototype.loadFirstPage = function () {
        var pagination = document.getElementsByClassName('pagination')[0];
        if (pagination) {
            var active = pagination.getElementsByClassName('active')[0];
            if (active) {
                var k = active.getElementsByTagName('a')[0];
                if (k)
                    k.click();
            }
        }
    };
    KmRecentDocsComponent.prototype.getRecent = function () {
        var _this = this;
        this.loading = true;
        this.KMRequest = {};
        this.kmSearchService.getRecentDocs(this.KMSearchEndPoint)
            .subscribe(function (resItems) {
            var docs = JSON.parse(resItems);
            for (var i = 0; i < docs.length; i++) {
                docs[i]["DocModules"] = JSON.parse(docs[i]["DocModules"]);
                docs[i]["DocRegions"] = JSON.parse(docs[i]["DocRegions"]);
                docs[i]["DocCompetitors"] = JSON.parse(docs[i]["DocCompetitors"]);
                docs[i]["DocCountries"] = JSON.parse(docs[i]["DocCountries"]);
                docs[i]["DocRestrictedGroup"] = JSON.parse(docs[i]["DocRestrictedGroup"]);
            }
            _this.searchItems1 = {
                "elasticResponseData": [
                    {
                        "type": "knowledgemanagement",
                        "templateType": "other",
                        "typeName": "Knowledge Management",
                        "count": docs.length,
                        "data": docs
                    }
                ]
            };
            setTimeout(function () { return _this.loadFirstPage(); }, 2000);
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    KmRecentDocsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-km-recent-docs',
            templateUrl: 'km-recent-docs.component.html',
            providers: [km_search_upload_service_1.KmSearchService]
        }), 
        __metadata('design:paramtypes', [km_search_upload_service_1.KmSearchService])
    ], KmRecentDocsComponent);
    return KmRecentDocsComponent;
}());
exports.KmRecentDocsComponent = KmRecentDocsComponent;
//# sourceMappingURL=km-recent-docs.component.js.map