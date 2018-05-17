import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { INewsData, ITabularViewModel, INewsType } from './mas-news.model';
import { GlobalConfig, Page } from '../../../global/global.config';
import { GlobalUtil } from '../../../global/global.util';
import { MASNewsService } from './mas-news.service';
import { IServiceParams, IExports } from '../../../widgets/charts/chart';
import { PopoverContent } from 'ng2-popover';
import { IExportModel } from '../../../widgets/export/export';
import { ExcelExportService } from '../../../widgets/export/Export.service';
import { IMyDrpOptions } from 'mydaterangepicker';
import { IMyDpOptions } from 'mydatepicker';

declare var readmore: any;


@Component({
    moduleId: module.id,
    selector: 'my-masnews',
    templateUrl: 'mas-news.component.html',
    providers: [MASNewsService]
})


export class MASNewsComponent {

    constructor(private service: MASNewsService, private route: ActivatedRoute, private _ExcelExportService: ExcelExportService, private router: Router) {
    }

    seriveParams: IServiceParams = { pageName: Page.ciNews, companyId: GlobalUtil.getSession("CompetitorId"), cropId: 0, selectedFilter: null };
    tabularViewModel: ITabularViewModel = {
        widget: [],
        tableHead: [],
        actions: [],
        filters: [],
        ciNewsData: []
    };

    exportData: string;
    kpi: Object[] = [];
    arrayFilterdata: IExportModel;
    exportObject: IExports[] = [];
    companyName: string;
    loading: boolean = false;
    ciNewsData: INewsData[];
    filternewsData: INewsData[];
    ModuleID: number;
    id: number;
    publicationDateeMsg: string;


    publicationPeriod: string;
    topublicationDate?: Date;
    fromPublicationDate?: Date;

