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
var subscription_service_1 = require('./subscription.service');
var global_util_1 = require('../global/global.util');
var modal_component_1 = require('../widgets/modals/modal.component');
var SubscriptionComponent = (function () {
    function SubscriptionComponent(subscriptionService) {
        this.subscriptionService = subscriptionService;
        this.loading = false;
        this.isUpdate = false;
        this.confirmHeader = "Subscription";
        this.confirmDescription = "Are you sure, you want to remove this subscription?";
        this.modalclasses = {
            csModalDialog: null,
            csModalBody: "animated fadeInDown"
        };
        this.statusClass = {
            green1: true,
            mandatory: false
        };
        this.isConfirm = true;
        this.userSubscription = null;
        this.tabularViewModel = {
            kpiData: [],
            kpiSourceData: [],
            financialSummery: []
        };
        this.showStatus = false;
        this.filterData = {
            modules: null,
            crops: null,
            competitors: null,
            regions: null,
            countries: null,
            territories: null
        };
        this.completefilterData = {
            modules: null,
            crops: null,
            competitors: null,
            regions: null,
            countries: null,
            territories: null
        };
    }
    SubscriptionComponent.prototype.setFilterDefaults = function (moduleId) {
        var _this = this;
        this.userSubscription = {
            userId: global_util_1.GlobalUtil.getAppSession("UserInfo").userId,
            moduleId: null,
            cropId: null,
            competitorId: null,
            regionId: null,
            countryId: null,
            territoryId: null,
            isActive: true,
            emailNotification: false
        };
        this.userSubscription.moduleId = (+moduleId);
        this.userSubscription.competitorId = 0; //except Competitive Landscape
        this.userSubscription.cropId = 0; //except Crop Economics
        this.userSubscription.territoryId = 0; //except Crop Economics
        var r;
        switch (moduleId) {
            case "4":
                this.userSubscription.cropId = this.filterData.crops[0]["labelId"];
                r = this.filterData.regions[0]["labelId"]; //except Competitive Landscape
                this.onRegionChange(r.toString());
                break;
            case "6":
                r = this.filterData.regions[0]["labelId"]; //except Competitive Landscape
                this.onRegionChange(r.toString());
                break;
            case "9":
                this.userSubscription.competitorId = this.filterData.competitors[0]["labelId"];
                this.userSubscription.regionId = 0;
                this.userSubscription.countryId = 0;
                break;
            case "13":
                r = this.filterData.regions[0]["labelId"]; //except Competitive Landscape
                this.onRegionChange(r.toString());
                break;
            case "15":
                r = this.filterData.regions[0]["labelId"]; //except Competitive Landscape
                this.onRegionChange(r.toString());
                break;
        }
        if (this.isUpdate) {
            var i = this.tabularViewModel.kpiSourceData.filter(function (x) { return x.id == _this.subscriptionId; });
            var sub = i[0];
            if (sub.regionId == null || sub.regionId == 0) {
                sub.regionId = 0;
            }
            else {
                this.onRegionChange(sub.regionId.toString());
            }
            if (sub.territoryId == null || sub.territoryId == 0) {
                sub.territoryId = 0;
            }
            else {
                this.onTerritoryChange(sub.territoryId.toString());
            }
            if (sub.countryId == null) {
                sub.countryId = 0;
            }
            if (sub.cropId == null) {
                sub.cropId = 0;
            }
            if (sub.competitorId == null) {
                sub.competitorId = 0;
            }
            this.userSubscription = { userId: sub.userId, moduleId: sub.moduleId, cropId: sub.cropId, competitorId: sub.competitorId, regionId: sub.regionId, territoryId: sub.territoryId, countryId: sub.countryId, emailNotification: sub.emailNotification, id: sub.id, isActive: sub.isActive, moduleName: sub.moduleName, notificationFor: sub.notificationFor };
        }
        else {
        }
        if (this.showStatus) {
            this.statusDesc = this.statusText;
            this.statusClass.green1 = true;
            this.statusClass.mandatory = false;
            setTimeout(function () {
                _this.statusDesc = "";
                _this.statusText = "";
                _this.showStatus = false;
            }, 3000);
        }
    };
    SubscriptionComponent.prototype.ngOnInit = function () {
        this.loading = true;
        this.getPageData(global_util_1.GlobalUtil.getAppSession("UserInfo").userId, 13);
    };
    SubscriptionComponent.prototype.onModuleChange = function (moduleId) {
        this.moduleId = moduleId;
        this.loading = true;
        this.getPageData(global_util_1.GlobalUtil.getAppSession("UserInfo").userId, moduleId);
    };
    SubscriptionComponent.prototype.getPageData = function (userId, moduleId) {
        var _this = this;
        this.subscriptionService.getPageData(userId, moduleId).subscribe(function (result) {
            _this.tabularViewModel.financialSummery = result.financialSummery;
            _this.filterData.modules = result.financialSummery;
            _this.tabularViewModel.kpiData = result.kpiData;
            //for crops,competitor,region ,territory,country
            _this.setDropdownValues();
            //setting tabular data
            _this.tabularViewModel.kpiSourceData = result.kpiSourceData;
            _this.loading = false;
            _this.setFilterDefaults(moduleId.toString());
        });
    };
    SubscriptionComponent.prototype.setDropdownValues = function () {
        this.filterData.crops = this.tabularViewModel.kpiData.filter(function (x) { return x.filterName == 'Crop'; });
        if (this.filterData.crops.length == 0) {
            this.filterData.crops = [{ labelId: 0, label: 'Select' }];
        }
        this.filterData.competitors = this.tabularViewModel.kpiData.filter(function (x) { return x.filterName == 'Competitor'; });
        if (this.filterData.competitors.length == 0) {
            this.filterData.competitors = [{ labelId: 0, label: 'Select' }];
        }
        this.filterData.regions = this.tabularViewModel.kpiData.filter(function (x) { return x.filterName == 'Region'; });
        this.completefilterData.regions = this.tabularViewModel.kpiData.filter(function (x) { return x.filterName == 'Region'; });
        if (this.filterData.regions.length == 0) {
            this.filterData.regions = [{ labelId: 0, label: 'Select' }];
        }
        this.filterData.territories = this.tabularViewModel.kpiData.filter(function (x) { return x.filterName == 'Territory'; });
        this.completefilterData.territories = this.tabularViewModel.kpiData.filter(function (x) { return x.filterName == 'Territory'; });
        if (this.filterData.territories.length == 0) {
            this.filterData.territories = [{ labelId: 0, label: 'Select' }];
        }
        this.filterData.countries = this.tabularViewModel.kpiData.filter(function (x) { return x.filterName == 'Country'; });
        this.completefilterData.countries = this.tabularViewModel.kpiData.filter(function (x) { return x.filterName == 'Country'; });
        if (this.filterData.countries.length == 0) {
            this.filterData.countries = [{ labelId: 0, label: 'Select' }];
        }
    };
    SubscriptionComponent.prototype.onRegionChange = function (regionId) {
        this.userSubscription.regionId = (+regionId);
        this.filterData.territories = this.completefilterData.territories.filter(function (x) { return x["parent1Id"] == regionId; });
        this.setCountriesByRegion(regionId);
        this.filterData.territories.unshift({ labelId: 0, label: 'Select' });
        this.userSubscription.territoryId = this.filterData.territories[0]["labelId"];
    };
    SubscriptionComponent.prototype.setCountriesByRegion = function (regionId) {
        this.filterData.countries = this.completefilterData.countries.filter(function (x) { return x["parent1Id"] == regionId && x["parent2Id"] == null; });
        this.filterData.countries.unshift({ labelId: 0, label: 'Select' });
        this.userSubscription.countryId = this.filterData.countries[0]["labelId"];
    };
    SubscriptionComponent.prototype.setCountriesByTerritory = function (territoryId) {
        var _this = this;
        this.filterData.countries = this.completefilterData.countries.filter(function (x) { return x["parent1Id"] == _this.userSubscription.regionId && x["parent2Id"] == territoryId; });
        this.filterData.countries.unshift({ labelId: 0, label: 'Select' });
        this.userSubscription.countryId = this.filterData.countries[0]["labelId"];
    };
    SubscriptionComponent.prototype.onTerritoryChange = function (territoryId) {
        this.userSubscription.territoryId = (+territoryId);
        this.setCountriesByTerritory(territoryId);
    };
    SubscriptionComponent.prototype.onCountryChange = function (countryId) {
        this.userSubscription.countryId = (+countryId);
    };
    SubscriptionComponent.prototype.SaveSubscription = function (isActive) {
        var _this = this;
        this.userSubscription.isActive = isActive;
        if (isActive && this.checkIfExists()) {
            this.statusClass.green1 = false;
            this.statusClass.mandatory = true;
            this.statusDesc = "Subscription already exists";
            setTimeout(function () {
                _this.statusDesc = "";
            }, 3000);
        }
        else {
            this.loading = true;
            this.subscriptionService.saveUserSubscription(this.userSubscription).subscribe(function (res) {
                if (isActive) {
                    if (_this.isUpdate) {
                        _this.statusText = "Subscription has been updated successfully";
                    }
                    else {
                        _this.statusText = "Subscription has been added successfully";
                    }
                }
                else {
                }
                _this.showStatus = true;
                _this.ResetSubscription();
            });
        }
    };
    SubscriptionComponent.prototype.checkIfExists = function () {
        //{ userId: sub.userId, moduleId: sub.moduleId, cropId: sub.cropId, competitorId: sub.competitorId, regionId: sub.regionId, territoryId: sub.territoryId, countryId: sub.countryId, emailNotification: sub.emailNotification, id: sub.id, isActive: sub.isActive, moduleName: sub.moduleName, notificationFor: sub.notificationFor };
        var _this = this;
        var record;
        if (this.userSubscription.id > 0) {
            record = this.tabularViewModel.kpiSourceData.filter(function (x) { return x.id == _this.userSubscription.id; })[0];
            if (this.userSubscription.moduleId == record.moduleId && this.userSubscription.cropId == (record.cropId == null ? 0 : record.cropId) && this.userSubscription.competitorId == (record.competitorId == null ? 0 : record.competitorId) && this.userSubscription.regionId == (record.regionId == null ? 0 : record.regionId) && this.userSubscription.territoryId == (record.territoryId == null ? 0 : record.territoryId) && this.userSubscription.countryId == (record.countryId == null ? 0 : record.countryId) && this.userSubscription.emailNotification != record.emailNotification) {
                return false;
            }
        }
        for (var i = 0; i < this.tabularViewModel.kpiSourceData.length; i++) {
            var subData = this.tabularViewModel.kpiSourceData[i];
            if (this.userSubscription.moduleId == subData.moduleId && this.userSubscription.cropId == (subData.cropId == null ? 0 : subData.cropId) && this.userSubscription.competitorId == (subData.competitorId == null ? 0 : subData.competitorId) && this.userSubscription.regionId == (subData.regionId == null ? 0 : subData.regionId) && this.userSubscription.territoryId == (subData.territoryId == null ? 0 : subData.territoryId) && this.userSubscription.countryId == (subData.countryId == null ? 0 : subData.countryId)) {
                return true;
            }
        }
        return false;
    };
    SubscriptionComponent.prototype.ResetSubscription = function () {
        this.onModuleChange("13");
        this.isUpdate = false;
        // this.loading = false;
    };
    SubscriptionComponent.prototype.onOpen = function () {
        this._modalComponent.show();
    };
    SubscriptionComponent.prototype.onClose = function (isConfirm) {
        var _this = this;
        this._modalComponent.hide();
        if (isConfirm) {
            var i = this.tabularViewModel.kpiSourceData.filter(function (x) { return x.id == _this.subscriptionToDelete; });
            this.userSubscription = i[0];
            this.SaveSubscription(false);
        }
    };
    SubscriptionComponent.prototype.removeSubscription = function (subscriptionId) {
        if (subscriptionId === void 0) { subscriptionId = 1; }
        this.subscriptionToDelete = subscriptionId;
        this.onOpen();
        //if (confirm('Are you sure, you want to remove this subscription?')) {
        //    let i = this.tabularViewModel.kpiSourceData.filter(x => x.id == subscriptionId)
        //    this.userSubscription = i[0];
        //    this.SaveSubscription(false);
        //}
    };
    SubscriptionComponent.prototype.editSubscription = function (subscriptionId) {
        scroll(0, 0);
        var i = this.tabularViewModel.kpiSourceData.filter(function (x) { return x.id == subscriptionId; });
        this.subscriptionId = subscriptionId;
        var moduleId = i[0].moduleId;
        this.isUpdate = true;
        this.onModuleChange(moduleId);
    };
    __decorate([
        core_1.ViewChild(modal_component_1.ModalComponent), 
        __metadata('design:type', modal_component_1.ModalComponent)
    ], SubscriptionComponent.prototype, "_modalComponent", void 0);
    SubscriptionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-subscription',
            templateUrl: 'subscription.component.html',
        }), 
        __metadata('design:paramtypes', [subscription_service_1.SubscriptionService])
    ], SubscriptionComponent);
    return SubscriptionComponent;
}());
exports.SubscriptionComponent = SubscriptionComponent;
//# sourceMappingURL=subscription.component.js.map