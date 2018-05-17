"use strict";
var router_1 = require('@angular/router');
var layout_component_1 = require('./layout/layout.component');
var auth_guard_1 = require('./guards/auth.guard');
var OAuthCallbackComponent_1 = require('./adal-service/OAuthCallbackComponent');
var OAuthCallbackHandler_1 = require('./adal-service/OAuthCallbackHandler');
var BridgeToMyPage_component_1 = require('./BridgeToMyPage/BridgeToMyPage.component');
exports.appRoutes = [
    { path: 'id_token', component: OAuthCallbackComponent_1.OAuthCallbackComponent, canActivate: [OAuthCallbackHandler_1.OAuthCallbackHandler] },
    //{ path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '', loadChildren: 'app/login/login.module#LoginModule' },
    { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
    { path: 'BridgeToMyPage', component: BridgeToMyPage_component_1.BridgeToMyPageComponent },
    {
        path: 'layout', component: layout_component_1.LayoutComponent,
        children: [
            { path: 'mypage', loadChildren: 'app/mypage/mypage.module#MyPageModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'competitorcomparison', loadChildren: 'app/business-intelligence/competitive-landscape/competitor-comparison/competitor-comparison.module#CompetitorComparisonModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'majoragroandseeds', loadChildren: 'app/business-intelligence/competitive-landscape/major-agrochemicals-seeds/major-agrochemicals-seeds.module#MajorAgrochemicalsSeedsModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'majoragroandseeds/massnapshot', loadChildren: 'app/business-intelligence/competitive-landscape/major-agrochemicals-seeds/mas-snapshot.module#MASSnapshotModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'majoragroandseeds/masfinancials', loadChildren: 'app/business-intelligence/competitive-landscape/major-agrochemicals-seeds/mas-financials.module#MASFinancialsModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'majoragroandseeds/masfinancialsratio', loadChildren: 'app/business-intelligence/competitive-landscape/major-agrochemicals-seeds/mas-financials-ratio.module#MASFinancialsRatioModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'search/:para', loadChildren: 'app/search/search.module#SearchModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'filesearch/:filepara', loadChildren: 'app/search/search.module#SearchModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'majoragroandseeds/masnews', loadChildren: 'app/business-intelligence/competitive-landscape/major-agrochemicals-seeds/mas-news.module#MASNewsModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'majoragroandseeds/competitorreport', loadChildren: 'app/business-intelligence/competitive-landscape/major-agrochemicals-seeds/mas-competitorreports.module#MASCompetitorReportModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'knowledgemanagement', redirectTo: 'kmsearch', pathMatch: 'full' },
            { path: 'kmsearch', loadChildren: 'app/knowledge-management/km-search.module#KmSearchModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'kmsearch/:para', loadChildren: 'app/knowledge-management/km-search.module#KmSearchModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'kmadvancedsearch/:advancedsearchpara', loadChildren: 'app/knowledge-management/km-search.module#KmSearchModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'kmupload', loadChildren: 'app/knowledge-management/km-upload-doc.module#KmUploadDocModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'economicindicators', loadChildren: 'app/business-intelligence/macroeconomics/economic-indicators.module#EconomicIndicatorsModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'currencybasket', loadChildren: 'app/business-intelligence/macroeconomics/currency-basket.module#CurrencyBasketModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'maincropindicator', loadChildren: 'app/business-intelligence/businessenviroment/crop-economics/main-crop-indicator/main-crop-indicator.module#MainCropIndicatorModule', canActivate: [auth_guard_1.AuthGuard] },
            //{ path: 'maincropindicator', loadChildren: 'app/business-intelligence/competitive-landscape/major-agrochemicals-seeds/major-agrochemicals-seeds.module#MajorAgrochemicalsSeedsModule' }
            { path: 'agribusinessoverview', loadChildren: 'app/business-intelligence/businessenviroment/agribusiness-overview/agribusiness-overview.module#AgribusinessOverviewModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'biofuels', loadChildren: 'app/business-intelligence/businessenviroment/biofuels/biofuels.module#BiofuelsModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'commodityprice', loadChildren: 'app/business-intelligence/businessenviroment/crop-economics/comodity-price/commodity-price.module#CommodityPriceModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'cropcomparison', loadChildren: 'app/business-intelligence/businessenviroment/crop-economics/crop-comparison/crop-comparison.module#CropComparisonModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'agribusinessoverview/cropoverview', loadChildren: 'app/business-intelligence/businessenviroment/crop-economics/main-crop-indicator/crop-overview.module#CropOverviewModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'agribusinessoverview/cropprice', loadChildren: 'app/business-intelligence/businessenviroment/crop-economics/main-crop-indicator/crop-price.module#CropPriceModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'metadatamapping', loadChildren: 'app/admin/mapping.module#MappingModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'metadatamanagement', loadChildren: 'app/admin/metadata.module#MetadataModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'manageuserauthentication', loadChildren: 'app/admin/manage-user-authorization.module#ManageUserAuthorizationModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'addnewuser', loadChildren: 'app/admin/add-new-user.module#AddNewUserModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'updateglossary', loadChildren: 'app/admin/glossary/addglossary.module#AddGlossaryModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'useranalytics', loadChildren: 'app/admin/useranalytics/useranalytics.module#UserAnalyticsModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'viewglossary', loadChildren: 'app/admin/glossary/viewglossary.module#ViewGlossaryModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'uploaddata', loadChildren: 'app/admin/upload-data/upload-data.module#UploadDataModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'subscription', loadChildren: 'app/subscription/subscription.module#SubscriptionModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'query/:action', loadChildren: 'app/query/query.module#QueryModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'aboutportal', loadChildren: 'app/about-portal/about-portal.module#AboutPortalModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'aboutteam', loadChildren: 'app/about-team/about-team.module#AboutTeamModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'recentdocs', loadChildren: 'app/knowledge-management/km-recent-docs.module#KmRecentDocsModule', canActivate: [auth_guard_1.AuthGuard] },
            { path: 'authorise', loadChildren: 'app/admin/authorise/authorise.module#AuthoriseModule', canActivate: [auth_guard_1.AuthGuard] },
        ]
    }
];
exports.Routing = router_1.RouterModule.forRoot(exports.appRoutes);
//# sourceMappingURL=app.routing.js.map