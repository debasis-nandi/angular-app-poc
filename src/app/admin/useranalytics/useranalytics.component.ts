import { Component, OnInit, OnChanges, ViewEncapsulation } from '@angular/core';
import { UserAnalyticsService } from './useranalytics.service';
import { IFilters, IServiceParams } from '../../widgets/charts/chart';
import { GlobalUtil } from '../../global/global.util';
import { Page, GlobalConfig } from '../../global/global.config';
import { ITabularViewModel, IUserAnalytics, IUserAnalyticsUIData } from './useranalytics.model';
import { PopoverContent } from 'ng2-popover';
import { IMyDrpOptions } from 'mydaterangepicker';

@Component({
    moduleId: module.id,
    selector: 'app-user-analytics',
    templateUrl: 'useranalytics.component.html',
    styles: [
        `#mydate .mydp .selection:focus { border-color:#66afe9  !important; 
        box-shadow:  inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.8) !important;}`
    ],
    encapsulation: ViewEncapsulation.None
})
export class UserAnalyticsComponent implements OnInit {
    tabularViewModel: ITabularViewModel = {
        tableHead: [],
        kpiData: [],
        actions: [],
        filters: []
    };
    seriveParams: IServiceParams = { pageName: Page.UserAnalytics.toString(), companyId: 0, cropId: 0, selectedFilter: null, userId: GlobalUtil.getAppSession("UserInfo").userId };
    filterObject: IFilters[] = [];
    loading: boolean = false;
    errorMessage: string;
    paginator: boolean;
    pageLinks: number;
    rowsPerPage: number;
    rowsPerPageOptions: Array<number>;
    responsive: boolean;
    scrollable: boolean;
    columnNameToGroupBy: string ="modules";
    styleClass: string = 'ui-datatable table table-hover comp-table';
    userAnalyticsData: IUserAnalyticsUIData[] = [];
    fromDate: any;
    toDate: any;
    
    regionId: number
    myDateRangePickerOptions: IMyDrpOptions = {
        dateFormat: 'dd-mm-yyyy'
    };
    publicationDateeMsg: string;
    constructor(private userAnalyticsService: UserAnalyticsService) {

    }
    onDropdownChange(filterValue: any) {
        this.regionId = filterValue.target.value;
    }
    onSave(): void {
        //debugger;
        if (this.fromDate == null) {
            this.publicationDateeMsg = "Please select a 'from' date";
            setTimeout(() => {
                this.publicationDateeMsg = "";
            }, 3000);
            return null;
        }

        if (this.toDate == null) {
            this.publicationDateeMsg = "Please select a 'to' date";
            setTimeout(() => {
                this.publicationDateeMsg = "";
            }, 3000);
            return null;
        }
        let leftdate: Date;
        let rightdate: Date;
        leftdate = this.extractDate(this.fromDate.date);
        rightdate = this.extractDate(this.toDate.date);
        if (leftdate > rightdate) {
            this.publicationDateeMsg = "'From' date cannot be greater than the 'to' date";
            setTimeout(() => {
                this.publicationDateeMsg = "";
            }, 3000);
            return null;
        }
        if (this.publicationDateeMsg == "" || this.publicationDateeMsg == undefined) {
            this.loading = true;
            this.getPageData();
        }
    }

    onReset() {
        this.loading = true;
        this.setDefaults();
        this.getPageData();
    }
    ngOnInit() {
        
        //if (GlobalConfig.kpiActionState != undefined && GlobalConfig.kpiActionState != null) {
        //    this.fromDate = GlobalConfig.kpiActionState;
        //    this.toDate = GlobalConfig.kpiFilterState;
        //    GlobalConfig.kpiActionState = null;
        //    GlobalConfig.kpiFilterState = null;
        //}
        //else {
            this.loading = true;
            this.setDefaults();
            this.setPageData();
        //}
    }
    setDefaults() {
        let d = new Date();
        d.setDate(d.getDate() - 6);
        this.fromDate = { date: { year: d.getFullYear(), month: (d.getMonth() + 1), day: d.getDate() } };
        d = new Date();
        this.toDate = { date: { year: d.getFullYear(), month: (d.getMonth() + 1), day: d.getDate() } };
        this.regionId = GlobalUtil.getAppSession("UserInfo").regionId;
    }
    setPageData() {
        this.paginator = false;
        this.pageLinks = 3;
        this.rowsPerPage = 10;
        this.rowsPerPageOptions = [10, 20];
        this.responsive = null;
        this.scrollable = false;
        this.getPageData();
    }

    formatUserAnalyticsArray(): Array<any> {
        var gdata = GlobalUtil.GroupBy(this.columnNameToGroupBy, this.tabularViewModel.kpiData);
        let _userAnalytics:any = [];
        for (var k in gdata) {
            for (let j = 0; j < gdata[k].length; j++) {
                var _pages = gdata[k][j];
                if (j == 0) {
                    _userAnalytics.push(_pages);
                }
                else {
                    _pages[this.columnNameToGroupBy] = "";
                    _userAnalytics.push(_pages);
                }
            }
        }
        return _userAnalytics;
    }

    extractDate(d: any): Date {
        return new Date(d.year, (+d.month)-1, d.day);
    }
   
    getPageData(): void {
        let d1: Date;
        let d2: Date;
        d1 = this.extractDate(this.fromDate.date);
        d2 = this.extractDate(this.toDate.date);
        this.userAnalyticsService.getPageData({ fromDate: d1, toDate: d2,regionId:this.regionId}).subscribe(result => {
            this.tabularViewModel = result;
            this.tabularViewModel.kpiData = this.formatUserAnalyticsArray();
            //GlobalConfig.kpiActionState = this.fromDate;
            //GlobalConfig.kpiFilterState = this.toDate;
            this.loading = false;
        });
    }
}
