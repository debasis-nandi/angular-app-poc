
export class Constants {
    public static devEnvironment: string = 'Dev';
    public static qaEnvironment: string = 'Test1';
    public static uatEnvironment: string = 'UAT';
    public static noInsightText: string = 'Admin will add insights here.';
    public static noInsightDate: string = 'Not available';
}

export class GlobalConfig {

    //All Api's EndPoints
    public static baseEndpont: string = 'http://localhost:56833/';
    public static baseEndpointExport: string = 'http://localhost:51757/';
    public static baseElasticEndPoint: string = 'http://evs01tst05/SyngentaElasticAPI/';
    public static baseDownLoadedEndPoint: string = 'http://localhost:51757/ExcelExportedData/';

    //public static baseEndpont: string = 'http://evs01tst05/SyngentaAPI/';
    public static docdownloadlink: string = 'http://evs01tst05/syngenta/#/layout/filesearch/';

    //TinyMCE styling on Snapshot page.
    public static bootstrapMin: string = 'app/assets/style/bootstrap.min.css';
    public static styleCss: string = 'app/assets/style/style.css';
    public static tinyMceJs: string = '/node_modules/tinymce/tinymce.js';

    //Pinterest JS
    public static PInterest_Grid_Uri: string = "app/assets/script/pinterest_grid.js";

    public static faqFileName: string = "FAQs.pdf";
    public static adminGuideFileName: string = "adminGuide.pdf";
    //Images Path
    public static mYPageGoodGrowth: string = 'app/assets/images/the_good_growth.png';
    public static mYPageHomeText: string = 'app/assets/images/home_text.png';
    public static quickStartGuideFileName: string = 'QuickStartGuide.pdf';

    public static loginLogo: string = '/src/app/assets/images/logo.PNG';

    public static layoutSyngentaLogo: string = '/src/app/assets/images/logo.png';
    public static layoutSyngentaLogoMobile: string = '/src/app/assets/images/logo-mob.png';
    public static ProfilePicImgURL: string = '/src/app/assets/images/profile-pic.png';
        

    public static kpiDataEndpoint: string = 'api/CiHome/GetPostPageData';
    public static saveInsight: string = 'api/Insight/Post';
    public static getInsight: string = 'api/ViewInsight/ViewInsightList';
    public static saveFootnote: string = 'api/PageFootnote/UpdatePageFootnote';
    public static getFootnote: string = 'api/PageFootnote/GetPageFootnote';
    public static snapshotPageLoad: string = 'api/CiSnapshot/GetPageData';
    public static updateSnapshotDescription: string = 'api/CiSnapshotDesc/UpdateSnapshotDescription';
    public static cropsKpiDataEndpoint: string = 'api/BeCropKpi/GetPostPageData';
    public static menuApi: string = 'api/Menu/GetMenuItems/?Role={0}';
    public static competitorPagesApi: string = 'api/cifinancials/pagebind';
    public static loginApi: string = 'api/CropCorn/Login';
    public static adminformsApi: string = 'api/Forms';
    public static getUserProfile: string = 'api/UserProfile/GetUserProfile';
    public static userAnalyticsApi: string = 'api/UserTracking/SaveAnalytics';
    public static getUserAnalytics: string = 'api/UserTracking/GetUserAnalytics';

