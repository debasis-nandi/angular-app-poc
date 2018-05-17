"use strict";
var Constants = (function () {
    function Constants() {
    }
    Constants.devEnvironment = 'Dev';
    Constants.qaEnvironment = 'Test1';
    Constants.uatEnvironment = 'UAT';
    Constants.noInsightText = 'Admin will add insights here.';
    Constants.noInsightDate = 'Not available';
    return Constants;
}());
exports.Constants = Constants;
var GlobalConfig = (function () {
    function GlobalConfig() {
    }
    //AAD configs EVS******END
    //    //AAD configs EVS Test******Start
    //public static tenant: string = 'synclientaad.com';
    //public static clientId: string = 'b6bff3cb-877f-4fa0-9b1a-b068eddfd518';
    //public static redirectUri: string = window.location.origin + '/';
    //public static postLogoutRedirectUri: string = window.location.origin + '/';
    //    //AAD configs EVS Test******END
    //AAD configs Syngenta******Start
    //public static tenant: string = 'syngenta.com';
    //public static clientId: string = '5b7b768d-1c8c-43ec-b10c-62ac6953cb65';
    //public static redirectUri: string = window.location.origin + '/';
    //public static postLogoutRedirectUri: string = window.location.origin + '/';
    //AAD configs Syngenta******END
    GlobalConfig.adalConfig = function () {
        return {
            tenant: GlobalConfig.tenant,
            clientId: GlobalConfig.clientId,
            redirectUri: GlobalConfig.redirectUri,
            postLogoutRedirectUri: GlobalConfig.postLogoutRedirectUri
        };
    };
    //All Api's EndPoints
    GlobalConfig.baseEndpont = 'http://localhost:56833/';
    GlobalConfig.baseEndpointExport = 'http://localhost:51757/';
    GlobalConfig.baseElasticEndPoint = 'http://evs01tst05/SyngentaElasticAPI/';
    GlobalConfig.baseDownLoadedEndPoint = 'http://localhost:51757/ExcelExportedData/';
    //public static baseEndpont: string = 'http://evs01tst05/SyngentaAPI/';
    GlobalConfig.docdownloadlink = 'http://evs01tst05/syngenta/#/layout/filesearch/';
    //TinyMCE styling on Snapshot page.
    GlobalConfig.bootstrapMin = 'app/assets/style/bootstrap.min.css';
    GlobalConfig.styleCss = 'app/assets/style/style.css';
    GlobalConfig.tinyMceJs = '/node_modules/tinymce/tinymce.js';
    //Pinterest JS
    GlobalConfig.PInterest_Grid_Uri = "app/assets/script/pinterest_grid.js";
    GlobalConfig.faqFileName = "FAQs.pdf";
    GlobalConfig.adminGuideFileName = "adminGuide.pdf";
    //Images Path
    GlobalConfig.mYPageGoodGrowth = 'app/assets/images/the_good_growth.png';
    GlobalConfig.mYPageHomeText = 'app/assets/images/home_text.png';
    GlobalConfig.quickStartGuideFileName = 'QuickStartGuide.pdf';
    GlobalConfig.loginLogo = '/src/app/assets/images/logo.PNG';
    GlobalConfig.layoutSyngentaLogo = '/src/app/assets/images/logo.png';
    GlobalConfig.layoutSyngentaLogoMobile = '/src/app/assets/images/logo-mob.png';
    GlobalConfig.ProfilePicImgURL = '/src/app/assets/images/profile-pic.png';
    GlobalConfig.kpiDataEndpoint = 'api/CiHome/GetPostPageData';
    GlobalConfig.saveInsight = 'api/Insight/Post';
    GlobalConfig.getInsight = 'api/ViewInsight/ViewInsightList';
    GlobalConfig.saveFootnote = 'api/PageFootnote/UpdatePageFootnote';
    GlobalConfig.getFootnote = 'api/PageFootnote/GetPageFootnote';
    GlobalConfig.snapshotPageLoad = 'api/CiSnapshot/GetPageData';
    GlobalConfig.updateSnapshotDescription = 'api/CiSnapshotDesc/UpdateSnapshotDescription';
    GlobalConfig.cropsKpiDataEndpoint = 'api/BeCropKpi/GetPostPageData';
    GlobalConfig.menuApi = 'api/Menu/GetMenuItems/?Role={0}';
    GlobalConfig.competitorPagesApi = 'api/cifinancials/pagebind';
    GlobalConfig.loginApi = 'api/CropCorn/Login';
    GlobalConfig.adminformsApi = 'api/Forms';
    GlobalConfig.getUserProfile = 'api/UserProfile/GetUserProfile';
    GlobalConfig.userAnalyticsApi = 'api/UserTracking/SaveAnalytics';
    GlobalConfig.getUserAnalytics = 'api/UserTracking/GetUserAnalytics';
    GlobalConfig.eventCalendarSave = 'api/EventCalendar/SaveEvent';
    GlobalConfig.eventCalendarGet = 'api/EventCalendar/getData';
    GlobalConfig.eventCalendarDelete = 'api/EventCalendar/deleteData';
    GlobalConfig.emailApi = 'api/Email/sendmail';
    GlobalConfig.DownloadDocApi = 'api/ExcelExport/OnDownloadDoc';
    GlobalConfig.favouritesApi = 'api/Favourites/saveFavourites';
    // public static mailAddressTrail = 'syngenta.com';
    GlobalConfig.mailAddressTrail = 'evalueserve.com';
    GlobalConfig.CiNewsApi = 'api/CiNews/get';
    GlobalConfig.GetUrlExists = 'api/CiNews/GetUrlExists';
    GlobalConfig.CiCompetitorReportApi = 'api/CiCompetitorReport/GetPageData';
    GlobalConfig.CiCompetitorReportget = 'api/CiCompetitorReport/get';
    //public static CiNewsApi: string = 'api/CiNews/GetPageData';
    GlobalConfig.role = '';
    // public static username: string = '';
    GlobalConfig.environment = Constants.devEnvironment;
    GlobalConfig.rowsPerPage = 10; // used in unified search result rendering
    GlobalConfig.maxCharLimit = 100; // used to show and hide large text in km section
    GlobalConfig.maxUploadedFileSize = 100000000;
    GlobalConfig.glossaryloadcount = 20;
    GlobalConfig.maxUploadedDataFileSize = 10000000;
    GlobalConfig.competitiveLandscapeModule = 9;
    GlobalConfig.cprDocumentType = 3;
    GlobalConfig.rawDataDocumentType = 46;
    GlobalConfig.insightExportTitle = '<p style="text-align:center;"><strong>Insights</strong></p><br/>';
    GlobalConfig.isfooterArrowDown = true;
    GlobalConfig.isFooterInDisplayMode = true;
    GlobalConfig.hideFooter = ['useranalytics', 'updateglossary', 'metadatamanagement', 'metadatamapping', 'subscription', 'query', 'search', 'kmupload', 'viewglossary', 'aboutportal', 'aboutteam', 'authorise', 'uploaddata', 'recentdocs'];
    GlobalConfig.elasticUnifiedSearchEndpoint = 'api/elastic?searchterm={0}&pagesize={1}';
    GlobalConfig.elasticUnifiedfileSearchEndpoint = 'api/elastic?searchterm={0}';
    GlobalConfig.elasticTypeWiseSearchEndpoint = 'api/elastic?searchterm={0}&Type={1}&pagesize={2}&pagenumber={3}';
    GlobalConfig.elasticKMSearchEndpoint = 'api/elastic?pagesize={0}&pagenumber={1}&DocType={2}';
    GlobalConfig.kmPageBindApi = 'api/KmPage/PageBind';
    GlobalConfig.kmUploadPageBindApi = 'api/KmPage/UploadPageBind';
    GlobalConfig.getCountryOnRegionApi = 'api/KmPage/GetCountryOnRegion?RegionList={0}';
    GlobalConfig.kmSearchApi = 'api/KmPage/OnKmSearch';
    GlobalConfig.ExcelExportAPI = 'api/ExcelExport/ExcelPath';
    //User subscription
    GlobalConfig.saveUserSubscription = 'api/UserSubscription/SaveUserSubscription';
    GlobalConfig.getUserSubscription = 'api/UserSubscription/GetUserSubscription';
    GlobalConfig.removeUserSubscription = 'api/UserSubscription/RemoveUserSubscription';
    //User authorise
    GlobalConfig.updateAuthoriseUser = 'api/Authorise/UpdateUser';
    GlobalConfig.getUserAuthorisePageData = 'api/Authorise/GetPageData';
    //KM File Folder Path
    GlobalConfig.kmSaveUploadDocApi = 'api/KmUploadDoc/OnKmUploadDoc';
    GlobalConfig.kmSaveDownloadDocApi = 'api/KmUploadDoc/OnKmDownloadDoc';
    GlobalConfig.querySaveApi = 'api/Query/SaveQuery';
    GlobalConfig.queryGetApi = 'api/Query/GetQuery?User={0}';
    GlobalConfig.updateGlossary = 'api/Glossary/UpdateGlossary';
    GlobalConfig.countalphabeticallyGlossary = 'api/Glossary/CountTermsAlbhabeticallyGlossary';
    GlobalConfig.viewGlossary = 'api/Glossary/getterms';
    GlobalConfig.deleteGlossary = 'api/Glossary/deleteterms';
    GlobalConfig.uploadDataPageBindApi = 'api/UploadData/GetPageData';
    GlobalConfig.uploadDataFileApi = 'api/UploadData/OnUploadData';
    GlobalConfig.uploadDataTemplateDownloadApi = 'api/UploadData/OnUploadDataTemplateDownload?FileName={0}';
    GlobalConfig.DownloadErroFileApi = 'api/UploadData/OnDownloadErrorFile?ErrorFileName={0}';
    GlobalConfig.getNotificationApi = 'api/UserNotification/GetUserNotification?UserId={0}';
    GlobalConfig.setNotificationApi = 'api/UserNotification/OnSetNotification';
    GlobalConfig.getPortalInfoApi = 'api/AboutPortal/GetAboutPortal';
    GlobalConfig.updatePortalInfoApi = 'api/AboutPortal/UpdateAboutPortal';
    GlobalConfig.getTeamInfoApi = 'api/AboutTeam/GetAboutTeam';
    GlobalConfig.updateTeamInfoApi = 'api/AboutTeam/UpdateAboutTeam';
    GlobalConfig.getRecentUploadedDocs = 'api/KmPage/GetRecentUploadedDocs';
    GlobalConfig.shakeHandWithAAD = 'api/CiFinancials/shakeHandWithAAD';
    GlobalConfig.getSetUserInfoApi = 'api/Login/SetGetUserInfo';
    GlobalConfig.getSyngentaUserIdByAADEmailId = 'api/CiFinancials/GetSyngentaUserIdByAADEmailId';
    GlobalConfig.killUserTokenApi = 'api/Login/KillUserToken';
    GlobalConfig.urlForMyPage = 'http://localhost:55099/src/#/layout/mypage/';
    GlobalConfig.urlForBridgeToMyPage = 'http://localhost:55099/src/#/BridgeToMyPage/';
    GlobalConfig.kmEditDocumentApi = 'api/KmPage/GetDocumentDetailsById';
    GlobalConfig.kmDeleteDocumentApi = 'api/KmUploadDoc/DeleteDocument';
    //AAD configs EVS Dev******Start
    GlobalConfig.tenant = 'synclientaad.com';
    GlobalConfig.clientId = 'f95c8fe3-3a4b-436e-826b-156f26dc8bff';
    GlobalConfig.redirectUri = window.location.origin + '/';
    GlobalConfig.postLogoutRedirectUri = window.location.origin + '/';
    GlobalConfig.isAadAuth = true;
    return GlobalConfig;
}());
exports.GlobalConfig = GlobalConfig;
var Page = (function () {
    function Page() {
    }
    Page.cikpi = 'CompetitorsKPIPage';
    Page.cisnap = 'CiSnapshot';
    Page.ciFinancials = 'CiFinancials';
    Page.ciFinancialsRatio = 'CiFinancialsRatio';
    Page.ciCompetitorReports = 'CompetitorReport';
    Page.myPage = 'MyPage';
    Page.myPageWidgetFilter = 'MyPageWidgetFilter';
    Page.competitorComparison = 'CompetitorComparison';
    Page.ciNews = 'CiNews';
    Page.macroeconomicsIndicators = 'MacroEconomicsIndicator';
    Page.macroeconomicsCurrencyBasket = 'MacroEconomicsCurrencyBasket';
    Page.agribusinessOverview = 'AgribusinessOverview';
    Page.majorargochemicalandseeds = 'Major AgroChemicals and Seeds';
    Page.biofuels = 'Biofuels';
    Page.commodityPrice = 'CommodityPrice';
    Page.cropComparison = 'CropComparison';
    Page.cropIndicatorOverview = 'CropIndicatorOverview';
    Page.cropIndicatorUSPrice = 'CropIndicatorUSPrice';
    Page.MainCropIndicator = 'MainCropIndicator';
    Page.MacroEconomicsIndicator = 'MacroEconomicsIndicator';
    Page.KmSearch = 'KmSearch';
    Page.KmUpload = 'KmUpload';
    Page.Search = 'Search';
    Page.Query = 'Query';
    Page.UserAnalytics = 'UserAnalytics';
    return Page;
}());
exports.Page = Page;
var TemplateType = (function () {
    function TemplateType() {
    }
    TemplateType.news = 'other';
    TemplateType.charts = 'chart';
    return TemplateType;
}());
exports.TemplateType = TemplateType;
var DocType = (function () {
    function DocType() {
    }
    DocType.doc = 'doc';
    DocType.docx = 'docx';
    DocType.pdf = 'pdf';
    DocType.csv = 'csv';
    DocType.xls = 'xls';
    DocType.xlsx = 'xlsx';
    DocType.ppt = 'ppt';
    DocType.pptx = 'pptx';
    DocType.png = 'png';
    DocType.jpg = 'jpg';
    DocType.jpeg = 'jpeg';
    DocType.gif = 'gif';
    DocType.msg = 'msg';
    DocType.txt = 'txt';
    return DocType;
}());
exports.DocType = DocType;
var ExportLevel = (function () {
    function ExportLevel() {
    }
    ExportLevel.Chart = 1;
    ExportLevel.Page = 2;
    return ExportLevel;
}());
exports.ExportLevel = ExportLevel;
//# sourceMappingURL=global.config.js.map