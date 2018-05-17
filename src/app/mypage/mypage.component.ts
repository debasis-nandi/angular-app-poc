import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChartService } from '../widgets/charts/chart.service';
import { DatePipe } from '@angular/common';
import { IPageDataMapper, IServiceParams, IInisghts, IFilters, IFavoriteWidget, IExports, IChartComponentViewModel, IUnderlyingChartDataViewModel, IActions } from '../widgets/charts/chart';
import { GlobalConfig, Page, Constants, ExportLevel } from '../global/global.config';
import { GlobalUtil  } from '../global/global.util';
import { PopoverContent } from 'ng2-popover';
import { IExportModel } from '../widgets/export/export';
import { ExcelExportService } from '../widgets/export/Export.service';

//declare var tinymce: any;
declare var onSubmitClick: any;

@Component({
    moduleId: module.id,
    selector: 'my-page',
    templateUrl: 'mypage.component.html',
})

export class MyPageComponent {

    data: any;
    pageName: string = Page.myPage.toString();
    errorMessage: string;
    paginator: boolean = false;
    pageLinks: number = 3;
    rowsPerPage: number = 5;
    rowsPerPageOptions: Array<number> = [5, 10, 20];
    responsive: boolean = true;
    clicked: boolean = true;
    loading: boolean = false;

