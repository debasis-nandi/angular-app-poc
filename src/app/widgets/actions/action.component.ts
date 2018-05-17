import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IActions, IFavoriteWidget, IFilters } from '../charts/chart';
import { GlobalUtil } from '../../global/global.util';
import { GlobalConfig, Page } from '../../global/global.config';
import { FavouritesService } from '../favourites/favourites.service';



@Component({
    moduleId: module.id,
    selector: 'my-action',
    templateUrl: 'action.component.html',
    providers: [FavouritesService]
})
export class ActionComponent {

    @Input() actionObject: IActions;
    @Input() favouriteObject: any;
    @Input() selectedFilter?: any;
    @Input() PageName: any;
    @Input() UserId: any;//
    @Input() deafultQuarterValues?: IFilters[];
    @Output() FavoriteSaved: EventEmitter<IFavoriteWidget> = new EventEmitter<IFavoriteWidget>();
    constructor(private _favouritesService: FavouritesService, private router: Router) {

    }
    onFavouriteClick() {
        let _isFavourite: boolean;

        let confirmationMessage: string;
        let favouriteCount: number;
        let favoriteLimit = 8;
        if (this.actionObject.iconClass == 'fa fa-heart-o' && this.PageName !== Page.myPage) {
            _isFavourite = true;
            confirmationMessage = "Are you sure, you want to mark it as favourite.";
        }
        else {
            _isFavourite = false;
            confirmationMessage = "Are you sure, you want to unmark this as favourite?";
        }
        //start maintain session
        let filterType: string = null;
        let fromYear: number = null;
        let toYear: number = null;
        let fromQuarter: number = null;
        let toQuarter: number = null;
        if (this.selectedFilter && this.selectedFilter.length > 0) {
            let vdata = this.selectedFilter.filter((a: any) => a.filterName === "View Data As")[0];
            filterType = vdata.selectedData;
            
            if (this.deafultQuarterValues && this.deafultQuarterValues.length > 0) {
                fromYear = this.deafultQuarterValues[0].filterData.filter(k => k["filterName"] == "From Year")[0]["selectedData"];
                toYear = this.deafultQuarterValues[0].filterData.filter(k => k["filterName"] == "To Year")[0]["selectedData"];
                fromQuarter = this.deafultQuarterValues[0].filterData.filter(k => k["filterName"] == "From Quarter")[0]["selectedData"];
                toQuarter = this.deafultQuarterValues[0].filterData.filter(k => k["filterName"] == "To Quarter")[0]["selectedData"];
            }
           
        }

        if (_isFavourite) {
            let userId = GlobalUtil.getAppSession('UserInfo').userId;
            let CropId = (this.PageName == Page.cropIndicatorOverview || this.PageName == Page.cropIndicatorUSPrice) ? GlobalUtil.getSession('CropId') : this.favouriteObject.cropId;
            let CompetitorId = (this.PageName == Page.ciFinancials || this.PageName == Page.ciFinancialsRatio || this.PageName == Page.competitorComparison) ? GlobalUtil.getSession('CompetitorId') : this.favouriteObject.competitorId;
            
            this._favouritesService.saveFavourites(
                {
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
                }).subscribe(resp => {
                    if (+resp >= +favoriteLimit) {
                        alert(`Only ${favoriteLimit} favorites can be added to 'My Page'`);
                        return false;
                    }
                    else {                       
                            let userId = GlobalUtil.getAppSession('UserInfo').userId;
                            let CropId = (this.PageName == Page.cropIndicatorOverview || this.PageName == Page.cropIndicatorUSPrice) ? GlobalUtil.getSession('CropId') : this.favouriteObject.cropId;
                            let CompetitorId = (this.PageName == Page.ciFinancials || this.PageName == Page.ciFinancialsRatio || this.PageName == Page.competitorComparison) ? GlobalUtil.getSession('CompetitorId') : this.favouriteObject.competitorId;
                            if (_isFavourite) {
                                //set as favorite
                                this.actionObject.iconClass = 'glyphicon glyphicon-heart' //glyphicon glyphicon-heart
                                this._favouritesService.saveFavourites(
                                    {
                                        pageName: this.PageName,
                                        userId: userId,
                                        widgetId: this.favouriteObject.realWidgetIdForMyPage,
                                        widgetName: this.favouriteObject.widgetName,
                                        isFavourite: _isFavourite,
                                        cropId: CropId ? parseInt(CropId) : null,
                                        competitorId: CompetitorId ? parseInt(CompetitorId) : null,
                                        isFavouriteCount: false,
                                        filterType: filterType,
                                        fromYear: fromYear,
                                        toYear: toYear,
                                        fromQuarter: fromQuarter,
                                        toQuarter: toQuarter
                                    }).subscribe(res => {
                                        this.actionObject.iconClass = 'glyphicon glyphicon-heart' //glyphicon glyphicon-heart
                                    });
                            }
                        
                    }
                });
        }
        else if (!_isFavourite) {
            //set as unfavorite
            let res: boolean = confirm(confirmationMessage);
            if (res) {
                let userId = GlobalUtil.getAppSession('UserInfo').userId;
                let CropId = (this.PageName == Page.cropIndicatorOverview || this.PageName == Page.cropIndicatorUSPrice) ? GlobalUtil.getSession('CropId') : this.favouriteObject.cropId;
                let CompetitorId = (this.PageName == Page.ciFinancials || this.PageName == Page.ciFinancialsRatio || this.PageName == Page.competitorComparison) ? GlobalUtil.getSession('CompetitorId') : this.favouriteObject.competitorId;
                this.actionObject.iconClass = 'fa fa-heart-o';

                this._favouritesService.saveFavourites(
                    {
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
                    }).subscribe(res => {
                        this.FavoriteSaved.emit({ widgetId: <number>this.favouriteObject.widgetId, widgetName: this.favouriteObject.widgetName });
                    });
            }

        }

    }

    CprSubmit(): void {
        this.router.navigate(['layout/kmsearch', { para: this.getPageModuleId(), doctype: 'CPR' }]);
    }

    getPageModuleId(): string {
        return GlobalUtil.getSession("PageModuleId");
    }
}