    myDateRangePickerOptions: IMyDrpOptions = {
        dateFormat: 'dd-mm-yyyy'
    };

    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd-mm-yyyy',
    };

    ngOnInit(): void {
        if (GlobalUtil.getSession("CompetitorId")) {
            this.loading = true;
            this.companyName = GlobalUtil.getSession("CompanyName");
            this.ModuleID = GlobalUtil.getSession("CompetitorId");
            this.getPageData();
        }
        else {
            this.router.navigateByUrl('layout/majoragroandseeds');
        }
    }

    OnSourceUrlClick(url: string, news_id: number,event:any) {
        event.preventDefault();
        this.loading = true;
        this.service.getUrlInfo(url).subscribe(res => {
            this.loading = false;
            if (res.isUrlValid == true) {
                window.open(url, '_blank');
            }
            else if (res.isUrlValid == false) {
                let newsLinkItem: Array<any> = this.ciNewsData.filter((x: any) => x.id == news_id);
                if (newsLinkItem.length == 1) {
                    if (res.urlStatus == "404" || res.urlStatus == "NotFound") {
                        alert('The page no longer exists');
                    }
                    else if (res.urlStatus == "502" || res.urlStatus == "BadGateway" || res.urlStatus == "503" || res.urlStatus == "ServiceUnavailable") {
                        // window.open(url, '_blank');
                        alert('The page no longer exists');
                    }
                    //else if (res.urlStatus == "InternalServerError") {
                    //    window.open(url, '_blank');
                    //}
                    else {
                        alert('The page no longer exists');
                    }
                }
                else {
                    window.open(url, '_blank');
                }
            }

        }, err => {
            this.loading = false;
            window.open(url, '_blank');
        });
    }

    getPageData(): void {
        this.ciNewsData = [];
        this.service.getPageData(this.seriveParams).subscribe(result => {
            this.tabularViewModel = result;
            this.ciNewsData = this.tabularViewModel.ciNewsData;
            if (this.ciNewsData.length > 0) {
                let first = this.ciNewsData[0].typeId;
                this.commonFilter(first);
            }
            this.loading = false;
        });
    }

    ngExpands(index: any, id: any): void {
        this.newsFilter(id);
    }

    commonFilter(id: any): void {
        this.filternewsData = this.ciNewsData.filter(function (item, index, array) {
            if (item.typeId === id) {
                return item;
            }
        });
    }

    newsFilter(id: any): void {
        this.filternewsData = this.ciNewsData;
        this.filternewsData = this.filternewsData.filter(function (item, index, array) {
            if (item.typeId === id) {
                return item;
            }
        });
    }

    ngExpandText(index: any, id: any, event: any): void {
        readmore(index, id);
        this.id = id;
    }

    onExportEmit(exp: IExports): boolean {

        this.exportObject = this.exportObject.filter(
            x => x.exportName !== exp.exportName);

        this.exportObject.push(exp);
        return true;

    }

    exportedData: Object[] = [];
    ExportSubmit(): void {
        this.loading = true;
        let ExportAsData = this.exportObject.find(model => model.exportName == "Export As");
        let ChartData = this.exportObject.find(model => model.exportName == "Chart Names");
        let InsightData = this.exportObject.find(model => model.exportName == "Insights");
        if (ExportAsData.selectedData == 1) {
            this.exportedData = [];
            for (let item in this.ciNewsData) {
                this.exportedData[item] = {
                    'News Type': this.ciNewsData[item]['name'],
                    'Sub News Type': this.ciNewsData[item]['subNewsType'],
                    Title: this.ciNewsData[item]['title'],
                    Description: this.ciNewsData[item]['description'],
                    Source: this.ciNewsData[item]['sourceName'],
                    'Source Link': this.ciNewsData[item]['sourceLink'],
                    'Published Date': this.ciNewsData[item]['publishedDate']
                }
            }

            this.kpi[0] = { name: "News", data: this.exportedData };
            this.arrayFilterdata = { templateName: "Export", fileName: "News" + "_" + (GlobalUtil.getAppSession("UserInfo") ? GlobalUtil.getAppSession("UserInfo").userName.split('@')[0].split('.')[0] : ""), kpiData: this.kpi, exportAs: ExportAsData.selectedData };
            this._ExcelExportService.ExcelExportedFilePath(this.arrayFilterdata).subscribe(data => { this.exportData = data; this.loading = false; });
        }
    }

    onReset() {
        this.topublicationDate = null;
        this.fromPublicationDate = null;
        this.getPageData();
    }

    getPublicationDate(selectedDate: any): Date {
        let reggie = /(\d{4})-(\d{2})-(\d{2})/;
        let dateArray = reggie.exec(selectedDate);
        let dateObject = new Date(
            (+dateArray[1]),
            ((+dateArray[2])) - 1, // Careful, month starts at 0!
            (+dateArray[3])
        );
        return dateObject;
    }


    removeDuplicates(originalArray: any, prop: any): any {
        var newArray: any = [];
        var lookupObject = {};

        for (var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }

    Data: INewsType[] = [];
    onSave(): void {

        if (this.fromPublicationDate == null) {
            this.publicationDateeMsg = "Please select a 'from' date";
            setTimeout(() => {
                this.publicationDateeMsg = "";
            }, 3000);
            return null;
        }

        if (this.topublicationDate == null) {
            this.publicationDateeMsg = "Please select a 'to' date";
            setTimeout(() => {
                this.publicationDateeMsg = "";
            }, 3000);
            return null;
        }

        let ldate = this.fromPublicationDate["formatted"].split("-").reverse().join("-");
        let rdate = this.topublicationDate["formatted"].split("-").reverse().join("-");
        let leftdate = this.getPublicationDate(ldate);
        let rightdate = this.getPublicationDate(rdate);

        //let leftdate = this.fromPublicationDate['formatted'];
        //let rightdate = this.topublicationDate['formatted'];

        if (leftdate > rightdate) {
            this.publicationDateeMsg = "'From' date cannot be greater than the 'to' date";
            setTimeout(() => {
                this.publicationDateeMsg = "";
            }, 3000);
            return null;
        }

        if (this.publicationDateeMsg == "" || this.publicationDateeMsg == undefined) {
            this.loading = true;
            this.service.getPageData(this.seriveParams).subscribe(result => {
                this.tabularViewModel = result;
                this.ciNewsData = this.tabularViewModel.ciNewsData;
                if (this.ciNewsData.length > 0) {
                    let first = this.ciNewsData[0].typeId;
                    this.commonFilter(first);
                }

                let _self = this;
                _self.Data = [];
                this.ciNewsData = this.ciNewsData.filter(function (item, index, array) {
                    let update = item['publishedDate'];
                    //                    let uploadeddate = item['uploadedDate'].split("-").reverse().join("-");
                    //let fromdate = _self.fromPublicationDate['formatted'];
                    //let todate = _self.topublicationDate['formatted'];
                    let uploadeddate = _self.getPublicationDate(update);
                    if ((leftdate <= uploadeddate) && (uploadeddate <= rightdate)) {
                        let _data = { newsTypeId: item.typeId, newsTypeName: item['name'] };
                        _self.Data.push(_data);
                        return true;
                    }
                });

                // removing duplicate values 
                let valData = _self.removeDuplicates(_self.Data, "newsTypeId");

                this.ciNewsData.forEach(function (item, index, array) {
                    item.listnewstype = valData;
                });



                this.filternewsData = [];
                this.filternewsData = this.ciNewsData;
                this.loading = false;
            });
        }
    }
}