import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChartService } from '../../../widgets/charts/chart.service';
import { DatePipe } from '@angular/common';
import { IPageDataMapper, IServiceParams, IFilters, IExports, ISelectedFilters } from '../../../widgets/charts/chart';
import { PopoverContent } from 'ng2-popover';
import { IExportModel } from '../../../widgets/export/export';
import { ExcelExportService } from '../../../widgets/export/Export.service';
import { GlobalConfig, Page, ExportLevel } from '../../../global/global.config';
import { GlobalUtil } from '../../../global/global.util';
import * as FusionCharts from 'fusioncharts';

declare var onSubmitClick: any;
@Component({
    moduleId: module.id,
    selector: 'my-competitor-comparison',
    templateUrl: 'competitor.comparison.component.html',
})

export class CompetitorComparisonComponent {
    filterObject: IFilters[] = [];
    exportObject: IExports[] = [];
    exportVisible: boolean = true;
    filterApi: IFilters[] = [];
    @ViewChild('pagePopover') pagePopover: PopoverContent;
    noDataMessage: string = "";
    filter1: IFilters[] = [];
    filter2: IFilters[] = [];
    isColumn: boolean = true;
    data: IPageDataMapper;
    errorMessage: string;
    paginator: boolean = false;
    pageLinks: number = 3;
    rowsPerPage: number = 5;
    rowsPerPageOptions: Array<number> = [5, 10, 20];
    responsive: boolean = true;
    seriveParams: IServiceParams = { pageName: Page.competitorComparison, companyId: 0, cropId: 0, selectedFilter: null };
    submitVisible: boolean = true;
    submitMessage: string = '';
    showFlexi: boolean = true;
    loading: boolean = false;
    blankCompaniesArray: string[] = [];
    blankCompanies: string = '';
    selectedFilters: ISelectedFilters[] = [];
    selectedData: ISelectedFilters;
    datePipe: DatePipe;
    dynamicMessage: string = '(You can select maximum range of 7 years)';
    constructor(private chartService: ChartService, private ref: ElementRef, private _ExcelExportService: ExcelExportService) {
    }

    /*ngOnInit(): void {
        this.loading = true
        this.chartService.getData(this.seriveParams)
            .subscribe(data => { this.data = data.pageDataMapper; this.loading = false }
            //.subscribe(data => this.AfterChanges(data.pageDataMapper)
            , error => this.errorMessage = <any>error);
    }*/

    ngOnInit(): void {
        this.loading = true;
        //debugger;
        if (GlobalUtil.getSession("ChartYear") != "" && GlobalUtil.getSession("ChartYear") != null) {
            var chartYear = GlobalUtil.getSession("ChartYear");
            var filterPara: IFilters[] = [
                { id: 0, filterType: "", filterName: "PeriodQuarter", isVisible: true, filterData: null, childControlMappingId: 0, sortOrder: 0, selectedData: [(parseInt(chartYear) - 1), parseInt(chartYear)] },
                { id: 0, filterType: "", filterName: "View Data As", isVisible: true, filterData: null, childControlMappingId: 0, sortOrder: 0, selectedData: "Quarterly" }
            ];
            var selectedPara: IServiceParams = { pageName: Page.competitorComparison.toString(), companyId: GlobalUtil.getSession("CompetitorId"), cropId: 0, selectedFilter: filterPara, isSearchRedirct: true };
            this.chartService.getData(selectedPara)
                .subscribe(data => {
                    //debugger;
                    if (data) {
                        this.data = data.pageDataMapper; this.loading = false;
                        this.data.filters[0].selectedData = "Quarterly";
                        this.data.filters[1].isVisible = false;
                        this.data.filters[2].isVisible = true;
                        GlobalUtil.setSession("ChartYear", "");
                    }
                }, error => {
                    GlobalUtil.setSession("ChartYear", "");
                    this.errorMessage = <any>error
                });
        }
        else {
            this.chartService.getData(this.seriveParams)
                .subscribe(data => {
                    this.data = data.pageDataMapper; this.loading = false;
                }, error => { this.errorMessage = <any>error });
        }
    }

