import { Component } from '@angular/core';
import { ChartService } from './widgets/charts/chart.service';
import { MenuService } from './fw/services/menu.service';
import { ScreenService } from './fw/services/screen.service';
import { UserAnalyticsService } from './admin/useranalytics/useranalytics.service';
import { IUserAnalytics } from './admin/useranalytics/useranalytics.model';
import { initialMenuItems } from './app.menu';

import { Router, ActivatedRoute, Params, NavigationStart, Event as NavigationEvent, NavigationEnd, RoutesRecognized } from '@angular/router';
import { GlobalConfig, Page } from './global/global.config';
import { GlobalUtil } from './global/global.util';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { ExcelExportService } from './widgets/export/Export.service';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    providers: [ExcelExportService, UserAnalyticsService]
})
export class AppComponent {

    errorMessage: string;
    chartId: string;
    name = 'Syngenta-new';
    public insightVisible: string = '';
    private getFootnoteUrl = GlobalConfig.baseEndpont + GlobalConfig.getFootnote;

    constructor(private chartService: ChartService, private _http: Http,
        private menuService: MenuService,
        private screenService: ScreenService,
        private router: Router,
        private activatedRoute: ActivatedRoute, private userAnalyticsService: UserAnalyticsService) {

        menuService.items = initialMenuItems;


        /*  Route event types
            NavigationEnd
            NavigationCancel
            NavigationError
            RoutesRecognized
        */
        router.events.forEach((event: NavigationEvent) => {
            if (event instanceof RoutesRecognized) {
                if (event.urlAfterRedirects.indexOf("mypage") > 0) {
                    this.setFootnoteData(Page.myPage);
                    this.initUserAnalytics(Page.myPage);
                    //setTimeout(()=>  this.initUserAnalytics(Page.myPage),2000);
                }
                else if (event.urlAfterRedirects.indexOf("competitorcomparison") > 0) {
                    this.setFootnoteData(Page.competitorComparison);
                    this.initUserAnalytics(Page.competitorComparison);
                }
                else if (event.urlAfterRedirects.indexOf("massnapshot") > 0) {
                    this.setFootnoteData(Page.cisnap);
                    this.initUserAnalytics(Page.cisnap);
                }
                else if (event.urlAfterRedirects.indexOf("masfinancialsratio") > 0) {
                    this.setFootnoteData(Page.ciFinancialsRatio);
                    this.initUserAnalytics(Page.ciFinancialsRatio);
                }
                else if (event.urlAfterRedirects.indexOf("masfinancials") > 0) {
                    this.setFootnoteData(Page.ciFinancials);
                    this.initUserAnalytics(Page.ciFinancials);
                }
                else if (event.urlAfterRedirects.indexOf("masnews") > 0) {
                    this.setFootnoteData(Page.ciNews);
                    this.initUserAnalytics(Page.ciNews);
                }
                else if (event.urlAfterRedirects.indexOf("competitorreport") > 0) {
                    this.setFootnoteData(Page.ciCompetitorReports);
                    this.initUserAnalytics(Page.ciCompetitorReports);
                }
                else if (event.urlAfterRedirects.indexOf("majoragroandseeds") > 0) {
                    this.setFootnoteData(Page.cikpi);
                    this.initUserAnalytics(Page.cikpi);
                }
                else if (event.urlAfterRedirects.indexOf("search") > 0) {
                    this.setFootnoteData(Page.Search);
                    this.initUserAnalytics(Page.Search);
                }
                else if (event.urlAfterRedirects.indexOf("kmsearch") > 0) {
                    this.setFootnoteData(Page.KmSearch);
                    this.initUserAnalytics(Page.KmSearch);
                }
                else if (event.urlAfterRedirects.indexOf("kmupload") > 0) {
                    this.setFootnoteData(Page.KmUpload);
                    this.initUserAnalytics(Page.KmUpload);
                }
                else if (event.urlAfterRedirects.indexOf("economicindicators") > 0) {
                    this.setFootnoteData(Page.macroeconomicsIndicators);
                    this.initUserAnalytics(Page.macroeconomicsIndicators);
                }
                else if (event.urlAfterRedirects.indexOf("currencybasket") > 0) {
                    this.setFootnoteData(Page.macroeconomicsCurrencyBasket);
                    this.initUserAnalytics(Page.macroeconomicsCurrencyBasket);
                }
                else if (event.urlAfterRedirects.indexOf("cropoverview") > 0) {
                    this.setFootnoteData(Page.cropIndicatorOverview);
                    this.initUserAnalytics(Page.cropIndicatorOverview);
                }
                else if (event.urlAfterRedirects.indexOf("cropprice") > 0) {
                    this.setFootnoteData(Page.cropIndicatorUSPrice);
                    this.initUserAnalytics(Page.cropIndicatorUSPrice);
                }
                else if (event.urlAfterRedirects.indexOf("maincropindicator") > 0) {
                    this.setFootnoteData(Page.MainCropIndicator);
                    this.initUserAnalytics(Page.MainCropIndicator);
                }
                else if (event.urlAfterRedirects.indexOf("agribusinessoverview") > 0) {
                    this.setFootnoteData(Page.agribusinessOverview);
                    this.initUserAnalytics(Page.agribusinessOverview);
                }
                else if (event.urlAfterRedirects.indexOf("biofuels") > 0) {
                    this.setFootnoteData(Page.biofuels);
                    this.initUserAnalytics(Page.biofuels);
                }
                else if (event.urlAfterRedirects.indexOf("commodityprice") > 0) {
                    //this.setFootnoteData(Page.);
                }
                else if (event.urlAfterRedirects.indexOf("cropcomparison") > 0) {
                    this.setFootnoteData(Page.cropComparison);
                    this.initUserAnalytics(Page.cropComparison);
                }
                else if (event.urlAfterRedirects.indexOf("metadatamanagement") > 0) {
                    GlobalUtil.setSession("pagename", "metadatamanagement");
                }
                else if (event.urlAfterRedirects.indexOf("metadatamapping") > 0) {
                    GlobalUtil.setSession("pagename", "metadatamapping");
                }
                else if (event.urlAfterRedirects.indexOf("useranalytics") > 0) {
                    GlobalUtil.setSession("pagename", Page.UserAnalytics);
                }
                else if (event.urlAfterRedirects.indexOf("updateglossary") > 0) {
                    GlobalUtil.setSession("pagename", "updateglossary");
                }
                else if (event.urlAfterRedirects.indexOf("subscription") > 0) {
                    GlobalUtil.setSession("pagename", "subscription");
                }
                else if (event.urlAfterRedirects.indexOf("query") > 0) {
                    GlobalUtil.setSession("pagename", "query");
                }
                else if (event.urlAfterRedirects.indexOf("viewglossary") > 0) {
                    GlobalUtil.setSession("pagename", "viewglossary");
                }
                else if (event.urlAfterRedirects.indexOf("aboutportal") > 0) {
                    GlobalUtil.setSession("pagename", "aboutportal");
                }
                else if (event.urlAfterRedirects.indexOf("aboutteam") > 0) {
                    GlobalUtil.setSession("pagename", "aboutteam");
                }
                else if (event.urlAfterRedirects.indexOf("authorise") > 0) {
                    GlobalUtil.setSession("pagename", "authorise");
                }
                else if (event.urlAfterRedirects.indexOf("uploaddata") > 0) {
                    GlobalUtil.setSession("pagename", "uploaddata");
                }
                else if (event.urlAfterRedirects.indexOf("recentdocs") > 0) {
                    GlobalUtil.setSession("pagename", "recentdocs");
                }
            }
        });
    }
    //start code added to save user log
    initUserAnalytics(pageName: string) {
        if (GlobalConfig.hideFooter.indexOf(pageName.toLocaleLowerCase()) < 0) {
            let logDetails: IUserAnalytics = {
                userId: GlobalUtil.getAppSession("UserInfo").userId,
                regionId: GlobalUtil.getAppSession("UserInfo").regionId,
                pageName: pageName
            }
            if (logDetails.userId && logDetails.regionId) {
                this.saveUserAnalytics(logDetails);
            }
        }
    }

