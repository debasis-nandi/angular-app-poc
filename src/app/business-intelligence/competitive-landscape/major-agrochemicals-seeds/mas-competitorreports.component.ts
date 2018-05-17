import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChartService } from '../../../widgets/charts/chart.service';
import { IPageDataMapper, IServiceParams, IFilters, IExports, ISelectedFilters } from '../../../widgets/charts/chart';
import { ITabularViewModel, ICompetitorReportData } from './mas-competitorreports.model';
import { PopoverContent } from 'ng2-popover';
import { GlobalConfig, Page, Constants } from '../../../global/global.config';
import { GlobalUtil } from '../../../global/global.util';
import { MASCompetitorReportsService } from './mas-competitorreports.service';

@Component({
    moduleId: module.id,
    selector: 'my-mascompetitorreport',
    templateUrl: 'mas-competitorreports.component.html',
    providers: [MASCompetitorReportsService]
})

export class MASCompetitorReportsComponent {

    constructor(private chartService: ChartService, private service: MASCompetitorReportsService, private route: ActivatedRoute, private router: Router) {
    }

    data: IPageDataMapper;
    errorMessage: string;
    filterObject: IFilters[] = [];
    exportObject: IExports[] = [];
    KMRequest: ICompetitorReportData[];
    searchResultFor: string;
    isAdmin: boolean = (GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin")? true : false;
    loading: boolean = false;
    companyName: string;
    rowsPerPage: number = 5;
    pageSize: number;
    rowsPerPageOptions: Array<number> = [5, 10, 20];
    paginator: boolean = false;
    searchItems1: any = null;
    pageName: string = Page.ciCompetitorReports.toString();
    ModuleID: number;
    tabularViewModel: ITabularViewModel = {
        widget: [],
        tableHead: [],
        actions: [],
        filters: []
    };

    seriveParams: IServiceParams = { pageName: Page.ciCompetitorReports, companyId: GlobalUtil.getSession("CompetitorId"), cropId: 0, selectedFilter: null };

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

    getPageData(): void {
        this.KMRequest = [];
        this.service.getPageData(this.seriveParams).subscribe(resItems => {
            let docs = JSON.parse(resItems);
            this.tabularViewModel = docs;
            for (let i = 0; i < docs["KPIData"].length; i++) {
                docs["KPIData"][i]["DocModules"] = JSON.parse(docs["KPIData"][i]["DocModules"]);
                docs["KPIData"][i]["DocCompetitors"] = JSON.parse(docs["KPIData"][i]["DocCompetitors"]);
                docs["KPIData"][i]["DocRegions"] = JSON.parse(docs["KPIData"][i]["DocRegions"]);
                docs["KPIData"][i]["DocCountries"] = JSON.parse(docs["KPIData"][i]["DocCountries"]);
            }
            this.searchItems1 = {
                "elasticResponseData": [
                    {
                        "type": "knowledgemanagement",
                        "templateType": "other",
                        "typeName": "Knowledge Management",
                        "count": docs["KPIData"].length,
                        "data": docs["KPIData"]
                    }
                ]
            }

            //this.pageSize = 50;
            this.loading = false;
        },
            error => {
                this.loading = false;
            });
    }
}