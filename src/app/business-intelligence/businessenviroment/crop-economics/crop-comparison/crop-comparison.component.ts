import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChartService } from '../../../../widgets/charts/chart.service';
import { IPageDataMapper, IServiceParams, IFilters, IExports, ISelectedFilters } from '../../../../widgets/charts/chart';
import { PopoverContent } from 'ng2-popover';
import { DatePipe } from '@angular/common';
import { IExportModel } from '../../../../widgets/export/export';
import { ExcelExportService } from '../../../../widgets/export/Export.service';
import { GlobalConfig, Page, ExportLevel } from '../../../../global/global.config';
import { GlobalUtil } from '../../../../global/global.util';
import * as FusionCharts from 'fusioncharts';
declare var onSubmitClick: any;
@Component({
    moduleId: module.id,
    selector: 'my-crop-comparison',
    templateUrl: 'crop-comparison.component.html',
})

export class CropComparisonComponent {
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
    seriveParams: IServiceParams = { pageName: Page.cropComparison, companyId: 0, cropId: 0, selectedFilter: null };
    submitVisible: boolean = true;
    showFlexi: boolean = true;
    loading: boolean = false;

    blankCropsArray: string[] = [];
    blankCrops: string = '';
    datePipe: DatePipe;

    selectedFilters: ISelectedFilters[] = [];
    selectedData: ISelectedFilters;

    constructor(private chartService: ChartService, private ref: ElementRef, private _ExcelExportService: ExcelExportService) {

    }

    ngOnInit(): void {
        this.loading = true
        this.chartService.getData(this.seriveParams)
            .subscribe(data => { this.data = data.pageDataMapper; this.loading = false }
            //.subscribe(data => this.AfterChanges(data.pageDataMapper)

            , error => this.errorMessage = <any>error
            );


    }
    AfterChanges(data: any) {
        this.data = data;

        this.filter1 = this.data.filters.splice(0, 6);
        this.filter2 = this.data.filters;
    }

    onFilterEmit(filter: IFilters): boolean {

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

    Submit(pagePopover: PopoverContent): void {
        //let collapseFilter: HTMLElement = document.getElementById('collapseFilter');
        //collapseFilter.classList.remove('in');
        let list: string[] = this.filterObject.filter(x => x.filterName == "List")[0].selectedData;
        this.filterObject = this.filterObject.filter(x => x.filterType != "Source" || (x.filterType == "Source" && list.indexOf(x.filterName) > -1));
        
        this.loading = true;
        //console.log(this.filterObject);
        //pagePopover.hide();
        //for (let entry of this.filterObject) {
        //    if (entry.filterName === 'View Data As' && entry.selectedData === 'Quarterly')
        //        this.filterApi = this.filterObject.filter(
        //            x => x.filterName !== "PeriodYear");
        //    else if (entry.filterName === 'View Data As' && entry.selectedData === 'Yearly')
        //        this.filterApi = this.filterObject.filter(
        //            x => x.filterName !== "PeriodQuarter");

        //    else if (entry.filterName == 'Parameter')
        //        var childId = entry.childControlMappingId;

        //}
        //this.filterApi = this.filterApi.filter(
        //    x => x.id == 0 || x.id == childId);


        //for (let entry of this.filterApi) {

        //    if (entry.filterName.toLocaleLowerCase() == "parameter" && (entry.selectedData == 22 || entry.selectedData == 23 || entry.selectedData == 24))
        //        this.filterApi = this.filterApi.filter(
        //            x => x.filterName !== "Currency");
        //}


        //console.log(this.filterApi);
        let selectedValue: IServiceParams = { pageName: Page.cropComparison.toString(), companyId: 0, cropId: 0, selectedFilter: this.filterObject };
        this.chartService.getData(selectedValue)
            .subscribe(data => this.AfterSubmit(data.pageDataMapper)
            , error => this.errorMessage = <any>error
            );


    }

    AfterSubmit(data: IPageDataMapper): void {
        let collapseFilter: HTMLElement = document.getElementById('CPFilter');
        collapseFilter.click();
        this.data.widgets = data.widgets;
        this.noDataMessage = "No data to display.";
        this.blankCropsArray = [];
        this.blankCrops = '';
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
            for (let entry of this.data.widgets[0].cropComparisonIds) {
                if (this.data.widgets[0].chartPlottedOn == 'crop') {
                    this.blankCropsArray.push(this.data.filters.filter(x => x.filterName == 'Crop')[0].filterData.filter(x => x["value"] == entry)[0]["label"]);
                }
                else {
                    this.blankCropsArray.push(this.data.filters.filter(x => x.filterName == 'Region')[0].filterData.filter(m => m["filterName"].toLowerCase() == this.data.widgets[0].chartPlottedOn)[0]["filterData"].filter((k: any) => k.value == entry)[0]["label"]);
                }
            }

            this.blankCrops = this.blankCropsArray.join(",");
        }
        this.GetSelectedFilters(this.filterObject);
        this.loading = false;
    }
    