    AfterChanges(data: any) {
        this.data = data;

        this.filter1 = this.data.filters.splice(0, 6);
        this.filter2 = this.data.filters;
    }

    onFilterEmit(filter: IFilters): boolean {
        if (filter.filterName === 'View Data As' && filter.selectedData === 'Quarterly') {
            this.dynamicMessage = '(You can select maximum range of 16 quarters)';
        }
        else if (filter.filterName === 'View Data As' && filter.selectedData === 'Yearly') {
            this.dynamicMessage = '(You can select maximum range of 7 years)';
        }
        this.filterObject = this.filterObject.filter(
            x => x.filterName !== filter.filterName);

        this.filterObject.push(filter);
        return true;

        //this.filterObject = filter;
        //return true;
    }

    onSubmitEmit(visible: boolean): void {
        this.submitVisible = visible;
    }
    onSubmitMessageEmit(message: string): void {
        this.submitMessage = message;
    }

    Submit(pagePopover: PopoverContent): void {
        //let collapseFilter: HTMLElement = document.getElementById('collapseFilter');
        //collapseFilter.classList.remove('in');

        this.loading = true;
        //pagePopover.hide();
        for (let entry of this.filterObject) {
            if (entry.filterName === 'View Data As' && entry.selectedData === 'Quarterly')
                this.filterApi = this.filterObject.filter(
                    x => x.filterName !== "PeriodYear");
            else if (entry.filterName === 'View Data As' && entry.selectedData === 'Yearly')
                this.filterApi = this.filterObject.filter(
                    x => x.filterName !== "PeriodQuarter" && x.filterName !== "From Year" && x.filterName !== "To Year" && x.filterName !== "From Quarter" && x.filterName !== "To Quarter");

            else if (entry.filterName == 'Parameter')
                var childId = entry.childControlMappingId;

        }
        this.filterApi = this.filterApi.filter(
            x => x.id == 0 || x.id == childId);


        for (let entry of this.filterApi) {

            if (entry.filterName.toLocaleLowerCase() == "parameter" && (entry.selectedData == 2 || entry.selectedData == 7 || entry.selectedData == 9 || entry.selectedData == 11 || entry.selectedData == 13 || entry.selectedData == 18 || entry.selectedData == 21))
                this.filterApi = this.filterApi.filter(
                    x => x.filterName !== "Currency");
        }


        //console.log(this.filterApi);
        let selectedValue: IServiceParams = { pageName: Page.competitorComparison.toString(), companyId: 0, cropId: 0, selectedFilter: this.filterApi };
        this.chartService.getData(selectedValue)
            .subscribe(data => this.AfterSubmit(data.pageDataMapper)
            , error => this.errorMessage = <any>error
            );


    }

    AfterSubmit(data: IPageDataMapper): void {
        let collapseFilter: HTMLElement = document.getElementById('CPFilter');
        collapseFilter.click();
        this.data.widgets = data.widgets;
        this.noDataMessage = "No data to display";
        this.blankCompaniesArray = [];
        this.blankCompanies = '';
        if (this.data.widgets.length > 0) {
            this.showFlexi = true;
            if (this.data.widgets[0].chartComponentViewModel.chartType == 'mscolumn2d') {
                this.isColumn = true;
            }
            else
                if (this.data.widgets[0].chartComponentViewModel.chartType == 'msline') {
                    this.isColumn = false;
                }
        }
        this.data.exports = data.exports; this.exportVisible = true;
        if (this.data.widgets[0]) {
            for (let entry of this.data.widgets[0].blankCompetitors) {
                this.blankCompaniesArray.push(this.data.filters.filter(x => x.filterName == 'Competitors')[0].filterData.filter(x => x["value"] == entry)[0]["label"]);
            }

            this.blankCompanies = this.blankCompaniesArray.join(",");
        }

        this.GetSelectedFilters(this.filterApi);
        this.loading = false;
        
    }

