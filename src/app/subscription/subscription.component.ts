import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { SubscriptionService } from './subscription.service';
import { GlobalUtil } from '../global/global.util';
import { Page, GlobalConfig } from '../global/global.config';
import { ITabularViewModel, IUserSubscription, IUserSubscriptionDetails, IFilterData } from './subscription.model';
import { ModalComponent } from '../widgets/modals/modal.component';
import { ModalDetail } from '../widgets/modals/modal.model';

@Component({
    moduleId: module.id,
    selector: 'app-subscription',
    templateUrl: 'subscription.component.html',
})
export class SubscriptionComponent implements OnInit {
    loading: boolean = false;
    isUpdate: boolean = false;
    errorMessage: string;
    moduleId: string;
    confirmHeader: string = "Subscription";
    subscriptionToDelete: number;
    confirmDescription: string = "Are you sure, you want to remove this subscription?"
    @ViewChild(ModalComponent) _modalComponent: ModalComponent;
    modalclasses?: ModalDetail = {
        csModalDialog: null,
        csModalBody: "animated fadeInDown"
    }
    statusClass = {
        green1: true,
        mandatory: false
    }
    isConfirm: boolean = true;
    userSubscription: IUserSubscriptionDetails = null;
    subscriptionId: number;
    tabularViewModel: ITabularViewModel = {
        kpiData: [],
        kpiSourceData: [],
        financialSummery: []
    };
    statusDesc: string; statusText: string;
    showStatus: boolean = false;
    filterData: IFilterData = {
        modules: null,
        crops: null,
        competitors: null,
        regions: null,
        countries: null,
        territories: null
    }
    completefilterData: IFilterData = {
        modules: null,
        crops: null,
        competitors: null,
        regions: null,
        countries: null,
        territories: null
    }

    constructor(private subscriptionService: SubscriptionService) {

    }

