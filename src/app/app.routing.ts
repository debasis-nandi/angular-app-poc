import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { OAuthCallbackComponent } from './adal-service/OAuthCallbackComponent';
import { OAuthCallbackHandler } from './adal-service/OAuthCallbackHandler';
import { BridgeToMyPageComponent } from './BridgeToMyPage/BridgeToMyPage.component';


export const appRoutes: Routes = [
    { path: 'id_token', component: OAuthCallbackComponent, canActivate: [OAuthCallbackHandler] },
    //{ path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '', loadChildren: 'app/login/login.module#LoginModule' },
    { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
    { path: 'BridgeToMyPage', component: BridgeToMyPageComponent },
    {
        path: 'layout', component: LayoutComponent, 
        children: [
            { path: 'mypage', loadChildren: 'app/mypage/mypage.module#MyPageModule', canActivate: [AuthGuard] },
            { path: 'competitorcomparison', loadChildren: 'app/business-intelligence/competitive-landscape/competitor-comparison/competitor-comparison.module#CompetitorComparisonModule', canActivate: [AuthGuard] },
            { path: 'majoragroandseeds', loadChildren: 'app/business-intelligence/competitive-landscape/major-agrochemicals-seeds/major-agrochemicals-seeds.module#MajorAgrochemicalsSeedsModule', canActivate: [AuthGuard] },
            { path: 'majoragroandseeds/massnapshot', loadChildren: 'app/business-intelligence/competitive-landscape/major-agrochemicals-seeds/mas-snapshot.module#MASSnapshotModule', canActivate: [AuthGuard] },
            { path: 'majoragroandseeds/masfinancials', loadChildren: 'app/business-intelligence/competitive-landscape/major-agrochemicals-seeds/mas-financials.module#MASFinancialsModule', canActivate: [AuthGuard] },
            { path: 'majoragroandseeds/masfinancialsratio', loadChildren: 'app/business-intelligence/competitive-landscape/major-agrochemicals-seeds/mas-financials-ratio.module#MASFinancialsRatioModule', canActivate: [AuthGuard] },
            { path: 'search/:para', loadChildren: 'app/search/search.module#SearchModule', canActivate: [AuthGuard] },
            { path: 'filesearch/:filepara', loadChildren: 'app/search/search.module#SearchModule', canActivate: [AuthGuard] },
            { path: 'majoragroandseeds/masnews', loadChildren: 'app/business-intelligence/competitive-landscape/major-agrochemicals-seeds/mas-news.module#MASNewsModule', canActivate: [AuthGuard] },
            { path: 'majoragroandseeds/competitorreport', loadChildren: 'app/business-intelligence/competitive-landscape/major-agrochemicals-seeds/mas-competitorreports.module#MASCompetitorReportModule', canActivate: [AuthGuard] },
            { path: 'knowledgemanagement', redirectTo: 'kmsearch', pathMatch: 'full' },
            { path: 'kmsearch', loadChildren: 'app/knowledge-management/km-search.module#KmSearchModule', canActivate: [AuthGuard] },
            { path: 'kmsearch/:para', loadChildren: 'app/knowledge-management/km-search.module#KmSearchModule', canActivate: [AuthGuard] },
            { path: 'kmadvancedsearch/:advancedsearchpara', loadChildren: 'app/knowledge-management/km-search.module#KmSearchModule', canActivate: [AuthGuard] },
            { path: 'kmupload', loadChildren: 'app/knowledge-management/km-upload-doc.module#KmUploadDocModule', canActivate: [AuthGuard] },
            { path: 'economicindicators', loadChildren: 'app/business-intelligence/macroeconomics/economic-indicators.module#EconomicIndicatorsModule', canActivate: [AuthGuard] },
            { path: 'currencybasket', loadChildren: 'app/business-intelligence/macroeconomics/currency-basket.module#CurrencyBasketModule', canActivate: [AuthGuard] },
            { path: 'maincropindicator', loadChildren: 'app/business-intelligence/businessenviroment/crop-economics/main-crop-indicator/main-crop-indicator.module#MainCropIndicatorModule', canActivate: [AuthGuard] },
            //{ path: 'maincropindicator', loadChildren: 'app/business-intelligence/competitive-landscape/major-agrochemicals-seeds/major-agrochemicals-seeds.module#MajorAgrochemicalsSeedsModule' }
            { path: 'agribusinessoverview', loadChildren: 'app/business-intelligence/businessenviroment/agribusiness-overview/agribusiness-overview.module#AgribusinessOverviewModule', canActivate: [AuthGuard] },
            { path: 'biofuels', loadChildren: 'app/business-intelligence/businessenviroment/biofuels/biofuels.module#BiofuelsModule', canActivate: [AuthGuard] },
            { path: 'commodityprice', loadChildren: 'app/business-intelligence/businessenviroment/crop-economics/comodity-price/commodity-price.module#CommodityPriceModule', canActivate: [AuthGuard] },
            { path: 'cropcomparison', loadChildren: 'app/business-intelligence/businessenviroment/crop-economics/crop-comparison/crop-comparison.module#CropComparisonModule', canActivate: [AuthGuard] },
            { path: 'agribusinessoverview/cropoverview', loadChildren: 'app/business-intelligence/businessenviroment/crop-economics/main-crop-indicator/crop-overview.module#CropOverviewModule', canActivate: [AuthGuard] },
            { path: 'agribusinessoverview/cropprice', loadChildren: 'app/business-intelligence/businessenviroment/crop-economics/main-crop-indicator/crop-price.module#CropPriceModule', canActivate: [AuthGuard] },
            { path: 'metadatamapping', loadChildren: 'app/admin/mapping.module#MappingModule', canActivate: [AuthGuard] },
            { path: 'metadatamanagement', loadChildren: 'app/admin/metadata.module#MetadataModule', canActivate: [AuthGuard] },
            { path: 'manageuserauthentication', loadChildren: 'app/admin/manage-user-authorization.module#ManageUserAuthorizationModule', canActivate: [AuthGuard] },
            { path: 'addnewuser', loadChildren: 'app/admin/add-new-user.module#AddNewUserModule', canActivate: [AuthGuard] },
            { path: 'updateglossary', loadChildren: 'app/admin/glossary/addglossary.module#AddGlossaryModule', canActivate: [AuthGuard] },
            { path: 'useranalytics', loadChildren: 'app/admin/useranalytics/useranalytics.module#UserAnalyticsModule', canActivate: [AuthGuard] },
            { path: 'viewglossary', loadChildren: 'app/admin/glossary/viewglossary.module#ViewGlossaryModule', canActivate: [AuthGuard] },
            { path: 'uploaddata', loadChildren: 'app/admin/upload-data/upload-data.module#UploadDataModule', canActivate: [AuthGuard] },
            { path: 'subscription', loadChildren: 'app/subscription/subscription.module#SubscriptionModule', canActivate: [AuthGuard] },
            { path: 'query/:action', loadChildren: 'app/query/query.module#QueryModule', canActivate: [AuthGuard] },
            { path: 'aboutportal', loadChildren: 'app/about-portal/about-portal.module#AboutPortalModule', canActivate: [AuthGuard] },
            { path: 'aboutteam', loadChildren: 'app/about-team/about-team.module#AboutTeamModule', canActivate: [AuthGuard] },
            { path: 'recentdocs', loadChildren: 'app/knowledge-management/km-recent-docs.module#KmRecentDocsModule', canActivate: [AuthGuard] },
            { path: 'authorise', loadChildren: 'app/admin/authorise/authorise.module#AuthoriseModule', canActivate: [AuthGuard] },
        ]
    }
];

export const Routing = RouterModule.forRoot(appRoutes);