    isAdmin: boolean = (GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
    currentInsightData: string;
    currentWidgetId: number;
    editor: any;
    snapshotDesc: string;
    insightDetails: IInisghts = {};
    emptyChartViewModelObject: IChartComponentViewModel;
    emptyUnderlyingViewModelObject: IUnderlyingChartDataViewModel;

    widgetPrefix: string;
    selectedCropName: string;
    selectedCropId: number = 0;
    filterObject: IFilters[] = [];
    filterObjectArray: Array<any[]> = [];

    filterApi: IFilters[] = [];
    @ViewChild('pagePopover') pagePopover: PopoverContent;

    exportObject: IExports[] = [];
    exportVisible: boolean = true;

    goodGrowthImagePath: string = GlobalConfig.mYPageGoodGrowth;
    homeTextImagePath: string = GlobalConfig.mYPageHomeText;

    noInsightText = Constants.noInsightText;
    noInsightDate = Constants.noInsightDate;
    datePipe: DatePipe;

    widgetCount: number = 0;
    //submitVisible: boolean = false;
    //submitMessage: string = '';
    submitVisible: Array<boolean> = [false, false, false, false, false, false, false, false];
    submitMessage: Array<string> = ['', '', '', '', '', '', '', ''];

    seriveParams: IServiceParams = { pageName: Page.myPage, companyId: 2, cropId: 0, selectedFilter: null, userId: GlobalUtil.getAppSession("UserInfo").userId, regionName: GlobalUtil.getAppSession("UserInfo").region, widgetId: 0 };


    constructor(private chartService: ChartService, private _ExcelExportService: ExcelExportService) {
    }


    OnFavoriteSaved(widget: IFavoriteWidget) {
        for (let k = 0; k < this.data[0].exports[1].exportData.length; k++) {
            let cuurentChartName = this.data[0].exports[1].exportData[k];
            if (cuurentChartName.label === widget.widgetName) {
                this.data[0].exports[1].exportData.splice(k, 1);
            }
        }
        this.widgetCount = 0;
        for (let i = 0; i < this.data.length; i++) {
            let pd: IPageDataMapper = this.data[i];
            for (let j = 0; j < pd.widgets.length; j++) {
                let w = pd.widgets[j];
                this.widgetCount++;
                if (w.widgetId === widget.widgetId && w.widgetName === widget.widgetName) {
                    this.data[i].widgets.splice(j, 1);
                    this.widgetCount--;
                }
            }
        }
    }

  
    GetChangedId(widgetKey: number): number {
        var listOfWidgetIds: any = [];

        //for (let i = 0; i < this.data.length; i++) {
        //    let pd: IPageDataMapper = this.data[i];
        //    for (let j = 0; j < pd.widgets.length; j++) {
        //        let w = pd.widgets[j];
        //        if (widgetKey == w.widgetId) {
        //            filterdata.push(w);
        //        }
        //    }
        //}

        for (let i = 0; i < this.data[0].exports[1].exportData.length; i++) {

            var item = this.data[0].exports[1].exportData[i];
            var search = item.value;
            var count = listOfWidgetIds.reduce(function (n: any, val: any) {
                return n + (val === search);
            }, 0);

            if (count > 0) {
                item.value = item.value + count + parseInt("0000001");
            }
            listOfWidgetIds.push(item.value);

        }

        return 0;
    }

    
    ngOnInit(): void {

        this.loading = true;
        this.chartService.getData(this.seriveParams)
            .subscribe(data => {
                this.data = data.pageDataMapper;
                for (let i = 0; i < this.data.length; i++) {
                    this.widgetCount += this.data[i].widgets.length;
                }

                var listOfWidgetIds: any = [];
                if (this.data.length > 0) {
                    for (let i = 0; i < this.data[0].exports[1].exportData.length; i++) {

                        var item = this.data[0].exports[1].exportData[i];
                        var search = item.value;
                        var count = listOfWidgetIds.reduce(function (n: any, val: any) {
                            return n + (val === search);
                        }, 0);

                        if (count > 0) {
                            //item.value = item.value + count + parseInt("10000001");
                        }
                        this.data[0].exports[1].exportData[i] = item;
                        listOfWidgetIds.push(item.value);

                    }
                }
                GlobalUtil.setSession('favouriteCount', '' + this.widgetCount.toString());
                this.loading = false;
            }
            , error => this.errorMessage = <any>error
            );
    }


    isInsightLastUpdatedVisible(currentInsightData: string): boolean {
        if (this.currentInsightData != null && this.currentInsightData != "") {
            return true;
        }
        else {
            return false;
        }
    }

    onFilterEmit(filter: IFilters, widgetId: number, cropId: number, competitorId: number): boolean {
        //this.filterObject = this.filterObject.filter(x => x.filterName !== filter.filterName);
        //this.filterObject.push(filter);
        //let test = this.filterObjectArray[widgetId];
        //this.filterObjectArray[widgetId]
        let combineId = widgetId + "" + cropId + "" + competitorId;
        if (this.filterObjectArray[+combineId]) {
            this.filterObjectArray[+combineId] = this.filterObjectArray[+combineId].filter(x => x["filterName"] !== filter["filterName"]);
            this.filterObjectArray[+combineId].push(filter);
        }
        else {
            this.filterObjectArray[+combineId] = [];
            this.filterObjectArray[+combineId] = this.filterObjectArray[+combineId].filter(x => x["filterName"] !== filter["filterName"]);
            this.filterObjectArray[+combineId].push(filter);
        }


        //this.filterObjectArray[widgetId]=this.filterObject
        return true;
    }

    onSubmitEmit(visible: boolean, j: number): void {
        this.submitVisible[j] = visible;
    }
    onSubmitMessageEmit(message: string, j: number): void {
        this.submitMessage[j] = message;
    }

    FilterSubmit(pagePopover: PopoverContent, pageName: string, cropId: number, competitorId: number, argWidgetId: number, index: number): void {

        this.loading = true;

        let combineId = argWidgetId + "" + cropId + "" + competitorId;
        for (let entry of this.filterObjectArray[+combineId]) {
            if (entry.filterName === 'View Data As' && entry.selectedData === 'Quarterly') {
                this.filterApi = this.filterObjectArray[+combineId].filter(x => x.filterName !== "PeriodYear");
                break;
            }
            else if (entry.filterName === 'View Data As' && entry.selectedData === 'Yearly') {
                this.filterApi = this.filterObjectArray[+combineId].filter(x => x.filterName !== "PeriodQuarter" && x.filterName !== "From Year" && x.filterName !== "To Year" && x.filterName !== "From Quarter" && x.filterName !== "To Quarter");
                break;
            }
            else {
                this.filterApi = this.filterObjectArray[+combineId];
                if (entry.filterName === "Crop") {
                    this.selectedCropName = entry.filterData[0]["label"];
                    this.selectedCropId = entry.filterData[0]["labelId"];
                }
            }
        }

        let newWidgetId = 0;
        if (cropId > 0) {
            newWidgetId = argWidgetId - cropId - 10000000;
        }
        else if (competitorId > 0) {
            newWidgetId = argWidgetId - competitorId - 10000000;
        }
        else {
            newWidgetId = argWidgetId;
        }


        let selectedValue: IServiceParams = {
            pageName: pageName + "#" + Page.myPageWidgetFilter.toString(), companyId: competitorId,
            cropId: this.selectedCropId > 0 ? this.selectedCropId : cropId, selectedFilter: this.filterApi, widgetId: newWidgetId
        };
        this.chartService.getChartSpecificData(selectedValue)
            .subscribe(dataReturned => {

                for (let i = 0; i < this.data.length; i++) {
                    let pd: IPageDataMapper = this.data[i];
                    for (let j = 0; j < pd.widgets.length; j++) {
                        let w = pd.widgets[j];
                        if (w.widgetId === argWidgetId && w.cropId === cropId && w.competitorId === competitorId && dataReturned.pageDataMapperFilterResult.widgets.length > 0) {


                            this.widgetPrefix = this.data[i].widgets[j].widgetName.substr(0, this.data[i].widgets[j].widgetName.indexOf('-'));
                            //this.data[i].widgets[j].widgetId = dataReturned.pageDataMapperFilterResult.widgets[0].widgetId;
                            this.data[i].widgets[j].widgetType = dataReturned.pageDataMapperFilterResult.widgets[0].widgetType;
                            this.data[i].widgets[j].sortOrder = dataReturned.pageDataMapperFilterResult.widgets[0].sortOrder;
                            this.data[i].widgets[j].cropId = cropId;
                            this.data[i].widgets[j].competitorId = competitorId;
                            this.data[i].widgets[j].chartComponentViewModel = dataReturned.pageDataMapperFilterResult.widgets[0].chartComponentViewModel;
                            this.data[i].widgets[j].underlyingChartDataViewModel = dataReturned.pageDataMapperFilterResult.widgets[0].underlyingChartDataViewModel;
                            this.data[i].widgets[j].sourceName = dataReturned.pageDataMapperFilterResult.widgets[0].sourceName;
                            this.data[i].widgets[j].lastUpdated = dataReturned.pageDataMapperFilterResult.widgets[0].lastUpdated;


                            if (this.widgetPrefix) {
                                this.data[i].widgets[j].widgetName = this.widgetPrefix + '- ' + dataReturned.pageDataMapperFilterResult.widgets[0].widgetName;
                            }

                            if (cropId > 0) {
                                let index = dataReturned.pageDataMapperFilterResult.widgets[0].widgetName.indexOf('-');
                                if (index < 0) {
                                    this.data[i].widgets[j].widgetName = this.selectedCropName + ' - ' + dataReturned.pageDataMapperFilterResult.widgets[0].widgetName;
                                }
                                else {
                                    this.data[i].widgets[j].widgetName = this.selectedCropName + ' ' + dataReturned.pageDataMapperFilterResult.widgets[0].widgetName.substr(index);
                                }
                            }

                            document.getElementById('graphBoxes').classList.add('width100');
                            document.getElementById(j.toString() + i.toString() + 'u').classList.remove('active');
                            document.getElementById(j.toString() + i.toString() + 'uActive').classList.remove('active');
                            document.getElementById(j.toString() + i.toString() + 'cActive').classList.add('active');
                            //console.log(this.data);
                            this.loading = false;
                            return;
                        }
                        else if (w.widgetId === argWidgetId && w.cropId === cropId && w.competitorId === competitorId) {
                            //this.data[i].widgets[j].widgetId = argWidgetId;
                            //this.data[i].widgets[j].widgetId = this.data[i].widgets[j].widgetId;
                            this.data[i].widgets[j].chartComponentViewModel = this.emptyChartViewModelObject;
                            this.data[i].widgets[j].underlyingChartDataViewModel = this.emptyUnderlyingViewModelObject;

                            if (cropId > 0) {
                                let index = this.data[i].widgets[j].widgetName.indexOf('-');
                                if (index < 0) {
                                    this.data[i].widgets[j].widgetName = this.selectedCropName + ' - ' + this.data[i].widgets[j].widgetName;
                                }
                                else {
                                    this.data[i].widgets[j].widgetName = this.selectedCropName + ' ' + this.data[i].widgets[j].widgetName.substr(index);
                                }
                            }
                            document.getElementById('graphBoxes').classList.add('width100');
                            document.getElementById(j.toString() + i.toString() + 'u').classList.remove('active');
                            document.getElementById(j.toString() + i.toString() + 'uActive').classList.remove('active');
                            document.getElementById(j.toString() + i.toString() + 'cActive').classList.add('active');
                        }
                    }
                }
                this.loading = false;
            }
            , error => this.errorMessage = <any>error);
    }

    onExportEmit(exp: IExports): boolean {

        this.exportObject = this.exportObject.filter(x => x.exportName !== exp.exportName);
        this.exportObject.push(exp);
        return true;

    }

    arrayFilterdata: IExportModel;
    kpi: Object[] = [];
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
            var filterdata: any = [];
            for (let i = 0; i < this.data.length; i++) {
                let pd: IPageDataMapper = this.data[i];
                for (let j = 0; j < pd.widgets.length; j++) {
                    let w = pd.widgets[j];
                    if (selectedIds.indexOf(w.widgetId) >= 0) {
                        filterdata.push(w);
                    }
                }
            }


            //var filterdata = this.data.widgets.filter(function (e) { return selectedIds.indexOf(e.widgetId) >= 0; });
            for (index = 0; index < filterdata.length; ++index) {
                var filteredData = this._ExcelExportService.constructChartDataForExport(filterdata[index].underlyingChartDataViewModel.tableHeaders, filterdata[index].underlyingChartDataViewModel.tableRows);
                this.kpi[index] = { name: filterdata[index].widgetName, data: filteredData };
            }

            this.arrayFilterdata = { templateName: "Export", fileName: this.pageName, kpiData: this.kpi, exportAs: ExportAsData.selectedData };
            this._ExcelExportService.ExcelExportedFilePath(this.arrayFilterdata).subscribe(data => { this.exportData = data; this.loading = false; });
        }