    private saveUserAnalytics(iUserAnalytics: IUserAnalytics) {
        this.userAnalyticsService.postUserAnalytics(iUserAnalytics).subscribe(res => { });
    }
    //end code added to save user log

    setFootnoteData(pageName: string) {
        GlobalConfig.isFooterInDisplayMode = true;
        GlobalConfig.isfooterArrowDown = true;

        GlobalUtil.setSession("pagename", pageName);
        GlobalUtil.setSession("PageFootnote", "");
        GlobalUtil.setSession("pagefooterset", "0");

        if (GlobalConfig.hideFooter.indexOf(pageName.toLocaleLowerCase()) < 0) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('pageName', pageName);
            if (pageName == "CropIndicatorOverview" || pageName == "CropIndicatorUSPrice") {
                params.set('cropId', GlobalUtil.getSession("CropId"));
            }
            if (pageName == "CiSnapshot" || pageName == "CiFinancials" || pageName == "CiFinancialsRatio" || pageName == "CiNews" || pageName == "CiCompetitorReport") {
                params.set('competitorId', GlobalUtil.getSession("CompetitorId"));
            }
            this._http.get(this.getFootnoteUrl, { search: params }).subscribe(data => {
                let result = this.extractData(data);
                GlobalUtil.setSession("PageFootnote", result.footnoteText ? result.footnoteText : '');
                GlobalUtil.setSession("pagefooterset", "1");
                //setting module id to session variable
                GlobalUtil.setSession("PageModuleId", result.moduleId ? result.moduleId : '');
            });
        }
    }

    private extractData(response: Response) {
        let body = response.json();
        return body || {};
    }

    ngOnInit(): void {
        /*this.chartService.getData()
            .subscribe(data => { this.data = data }
            , error => this.errorMessage = <any>error
        );*/
    }

    getValueFromSelect(value: any) {
        this.chartId = value;
    }
}
