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
var global_util_1 = require('../../global/global.util');
var global_config_1 = require('../../global/global.config');
var favourites_service_1 = require('../favourites/favourites.service');
var ActionComponent = (function () {
    function ActionComponent(_favouritesService, router) {
        this._favouritesService = _favouritesService;
        this.router = router;
        this.FavoriteSaved = new core_1.EventEmitter();
    }
    ActionComponent.prototype.onFavouriteClick = function () {
        var _this = this;
        var _isFavourite;
        var confirmationMessage;
        var favouriteCount;
        var favoriteLimit = 8;
        if (this.actionObject.iconClass == 'fa fa-heart-o' && this.PageName !== global_config_1.Page.myPage) {
            _isFavourite = true;
            confirmationMessage = "Are you sure, you want to mark it as favourite.";
        }
        else {
            _isFavourite = false;
            confirmationMessage = "Are you sure, you want to unmark this as favourite?";
        }
        //start maintain session
        var filterType = null;
        var fromYear = null;
        var toYear = null;
        var fromQuarter = null;
        var toQuarter = null;
        if (this.selectedFilter && this.selectedFilter.length > 0) {
            var vdata = this.selectedFilter.filter(function (a) { return a.filterName === "View Data As"; })[0];
            filterType = vdata.selectedData;
            if (this.deafultQuarterValues && this.deafultQuarterValues.length > 0) {
                fromYear = this.deafultQuarterValues[0].filterData.filter(function (k) { return k["filterName"] == "From Year"; })[0]["selectedData"];
                toYear = this.deafultQuarterValues[0].filterData.filter(function (k) { return k["filterName"] == "To Year"; })[0]["selectedData"];
                fromQuarter = this.deafultQuarterValues[0].filterData.filter(function (k) { return k["filterName"] == "From Quarter"; })[0]["selectedData"];
                toQuarter = this.deafultQuarterValues[0].filterData.filter(function (k) { return k["filterName"] == "To Quarter"; })[0]["selectedData"];
            }
        }
        if (_isFavourite) {
            var userId = global_util_1.GlobalUtil.getAppSession('UserInfo').userId;
            var CropId = (this.PageName == global_config_1.Page.cropIndicatorOverview || this.PageName == global_config_1.Page.cropIndicatorUSPrice) ? global_util_1.GlobalUtil.getSession('CropId') : this.favouriteObject.cropId;
            var CompetitorId = (this.PageName == global_config_1.Page.ciFinancials || this.PageName == global_config_1.Page.ciFinancialsRatio || this.PageName == global_config_1.Page.competitorComparison) ? global_util_1.GlobalUtil.getSession('CompetitorId') : this.favouriteObject.competitorId;
            this._favouritesService.saveFavourites({
                pageName: this.PageName,
                userId: userId,
                widgetId: this.favouriteObject.realWidgetIdForMyPage,
                widgetName: this.favouriteObject.widgetName,
                isFavourite: _isFavourite,
                cropId: CropId,
                competitorId: CompetitorId,
                isFavouriteCount: true,
                filterType: filterType,
                fromYear: fromYear,
                toYear: toYear,
                fromQuarter: fromQuarter,
                toQuarter: toQuarter
            }).subscribe(function (resp) {
                if (+resp >= +favoriteLimit) {
                    alert("Only " + favoriteLimit + " favorites can be added to 'My Page'");
                    return false;
                }
                else {
                    var userId_1 = global_util_1.GlobalUtil.getAppSession('UserInfo').userId;
                    var CropId_1 = (_this.PageName == global_config_1.Page.cropIndicatorOverview || _this.PageName == global_config_1.Page.cropIndicatorUSPrice) ? global_util_1.GlobalUtil.getSession('CropId') : _this.favouriteObject.cropId;
                    var CompetitorId_1 = (_this.PageName == global_config_1.Page.ciFinancials || _this.PageName == global_config_1.Page.ciFinancialsRatio || _this.PageName == global_config_1.Page.competitorComparison) ? global_util_1.GlobalUtil.getSession('CompetitorId') : _this.favouriteObject.competitorId;
                    if (_isFavourite) {
                        //set as favorite
                        _this.actionObject.iconClass = 'glyphicon glyphicon-heart'; //glyphicon glyphicon-heart
                        _this._favouritesService.saveFavourites({
                            pageName: _this.PageName,
                            userId: userId_1,
                            widgetId: _this.favouriteObject.realWidgetIdForMyPage,
                            widgetName: _this.favouriteObject.widgetName,
                            isFavourite: _isFavourite,
                            cropId: CropId_1 ? parseInt(CropId_1) : null,
                            competitorId: CompetitorId_1 ? parseInt(CompetitorId_1) : null,
                            isFavouriteCount: false,
                            filterType: filterType,
                            fromYear: fromYear,
                            toYear: toYear,
                            fromQuarter: fromQuarter,
                            toQuarter: toQuarter
                        }).subscribe(function (res) {
                            _this.actionObject.iconClass = 'glyphicon glyphicon-heart'; //glyphicon glyphicon-heart
                        });
                    }
                }
            });
        }
        else if (!_isFavourite) {
            //set as unfavorite
            var res = confirm(confirmationMessage);
            if (res) {
                var userId = global_util_1.GlobalUtil.getAppSession('UserInfo').userId;
                var CropId = (this.PageName == global_config_1.Page.cropIndicatorOverview || this.PageName == global_config_1.Page.cropIndicatorUSPrice) ? global_util_1.GlobalUtil.getSession('CropId') : this.favouriteObject.cropId;
                var CompetitorId = (this.PageName == global_config_1.Page.ciFinancials || this.PageName == global_config_1.Page.ciFinancialsRatio || this.PageName == global_config_1.Page.competitorComparison) ? global_util_1.GlobalUtil.getSession('CompetitorId') : this.favouriteObject.competitorId;
                this.actionObject.iconClass = 'fa fa-heart-o';
                this._favouritesService.saveFavourites({
                    pageName: this.PageName,
                    userId: userId,
                    widgetId: this.favouriteObject.realWidgetIdForMyPage,
                    widgetName: this.favouriteObject.widgetName,
                    isFavourite: _isFavourite,
                    cropId: CropId,
                    competitorId: CompetitorId,
                    isFavouriteCount: false,
                    filterType: filterType,
                    fromYear: fromYear,
                    toYear: toYear,
                    fromQuarter: fromQuarter,
                    toQuarter: toQuarter
                }).subscribe(function (res) {
                    _this.FavoriteSaved.emit({ widgetId: _this.favouriteObject.widgetId, widgetName: _this.favouriteObject.widgetName });
                });
            }
        }
    };
    ActionComponent.prototype.CprSubmit = function () {
        this.router.navigate(['layout/kmsearch', { para: this.getPageModuleId(), doctype: 'CPR' }]);
    };
    ActionComponent.prototype.getPageModuleId = function () {
        return global_util_1.GlobalUtil.getSession("PageModuleId");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ActionComponent.prototype, "actionObject", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ActionComponent.prototype, "favouriteObject", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ActionComponent.prototype, "selectedFilter", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ActionComponent.prototype, "PageName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ActionComponent.prototype, "UserId", void 0);
    __decorate([
        //
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ActionComponent.prototype, "deafultQuarterValues", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ActionComponent.prototype, "FavoriteSaved", void 0);
    ActionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-action',
            templateUrl: 'action.component.html',
            providers: [favourites_service_1.FavouritesService]
        }), 
        __metadata('design:paramtypes', [favourites_service_1.FavouritesService, router_1.Router])
    ], ActionComponent);
    return ActionComponent;
}());
exports.ActionComponent = ActionComponent;
//# sourceMappingURL=action.component.js.map