    ChartTypeChange(chart: string): void {


        if (chart == 'line') {
            this.data.widgets[0].chartComponentViewModel.chartType = "msline";
            this.isColumn = false;

        }
        else if (chart == 'column') {
            this.data.widgets[0].chartComponentViewModel.chartType = "mscolumn2d";
            this.isColumn = true;
        }

        FusionCharts.ready(function () {

        });

    }

    Reset(pagePopover: PopoverContent): void {
        this.loading = true;
        this.data.filters = null;
        this.submitVisible = true;
        this.submitMessage = '';
        this.chartService.getData(this.seriveParams)
            .subscribe(data => { this.data.filters = data.pageDataMapper.filters; this.loading = false; }
            , error => this.errorMessage = <any>error
            );

    }

    GetSelectedFilters(filterObject: IFilters[]): void {
        this.selectedFilters = [];
        if (filterObject != null) {
            for (let entry of filterObject) {
                if (entry.filterName == 'From Year' || entry.filterName == 'From Quarter' || entry.filterName == 'To Year' || entry.filterName == 'To Quarter') {
                    entry.sortOrder = this.data.filters.filter(x => x.filterName == 'From Year')[0].filterData.filter(m => m["filterName"] == entry.filterName)[0]["sortOrder"];
                }
                else if (entry.filterName == 'PeriodYear') {
                    entry.sortOrder = this.data.filters.filter(k => k.filterName == 'Period')[0].sortOrder;
                }
                else
                    entry.sortOrder = this.data.filters.filter(k => k.filterName == entry.filterName)[0].sortOrder;
            }

            filterObject = filterObject.sort(function (obj1, obj2) { return obj1.sortOrder - obj2.sortOrder });
            for (let entry of filterObject) {
                this.selectedData = { filterName: '', selectedValues: '' };
                var arr: any = [];
                this.selectedData.filterName = entry.filterName;
                if (entry.filterName == 'Parameter' || entry.filterName == 'Currency') {
                    this.selectedData.selectedValues = this.data.filters.filter(x => x.filterName == entry.filterName)[0].filterData.filter(x => x["labelId"] == entry.selectedData)[0]["label"]
                }
                else if (entry.filterName == 'Competitors') {
                    for (let item of this.filterObject.filter(x => x.filterName == "Competitors")[0].selectedData) {
                        arr.push(this.data.filters.filter(x => x.filterName == "Competitors")[0].filterData.filter(x => x['value'] == item)[0]['label']);
                    }
                    this.selectedData.selectedValues = arr.sort().join(", ");
                }
                else if (entry.filterName == 'PeriodYear') {
                    this.selectedData.filterName = 'Period';
                    this.selectedData.selectedValues = entry.selectedData.join(" to ");
                }
                else if (entry.filterType == 'DropdownChild') {
                    this.selectedData.selectedValues = this.data.filters.filter(x => x.filterType == "DropdownChild" && x.filterName == entry.filterName)[0].filterData.filter(x => x["labelId"] == entry.selectedData)[0]["label"]
                }
                else if (entry.filterName == 'From Quarter' || entry.filterName == 'To Quarter') {
                    this.selectedData.selectedValues = 'Q' + entry.selectedData;
                }
                else {
                    this.selectedData.selectedValues = entry.selectedData;
                }

                this.selectedFilters.push(this.selectedData);
            }
        }
    }


    onExportVisibleEmit(visible: boolean): void {
        this.exportVisible = visible;
    }

    onExportEmit(exp: IExports): boolean {

        this.exportObject = this.exportObject.filter(
            x => x.exportName !== exp.exportName);

        this.exportObject.push(exp);
        return true;
    }