    GetSelectedFilters(filterObject: IFilters[]): void {
        this.selectedFilters = [];
        if (filterObject != null) {

            for (let entry of filterObject)
            {
                if (entry.filterName == 'Region' || entry.filterName == 'Territory' || entry.filterName == 'Country') {
                    entry.sortOrder = this.data.filters.filter(x => x.filterName == 'Region')[0].filterData.filter(m => m["filterName"] == entry.filterName)[0]["sortOrder"];
                }
                else if (entry.filterName == 'PeriodYear')
                {
                    entry.sortOrder = this.data.filters.filter(k => k.filterName == 'Period')[0].sortOrder;
                }
                else if (entry.filterType.toLowerCase() == "source") {
                    entry.sortOrder = 20;
                }
                else

                    if (this.data.filters.filter(k => k.filterName == entry.filterName).length>0)
                entry.sortOrder = this.data.filters.filter(k => k.filterName == entry.filterName)[0].sortOrder;
            }

            filterObject = filterObject.sort(function (obj1, obj2) { return obj1.sortOrder - obj2.sortOrder });

            for (let entry of filterObject) {
                this.selectedData = { filterName: '', selectedValues: '' };
                var arr: any = [];

                if (entry.filterName.toLowerCase() == "list") {
                    continue;
                }
                this.selectedData.filterName = entry.filterName;
                if (entry.filterName == 'Source' || entry.filterName == 'Parameter') {
                    this.selectedData.selectedValues = this.data.filters.filter(x => x.filterName == entry.filterName)[0].filterData.filter(x => x["labelId"] == entry.selectedData)[0]["label"]
                }
                else if (entry.filterName == 'UnitType') {
                    this.selectedData.filterName = 'Unit Type';
                    this.selectedData.selectedValues = this.data.filters.filter(x => x.filterName == entry.filterName)[0].filterData.filter(x => x["labelId"] == entry.selectedData)[0]["label"]
                }
                else if (entry.filterName == 'Crop') {
                    for (let item of this.filterObject.filter(x => x.filterName == "Crop")[0].selectedData) {
                        arr.push(this.data.filters.filter(x => x.filterName == "Crop")[0].filterData.filter(x => x['value'] == item)[0]['label']);
                    }
                    this.selectedData.selectedValues = arr.sort().join(", ");
                }
                else if (entry.filterName == 'Region' || entry.filterName == 'Territory' || entry.filterName == 'Country') {
                    for (let item of this.filterObject.filter(x => x.filterName == entry.filterName)[0].selectedData) {
                        arr.push(this.data.filters.filter(x => x.filterName == 'Region')[0].filterData.filter(m => m["filterName"] == entry.filterName)[0]["filterData"].filter((k: any) => k.value == item)[0]["label"]);
                    }
                    if (arr.length > 0)
                        this.selectedData.selectedValues = arr.sort().join(", ");
                    else
                        this.selectedData.selectedValues = 'Not available';
                }
                else if (entry.filterName == 'PeriodYear') {
                    this.selectedData.filterName = 'Period';
                    this.selectedData.selectedValues = entry.selectedData.join(" to ");
                }
                else if (entry.filterType.toLowerCase() == "source") {
                    this.selectedData.filterName = entry.filterName + " source";
                    if (entry.filterData != null) {
                        if (entry.filterData.length > 0)
                            this.selectedData.selectedValues = entry.filterData.filter(k => k['sourceId'] == entry.selectedData)[0]['sourceName'];
                        else
                            this.selectedData.selectedValues = "Not available"
                    }
                    else
                        this.selectedData.selectedValues = "Not available"
                }

                else {  
                    this.selectedData.selectedValues = entry.selectedData;
                }

                this.selectedFilters.push(this.selectedData);
            }
        }
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

        this.chartService.getData(this.seriveParams)
            .subscribe(data => { this.data.filters = data.pageDataMapper.filters; this.loading = false; }
            , error => this.errorMessage = <any>error
            );

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

            this.arrayFilterdata = { templateName: "Export", fileName: "CropComparison" + "_" + (GlobalUtil.getAppSession("UserInfo") ? GlobalUtil.getAppSession("UserInfo").userName.split('@')[0].split('.')[0] : ""), kpiData: this.kpi, exportAs: ExportAsData.selectedData };
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
                    let Filters = (this.selectedFilters.length > 0) ? 'Filters applied: ' : 'Filters applied: '; 
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
                        //let obj = { Image: onSubmitClick("chart-container-" + key), Insight: (InsightData.selectedData == "1") ? InsightNode.textContent : null };
                        let obj = {
                            Image: onSubmitClick("chart-container-" + key), Insight: (InsightData.selectedData == "1") ? InsightNode.textContent : null,
                            ChartHeaderDesc: Filters, ChartFooterDesc: (this.blankCrops != '') ? 'Data is not available for ' + this.blankCrops + ' against the selected filters' : '',
                            PageFooterDesc: GlobalUtil.getAppSession("UserInfo").userName + ' exported from AgriInsider on ' + this.datePipe.transform(new Date(), 'dd MMMM yyyy')
                        };
                        this.kpi[0] = {
                            name: filterdata[count].widgetName,
                            data: obj,
                            CurrentChunk: count,
                            TotalChunks: FilesCount,
                            ExportLevel: ExportLevel.Chart,
                            Size: "1",
                        };
                        this.arrayFilterdata = { templateName: "Export", fileName: "CropComparison", kpiData: this.kpi, exportAs: ExportAsData.selectedData };
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

    getPageModuleId(): string {
        return GlobalUtil.getSession("PageModuleId");
    }
}