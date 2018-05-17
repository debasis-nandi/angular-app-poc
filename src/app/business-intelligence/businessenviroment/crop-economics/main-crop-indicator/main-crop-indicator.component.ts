import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ITabularViewModel } from './main-crop-indicator.model';
import { DatePipe } from '@angular/common';
import { MainCropIndicatorService } from './main-crop-indicator.service';
import { GlobalConfig, Page, ExportLevel } from '../../../../global/global.config';
import { GlobalUtil } from '../../../../global/global.util';
import { IFilters, IServiceParams,IExports } from '../../../../widgets/charts/chart';
import { PopoverContent } from 'ng2-popover';
import { ITableHeader } from '../../../../widgets/datatable/datatable.model'
import { IExportModel } from '../../../../widgets/export/export';
import { ExcelExportService } from '../../../../widgets/export/Export.service';

declare var html2canvas: any;

@Component({
    moduleId: module.id,
    //selector: 'my-major-agrochemicals-seeds',
    templateUrl: 'main-crop-indicator.component.html',
    providers: [MainCropIndicatorService]
})

export class MainCropIndicatorComponent implements OnInit {

    tabularViewModel: ITabularViewModel = {
        widget: [],
        tableHead: [],
        kpiData: [],
        kpiSourceData: [],
        actions: [],
        filters: []
    };
    
    seriveParams: IServiceParams = { pageName: Page.MainCropIndicator, companyId: 0, cropId: 0, selectedFilter: null };

    filterObject: IFilters[] = [];
    filterApi: IFilters[] = [];
    loading: boolean = false;
    errorMessage: string;
    paginator: boolean;
    pageLinks: number;
    rowsPerPage: number;
    rowsPerPageOptions: Array<number>;
    responsive: boolean;
    styleClass: string = 'ui-datatable table table-hover comp-table';
    rowStyleClass: string;
    hyperLinkUrl: string = "/layout/agribusinessoverview/cropoverview";
    exportObject: IExports[] = [];
    kpi: Object[] = [];
    arrayFilterdata: IExportModel;
    exportData: string;
    pageName: string = Page.MainCropIndicator.toString();
    datePipe: DatePipe;

    constructor(private service: MainCropIndicatorService, private router: Router, private _ExcelExportService: ExcelExportService) {
    }

    /*getPageModuleId(): string {
        return GlobalUtil.getSession("PageModuleId");
    }*/

    getPageModuleId(): number {
        return parseInt(GlobalUtil.getSession("PageModuleId"));
    }

    ngOnInit() {
        this.loading = true;
        this.setPageData();
    }

    setPageData() {
        this.paginator = false;
        this.pageLinks = 3;
        this.rowsPerPage = 5;
        this.rowsPerPageOptions = [5, 10, 20];
        this.responsive = null;
        //debugger;
        this.getPageData();
    }

    getPageData(): void {

        this.service.getPageData(this.seriveParams).subscribe(result => {           
            this.tabularViewModel = result;
            GlobalConfig.kpiActionState = this.tabularViewModel.actions;
            GlobalConfig.kpiFilterState = this.tabularViewModel.filters;
            this.loading = false;
        });
    }

    onFilterEmit(filter: IFilters): boolean {
        this.filterObject = this.filterObject.filter(
            x => x.filterName !== filter.filterName);

        this.filterObject.push(filter);
        return true;

        //this.filterObject = filter;
        //return true;
    }

    onExportEmit(exp: IExports): boolean {

        this.exportObject = this.exportObject.filter(
            x => x.exportName !== exp.exportName);

        this.exportObject.push(exp);
        return true;

    }

    //ExportSubmit(): void {
    //    this.loading = true;
    //    let ExportAsData = this.exportObject.find(model => model.exportName == "Export As");
    //    //if excel
    //    if (ExportAsData.selectedData == 1) {
     //       var filteredData = this._ExcelExportService.constructTabularDataForExport(this.tabularViewModel.tableHead, this.tabularViewModel.kpiData);
    //        this.kpi[0] = { name: this.tabularViewModel.widget[0].name, data: filteredData };
    //        this.arrayFilterdata = { templateName: "Export", fileName: this.tabularViewModel.widget[0].name, kpiData: this.kpi, exportAs: ExportAsData.selectedData };
    //        this._ExcelExportService.ExcelExportedFilePath(this.arrayFilterdata).subscribe(data => { this.exportData = data; this.loading = false; });
    //    }
    //}

