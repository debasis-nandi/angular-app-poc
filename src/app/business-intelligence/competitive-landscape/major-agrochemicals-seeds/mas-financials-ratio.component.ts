import { Component, ElementRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { ChartService } from '../../../widgets/charts/chart.service';
import { IPageDataMapper, IServiceParams, IFilters, IExports, IInisghts, ISelectedFilters } from '../../../widgets/charts/chart';
import { PopoverContent } from 'ng2-popover';
import { GlobalConfig, Page, Constants, ExportLevel } from '../../../global/global.config';
import { GlobalUtil } from '../../../global/global.util';
import { IExportModel } from '../../../widgets/export/export';
import { ExcelExportService } from '../../../widgets/export/Export.service';
import { EditorClasses } from '../../../widgets/tinymce/tinymce.directive';
import { IInsights, IInsightsFilters, ChartInsights, IInsightViewModel } from '../../../insights/insights.model';
import { DataListService } from '../../../insights/datalist/datalist.service';

declare var tinymce: any;
declare var onSubmitClick: any;

@Component({
    moduleId: module.id,
    templateUrl: 'mas-financials-ratio.component.html' 
})
export class MASFinancialsRatioComponent {
    //**Insight variables
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
    insightFilterValues: IInsights = { insightId: null, insightData: '', pageName: Page.ciFinancialsRatio.toString(), appliedFilterId: null, widgetDetailIds: '', appliedFilters: [], identificationFlag: '', author: '', updatedBy: '', updatedDate: null, isActive: true };
    //--Insight variables

    data: IPageDataMapper;
    pageName: string = Page.ciFinancialsRatio.toString();
    errorMessage: string;
    filterObject: IFilters[] = [];
    filterApi: IFilters[] = [];
    companyName: string;
    exportObject: IExports[] = [];
    exportVisible: boolean = true;
    paginator: boolean = false;
    pageLinks: number = 3;
    rowsPerPage: number = 5;
    rowsPerPageOptions: Array<number> = [5, 10, 20];
    responsive: boolean = true;
    loading: boolean = false;
    seriveParams: IServiceParams = { pageName: Page.ciFinancialsRatio.toString(), companyId: GlobalUtil.getSession("CompetitorId"), cropId: 0, selectedFilter: null, userId: GlobalUtil.getAppSession("UserInfo").userId, regionName: GlobalUtil.getAppSession("UserInfo").region };

    isAdmin: boolean = (GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
    currentInsightData: string;
    currentWidgetId: number;
    editor: any;
    snapshotDesc: string;
    insightDetails: IInisghts = {};
    noInsightText = Constants.noInsightText;
    noInsightDate = Constants.noInsightDate;
    submitVisible: boolean = false;
    submitMessage: string = '';
    selectedFilters: ISelectedFilters[] = [];
    selectedData: ISelectedFilters;
    datePipe: DatePipe;

    deafultQuarterValues: IFilters[] = [];

    insightList: IInsights[] = [];

    constructor(private chartService: ChartService, private ref: ElementRef, private _ExcelExportService: ExcelExportService, private dataListService: DataListService, private router: Router) {
    }

    getPageModuleId(): string {
        return GlobalUtil.getSession("PageModuleId");
    }
    getNotification(evt: any) {
        alert('sure to commit');
        // Do something with the notification (evt) sent by the child!
    }
    /*ngOnInit(): void {
        this.loading = true;
        this.companyName = GlobalUtil.getSession("CompanyName");
        this.chartService.getData(this.seriveParams)
            .subscribe(data => { this.data = data.pageDataMapper; this.loading = false; }
            , error => this.errorMessage = <any>error
            );
    }*/

    initPageInsightEditor() {
        if (this.identificationFlagId == 3 && this.fromChartInsight == false) {
            this.collapseChartInsight();
        }
        this.initInsight();
        this.iInsights.identificationFlag = "P";
        this.pageInsightEditorId = "FinRatioPageInsightEditor";
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

    ngOnInit(): void {
        if (GlobalUtil.getSession("CompetitorId")) {
            this.loading = true;
            this.companyName = GlobalUtil.getSession("CompanyName");
            //debugger;
            if (GlobalUtil.getSession("ChartYear") != "" && GlobalUtil.getSession("ChartYear") != null) {
                var chartYear = GlobalUtil.getSession("ChartYear");
                var filterPara: IFilters[] = [
                    { id: 0, filterType: "", filterName: "PeriodQuarter", isVisible: true, filterData: null, childControlMappingId: 0, sortOrder: 0, selectedData: [(parseInt(chartYear) - 1), parseInt(chartYear)] },
                    { id: 0, filterType: "", filterName: "View Data As", isVisible: true, filterData: null, childControlMappingId: 0, sortOrder: 0, selectedData: "Quarterly" }
                ];
                var selectedPara: IServiceParams = { pageName: Page.ciFinancialsRatio.toString(), companyId: GlobalUtil.getSession("CompetitorId"), cropId: 0, selectedFilter: filterPara, isSearchRedirct: true };
                this.chartService.getData(selectedPara)
                    .subscribe(data => {

                        if (data) {
                            this.data = data.pageDataMapper; this.GetSelectedFilters(this.data.filters); this.loading = false;
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
                        this.data = data.pageDataMapper; this.GetSelectedFilters(this.data.filters);
                        this.deafultQuarterValues = this.data.filters.filter(k => k.filterName == 'From Year');
                        //**Insight Service calling started
                        this.insightFilterValues.appliedFilters = [];
                        this.setAppliedFilters(this.insightFilterValues.appliedFilters, this.data.filters);
                        this.dataListService.getInsights(this.insightFilterValues).subscribe(data => {
                            this.insightViewModel = data;
                            this.setInsightValues();
                            this.loading = false
                        }, error => this.errorMessage = <any>error);
                        //--Insight Service calling completed

                    }, error => { this.errorMessage = <any>error });
            }
        }
        else {
            this.router.navigateByUrl('layout/majoragroandseeds');
        }
    }

    initInsight() {
        this.iInsights = {
            insightId: null,
            insightData: this.insightsData,
            pageName: Page.ciFinancialsRatio,
            appliedFilterId: null,
            widgetDetailIds: this.widgetIds,
            appliedFilters: this.appliedFilters,
            identificationFlag: this.identificationFlag,
            author: GlobalUtil.getAppSession("UserInfo").firstName + " " + GlobalUtil.getAppSession("UserInfo").lastName,
            updatedBy: GlobalUtil.getAppSession("UserInfo").userId,
            appliedFiltersDisplay: this.selectedFilters.map(k => k.filterName + ': ' + k.selectedValues).join(', '),
            updatedDate: null,
            isActive: true
        };
        //console.log(this.iInsights);
    }

    getFilters(filterObject: IFilters[]) {
        this.getWidgetIds();
        this.appliedFilters = [];
        this.setAppliedFilters(this.appliedFilters, filterObject);
        //let vdata = this.data.filters.filter((a: any) => a.filterName === "View Data As")[0];
        //let filterType = vdata.selectedData;
        //for (let f of filterObject) {
        //    this.appliedFilters.push({ filterName: f.filterName, filterValue: f.selectedData });
        //}

        //this.appliedFilters.push({ filterName: "CompetitorId", filterValue: GlobalUtil.getSession("CompetitorId") });

        this.initInsight();

        if (this.identificationFlagId == 1) {
            let s: HTMLElement = document.getElementById('insightTargetTitle');
            if (s != null) {
                s.click();
            }
            this.identificationFlag = "P"
        }
        else if (this.identificationFlagId == 2) {
            this.setChartInsights();
            this.identificationFlag = "C"
        }
        else if (this.identificationFlagId == 3) {
            this.identificationFlag = "B"
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
            this.getFilters(this.data.filters);
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
                //  this.widgetIds = (widgets.map((x: any) => x.value)).toString();
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
    onSubmitMessageEmit(message: string): void {
        this.submitMessage = message;
    }

    setAppliedFilters(appliedFilters: IInsightsFilters[], filterObject: IFilters[]) {
        let isQuarterly = filterObject.filter(k => k.filterName == "View Data As")[0].selectedData =="Quarterly";
        for (let f of filterObject) {
            if (f.filterName == "From Year" && isQuarterly==false) {
                continue;
            }
            if (f.filterName == "PeriodYear") {
                appliedFilters.push({ filterName: 'From Year', filterValue: f.selectedData[0].toString() })
                appliedFilters.push({ filterName: 'To Year', filterValue: f.selectedData[1].toString() })
            }
            else if (f.filterName == "Period") {
                appliedFilters.push({ filterName: 'From Year', filterValue: f.filterData[0]["defaultValue"][0] })
                appliedFilters.push({ filterName: 'To Year', filterValue: f.filterData[0]["defaultValue"][1] })
            }
            else
                appliedFilters.push({ filterName: f.filterName, filterValue: f.selectedData })
        }

        appliedFilters.push({ filterName: "CompetitorId", filterValue: GlobalUtil.getSession("CompetitorId") });
    }

    FilterSubmit(pagePopover: PopoverContent): void {
       // tinymce.remove(this.editor);
        //pagePopover.hide();
        this.loading = true;
        let insightFilterValues: IInsights = { insightId: null, insightData: '', pageName: Page.ciFinancialsRatio, appliedFilterId: null, widgetDetailIds: '', appliedFilters: [], identificationFlag: '', author: '', updatedBy: '', updatedDate: null, isActive: true };
        for (let entry of this.filterObject) {
            if (entry.filterName === 'View Data As' && entry.selectedData === 'Quarterly')
                this.filterApi = this.filterObject.filter(
                    x => x.filterName !== "PeriodYear");
            else if (entry.filterName === 'View Data As' && entry.selectedData === 'Yearly')
                this.filterApi = this.filterObject.filter(
                    x => x.filterName !== "PeriodQuarter" && x.filterName !== "From Year" && x.filterName !== "To Year" && x.filterName !== "From Quarter" && x.filterName !== "To Quarter");
        }

        //selcted Filters for Insights
        //selected Filters for Insights
        this.setAppliedFilters(insightFilterValues.appliedFilters, this.filterApi);

        
        this.dataListService.getInsights(insightFilterValues).subscribe(data => {

            this.insightViewModel = data;
            let selectedValue: IServiceParams = { pageName: Page.ciFinancialsRatio.toString(), companyId: GlobalUtil.getSession("CompetitorId"), cropId: 0, selectedFilter: this.filterApi, userId: GlobalUtil.getAppSession("UserInfo").userId };
            this.chartService.getData(selectedValue)
                .subscribe(data => {
                    this.data.widgets = data.pageDataMapper.widgets;

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


                    this.data.exports = data.pageDataMapper.exports;
                    this.exportVisible = true;
                    this.GetSelectedFilters(this.filterApi);
                    this.identificationFlagId = (data.pageDataMapper as any).insightTypeId;
                    if (this.identificationFlagId != null) {
                        this.getFilters(this.filterApi);
                    }
                    this.loading = false;
                }
                , error => this.errorMessage = <any>error
                );

        }, error => this.errorMessage = <any>error);

        //let selectedValue: IServiceParams = { pageName: Page.ciFinancialsRatio.toString(), companyId: GlobalUtil.getSession("CompetitorId"), cropId: 0, selectedFilter: this.filterApi, userId: GlobalUtil.getAppSession("UserInfo").userId  };
        //this.chartService.getData(selectedValue)
        //    .subscribe(data => { this.data.widgets = data.pageDataMapper.widgets; this.data.exports = data.pageDataMapper.exports; this.exportVisible = true; this.GetSelectedFilters(this.filterApi); this.loading = false; }
        //    , error => this.errorMessage = <any>error
        //    );
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
                if (entry.filterName == 'Currency') {
                    this.selectedData.selectedValues = this.data.filters.filter(x => x.filterName == entry.filterName)[0].filterData.filter(x => x["labelId"] == entry.selectedData)[0]["label"]
                }

                else if ((entry.filterName == 'PeriodYear') || (entry.filterName == 'Period')) {
                    this.selectedData.filterName = 'Period';
                    if ((typeof (entry.selectedData) != "object") || (entry.selectedData == null)) {
                        this.selectedData.selectedValues = entry.filterData[0]['defaultValue'].join(" to ");
                    } else {
                        this.selectedData.selectedValues = entry.selectedData.join(" to ");
                    }
                }
                else if (entry.filterName == 'From Year') {
                    if (filterObject.find(x => x.filterName == 'View Data As').selectedData == 'Yearly') {
                        continue;
                    }
                    else {
                        this.selectedData.selectedValues = entry.selectedData;
                    }
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

    onExportEmit(exp: IExports): boolean {

        this.exportObject = this.exportObject.filter(
            x => x.exportName !== exp.exportName);

        this.exportObject.push(exp);
        return true;

    }

    arrayFilterdata: IExportModel;
    kpi: Object[] = [];
    // exportdata1: IExportDa = { exce: '' };
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
                    let Filters = (this.selectedFilters.length > 0) ? 'Filters applied: ' : 'Filters applied: ' + this.companyName;
                    if (this.selectedFilters != null) {
                        if (this.selectedFilters.length > 0) {
                            for (let item of this.selectedFilters) {
                                Filters = Filters.concat('<strong>').concat(item.filterName).concat('</strong>').concat(': ').concat(item.selectedValues).concat('; ');
                            }
                        }
                    }
                    let loop = (key: number) => {
                        let InsightNode = document.createElement('div');
                        //InsightNode.innerHTML = this.data.widgets.find(model => model.widgetId == key).insightData;
                            let Insights = this.data.widgets.filter(x => x.widgetId == key);
                            if (Insights.length > 0) {
                                let WidgetInsightData = '';
                                this.datePipe = new DatePipe("en-US");
                                for (let insightitem of Insights) {
                                    if (insightitem.insightsList != null || insightitem.insightsList != undefined) {
                                        if (insightitem.insightsList.insightList.length > 0) {
                                            for (let item of insightitem.insightsList.insightList) {
                                                WidgetInsightData = WidgetInsightData.concat('<strong>').concat("Time Period: ").concat('</strong>').concat(item.insightTitle).concat('<br/>');
                                                WidgetInsightData = WidgetInsightData.concat('<strong>').concat("Insight: ").concat('</strong>').concat(item.insightData.replace('<p>', '').replace('</p>', '')).concat('<br/>');
                                                WidgetInsightData = WidgetInsightData.concat('<strong>').concat('Author: ').concat('</strong>').concat(item.author).concat('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'); // space given to show the next record in the same row
                                                WidgetInsightData = WidgetInsightData.concat('<strong>').concat('Updated Date: ').concat('</strong>').concat(this.datePipe.transform(item.updatedDate, 'dd MMMM yyyy')).concat('<br/><br/><br/>');
                                            }
                                        }
                                    }
                                }
                                InsightNode.innerHTML = WidgetInsightData;
                            }                        
                        let obj = {
                            Image: onSubmitClick("chart-container-" + key), Insight: (InsightData.selectedData == "1") ? InsightNode.innerHTML.toString() : null,
                            ChartHeaderDesc: Filters,
                            PageFooterDesc: GlobalUtil.getAppSession("UserInfo").userName + ' exported from AgriInsider on ' + this.datePipe.transform(new Date(), 'dd MMMM yyyy')
                        };
                        this.kpi[0] = {
                            name: filterdata[count].widgetName + ' - ' + this.companyName,
                            data: obj,
                            CurrentChunk: count,
                            TotalChunks: FilesCount,
                            ExportLevel: ExportLevel.Chart
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


    InsightListCount(event: any): void {
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