    arrayFilterdata: IExportModel;
    kpi: Object[] = [];
    exportData: any;
    ExportSubmit(): void {
        this.loading = true;
        var index: number;
        let parser = new DOMParser();
        let ExportAsData = this.exportObject.find(model => model.exportName == "Export As");
        let ChartData = this.exportObject.find(model => model.exportName == "Chart Names");
        let InsightData = this.exportObject.find(model => model.exportName == "Insights");

        //if excel
        if (ExportAsData.selectedData == 1) {
            //selected Ids  
            var selectedIds = ChartData.selectedData;
            //filter data on the basis of selected ids
            var filterdata = this.data.widgets.filter(function (e) { return selectedIds.indexOf(e.widgetId) >= 0; });
            for (index = 0; index < filterdata.length; ++index) {
                var filteredData = this._ExcelExportService.constructChartDataForExport(filterdata[index].underlyingChartDataViewModel.tableHeaders, filterdata[index].underlyingChartDataViewModel.tableRows);
                this.kpi[index] = { name: filterdata[index].widgetName, data: filteredData };
            }

            this.arrayFilterdata = { templateName: "Export", fileName: "CompetitorComparison" + "_" + (GlobalUtil.getAppSession("UserInfo") ? GlobalUtil.getAppSession("UserInfo").userName.split('@')[0].split('.')[0] : ""), kpiData: this.kpi, exportAs: ExportAsData.selectedData };
            this._ExcelExportService.ExcelExportedFilePath(this.arrayFilterdata).subscribe(data => { this.exportData = data; this.loading = false; });
        }


        // for word export
        if (this.exportObject.length > 0) {
            if (ExportAsData.selectedData == 2 || ExportAsData.selectedData == 3) {
                if (ChartData.selectedData.length > 0) {
                    this.kpi = [];
                    var filterdata = this.data.widgets.filter(function (e) {
                        return ChartData.selectedData.indexOf(e.widgetId) >= 0;
                    });
                    let count = 0;
                    var FilesCount = ChartData.selectedData.length;
                    this.datePipe = new DatePipe("en-US");
                    let Filters = (this.selectedFilters.length > 0) ? '<strong>Filters applied: </strong>' : ''; 
                    if (this.selectedFilters != null) {
                        if (this.selectedFilters.length > 0) {
                            for (let item of this.selectedFilters) {
                                Filters = Filters.concat('<strong>').concat(item.filterName).concat('</strong>').concat(': ').concat(item.selectedValues).concat('; ');
                            }
                        }
                    }
                    let loop = (key: number) => {
                        let InsightNode = document.createElement('div');
                        InsightNode.innerHTML = this.data.widgets.find(model => model.widgetId == key).insightData;
                        let obj = {
                            Image: onSubmitClick("chart-container-" + key), Insight: (InsightData.selectedData == "1") ? InsightNode.textContent : null,
                            ChartHeaderDesc: Filters, ChartFooterDesc: (this.blankCompanies != '') ? 'Data is not available for ' + this.blankCompanies + ' against the selected filters' : '',
                            PageFooterDesc: GlobalUtil.getAppSession("UserInfo").userName + ' exported from AgriInsider on ' + this.datePipe.transform(new Date(), 'dd MMMM yyyy')
                        };
                        //let obj = {
                        //    Image: onSubmitClick("chart-container-" + key), Insight: (InsightData.selectedData == "1") ? InsightNode.textContent : null                            
                        //};
                        this.kpi[0] = {
                            name: filterdata[count].widgetName,
                            data: obj,
                            CurrentChunk: count,
                            TotalChunks: FilesCount,
                            ExportLevel: ExportLevel.Chart
                        };
                        this.arrayFilterdata = { templateName: "Export", fileName: "CompetitorComparison", kpiData: this.kpi, exportAs: ExportAsData.selectedData };
                        this._ExcelExportService.ExcelExportedFilePath(this.arrayFilterdata)
                            .subscribe(data => {
                                this.exportData = data; this.loading = false;
                                //if (this.exportData.value.length == 0) {
                                count++;
                                if (count < FilesCount) {
                                    //loop(ChartData.selectedData.shift());
                                    loop(ChartData.selectedData[count]);
                                }
                                //}
                            });

                    }
                    //loop(ChartData.selectedData.shift());
                    loop(ChartData.selectedData[count]);
                } else {
                    this.loading = false;
                }
            }
        }
    }

}