    exportedExcelData: Object[] = [];
    ExportSubmit(): void {
        this.loading = true;
        this.datePipe = new DatePipe("en-US");
        let ExportAsData = this.exportObject.find(model => model.exportName == "Export As");
        let ChartData = this.exportObject.find(model => model.exportName == "Chart Names");
        let InsightData = this.exportObject.find(model => model.exportName == "Insights");
        if (ExportAsData.selectedData == 1) {            
            this.exportedExcelData = [];
            for (let item in this.tabularViewModel.kpiData) {
                this.exportedExcelData[item] = {
                    'CROP NAME': this.tabularViewModel.kpiData[item]['cropName'],
                    'YEAR': this.tabularViewModel.kpiData[item]['year'],
                    'AREA HARVESTED': this.tabularViewModel.kpiData[item]['areaHarvestedValues'],
                    'AREA HARVESTED UNITS': this.tabularViewModel.kpiData[item]['areaHarvestedUnit'],
                    'DEMAND': this.tabularViewModel.kpiData[item]['demandValues'],
                    'DEMAND UNITS': this.tabularViewModel.kpiData[item]['demandUnit'],
                    'PRODUCTION': this.tabularViewModel.kpiData[item]['productionValues'],
                    'PRODUCTION UNITS': this.tabularViewModel.kpiData[item]['productionUnit'],
                    'STU': this.tabularViewModel.kpiData[item]['stuValues'],
                    'STU UNITS': this.tabularViewModel.kpiData[item]['stuUnit'],
                    'PRICE(MONTHLY)': this.tabularViewModel.kpiData[item]['priceValues'],
                    'PRICE UNITS': this.tabularViewModel.kpiData[item]['priceUnit']
                }
            }
            //var filteredData = this._ExcelExportService.constructTabularDataForExport(this.tabularViewModel.tableHead, this.tabularViewModel.kpiData);
            this.kpi[0] = { name: this.tabularViewModel.widget[0].name, data: this.exportedExcelData };
            this.arrayFilterdata = { templateName: "Export", fileName: this.tabularViewModel.widget[0].name + "_" + (GlobalUtil.getAppSession("UserInfo") ? GlobalUtil.getAppSession("UserInfo").userName.split('@')[0].split('.')[0] : ""), kpiData: this.kpi, exportAs: ExportAsData.selectedData };
            this._ExcelExportService.ExcelExportedFilePath(this.arrayFilterdata).subscribe(data => { this.exportData = data; this.loading = false; });
        }



        if (ExportAsData.selectedData == 2) {
            let _self = this;
            html2canvas([document.getElementById("content")], {
                onrendered: function (canvas: any) {
                    let imagedata = canvas.toDataURL('image/png');
                    let obj = {
                        Image: imagedata, Insight: "",
                        PageFooterDesc: GlobalUtil.getAppSession("UserInfo").userName + ' exported from AgriInsider on ' + _self.datePipe.transform(new Date(), 'dd MMMM yyyy') };
                    _self.kpi[0] = {
                        //name: GlobalUtil.getSession("CompanyName"),
                        name: "Global Crop Indicator",
                        data: obj,
                        CurrentChunk: 0,
                        TotalChunks: 1,
                        ExportLevel: ExportLevel.Page,
                        Size: 1
                    };
                    var arrayFilterdata = { templateName: "Export", fileName: _self.pageName, kpiData: _self.kpi, exportAs: 2 };
                    _self._ExcelExportService.ExcelExportedFilePath(arrayFilterdata)
                        .subscribe(data => {
                            //console.log(data); 
                            _self.loading = false;
                        });
                }
            });
        }
    }

    FilterSubmit(pagePopover: PopoverContent): void {
        this.loading = true;
        for (let entry of this.filterObject) {
            if (entry.filterName === 'View Data As' && entry.selectedData === 'Quarterly')
                this.filterApi = this.filterObject.filter(
                    x => x.filterName !== "PeriodYear");
            else if (entry.filterName === 'View Data As' && entry.selectedData === 'Yearly')
                this.filterApi = this.filterObject.filter(
                    x => x.filterName !== "PeriodQuarter");
            else if (entry.filterName === 'Currency')
                this.filterApi = this.filterObject;
            else if (entry.filterName === 'Unit Type')
                this.filterApi = this.filterObject;
        }
        let selectedValue: IServiceParams = { pageName: Page.MainCropIndicator, companyId: 0, cropId: 0, selectedFilter: this.filterApi, userId: GlobalUtil.getAppSession("UserInfo").userId };
        this.service.getPageData(selectedValue)
            .subscribe(data => {
                this.tabularViewModel.tableHead = data.tableHead;
                this.tabularViewModel.kpiData = data.kpiData;
                this.tabularViewModel.actions = GlobalConfig.kpiActionState;
                this.tabularViewModel.filters = GlobalConfig.kpiFilterState;
                this.loading = false;

            }, error => {
                this.errorMessage = <any>error
            });
    }

    Submit(pagePopover: PopoverContent): void {
        this.loading = true;
        pagePopover.hide();
        //debugger;
        for (let entry of this.filterObject) {
            if (entry.filterName === 'View Data As' && entry.selectedData === 'Quarterly')
                this.filterApi = this.filterObject.filter(
                    x => x.filterName !== "PeriodYear");
            else if (entry.filterName === 'View Data As' && entry.selectedData === 'Yearly')
                this.filterApi = this.filterObject.filter(
                    x => x.filterName !== "PeriodQuarter");
            else if (entry.filterName === 'Currency')
                this.filterApi = this.filterObject;
        }
        //console.log(this.filterApi);
        let selectedValue: IServiceParams = { pageName: Page.MainCropIndicator, companyId: 0, cropId: 0, selectedFilter: this.filterApi };
        //debugger;
        this.service.getPageData(selectedValue)
            .subscribe(data => {
                //debugger;
                this.tabularViewModel.tableHead = data.tableHead;
                this.tabularViewModel.kpiData = data.kpiData;
                this.tabularViewModel.actions = GlobalConfig.kpiActionState;
                this.tabularViewModel.filters = GlobalConfig.kpiFilterState;
                this.loading = false;

            }, error => {
                this.errorMessage = <any>error
            });
    }

    ngOnChanges() {
    }

}