    public static eventCalendarSave: string = 'api/EventCalendar/SaveEvent';
    public static eventCalendarGet: string = 'api/EventCalendar/getData';
    public static eventCalendarDelete: string = 'api/EventCalendar/deleteData';
    public static emailApi: string = 'api/Email/sendmail';
    public static DownloadDocApi: string = 'api/ExcelExport/OnDownloadDoc';
    public static favouritesApi: string = 'api/Favourites/saveFavourites';
   // public static mailAddressTrail = 'syngenta.com';
    public static mailAddressTrail = 'evalueserve.com';
    public static CiNewsApi: string = 'api/CiNews/get';
    public static GetUrlExists: string = 'api/CiNews/GetUrlExists';
    public static CiCompetitorReportApi: string = 'api/CiCompetitorReport/GetPageData';
    public static CiCompetitorReportget: string = 'api/CiCompetitorReport/get';
    //public static CiNewsApi: string = 'api/CiNews/GetPageData';
    public static role: string = '';
    // public static username: string = '';
    public static environment: string = Constants.devEnvironment;
    public static kpiFilterState: any;
    public static kpiActionState: any;
    public static snapFilterState: any;
    public static snapActionState: any;
    public static rowsPerPage: number = 10; // used in unified search result rendering
    public static maxCharLimit: number = 100; // used to show and hide large text in km section
    public static maxUploadedFileSize: number = 100000000;
    public static glossaryloadcount: number = 20;
    public static maxUploadedDataFileSize: number = 10000000;
    public static competitiveLandscapeModule: number = 9;
    public static cprDocumentType: number = 3;
    public static rawDataDocumentType: number = 46;
    public static insightExportTitle: string = '<p style="text-align:center;"><strong>Insights</strong></p><br/>';
    public static isfooterArrowDown: boolean = true;
    public static isFooterInDisplayMode: boolean = true;
    public static hideFooter: string[] = ['useranalytics', 'updateglossary', 'metadatamanagement', 'metadatamapping', 'subscription', 'query', 'search', 'kmupload', 'viewglossary', 'aboutportal', 'aboutteam', 'authorise', 'uploaddata','recentdocs'];

    public static elasticUnifiedSearchEndpoint: string = 'api/elastic?searchterm={0}&pagesize={1}';
    public static elasticUnifiedfileSearchEndpoint: string = 'api/elastic?searchterm={0}';
    public static elasticTypeWiseSearchEndpoint: string = 'api/elastic?searchterm={0}&Type={1}&pagesize={2}&pagenumber={3}';
    public static elasticKMSearchEndpoint: string = 'api/elastic?pagesize={0}&pagenumber={1}&DocType={2}';

    public static kmPageBindApi: string = 'api/KmPage/PageBind';
    public static kmUploadPageBindApi: string = 'api/KmPage/UploadPageBind';
    public static getCountryOnRegionApi: string = 'api/KmPage/GetCountryOnRegion?RegionList={0}';
    public static kmSearchApi: string = 'api/KmPage/OnKmSearch';

    public static ExcelExportAPI: string = 'api/ExcelExport/ExcelPath';
    //User subscription
    public static saveUserSubscription: string = 'api/UserSubscription/SaveUserSubscription';
    public static getUserSubscription: string = 'api/UserSubscription/GetUserSubscription';
    public static removeUserSubscription: string = 'api/UserSubscription/RemoveUserSubscription';

    //User authorise
    public static updateAuthoriseUser: string = 'api/Authorise/UpdateUser';
    public static getUserAuthorisePageData: string = 'api/Authorise/GetPageData';

    //KM File Folder Path
    public static kmSaveUploadDocApi: string = 'api/KmUploadDoc/OnKmUploadDoc';
    public static kmSaveDownloadDocApi: string = 'api/KmUploadDoc/OnKmDownloadDoc';
    public static querySaveApi: string = 'api/Query/SaveQuery';
    public static queryGetApi: string = 'api/Query/GetQuery?User={0}';
    public static updateGlossary: string = 'api/Glossary/UpdateGlossary';
    public static countalphabeticallyGlossary: string = 'api/Glossary/CountTermsAlbhabeticallyGlossary';
    public static viewGlossary: string = 'api/Glossary/getterms';
    public static deleteGlossary: string = 'api/Glossary/deleteterms';
    public static uploadDataPageBindApi: string = 'api/UploadData/GetPageData';
    public static uploadDataFileApi: string = 'api/UploadData/OnUploadData';
    public static uploadDataTemplateDownloadApi: string = 'api/UploadData/OnUploadDataTemplateDownload?FileName={0}';
    public static DownloadErroFileApi: string = 'api/UploadData/OnDownloadErrorFile?ErrorFileName={0}';
    public static getNotificationApi: string = 'api/UserNotification/GetUserNotification?UserId={0}';
    public static setNotificationApi: string = 'api/UserNotification/OnSetNotification';
    public static getPortalInfoApi: string = 'api/AboutPortal/GetAboutPortal';
    public static updatePortalInfoApi: string = 'api/AboutPortal/UpdateAboutPortal';
    public static getTeamInfoApi: string = 'api/AboutTeam/GetAboutTeam';
    public static updateTeamInfoApi: string = 'api/AboutTeam/UpdateAboutTeam';
    public static getRecentUploadedDocs: string = 'api/KmPage/GetRecentUploadedDocs';
    public static shakeHandWithAAD: string = 'api/CiFinancials/shakeHandWithAAD';
    public static getSetUserInfoApi: string = 'api/Login/SetGetUserInfo';
    public static getSyngentaUserIdByAADEmailId: string = 'api/CiFinancials/GetSyngentaUserIdByAADEmailId';
    public static killUserTokenApi: string = 'api/Login/KillUserToken';
    public static urlForMyPage: string = 'http://localhost:55099/src/#/layout/mypage/'; 
    public static urlForBridgeToMyPage: string = 'http://localhost:55099/src/#/BridgeToMyPage/'; 

