import { Component, ElementRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChartService } from '../../widgets/charts/chart.service';
import { IPageDataMapper, IServiceParams, IFilters, IExports, IInisghts } from '../../widgets/charts/chart';
import { PopoverContent } from 'ng2-popover';
import { GlobalConfig, Page, Constants, ExportLevel } from '../../global/global.config';
import { GlobalUtil } from '../../global/global.util';
declare var tinymce: any;
declare var onSubmitClick: any;

import { IExportModel } from '../../widgets/export/export';
import { ExcelExportService } from '../../widgets/export/Export.service';
import { EditorClasses } from '../../widgets/tinymce/tinymce.directive';
import { IInsights, IInsightsFilters, ChartInsights, IInsightViewModel } from '../../insights/insights.model';
import { DataListService } from '../../insights/datalist/datalist.service';

@Component({
    moduleId: module.id,
    templateUrl: 'currency-basket.component.html'
})
export class CurrencyBasketComponent {
    identificationFlagId: number = null;
    widgetIds: string;
    iInsights: IInsights;
    pageInsightHeader: string = "Add Insights";
    identificationFlag: string;
    fromChartInsight: boolean = false;
    chartInsights: ChartInsights[] = [];
    showInsightHeader: boolean = false;
    pageInsightEditorId = ""
    appliedFilters: Array<IInsightsFilters>;
    insightsData: string = 'Test data';
    insightsClasses: EditorClasses[] = [{ className: 'insightScrollDisplay', isAdd: true }, { className: 'insightChartDisplay', isAdd: true }];
    initInsightsEditor: boolean = false;
    pageInsightList: IInsights[] = [];
    insightViewModel: IInsightViewModel;
    insightFilterValues: IInsights = { insightId: null, insightData: '', pageName: Page.macroeconomicsCurrencyBasket.toString(), appliedFilterId: null, widgetDetailIds: '', appliedFilters: [], identificationFlag: '', author: '', updatedBy: '', updatedDate: null, isActive: true };

    data: IPageDataMapper;
    pageName: string = Page.macroeconomicsCurrencyBasket.toString();
    errorMessage: string;
    filterObject: IFilters[] = [];
    exportObject: IExports[] = [];
    filterApi: IFilters[] = [];
    exportApi: IFilters[] = [];
    exportVisible: boolean = true;
    @ViewChild('pagePopover') pagePopover: PopoverContent;
    paginator: boolean = false;
    pageLinks: number = 3;
    rowsPerPage: number = 5;
    rowsPerPageOptions: Array<number> = [5, 10, 20];
    responsive: boolean = true;
    loading: boolean = false;