        // for word export
        if (this.exportObject.length > 0) {
            if (ExportAsData.selectedData == 2 || ExportAsData.selectedData == 3) {
                if (InsightData.selectedData == "1") {
                    InsightData.selectedData = "2";
                }
                    if (ChartData.selectedData.length > 0) {
                        this.kpi = [];
                        //var filterdata = this.data.widgets.filter(function (e) {
                        //    return ChartData.selectedData.indexOf(e.widgetId) >= 0;
                        //});

                        var filterdata: any = [];
                        var selectedIds = ChartData.selectedData;
                        for (let i = 0; i < this.data.length; i++) {
                            let pd: IPageDataMapper = this.data[i];
                            for (let j = 0; j < pd.widgets.length; j++) {
                                let w = pd.widgets[j];
                                if (selectedIds.indexOf(w.widgetId) >= 0) {
                                    filterdata.push(w);
                                }
                            }
                        }

                        let count = 0;
                        this.datePipe = new DatePipe("en-US");
                        var FilesCount = ChartData.selectedData.length;
                        let loop = (key: number) => {
                            let InsightNode = document.createElement('div');

                            for (let i = 0; i < filterdata.length; i++) {
                                let currentWidget: any = filterdata[i];
                                if (currentWidget.widgetId == key) {
                                    InsightNode.innerHTML = currentWidget.insightData;
                                }
                            }
                            //InsightNode.innerHTML = filterdata.find(model => model.widgetId == key).insightData;

                            let obj = {
                                Image: onSubmitClick("chart-container-" + key), Insight: (InsightData.selectedData == "1") ? InsightNode.textContent : null,
                                ChartHeaderDesc: '',
                                PageFooterDesc: GlobalUtil.getAppSession("UserInfo").userName + ' exported from AgriInsider on ' + this.datePipe.transform(new Date(), 'dd MMMM yyyy')
                            };
                            this.kpi[0] = {
                                name: filterdata[count].widgetName,
                                data: obj,
                                CurrentChunk: count,
                                TotalChunks: FilesCount,
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