    public static kmEditDocumentApi: string = 'api/KmPage/GetDocumentDetailsById';
    public static kmDeleteDocumentApi: string = 'api/KmUploadDoc/DeleteDocument';

    //AAD configs EVS Dev******Start
    public static tenant: string = 'synclientaad.com';
    public static clientId: string = 'f95c8fe3-3a4b-436e-826b-156f26dc8bff';
    public static redirectUri: string = window.location.origin + '/';
    public static postLogoutRedirectUri: string = window.location.origin + '/';
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

    public static adalConfig(): any {
        return {
            tenant: GlobalConfig.tenant,
            clientId: GlobalConfig.clientId,
            redirectUri: GlobalConfig.redirectUri,
            postLogoutRedirectUri: GlobalConfig.postLogoutRedirectUri
        };
    }

    public static isAadAuth: boolean = true;
}

export class Page {
    public static cikpi: string = 'CompetitorsKPIPage';
    public static cisnap: string = 'CiSnapshot'
    public static ciFinancials: string = 'CiFinancials'
    public static ciFinancialsRatio: string = 'CiFinancialsRatio'
    public static ciCompetitorReports: string = 'CompetitorReport'
    public static myPage: string = 'MyPage'
    public static myPageWidgetFilter: string = 'MyPageWidgetFilter'
    public static competitorComparison = 'CompetitorComparison'
    public static ciNews = 'CiNews'
    public static macroeconomicsIndicators = 'MacroEconomicsIndicator'
    public static macroeconomicsCurrencyBasket = 'MacroEconomicsCurrencyBasket'
    public static agribusinessOverview = 'AgribusinessOverview'
    public static majorargochemicalandseeds = 'Major AgroChemicals and Seeds'
    public static biofuels = 'Biofuels'
    public static commodityPrice = 'CommodityPrice'
    public static cropComparison = 'CropComparison'
    public static cropIndicatorOverview = 'CropIndicatorOverview'
    public static cropIndicatorUSPrice = 'CropIndicatorUSPrice'
    public static MainCropIndicator = 'MainCropIndicator'
    public static MacroEconomicsIndicator = 'MacroEconomicsIndicator'
    public static KmSearch = 'KmSearch'
    public static KmUpload = 'KmUpload'
    public static Search = 'Search'
    public static Query = 'Query'
    public static UserAnalytics = 'UserAnalytics'
}

export class TemplateType {
    public static news: string = 'other';
    public static charts: string = 'chart';
}

export class DocType {
    public static doc: string = 'doc';
    public static docx: string = 'docx';
    public static pdf: string = 'pdf';
    public static csv: string = 'csv';
    public static xls: string = 'xls';
    public static xlsx: string = 'xlsx';
    public static ppt: string = 'ppt';
    public static pptx: string = 'pptx';
    public static png: string = 'png';
    public static jpg: string = 'jpg';
    public static jpeg: string = 'jpeg';
    public static gif: string = 'gif';
    public static msg: string = 'msg';
    public static txt: string = 'txt';
}

export class ExportLevel {
    public static Chart: number = 1;
    public static Page: number = 2;
}