    isAdmin: boolean = (GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin")? true : false;
    currentInsightData: string;
    currentWidgetId: number;
    editor: any;
    snapshotDesc: string;
    insightDetails: IInisghts = {};
    noInsightText = Constants.noInsightText;
    noInsightDate = Constants.noInsightDate;
    datePipe: DatePipe;


    seriveParams: IServiceParams = { pageName: Page.macroeconomicsCurrencyBasket, companyId: 0, cropId: 0, selectedFilter: null, userId: GlobalUtil.getAppSession("UserInfo").userId, regionName: GlobalUtil.getAppSession("UserInfo").region };
    //let selectedValue: IServiceParams = { pageName: Page.macroeconomicsCurrencyBasket.toString(), companyId: 0, cropId: 0, selectedFilter: this.filterObject, userId: GlobalUtil.getAppSession("UserInfo").userId };
    constructor(private chartService: ChartService, private ref: ElementRef, private _ExcelExportService: ExcelExportService, private dataListService: DataListService) {

    }


    ngOnInit(): void {
        this.loading = true;
        this.chartService.getData(this.seriveParams)
            .subscribe(data => {
                this.data = data.pageDataMapper;
                let period: Array<string> = this.data.filters.filter(k => k.filterName == 'Period')[0].filterData[0]["defaultValue"];
                this.insightFilterValues.appliedFilters.push({ filterName: "From Year", filterValue: period[0] });
                this.insightFilterValues.appliedFilters.push({ filterName: "To Year", filterValue: period[1] });
                //Insight Service calling started
                this.dataListService.getInsights(this.insightFilterValues).subscribe(data => {
                    this.insightViewModel = data;
                    this.setInsightValues();
                    this.loading = false
                }, error => this.errorMessage = <any>error);
                //Insight Service calling completed

            }, error => this.errorMessage = <any>error);
    }

    getPageModuleId(): string {
        return GlobalUtil.getSession("PageModuleId");
    }

    onFilterEmit(filter: IFilters): boolean {
        this.filterObject = this.filterObject.filter(
            x => x.filterName !== filter.filterName);

        this.filterObject.push(filter);
        return true;
    }

    onExportEmit(exp: IExports): boolean {
        this.exportObject = this.exportObject.filter(
            x => x.exportName !== exp.exportName);

        this.exportObject.push(exp);
        return true;
    }

    initPageInsightEditor() {
        if (this.identificationFlagId == 3 && this.fromChartInsight == false) {
            this.collapseChartInsight();
        }
        this.initInsight();
        this.iInsights.identificationFlag = "P";
        this.pageInsightEditorId = "CBPageInsightEditor";
        let s: HTMLElement = document.getElementById('insightTargetTitle');
        let collapsed = s.classList.contains("collapsed")
        this.initInsightsEditor = collapsed;
    }
    initChartInsightEditor(widgetId: number, index: number) {
        if (this.identificationFlagId == 3 && this.initInsightsEditor) {
            this.fromChartInsight = true;
            this.collapsePageInsight();
            this.fromChartInsight = false;
        }
        let z = this.chartInsights.findIndex(x => x.widgetId == widgetId)
        if (z == index) {
            this.collapseChartInsight();
            this.initInsight();
            this.iInsights.insightData = "";
            this.iInsights.identificationFlag = "C";
            this.iInsights.widgetDetailIds = widgetId.toString();
            this.chartInsights[z] = {
                EditorId: 'tinyMce' + z,
                iInsights: this.iInsights,
                initInsightsEditor: true,
                insightsClasses: this.insightsClasses,
                insightsData: '',
                widgetId: widgetId
            }
        }

    }
    collapseChartInsight() {
        this.chartInsights.forEach((x, ind) => {
            if (x.initInsightsEditor == true) {
                x.initInsightsEditor = false;
                document.getElementById('chart' + ind + 'cc').click();
            }
        });
    }
    collapsePageInsight() {
        let s: HTMLElement = document.getElementById('insightTargetTitle');
        if (s != null) {
            s.click();
        }
    }

    initInsight() {
        this.iInsights = {
            insightId: null,
            insightData: this.insightsData,
            pageName: Page.macroeconomicsCurrencyBasket.toString(),
            appliedFilterId: null,
            widgetDetailIds: this.widgetIds,
            appliedFilters: this.appliedFilters,
            identificationFlag: this.identificationFlag,
            author: GlobalUtil.getAppSession("UserInfo").firstName + " " + GlobalUtil.getAppSession("UserInfo").lastName,
            updatedBy: GlobalUtil.getAppSession("UserInfo").userId,
            appliedFiltersDisplay: this.filterObject.map(k => k.filterName.replace("PeriodYear","Period") + ': ' + k.selectedData.join(' to ')).join(', '),
            updatedDate: null,
            isActive: true
        };
    }

    setAppliedFilters(appliedFilters: IInsightsFilters[]) {
        for (let f of this.filterObject) {
            if (f.filterName == "PeriodYear") {
                appliedFilters.push({ filterName: "From Year", filterValue: f.selectedData[0] });
                appliedFilters.push({ filterName: "To Year", filterValue: f.selectedData[1] });
            }
            else
                appliedFilters.push({ filterName: f.filterName, filterValue: f.selectedData })
        }
    }
    getFilters(filterObject: IFilters[]) {
        this.getWidgetIds();
        this.appliedFilters = [];
        this.setAppliedFilters(this.appliedFilters);

        this.initInsight();

        if (this.identificationFlagId == 1) {
            if (this.initInsightsEditor) {
                let s: HTMLElement = document.getElementById('insightTargetTitle');
                if (s != null) {
                    s.click();
                }
            }
            this.identificationFlag = "P"
        }
        else if (this.identificationFlagId == 2) {
            this.setChartInsights();
            this.identificationFlag = "C"
        }
        else if (this.identificationFlagId == 3) {
            if (this.initInsightsEditor) {
                let s: HTMLElement = document.getElementById('insightTargetTitle');
                if (s != null) {
                    s.click();
                }
            }
            this.setChartInsights();
            this.identificationFlag = "B"
        }
    }

    setChartInsights() {
        this.chartInsights = [];
        let chartsDetails: any = this.data.exports.filter(model => model.exportName == "Chart Names");
        if (chartsDetails.length > 0) {
            let widgets: Object[] = chartsDetails[0].exportData;
            if (widgets.length > 0) {
                for (let i = 0; i < widgets.length; i++) {
                    let wt = widgets[i];
                    this.chartInsights.push(
                        {
                            iInsights: this.iInsights,
                            initInsightsEditor: false,
                            insightsClasses: this.insightsClasses,
                            insightsData: '',
                            widgetId: wt["value"]
                        }
                    );
                }
            }
        }
    }
    getWidgetIds() {
        let chartsDetails: any = this.data.exports.filter(model => model.exportName == "Chart Names");
        if (chartsDetails.length > 0) {
            let widgets = chartsDetails[0].exportData;
            if (widgets.length > 0) {
                this.widgetIds = (widgets.map((x: any) => x.value)).toString();
            }
        }
    }
    //event handler while insightlist change
    InsightListCount(event: any): void {
        let flag = event.identificationFlag;
        if (flag == "P") {
            this.pageInsightList = event.insightList;
            if (event.Count > 0) {
                this.pageInsightHeader = "Insights <span class='insight-notification'>" + event.Count + "</span>";
            } else {
                this.pageInsightList = null;
                this.pageInsightHeader = "Add Insights";
            }
        }
        else if (flag == "C") {
            this.data.widgets.forEach(function (obj, index) {
                if (obj.widgetId == event.widgetId) {
                    if (obj.insightsList == undefined && obj.insightsList == null) {
                        obj.insightsList = {
                            widgetId: event.widgetId, insightList: event.insightList
                        }
                    }
                    if (event.Count > 0) {
                        obj.insightHeader = "Insights <span class='insight-notification'>" + event.Count + "</span>";
                    } else {
                        obj.insightsList = null;
                        obj.insightHeader = "Add Insights";
                    }
                }
            });
        }
    }
    setInsightValues() {
        if (this.insightViewModel.pageInsightList.length > 0) {
            this.pageInsightList = this.insightViewModel.pageInsightList
            this.pageInsightHeader = "Insights <span class='insight-notification'>" + this.insightViewModel.pageInsightList.length + "</span>";
            this.showInsightHeader = true;
        }
        else {
            if (this.isAdmin) {
                this.showInsightHeader = true;
            }
            this.pageInsightList = this.insightViewModel.pageInsightList
            this.pageInsightHeader = "Add Insights";
        }

        for (let d of this.data.widgets) {
            d.showInsightHeader = false;
            if (this.insightViewModel.widgetInsightList.length > 0) {
                d.insightsList = this.insightViewModel.widgetInsightList.filter(k => k.widgetId === d.widgetId)[0];
                if (d.insightsList) {
                    if (d.insightsList.insightList.length > 0) {
                        d.showInsightHeader = true
                        d.insightHeader = "Insights <span class='insight-notification'>" + d.insightsList.insightList.length + "</span>";
                    }
                }
                else {
                    if (this.isAdmin) {
                        d.showInsightHeader = true
                    }
                    d.insightHeader = "Add Insights";
                }
            }
            else {
                if (this.isAdmin) {
                    d.showInsightHeader = true
                }
                d.insightHeader = "Add Insights";
            }
        }

        this.identificationFlagId = this.data.insightTypeId;
        if (this.identificationFlagId != null) {
            this.getFilters(this.filterObject);
        }
    }
    FilterSubmit(pagePopover: PopoverContent): void {

        this.loading = true;
        this.insightFilterValues.appliedFilters = [];
        this.setAppliedFilters(this.insightFilterValues.appliedFilters);
        this.dataListService.getInsights(this.insightFilterValues).subscribe(data => {

            this.insightViewModel = data;

            this.seriveParams.selectedFilter = this.filterObject;
            this.seriveParams.regionName = null;
            this.chartService.getData(this.seriveParams)
                .subscribe(data => {
                    this.data.widgets = data.pageDataMapper.widgets;
                    this.data.exports = data.pageDataMapper.exports;
                    this.exportVisible = true;
                    // Setting Insight Data in Widget ViewModel
                    this.setInsightValues();
                    //
                    this.loading = false;
                }
                , error => this.errorMessage = <any>error
                );

        }, error => this.errorMessage = <any>error);
    }

    arrayFilterdata: IExportModel;
    kpi: Object[] = [];
    //exportdata1: IExportDa = { exce: '' };
    exportData: string;
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

            this.arrayFilterdata = { templateName: "Export", fileName: this.pageName + "_" + (GlobalUtil.getAppSession("UserInfo") ? GlobalUtil.getAppSession("UserInfo").userName.split('@')[0].split('.')[0] : ""), kpiData: this.kpi, exportAs: ExportAsData.selectedData };
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

                    let Insights = this.pageInsightList;
                    let PageInsightData = '';
                    this.datePipe = new DatePipe("en-US");
                    if (Insights.length > 0) {
                        for (let insightitem of Insights) {
                            if (insightitem.insightData != null || insightitem.insightData != undefined) {
                                PageInsightData = PageInsightData.concat('<strong>').concat("Time Period: ").concat('</strong>').concat(insightitem.insightTitle).concat('<br/>');
                                PageInsightData = PageInsightData.concat('<strong>').concat("Insight: ").concat('</strong>').concat(insightitem.insightData.replace('<p>', '').replace('</p>', '')).concat('<br/>');
                                PageInsightData = PageInsightData.concat('<strong>').concat('Author: ').concat('</strong>').concat(insightitem.author).concat('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'); // space given to show the next record in the same row
                                PageInsightData = PageInsightData.concat('<strong>').concat('Updated Date: ').concat('</strong>').concat(this.datePipe.transform(insightitem.updatedDate, 'dd MMMM yyyy')).concat('<br/><br/><br/>');
                            }
                        }
                    }

                    let loop = (key: number) => {
                        let InsightNode = document.createElement('div');
                        //InsightNode.innerHTML = this.data.widgets.find(model => model.widgetId == key).insightData;
                        InsightNode.innerHTML = PageInsightData;
                        let obj = {
                            Image: onSubmitClick("chart-container-" + key), Insight: (InsightData.selectedData == "1") ? InsightNode.innerHTML.toString() : null,
                            PageFooterDesc: GlobalUtil.getAppSession("UserInfo").userName + ' exported from AgriInsider on ' + this.datePipe.transform(new Date(), 'dd MMMM yyyy')
                        };
                        this.kpi[0] = {
                            name: filterdata[count].widgetName,
                            data: obj,
                            CurrentChunk: count,
                            TotalChunks: FilesCount,
                            Size: 1,
                            ExportLevel: ExportLevel.Page
                        };
                        this.arrayFilterdata = { templateName: "Export", fileName: this.pageName, kpiData: this.kpi, exportAs: ExportAsData.selectedData };
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



    onExportVisibleEmit(visible: boolean): void {
        this.exportVisible = visible;
    }

}
