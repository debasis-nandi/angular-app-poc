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
var chart_service_1 = require('./widgets/charts/chart.service');
var menu_service_1 = require('./fw/services/menu.service');
var screen_service_1 = require('./fw/services/screen.service');
var useranalytics_service_1 = require('./admin/useranalytics/useranalytics.service');
var app_menu_1 = require('./app.menu');
var router_1 = require('@angular/router');
var global_config_1 = require('./global/global.config');
var global_util_1 = require('./global/global.util');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
var Export_service_1 = require('./widgets/export/Export.service');
var AppComponent = (function () {
    function AppComponent(chartService, _http, menuService, screenService, router, activatedRoute, userAnalyticsService) {
        var _this = this;
        this.chartService = chartService;
        this._http = _http;
        this.menuService = menuService;
        this.screenService = screenService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.userAnalyticsService = userAnalyticsService;
        this.name = 'Syngenta-new';
        this.insightVisible = '';
        this.getFootnoteUrl = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.getFootnote;
        menuService.items = app_menu_1.initialMenuItems;
        /*  Route event types
            NavigationEnd
            NavigationCancel
            NavigationError
            RoutesRecognized
        */
        router.events.forEach(function (event) {
            if (event instanceof router_1.RoutesRecognized) {
                if (event.urlAfterRedirects.indexOf("mypage") > 0) {
                    _this.setFootnoteData(global_config_1.Page.myPage);
                    _this.initUserAnalytics(global_config_1.Page.myPage);
                }
                else if (event.urlAfterRedirects.indexOf("competitorcomparison") > 0) {
                    _this.setFootnoteData(global_config_1.Page.competitorComparison);
                    _this.initUserAnalytics(global_config_1.Page.competitorComparison);
                }
                else if (event.urlAfterRedirects.indexOf("massnapshot") > 0) {
                    _this.setFootnoteData(global_config_1.Page.cisnap);
                    _this.initUserAnalytics(global_config_1.Page.cisnap);
                }
                else if (event.urlAfterRedirects.indexOf("masfinancialsratio") > 0) {
                    _this.setFootnoteData(global_config_1.Page.ciFinancialsRatio);
                    _this.initUserAnalytics(global_config_1.Page.ciFinancialsRatio);
                }
                else if (event.urlAfterRedirects.indexOf("masfinancials") > 0) {
                    _this.setFootnoteData(global_config_1.Page.ciFinancials);
                    _this.initUserAnalytics(global_config_1.Page.ciFinancials);
                }
                else if (event.urlAfterRedirects.indexOf("masnews") > 0) {
                    _this.setFootnoteData(global_config_1.Page.ciNews);
                    _this.initUserAnalytics(global_config_1.Page.ciNews);
                }
                else if (event.urlAfterRedirects.indexOf("competitorreport") > 0) {
                    _this.setFootnoteData(global_config_1.Page.ciCompetitorReports);
                    _this.initUserAnalytics(global_config_1.Page.ciCompetitorReports);
                }
                else if (event.urlAfterRedirects.indexOf("majoragroandseeds") > 0) {
                    _this.setFootnoteData(global_config_1.Page.cikpi);
                    _this.initUserAnalytics(global_config_1.Page.cikpi);
                }
                else if (event.urlAfterRedirects.indexOf("search") > 0) {
                    _this.setFootnoteData(global_config_1.Page.Search);
                    _this.initUserAnalytics(global_config_1.Page.Search);
                }
                else if (event.urlAfterRedirects.indexOf("kmsearch") > 0) {
                    _this.setFootnoteData(global_config_1.Page.KmSearch);
                    _this.initUserAnalytics(global_config_1.Page.KmSearch);
                }
                else if (event.urlAfterRedirects.indexOf("kmupload") > 0) {
                    _this.setFootnoteData(global_config_1.Page.KmUpload);
                    _this.initUserAnalytics(global_config_1.Page.KmUpload);
                }
                else if (event.urlAfterRedirects.indexOf("economicindicators") > 0) {
                    _this.setFootnoteData(global_config_1.Page.macroeconomicsIndicators);
                    _this.initUserAnalytics(global_config_1.Page.macroeconomicsIndicators);
                }
                else if (event.urlAfterRedirects.indexOf("currencybasket") > 0) {
                    _this.setFootnoteData(global_config_1.Page.macroeconomicsCurrencyBasket);
                    _this.initUserAnalytics(global_config_1.Page.macroeconomicsCurrencyBasket);
                }
                else if (event.urlAfterRedirects.indexOf("cropoverview") > 0) {
                    _this.setFootnoteData(global_config_1.Page.cropIndicatorOverview);
                    _this.initUserAnalytics(global_config_1.Page.cropIndicatorOverview);
                }
                else if (event.urlAfterRedirects.indexOf("cropprice") > 0) {
                    _this.setFootnoteData(global_config_1.Page.cropIndicatorUSPrice);
                    _this.initUserAnalytics(global_config_1.Page.cropIndicatorUSPrice);
                }
                else if (event.urlAfterRedirects.indexOf("maincropindicator") > 0) {
                    _this.setFootnoteData(global_config_1.Page.MainCropIndicator);
                    _this.initUserAnalytics(global_config_1.Page.MainCropIndicator);
                }
                else if (event.urlAfterRedirects.indexOf("agribusinessoverview") > 0) {
                    _this.setFootnoteData(global_config_1.Page.agribusinessOverview);
                    _this.initUserAnalytics(global_config_1.Page.agribusinessOverview);
                }
                else if (event.urlAfterRedirects.indexOf("biofuels") > 0) {
                    _this.setFootnoteData(global_config_1.Page.biofuels);
                    _this.initUserAnalytics(global_config_1.Page.biofuels);
                }
                else if (event.urlAfterRedirects.indexOf("commodityprice") > 0) {
                }
                else if (event.urlAfterRedirects.indexOf("cropcomparison") > 0) {
                    _this.setFootnoteData(global_config_1.Page.cropComparison);
                    _this.initUserAnalytics(global_config_1.Page.cropComparison);
                }
                else if (event.urlAfterRedirects.indexOf("metadatamanagement") > 0) {
                    global_util_1.GlobalUtil.setSession("pagename", "metadatamanagement");
                }
                else if (event.urlAfterRedirects.indexOf("metadatamapping") > 0) {
                    global_util_1.GlobalUtil.setSession("pagename", "metadatamapping");
                }
                else if (event.urlAfterRedirects.indexOf("useranalytics") > 0) {
                    global_util_1.GlobalUtil.setSession("pagename", global_config_1.Page.UserAnalytics);
                }
                else if (event.urlAfterRedirects.indexOf("updateglossary") > 0) {
                    global_util_1.GlobalUtil.setSession("pagename", "updateglossary");
                }
                else if (event.urlAfterRedirects.indexOf("subscription") > 0) {
                    global_util_1.GlobalUtil.setSession("pagename", "subscription");
                }
                else if (event.urlAfterRedirects.indexOf("query") > 0) {
                    global_util_1.GlobalUtil.setSession("pagename", "query");
                }
                else if (event.urlAfterRedirects.indexOf("viewglossary") > 0) {
                    global_util_1.GlobalUtil.setSession("pagename", "viewglossary");
                }
                else if (event.urlAfterRedirects.indexOf("aboutportal") > 0) {
                    global_util_1.GlobalUtil.setSession("pagename", "aboutportal");
                }
                else if (event.urlAfterRedirects.indexOf("aboutteam") > 0) {
                    global_util_1.GlobalUtil.setSession("pagename", "aboutteam");
                }
                else if (event.urlAfterRedirects.indexOf("authorise") > 0) {
                    global_util_1.GlobalUtil.setSession("pagename", "authorise");
                }
                else if (event.urlAfterRedirects.indexOf("uploaddata") > 0) {
                    global_util_1.GlobalUtil.setSession("pagename", "uploaddata");
                }
                else if (event.urlAfterRedirects.indexOf("recentdocs") > 0) {
                    global_util_1.GlobalUtil.setSession("pagename", "recentdocs");
                }
            }
        });
    }
    //start code added to save user log
    AppComponent.prototype.initUserAnalytics = function (pageName) {
        if (global_config_1.GlobalConfig.hideFooter.indexOf(pageName.toLocaleLowerCase()) < 0) {
            var logDetails = {
                userId: global_util_1.GlobalUtil.getAppSession("UserInfo").userId,
                regionId: global_util_1.GlobalUtil.getAppSession("UserInfo").regionId,
                pageName: pageName
            };
            if (logDetails.userId && logDetails.regionId) {
                this.saveUserAnalytics(logDetails);
            }
        }
    };
    AppComponent.prototype.saveUserAnalytics = function (iUserAnalytics) {
        this.userAnalyticsService.postUserAnalytics(iUserAnalytics).subscribe(function (res) { });
    };
    //end code added to save user log
    AppComponent.prototype.setFootnoteData = function (pageName) {
        var _this = this;
        global_config_1.GlobalConfig.isFooterInDisplayMode = true;
        global_config_1.GlobalConfig.isfooterArrowDown = true;
        global_util_1.GlobalUtil.setSession("pagename", pageName);
        global_util_1.GlobalUtil.setSession("PageFootnote", "");
        global_util_1.GlobalUtil.setSession("pagefooterset", "0");
        if (global_config_1.GlobalConfig.hideFooter.indexOf(pageName.toLocaleLowerCase()) < 0) {
            var params = new http_1.URLSearchParams();
            params.set('pageName', pageName);
            if (pageName == "CropIndicatorOverview" || pageName == "CropIndicatorUSPrice") {
                params.set('cropId', global_util_1.GlobalUtil.getSession("CropId"));
            }
            if (pageName == "CiSnapshot" || pageName == "CiFinancials" || pageName == "CiFinancialsRatio" || pageName == "CiNews" || pageName == "CiCompetitorReport") {
                params.set('competitorId', global_util_1.GlobalUtil.getSession("CompetitorId"));
            }
            this._http.get(this.getFootnoteUrl, { search: params }).subscribe(function (data) {
                var result = _this.extractData(data);
                global_util_1.GlobalUtil.setSession("PageFootnote", result.footnoteText ? result.footnoteText : '');
                global_util_1.GlobalUtil.setSession("pagefooterset", "1");
                //setting module id to session variable
                global_util_1.GlobalUtil.setSession("PageModuleId", result.moduleId ? result.moduleId : '');
            });
        }
    };
    AppComponent.prototype.extractData = function (response) {
        var body = response.json();
        return body || {};
    };
    AppComponent.prototype.ngOnInit = function () {
        /*this.chartService.getData()
            .subscribe(data => { this.data = data }
            , error => this.errorMessage = <any>error
        );*/
    };
    AppComponent.prototype.getValueFromSelect = function (value) {
        this.chartId = value;
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: 'app.component.html',
            providers: [Export_service_1.ExcelExportService, useranalytics_service_1.UserAnalyticsService]
        }), 
        __metadata('design:paramtypes', [chart_service_1.ChartService, http_1.Http, menu_service_1.MenuService, screen_service_1.ScreenService, router_1.Router, router_1.ActivatedRoute, useranalytics_service_1.UserAnalyticsService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map