    setFilterDefaults(moduleId: string) {
        this.userSubscription = {
            userId: GlobalUtil.getAppSession("UserInfo").userId,
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
        let r: any;
        switch (moduleId) {
            case "4": //Crop Economics
                this.userSubscription.cropId = this.filterData.crops[0]["labelId"];
                r = this.filterData.regions[0]["labelId"]; //except Competitive Landscape
                this.onRegionChange(r.toString());
                break;
            case "6"://Macroeconomics
                r = this.filterData.regions[0]["labelId"]; //except Competitive Landscape
                this.onRegionChange(r.toString());
                break;
            case "9"://Competitive Landscape
                this.userSubscription.competitorId = this.filterData.competitors[0]["labelId"];
                this.userSubscription.regionId = 0;
                this.userSubscription.countryId = 0;
                break;
            case "13"://AgribusinessOverview
                r = this.filterData.regions[0]["labelId"]; //except Competitive Landscape
                this.onRegionChange(r.toString());
                break;
            case "15"://Biofuels
                r = this.filterData.regions[0]["labelId"]; //except Competitive Landscape
                this.onRegionChange(r.toString());
                break;
        }
        if (this.isUpdate) {
            let i = this.tabularViewModel.kpiSourceData.filter(x => x.id == this.subscriptionId)
            let sub = i[0];
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
            setTimeout(() => {
                this.statusDesc = "";
                this.statusText = "";
                this.showStatus = false;
            }, 3000);
        }
    }

    ngOnInit() {
        this.loading = true;
        this.getPageData(GlobalUtil.getAppSession("UserInfo").userId, 13);
    }

    onModuleChange(moduleId: any) {
        this.moduleId = moduleId;
        this.loading = true;
        this.getPageData(GlobalUtil.getAppSession("UserInfo").userId, moduleId);
    }

    getPageData(userId: string, moduleId: number): void {

        this.subscriptionService.getPageData(userId, moduleId).subscribe(result => {

            this.tabularViewModel.financialSummery = result.financialSummery;
            this.filterData.modules = <Array<{ labelId: number, label: string }>>result.financialSummery;

            this.tabularViewModel.kpiData = <Array<{ filterControlMappingId: number, filterName: string, label: string, labelId: number, parent1Id?: number, parent2Id?: number }>>result.kpiData;
            //for crops,competitor,region ,territory,country
            this.setDropdownValues();
            //setting tabular data
            this.tabularViewModel.kpiSourceData = <Array<{ userId: string, moduleId: number, id: number, moduleName: string, cropId?: number, competitorId?: number, regionId?: number, countryId?: number, territoryId?: number, notificationFor: string, emailNotification: boolean }>>result.kpiSourceData;

            this.loading = false;
            this.setFilterDefaults(moduleId.toString());

        });

    }
    setDropdownValues() {

        this.filterData.crops = this.tabularViewModel.kpiData.filter(x => x.filterName == 'Crop');

        if (this.filterData.crops.length == 0) {
            this.filterData.crops = [{ labelId: 0, label: 'Select' }]
        }
        this.filterData.competitors = this.tabularViewModel.kpiData.filter(x => x.filterName == 'Competitor');

        if (this.filterData.competitors.length == 0) {
            this.filterData.competitors = [{ labelId: 0, label: 'Select' }]
        }

        this.filterData.regions = this.tabularViewModel.kpiData.filter(x => x.filterName == 'Region');
        this.completefilterData.regions = this.tabularViewModel.kpiData.filter(x => x.filterName == 'Region');
        if (this.filterData.regions.length == 0) {
            this.filterData.regions = [{ labelId: 0, label: 'Select' }]
        }

        this.filterData.territories = this.tabularViewModel.kpiData.filter(x => x.filterName == 'Territory');
        this.completefilterData.territories = this.tabularViewModel.kpiData.filter(x => x.filterName == 'Territory');
        if (this.filterData.territories.length == 0) {
            this.filterData.territories = [{ labelId: 0, label: 'Select' }]
        }

        this.filterData.countries = this.tabularViewModel.kpiData.filter(x => x.filterName == 'Country');
        this.completefilterData.countries = this.tabularViewModel.kpiData.filter(x => x.filterName == 'Country');
        if (this.filterData.countries.length == 0) {
            this.filterData.countries = [{ labelId: 0, label: 'Select' }]
        }

    }

    onRegionChange(regionId: string) {
        this.userSubscription.regionId = (+regionId);

        this.filterData.territories = this.completefilterData.territories.filter(x => x["parent1Id"] == regionId);

        this.setCountriesByRegion(regionId);
        this.filterData.territories.unshift({ labelId: 0, label: 'Select' });
        this.userSubscription.territoryId = this.filterData.territories[0]["labelId"];
    }

    setCountriesByRegion(regionId: string) {
        this.filterData.countries = this.completefilterData.countries.filter(x => x["parent1Id"] == regionId && x["parent2Id"] == null);
        this.filterData.countries.unshift({ labelId: 0, label: 'Select' });
        this.userSubscription.countryId = this.filterData.countries[0]["labelId"];
    }

    setCountriesByTerritory(territoryId: string) {
        this.filterData.countries = this.completefilterData.countries.filter(x => x["parent1Id"] == this.userSubscription.regionId && x["parent2Id"] == territoryId);
        this.filterData.countries.unshift({ labelId: 0, label: 'Select' });
        this.userSubscription.countryId = this.filterData.countries[0]["labelId"];
    }

    onTerritoryChange(territoryId: string) {
        this.userSubscription.territoryId = (+territoryId);
        this.setCountriesByTerritory(territoryId);
    }

    onCountryChange(countryId: string) {
        this.userSubscription.countryId = (+countryId);
    }

    SaveSubscription(isActive: boolean) {

        this.userSubscription.isActive = isActive;

        if (isActive && this.checkIfExists()) {
            this.statusClass.green1 = false;
            this.statusClass.mandatory = true;
            this.statusDesc = "Subscription already exists";
            setTimeout(() => {
                this.statusDesc = "";
            }, 3000);
        }
        else {
            this.loading = true;
            this.subscriptionService.saveUserSubscription(this.userSubscription).subscribe(res => {
                if (isActive) {
                    if (this.isUpdate) {
                        this.statusText = "Subscription has been updated successfully";
                    }
                    else {
                        this.statusText = "Subscription has been added successfully";
                    }
                }
                else {
                    // this.statusText = "Subscription removed...";
                }
                this.showStatus = true;
                this.ResetSubscription();
            });
        }
    }
    checkIfExists(): boolean {
        //{ userId: sub.userId, moduleId: sub.moduleId, cropId: sub.cropId, competitorId: sub.competitorId, regionId: sub.regionId, territoryId: sub.territoryId, countryId: sub.countryId, emailNotification: sub.emailNotification, id: sub.id, isActive: sub.isActive, moduleName: sub.moduleName, notificationFor: sub.notificationFor };

        let record: any;
        if (this.userSubscription.id > 0) {
            record = this.tabularViewModel.kpiSourceData.filter(x => x.id == this.userSubscription.id)[0];
            if (this.userSubscription.moduleId == record.moduleId && this.userSubscription.cropId == (record.cropId == null ? 0 : record.cropId) && this.userSubscription.competitorId == (record.competitorId == null ? 0 : record.competitorId) && this.userSubscription.regionId == (record.regionId == null ? 0 : record.regionId) && this.userSubscription.territoryId == (record.territoryId == null ? 0 : record.territoryId) && this.userSubscription.countryId == (record.countryId == null ? 0 : record.countryId) && this.userSubscription.emailNotification != record.emailNotification) {
                return false;
            }
        }

        for (let i = 0; i < this.tabularViewModel.kpiSourceData.length; i++) {
            const subData = this.tabularViewModel.kpiSourceData[i];

            if (this.userSubscription.moduleId == subData.moduleId && this.userSubscription.cropId == (subData.cropId == null ? 0 : subData.cropId) && this.userSubscription.competitorId == (subData.competitorId == null ? 0 : subData.competitorId) && this.userSubscription.regionId == (subData.regionId == null ? 0 : subData.regionId) && this.userSubscription.territoryId == (subData.territoryId == null ? 0 : subData.territoryId) && this.userSubscription.countryId == (subData.countryId == null ? 0 : subData.countryId)) {
                return true;
            }

        }


        return false;
    }
    ResetSubscription() {
        this.onModuleChange("13");
        this.isUpdate = false;
        // this.loading = false;
    }
    onOpen() {
        this._modalComponent.show();
    }
    onClose(isConfirm: boolean) {
        this._modalComponent.hide();
        if (isConfirm) {
            let i = this.tabularViewModel.kpiSourceData.filter(x => x.id == this.subscriptionToDelete)
            this.userSubscription = i[0];
            this.SaveSubscription(false);
        }
    }

    removeSubscription(subscriptionId: number = 1) {
        this.subscriptionToDelete = subscriptionId;
        this.onOpen();
        //if (confirm('Are you sure, you want to remove this subscription?')) {
        //    let i = this.tabularViewModel.kpiSourceData.filter(x => x.id == subscriptionId)
        //    this.userSubscription = i[0];
        //    this.SaveSubscription(false);
        //}
    }

    editSubscription(subscriptionId: number) {
        scroll(0, 0);
        let i = this.tabularViewModel.kpiSourceData.filter(x => x.id == subscriptionId)
        this.subscriptionId = subscriptionId;
        let moduleId = i[0].moduleId;
        this.isUpdate = true;
        this.onModuleChange(moduleId);
    }
}