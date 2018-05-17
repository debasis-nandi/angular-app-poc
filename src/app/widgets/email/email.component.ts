import { Component , Input} from '@angular/core'
import { EmailService } from './email.service';
import { IEmailDetail, IChartDetail, INewsDetail, IDocumentDetail } from './email';
import { GlobalConfig, Page } from '../../global/global.config'
import { GlobalUtil } from '../../global/global.util';
import { IPageDataMapper, IServiceParams, IFilters, ISelectedFilters } from '../../widgets/charts/chart';
import { ChartService } from '../../widgets/charts/chart.service';

// declaring variables and functions to be used in export of chart.
declare var onSubmitClick: any;

@Component({
    moduleId: module.id,
    selector: 'my-email',
    templateUrl: 'email.component.html'
})

export class EmailComponent {    

    constructor(private chartService: ChartService,private emailservice: EmailService) {
    }

    _response: boolean = false;
    Imgpath: string;
    index: string; // for validation message
    errorMsg: string;
    EmailVal: boolean;
    errorMessage: string;

    @Input() DataType: string; // to decide the type of data to export such as fusion charts , news link , document link.
    @Input() ChartID: number; // ID for the chart component in case of multiple rows
    @Input() ChartName: string; // for concatenating with the file name
    @Input() SourceUrl: string; // for exporting the news & document link 
    @Input() Title: string; // for exporting the title
    @Input() Description: string; // for exporting the title
    @Input() SubNewsType: string; // for exporting the title
    @Input() Name: string; // for exporting the Name such as Document name etc
    @Input() CompetitorName: string; //for News CompetitorName would be as per defined in News CompetitorName parameter
    @Input() SharedDate: Date;
    @Input() ChartObject: any;
    @Input() selectedFilters: ISelectedFilters[] = [];

    show: boolean = true;
        
    Data: IEmailDetail = {
        dataType: "", name: "", subject: "", description: "", worldMapImageData: "",
        documenturl: "", sourceurl: "", chartData: null, newsData: null, documentData: null, competitorName: "",
        source: "", lastUpdated: "", firstName: "", lastName: "", selectedFilters: ""
    };

    ChartData: IChartDetail = { chartName: "", userName: "", toUserName: "", roleId: null };
    NewsData: INewsDetail = { title: "", description: "", subNewsType: "", sourceName: "", publishedDate: null };
    DocumentData: IDocumentDetail = { title: "", description: "", documentName: "" };

    ngOnInit(): void {
    }

    // on share button click
    Submit(): void {

        

        if (this.Data.name == "") {
            this.errorMsg = "Email address is mandatory";
            this.index = "1";
            setTimeout(() => {
                this.errorMsg = "";
                this.index = "0";
            }, 3000);
            return null;
        }  else {
            var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            this.EmailVal = expr.test(this.Data.name);
            if (!this.EmailVal) {
                this.errorMsg = "You have provided an invalid email address";
                this.index = "1";
                setTimeout(() => {
                    this.errorMsg = "";
                    this.index = "0";
                }, 3000);
                return null;
            } else {
                let mailTrail = this.Data.name.substring(this.Data.name.indexOf("@") + 1, this.Data.name.length);
                if (mailTrail.toLowerCase() != GlobalConfig.mailAddressTrail.toLowerCase()) {
                    this.errorMsg = "Email address should belong to the domain @syngenta.com";
                    this.index = "1";
                    setTimeout(() => {
                        this.errorMsg = "";
                        this.index = "0";
                    }, 3000);
                }
            }
        }

        if (this.Data.subject == "") {
            this.errorMsg = "Subject is mandatory";
            this.index = "2";
            setTimeout(() => {
                this.errorMsg = "";
                this.index = "0";
            }, 3000);
            return null;
        }

        if (this.errorMsg == undefined || this.errorMsg == "") {

            var id: any;
            //this.ChartData.chartName = this.ChartName;
            this.ChartData.chartName = (this.ChartObject != null) ? this.ChartObject.widgetName : this.ChartName;
            this.ChartData.userName = GlobalUtil.getAppSession("UserInfo").email;
            this.ChartData.roleId = GlobalUtil.getAppSession("UserInfo").roles[0];


            this.Data.chartData = this.ChartData;
            this.Data.firstName = GlobalUtil.getAppSession("UserInfo").firstName;
            this.Data.lastName = GlobalUtil.getAppSession("UserInfo").lastName;

            let Filters = (this.selectedFilters.length > 0) ? 'Filters applied: ' : '';
            if (this.selectedFilters != null) {
                if (this.selectedFilters.length > 0) {
                    for (let item of this.selectedFilters) {
                        Filters = Filters.concat('<strong>').concat(item.filterName).concat('</strong>').concat(': ').concat(item.selectedValues).concat('; ');
                    }
                }
            }

            this.Data.selectedFilters = Filters;
            this.Data.competitorName = this.CompetitorName != undefined ? this.CompetitorName : '';
            if (this.DataType === "Chart") {
                this.Data.dataType = this.DataType;            
                this.Data.worldMapImageData = onSubmitClick("chart-container-" + ((this.ChartObject != null) ? this.ChartObject.widgetId : ''));
                this.Data.lastUpdated = (this.ChartObject != null) ? this.ChartObject.lastUpdated : '';
                this.Data.source = (this.ChartObject != null) ? this.ChartObject.sourceName : '';
            } else if (this.DataType == "News") {
                this.Data.dataType = this.DataType;
                this.NewsData.title = this.Title;
                this.NewsData.description = this.Description;
                this.NewsData.subNewsType = this.SubNewsType;
                this.NewsData.sourceName = this.Name;
                this.NewsData.publishedDate = this.SharedDate;
                this.Data.sourceurl = this.SourceUrl;
                this.Data.newsData = this.NewsData;
                //this.Data.competitorName = GlobalUtil.getSession("CompanyName");
            } else if (this.DataType == "Document") {
                this.Data.dataType = this.DataType;
                this.DocumentData.title = this.Title;
                this.DocumentData.description = this.Description;
                this.DocumentData.documentName = this.Name;
                this.Data.documenturl = this.SourceUrl;
                this.Data.documentData = this.DocumentData;
            }
            //console.log(this.Data);
            this.emailservice.sendMail(this.Data)
                .subscribe(data => {
                    this._response = data,
                        this.errorMsg = "Mail has been sent successfully";
                    this.index = "0";
                    setTimeout(() => {
                        this.errorMsg = "";
                        this.index = "0";
                        this.Data.name = "";
                        this.Data.subject = "";
                        this.Data.description = "";
                        this.Data.worldMapImageData = "";
                        this.Data.sourceurl = "";
                        this.Data.documenturl = "";
                        this.Data.newsData = null;
                        this.Data.documentData = null;
                        let s:any = document.querySelectorAll('div.toggleContentShare');
                        if (s) {
                            if (s.length>0) {
                                for (var i = 0; i < s.length; i++) {
                                    (s[i] as HTMLElement).style.display = 'none';
                                }
                            }
                        }
                    }, 4000);
                });
        }
    }

    ngOnChanges(): void {
        this.errorMsg = "";
        this.Data.name = "";
        this.Data.subject = "";
        this.Data.description = "";
        this.Data.worldMapImageData = "";
        this.Data.sourceurl = "";
        this.Data.documenturl = "";
    }
}