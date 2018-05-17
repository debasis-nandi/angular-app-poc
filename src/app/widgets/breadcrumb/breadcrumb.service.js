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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
var BreadCrumbService = (function () {
    function BreadCrumbService(_http) {
        this._http = _http;
    }
    BreadCrumbService.prototype.getBreadcrumbsLink = function (page) {
        var itemBreadcrumbs = [];
        switch (page) {
            case '/layout/competitorcomparison':
                itemBreadcrumbs.push({ label: 'Business Intelligence', url: '' });
                itemBreadcrumbs.push({ label: 'Competitive Landscape', url: '' });
                itemBreadcrumbs.push({ label: 'Competitor Comparison', url: '' });
                break;
            case '/layout/majoragroandseeds':
                itemBreadcrumbs.push({ label: 'Business Intelligence', url: '' });
                itemBreadcrumbs.push({ label: 'Competitive Landscape', url: '' });
                itemBreadcrumbs.push({ label: 'Major Agrochemicals and Seeds', url: '' });
                break;
            case '/layout/majoragroandseeds/massnapshot':
                itemBreadcrumbs.push({ label: 'Business Intelligence', url: '' });
                itemBreadcrumbs.push({ label: 'Competitive Landscape', url: '' });
                itemBreadcrumbs.push({ label: 'Major Agrochemicals and Seeds', url: '/layout/majoragroandseeds' });
                itemBreadcrumbs.push({ label: 'Snapshot', url: '' });
                break;
            case '/layout/majoragroandseeds/masfinancials':
                itemBreadcrumbs.push({ label: 'Business Intelligence', url: '' });
                itemBreadcrumbs.push({ label: 'Competitive Landscape', url: '' });
                itemBreadcrumbs.push({ label: 'Major Agrochemicals and Seeds', url: '/layout/majoragroandseeds' });
                itemBreadcrumbs.push({ label: 'Financials', url: '' });
                break;
            case '/layout/majoragroandseeds/masfinancialsratio':
                itemBreadcrumbs.push({ label: 'Business Intelligence', url: '' });
                itemBreadcrumbs.push({ label: 'Competitive Landscape', url: '' });
                itemBreadcrumbs.push({ label: 'Major Agrochemicals and Seeds', url: '/layout/majoragroandseeds' });
                itemBreadcrumbs.push({ label: 'Financial Ratios', url: '' });
                break;
            case '/layout/majoragroandseeds/masnews':
                itemBreadcrumbs.push({ label: 'Business Intelligence', url: '' });
                itemBreadcrumbs.push({ label: 'Competitive Landscape', url: '' });
                itemBreadcrumbs.push({ label: 'Major Agrochemicals and Seeds', url: '/layout/majoragroandseeds' });
                itemBreadcrumbs.push({ label: 'News', url: '' });
                break;
            case '/layout/majoragroandseeds/competitorreport':
                itemBreadcrumbs.push({ label: 'Business Intelligence', url: '' });
                itemBreadcrumbs.push({ label: 'Competitive Landscape', url: '' });
                itemBreadcrumbs.push({ label: 'Major Agrochemicals and Seeds', url: '/layout/majoragroandseeds' });
                itemBreadcrumbs.push({ label: 'CompetitorReports', url: '' });
                break;
            case '/layout/kmsearch':
                itemBreadcrumbs.push({ label: 'Knowledge Management', url: '' });
                itemBreadcrumbs.push({ label: 'Search', url: '' });
                break;
            case '/layout/kmupload':
                itemBreadcrumbs.push({ label: 'Knowledge Management', url: '/layout/kmsearch' });
                itemBreadcrumbs.push({ label: 'Upload Documents', url: '' });
                break;
            case '/layout/maincropindicator':
                itemBreadcrumbs.push({ label: 'Business Intelligence', url: '' });
                itemBreadcrumbs.push({ label: 'Business Environment', url: '' });
                itemBreadcrumbs.push({ label: 'Crop Economics', url: '' });
                itemBreadcrumbs.push({ label: 'Main Crop Indicator', url: '' });
                break;
            case '/layout/metadatamanagement':
                itemBreadcrumbs.push({ label: 'Admin', url: '' });
                itemBreadcrumbs.push({ label: 'Metadata Management', url: '' });
                itemBreadcrumbs.push({ label: 'Master Data', url: '/layout/metadatamanagement' });
                break;
            case '/layout/metadatamanagement/segment':
                itemBreadcrumbs.push({ label: 'Admin', url: '' });
                itemBreadcrumbs.push({ label: 'Metadata Management', url: '' });
                itemBreadcrumbs.push({ label: 'Master Data', url: '/layout/metadatamanagement' });
                itemBreadcrumbs.push({ label: 'Segment', url: '/layout/metadatamanagement/segment' });
                break;
            case '/layout/metadatamanagement/region':
                itemBreadcrumbs.push({ label: 'Admin', url: '' });
                itemBreadcrumbs.push({ label: 'Metadata Management', url: '' });
                itemBreadcrumbs.push({ label: 'Master Data', url: '/layout/metadatamanagement' });
                itemBreadcrumbs.push({ label: 'Region', url: '/layout/metadatamanagement/region' });
                break;
            case '/layout/metadatamanagement/newstype':
                itemBreadcrumbs.push({ label: 'Admin', url: '' });
                itemBreadcrumbs.push({ label: 'Metadata Management', url: '' });
                itemBreadcrumbs.push({ label: 'Master Data', url: '/layout/metadatamanagement' });
                itemBreadcrumbs.push({ label: 'News Type', url: '/layout/metadatamanagement/newstype' });
                break;
            case '/layout/metadatamanagement/indication':
                itemBreadcrumbs.push({ label: 'Admin', url: '' });
                itemBreadcrumbs.push({ label: 'Metadata Management', url: '' });
                itemBreadcrumbs.push({ label: 'Master Data', url: '/layout/metadatamanagement' });
                itemBreadcrumbs.push({ label: 'Indication', url: '/layout/metadatamanagement/indication' });
                break;
            case '/layout/metadatamanagement/documenttype':
                itemBreadcrumbs.push({ label: 'Admin', url: '' });
                itemBreadcrumbs.push({ label: 'Metadata Management', url: '' });
                itemBreadcrumbs.push({ label: 'Master Data', url: '/layout/metadatamanagement' });
                itemBreadcrumbs.push({ label: 'Document Type', url: '/layout/metadatamanagement/documenttype' });
                break;
            case '/layout/metadatamanagement/crop':
                itemBreadcrumbs.push({ label: 'Admin', url: '' });
                itemBreadcrumbs.push({ label: 'Metadata Management', url: '' });
                itemBreadcrumbs.push({ label: 'Master Data', url: '/layout/metadatamanagement' });
                itemBreadcrumbs.push({ label: 'Crops', url: '/layout/metadatamanagement/crop' });
                break;
            case '/layout/metadatamanagement/competitor':
                itemBreadcrumbs.push({ label: 'Admin', url: '' });
                itemBreadcrumbs.push({ label: 'Metadata Management', url: '' });
                itemBreadcrumbs.push({ label: 'Master Data', url: '/layout/metadatamanagement' });
                itemBreadcrumbs.push({ label: 'Competitor', url: '/layout/metadatamanagement/competitor' });
                break;
            case '/layout/metadatamanagement/currencies':
                itemBreadcrumbs.push({ label: 'Admin', url: '' });
                itemBreadcrumbs.push({ label: 'Metadata Management', url: '' });
                itemBreadcrumbs.push({ label: 'Master Data', url: '/layout/metadatamanagement' });
                itemBreadcrumbs.push({ label: 'Basket of Currencies', url: '/layout/metadatamanagement/currencies' });
                break;
            case '/layout/metadatamapping':
                itemBreadcrumbs.push({ label: 'Admin', url: '' });
                itemBreadcrumbs.push({ label: 'Metadata Management', url: '' });
                itemBreadcrumbs.push({ label: 'Mapping', url: '/layout/metadatamapping' });
                break;
            case '/layout/metadatamapping/competitorsegment':
                itemBreadcrumbs.push({ label: 'Admin', url: '' });
                itemBreadcrumbs.push({ label: 'Metadata Management', url: '' });
                itemBreadcrumbs.push({ label: 'Mapping', url: '/layout/metadatamapping' });
                itemBreadcrumbs.push({ label: 'Competitor Segment Mapping', url: '/layout/metadatamapping/competitorsegment' });
                break;
            case '/layout/metadatamapping/competitorregion':
                itemBreadcrumbs.push({ label: 'Admin', url: '' });
                itemBreadcrumbs.push({ label: 'Metadata Management', url: '' });
                itemBreadcrumbs.push({ label: 'Mapping', url: '/layout/metadatamapping' });
                itemBreadcrumbs.push({ label: 'Competitor Region Mapping', url: '/layout/metadatamapping/competitorregion' });
                break;
            case '/layout/metadatamapping/competitorindication':
                itemBreadcrumbs.push({ label: 'Admin', url: '' });
                itemBreadcrumbs.push({ label: 'Metadata Management', url: '' });
                itemBreadcrumbs.push({ label: 'Mapping', url: '/layout/metadatamapping' });
                itemBreadcrumbs.push({ label: 'Competitor Indication Mapping', url: '/layout/metadatamapping/competitorindication' });
                break;
            case '/layout/manageuserauthentication':
                itemBreadcrumbs.push({ label: 'Admin', url: '' });
                itemBreadcrumbs.push({ label: 'Manage User Authorisation', url: '/layout/manageuserauthentication' });
                break;
            case '/layout/addnewuser':
                itemBreadcrumbs.push({ label: 'Admin', url: '' });
                itemBreadcrumbs.push({ label: 'Add User', url: '/layout/addnewuser' });
                break;
            case '/layout/economicindicators':
                itemBreadcrumbs.push({ label: 'Business Intelligence', url: '' });
                itemBreadcrumbs.push({ label: 'Macroeconomics', url: '' });
                itemBreadcrumbs.push({ label: 'Economic Indicators', url: '' });
                break;
            case '/layout/currencybasket':
                itemBreadcrumbs.push({ label: 'Business Intelligence', url: '' });
                itemBreadcrumbs.push({ label: 'Macroeconomics', url: '' });
                itemBreadcrumbs.push({ label: 'Basket of Currencies', url: '' });
                break;
            case '/layout/agribusinessoverview':
                itemBreadcrumbs.push({ label: 'Business Intelligence', url: '' });
                itemBreadcrumbs.push({ label: 'Business Environment', url: '' });
                itemBreadcrumbs.push({ label: 'Agribusiness Overview', url: '' });
                break;
            case '/layout/biofuels':
                itemBreadcrumbs.push({ label: 'Business Intelligence', url: '' });
                itemBreadcrumbs.push({ label: 'Business Environment', url: '' });
                itemBreadcrumbs.push({ label: 'Biofuels', url: '' });
                break;
            case '/layout/agribusinessoverview/cropoverview':
                itemBreadcrumbs.push({ label: 'Business Intelligence', url: '' });
                itemBreadcrumbs.push({ label: 'Business Environment', url: '' });
                itemBreadcrumbs.push({ label: 'Crop Economics', url: '' });
                itemBreadcrumbs.push({ label: 'Main Crop Indicator', url: '/layout/maincropindicator' });
                itemBreadcrumbs.push({ label: 'Crop Indicator', url: '' });
                break;
            case '/layout/agribusinessoverview/cropprice':
                itemBreadcrumbs.push({ label: 'Business Intelligence', url: '' });
                itemBreadcrumbs.push({ label: 'Business Environment', url: '' });
                itemBreadcrumbs.push({ label: 'Crop Economics', url: '' });
                itemBreadcrumbs.push({ label: 'Main Crop Indicator', url: '/layout/maincropindicator' });
                itemBreadcrumbs.push({ label: 'Price Comparison', url: '' });
                break;
            case '/layout/commodityprice':
                itemBreadcrumbs.push({ label: 'Business Intelligence', url: '' });
                itemBreadcrumbs.push({ label: 'Business Environment', url: '' });
                itemBreadcrumbs.push({ label: 'Crop Economics', url: '' });
                itemBreadcrumbs.push({ label: 'Commodity Price', url: '' });
                break;
            case '/layout/cropcomparison':
                itemBreadcrumbs.push({ label: 'Business Intelligence', url: '' });
                itemBreadcrumbs.push({ label: 'Business Environment', url: '' });
                itemBreadcrumbs.push({ label: 'Crop Economics', url: '' });
                itemBreadcrumbs.push({ label: 'Crop Comparison', url: '' });
                break;
            case '/layout/uploaddata':
                itemBreadcrumbs.push({ label: 'Admin', url: '' });
                itemBreadcrumbs.push({ label: 'Upload Data', url: '' });
                break;
            case '/layout/updateglossary':
                itemBreadcrumbs.push({ label: 'Admin', url: '' });
                itemBreadcrumbs.push({ label: 'Update Glossary', url: '' });
                break;
            case '/layout/useranalytics':
                itemBreadcrumbs.push({ label: 'Admin', url: '' });
                itemBreadcrumbs.push({ label: 'User Analytics', url: '' });
                break;
            case '/layout/recentdocs':
                itemBreadcrumbs.push({ label: 'Knowledge Management', url: '' });
                itemBreadcrumbs.push({ label: 'Recent Documents', url: '' });
                break;
            case '/layout/authorise':
                itemBreadcrumbs.push({ label: 'Admin', url: '' });
                itemBreadcrumbs.push({ label: 'Authorise User', url: '' });
                break;
            default:
                itemBreadcrumbs = [];
        }
        return itemBreadcrumbs;
    };
    BreadCrumbService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BreadCrumbService);
    return BreadCrumbService;
}());
exports.BreadCrumbService = BreadCrumbService;
//# sourceMappingURL=breadcrumb.service.js.map