import { Component, ElementRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChartService } from '../../../../widgets/charts/chart.service';
import { IPageDataMapper, IServiceParams, IFilters, IExports, IInisghts, ISelectedFilters } from '../../../../widgets/charts/chart';
import { PopoverContent } from 'ng2-popover';
import { GlobalConfig, Page, Constants, ExportLevel } from '../../../../global/global.config';
import { GlobalUtil } from '../../../../global/global.util';
import { IExportModel } from '../../../../widgets/export/export';
import { ExcelExportService } from '../../../../widgets/export/Export.service';
import { EditorClasses } from '../../../../widgets/tinymce/tinymce.directive';
import { IInsights, IInsightsFilters, ChartInsights, IInsightViewModel } from '../../../../insights/insights.model';
import { DataListService } from '../../../../insights/datalist/datalist.service';

declare var onSubmitClick: any;

@Component({
    moduleId: module.id,
    templateUrl: 'crop-overview.component.html'
})
export class CropOverviewComponent {
    //**Insight variables
    identificationFlagId: number = null;
    widgetIds: string;
    iInsights: IInsights;
    pageInsightHeader: string = "Add Insights";
    identificationFlag: string;
    fromChartInsight: boolean = false;
    showInsightHeader: boolean = false;
    chartInsights: ChartInsights[] = [];
    maxMin: any[] = [];
    pageInsightEditorId = ""
    appliedFilters: Array<IInsightsFilters>;
    insightsData: string = 'Test data';
    insightsClasses: EditorClasses[] = [{ className: 'insightScrollDisplay', isAdd: true }, { className: 'insightChartDisplay', isAdd: true }];
    initInsightsEditor: boolean = false;
    pageInsightList: IInsights[] = [];
    insightViewModel: IInsightViewModel;
    insightFilterValues: IInsights = { insightId: null, insightData: '', pageName: Page.cropIndicatorOverview, appliedFilterId: null, widgetDetailIds: '', appliedFilters: [], identificationFlag: '', author: '', updatedBy: '', updatedDate: null, isActive: true };
    //--Insight variables

    data: IPageDataMapper;
    pageName: string = Page.cropIndicatorOverview.toString();
    errorMessage: string;
    filterObject: IFilters[] = [];
    exportObject: IExports[] = [];
    filterApi: IFilters[] = [];
    exportApi: IExports[] = [];
    exportVisible: boolean = true;
    @ViewChild('pagePopover') pagePopover: PopoverContent;

    paginator: boolean = false;
    pageLinks: number = 3;
    rowsPerPage: number = 5;
    rowsPerPageOptions: Array<number> = [5, 10, 20];
    responsive: boolean = true;
    loading: boolean = false;
    cropType: string = '';
    datePipe: DatePipe;
    isAdmin: boolean = (GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin")? true : false;

    crop: string = '';

    submitVisible: boolean = false;
    selectedFilters: ISelectedFilters[] = [];
    selectedData: ISelectedFilters;

    seriveParams: IServiceParams = { pageName: Page.cropIndicatorOverview, companyId: 0, cropId: GlobalUtil.getSession("CropId"), selectedFilter: null, userId: GlobalUtil.getAppSession("UserInfo").userId, regionName: GlobalUtil.getAppSession("UserInfo").region };

    constructor(private chartService: ChartService, private ref: ElementRef, private _ExcelExportService: ExcelExportService, private dataListService: DataListService) {

    }


    ngOnInit(): void {
        this.loading = true;
        this.cropType = GlobalUtil.getSession("CropName");
        this.chartService.getData(this.seriveParams)
            .subscribe(data => {
                this.data = data.pageDataMapper;
                this.DefaultSelectedFilters(this.data.filters);
                //**Insight Service calling started
                this.dataListService.getInsights(this.insightFilterValues).subscribe(data => {
                    this.insightViewModel = data;
                    this.setInsightValues();
                    this.loading = false
                }, error => this.errorMessage = <any>error);
                //--Insight Service calling completed

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

        //this.filterObject = filter;
        //return true;
    }
    onSubmitEmit(visible: boolean): void {
        this.submitVisible = visible;
    }

    onExportEmit(exp: IExports): boolean {

        this.exportObject = this.exportObject.filter(
            x => x.exportName !== exp.exportName);

        this.exportObject.push(exp);
        return true;

    }
    //** insight methods
    initPageInsightEditor() {
        if (this.identificationFlagId == 3 && this.fromChartInsight == false) {
            this.collapseChartInsight();
        }
        this.initInsight();
        this.iInsights.identificationFlag = "P";
        this.pageInsightEditorId = "COPageInsightEditor";
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
            pageName: Page.cropIndicatorOverview,
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
    }

    setAppliedFilters(appliedFilters: IInsightsFilters[]) {
        for (let f of this.filterObject) {
            //if (f.filterName == "Crop" || f.filterName == "Region" || f.filterName == "Territory" ||f.filterName == "Country" || f.filterName == "PeriodYear"){
                let y = f.filterName;
                if (y == "PeriodYear") {
                    appliedFilters.push({ filterName: "From Year", filterValue: f.selectedData[0] });
                    appliedFilters.push({ filterName: "To Year", filterValue: f.selectedData[1] });
                }
                else
                    appliedFilters.push({ filterName: f.filterName, filterValue: f.selectedData })
           // }
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
    //-- insight methods
    FilterSubmit(pagePopover: PopoverContent): void {
        
        this.loading = true;
        this.crop = this.filterObject.filter(x => x.filterName == "Crop")[0].filterData[0]['label'];

        if (this.crop !== null && this.crop !== '') {
            this.cropType = this.crop;
        }

        //for (let item of this.filterObject.filter(x => x.filterName == "Crop")[0].selectedData)
        //{
        //    this.data.filters.filter(x => x.filterName == "Crop")[0].filterData.filter(x => x['labelId'] == 23)[0]['label'];
        //}
        //let selectedValue: IServiceParams = { pageName: Page.cropIndicatorOverview.toString(), companyId: 0, cropId: GlobalUtil.getSession("CropId"), selectedFilter: this.filterObject, userId: GlobalUtil.getAppSession("UserInfo").userId };
        this.insightFilterValues.appliedFilters = [];
        this.setAppliedFilters(this.insightFilterValues.appliedFilters);
        this.dataListService.getInsights(this.insightFilterValues).subscribe(data => {

            this.insightViewModel = data;

            this.seriveParams.selectedFilter = this.filterObject;
            this.seriveParams.regionName = null;
            this.chartService.getData(this.seriveParams)
                .subscribe(data => {
                    let collapseFilter: HTMLElement = document.getElementById('CIFilter');
                    collapseFilter.click();
                    this.data.widgets = data.pageDataMapper.widgets;
                    this.data.exports = data.pageDataMapper.exports;
                    this.exportVisible = true;
                    this.GetSelectedFilters(this.filterObject);
                    // Setting Insight Data in Widget ViewModel
                    this.setInsightValues();
                    //
                    this.loading = false
                }
                , error => this.errorMessage = <any>error
                );
        }, error => this.errorMessage = <any>error);
    }

    DefaultSelectedFilters(filterObject: IFilters[]): void {
        this.selectedFilters = [];
        if (filterObject != null) {
            for (let entry of filterObject) {
                if (entry.filterName == 'PeriodYear') {
                    entry.sortOrder = this.data.filters.filter(k => k.filterName == 'Period')[0].sortOrder;
                }
                else if (entry.filterType.toLowerCase() == "source") {
                    entry.sortOrder = 20;
                }
                else
                    if (this.data.filters.filter(k => k.filterName == entry.filterName).length > 0)
                        entry.sortOrder = this.data.filters.filter(k => k.filterName == entry.filterName)[0].sortOrder;
            }

            filterObject = filterObject.sort(function (obj1, obj2) { return obj1.sortOrder - obj2.sortOrder });
            for (let entry of filterObject) {
                this.selectedData = { filterName: '', selectedValues: '' };
                let insightAppliedFilterObj: IInsightsFilters = { filterName: '', filterValue: '' }// Insight Filters
                var arr: any = [];
                if (entry.filterName.toLowerCase() == "list") {
                    continue;
                }
                if (entry.filterType.toLowerCase() != 'dropdownmultiplesource') {
                    this.selectedData.filterName = entry.filterName;
                    insightAppliedFilterObj.filterName = entry.filterName;// Insight Filters
                }

                if (entry.filterName == 'Currency' || entry.filterName == 'Territory' || entry.filterName == 'Country' || entry.filterName == 'Unit Type' || entry.filterName == 'Source') {
                    if (entry.selectedData != null && entry.selectedData != 0) {
                        insightAppliedFilterObj.filterValue = entry.selectedData;
                        arr.push(this.data.filters.filter(x => x.filterName == entry.filterName)[0].filterData.filter(x => x["labelId"] == entry.selectedData)[0]["label"]);
                    } else {
                        arr.push('Not available');
                        insightAppliedFilterObj.filterValue = '0';
                    }
                } else if (entry.filterName == "Region") {
                    if (GlobalUtil.getAppSession("UserInfo").region != '') {
                        arr.push(GlobalUtil.getAppSession("UserInfo").region);
                        insightAppliedFilterObj.filterValue = GlobalUtil.getAppSession("UserInfo").regionId;// Insight Filters
                    }
                    //if (GlobalUtil.getAppSession("UserInfo").region == 'NA') {
                    //    let cropId = this.data.filters.filter(x => x.filterName == 'Crop')[0].filterData.filter(x => x['label'] == this.cropType)[0]['labelId'];
                    //    arr.push(this.data.filtersRelation.filter(k => k.cropId == cropId && k.territoryId == 0 && k.countryId == 0)[0].sourceName)
                    //}
                } else if (entry.filterName == "Crop") {
                    arr.push(this.cropType);
                    insightAppliedFilterObj.filterValue = GlobalUtil.getSession("CropId");
                } else if (entry.filterName == "Period") {
                    for (let item of entry.filterData) {
                        let Sources = { filterName: '', selectedValues: '' };
                        let cropId = GlobalUtil.getSession("CropId");// this.data.filters.filter(x => x.filterName == 'Crop')[0].filterData.filter(x => x['label'] == this.cropType)[0]['labelId'];
                        let regionId = GlobalUtil.getAppSession("UserInfo").regionId;
                        let widgetId = 0;
                        for (let item of this.data.widgets) {
                            let sources = this.data.filtersRelation.filter(k => k.cropId == cropId && k.regionId == regionId && k.territoryId == 0 && k.countryId == 0 && k.widgetId == item.widgetId);
                            if (sources.length > 0) {
                                let source = sources.filter(k => k.defaultSourceId == k.sourceId);
                                if (source.length > 0) {
                                    this.maxMin.push({ minYear: source[0].minYear, maxYear: source[0].maxYear });
                                } else {
                                    sources.sort((a, b) => {
                                        if (a["sourceName"] < b["sourceName"]) return -1;
                                        else if (a["sourceName"] > b["sourceName"]) return 1;
                                        else return 0;
                                    });
                                    this.maxMin.push({ minYear: sources[0].minYear, maxYear: sources[0].maxYear });
                                }
                            }
                        }
                    }

                    let min = 0;
                    let max = 0;
                    let DefaultValue = entry.filterData[0]['defaultValue'];
                    if (this.maxMin.length > 0) {
                        for (var i of this.maxMin) {
                            if (Number(i['minYear']) < min) {
                                min = Number(i['minYear']);
                            }
                        }
                        for (var i of this.maxMin) {
                            if (Number(i['maxYear']) > max) {
                                max = Number(i['maxYear']);
                            }
                        }                        
                        if (DefaultValue[0] < min) {
                            DefaultValue[0] = min;
                        }
                        if (DefaultValue[1] > max) {
                            DefaultValue[1] = max;
                        }
                    }
                   
                    
                    arr.push(DefaultValue.join(" to "));
                    let insightFilterFromYear: IInsightsFilters = { filterName: '', filterValue: '' }// Insight Filters
                    insightFilterFromYear.filterName = "From Year"// Insight Filters
                    insightFilterFromYear.filterValue = entry.filterData[0]['defaultValue'][0]// Insight Filters
                    this.insightFilterValues.appliedFilters.push(insightFilterFromYear);// Insight Filters
                    insightAppliedFilterObj.filterName = "To Year"// Insight Filters
                    insightAppliedFilterObj.filterValue = entry.filterData[0]['defaultValue'][1]// Insight Filters
                } else if (entry.filterType.toLowerCase() == 'dropdownmultiplesource') {
                    for (let item of entry.filterData) {
                        let Sources = { filterName: '', selectedValues: '' };
                        let insightAppliedFilterObj: IInsightsFilters = { filterName: '', filterValue: '' }// Insight Filters
                        arr = [];
                        Sources.filterName = item['filterName'] + " source";
                        insightAppliedFilterObj.filterName = item['filterName'];
                        let cropId = GlobalUtil.getSession("CropId");// this.data.filters.filter(x => x.filterName == 'Crop')[0].filterData.filter(x => x['label'] == this.cropType)[0]['labelId'];
                        let regionId = GlobalUtil.getAppSession("UserInfo").regionId;
                        let widgetId = 0;
                        if (this.data.widgets.filter(x => x.widgetName == item['filterName']).length > 0) {
                            widgetId = this.data.widgets.filter(x => x.widgetName == item['filterName'])[0].widgetId;
                            let sources = this.data.filtersRelation.filter(k => k.cropId == cropId && k.regionId == regionId && k.territoryId == 0 && k.countryId == 0 && k.widgetId == widgetId);
                            if (sources.length > 0) {
                                let source = sources.filter(k => k.defaultSourceId == k.sourceId);
                                if (source.length > 0) {
                                    arr.push(source[0].sourceName + ' (recommended)');
                                    insightAppliedFilterObj.filterValue = "" + source[0].sourceId;
                                } else {
                                    sources.sort((a, b) => {
                                        if (a["sourceName"] < b["sourceName"]) return -1;
                                        else if (a["sourceName"] > b["sourceName"]) return 1;
                                        else return 0;
                                    });
                                    arr.push(sources[0].sourceName);
                                }
                            } else {
                                arr.push('Not available');
                                insightAppliedFilterObj.filterValue = '0';
                            }
                            //arr.push(this.data.filtersRelation.filter(k => k.cropId == cropId && k.regionId == regionId && k.territoryId == 0 && k.countryId == 0 && k.widgetId == widgetId)[0].sourceName)
                        }
                        if (arr.length == 0) {
                            arr.push('Not available');
                            insightAppliedFilterObj.filterValue = '0';
                        }
                        Sources.selectedValues = arr.sort().join(", ");
                        this.selectedFilters.push(Sources);
                         this.insightFilterValues.appliedFilters.push(insightAppliedFilterObj);// Insight Filters
                    }
                } else if ((entry.filterName == 'PeriodYear')) {
                    this.selectedData.filterName = 'Period';
                    for (let item of entry.filterData) {
                        let Sources = { filterName: '', selectedValues: '' };
                        let cropId = GlobalUtil.getSession("CropId");// this.data.filters.filter(x => x.filterName == 'Crop')[0].filterData.filter(x => x['label'] == this.cropType)[0]['labelId'];
                        let regionId = GlobalUtil.getAppSession("UserInfo").regionId;
                        let widgetId = 0;
                        for (let item of this.data.widgets) {
                            let sources = this.data.filtersRelation.filter(k => k.cropId == cropId && k.regionId == regionId && k.territoryId == 0 && k.countryId == 0 && k.widgetId == item.widgetId);
                            if (sources.length > 0) {
                                let source = sources.filter(k => k.defaultSourceId == k.sourceId);
                                if (source.length > 0) {
                                    this.maxMin.push({ minYear: source[0].minYear, maxYear: source[0].maxYear });
                                } else {
                                    sources.sort((a, b) => {
                                        if (a["sourceName"] < b["sourceName"]) return -1;
                                        else if (a["sourceName"] > b["sourceName"]) return 1;
                                        else return 0;
                                    });
                                    this.maxMin.push({ minYear: sources[0].minYear, maxYear: sources[0].maxYear });
                                }
                            }
                        }
                    }

                    let min = 0;
                    let max = 0;
                    let DefaultValue = entry.filterData[0]['defaultValue'];
                    if (DefaultValue[0] < min) {
                        DefaultValue[0] = min;
                    }
                    if (DefaultValue[1] > max) {
                        DefaultValue[1] = max;
                    }
                    arr.push(DefaultValue.join(" to "));
                    //this.selectedData.selectedValues = entry.selectedData.join(" to ");
                    let insightFilterFromYear: IInsightsFilters = { filterName: '', filterValue: '' }// Insight Filters
                    insightFilterFromYear.filterName = "From Year"// Insight Filters
                    insightFilterFromYear.filterValue = entry.filterData[0]['defaultValue'][0]// Insight Filters
                    this.insightFilterValues.appliedFilters.push(insightFilterFromYear);// Insight Filters
                    insightAppliedFilterObj.filterName = "To Year"// Insight Filters
                    insightAppliedFilterObj.filterValue = entry.filterData[0]['defaultValue'][1]// Insight Filters
                } else {
                    arr.push('Not available');
                }
                if (entry.filterType.toLowerCase() != 'dropdownmultiplesource') {
                    this.selectedData.selectedValues = arr.sort().join(", ");
                }

                if (entry.filterType.toLowerCase() != 'dropdownmultiplesource') {
                    this.selectedFilters.push(this.selectedData);
                }
                if (insightAppliedFilterObj.filterName != "" && insightAppliedFilterObj.filterName != "Unit Type") {
                    this.insightFilterValues.appliedFilters.push(insightAppliedFilterObj);// Insight Filters
                }

            }
        }
    }
    GetSelectedFilters(filterObject: IFilters[]): void {
        this.selectedFilters = [];
        if (filterObject != null) {
            for (let entry of filterObject) {
                if (entry.filterName == 'PeriodYear') {
                    entry.sortOrder = this.data.filters.filter(k => k.filterName == 'Period')[0].sortOrder;
                }
                else if (entry.filterType.toLowerCase() == "source") {
                    entry.sortOrder = 20;
                }
                else
                    if (this.data.filters.filter(k => k.filterName == entry.filterName).length > 0)
                        entry.sortOrder = this.data.filters.filter(k => k.filterName == entry.filterName)[0].sortOrder;
            }

            filterObject = filterObject.sort(function (obj1, obj2) { return obj1.sortOrder - obj2.sortOrder });
            for (let entry of filterObject) {
                this.selectedData = { filterName: '', selectedValues: '' };
                var arr: any = [];
                if (entry.filterName.toLowerCase() == "list") {
                    continue;
                }
                if (entry.filterType.toLowerCase() != 'dropdownmultiplesource') {
                    this.selectedData.filterName = entry.filterName;
                }
                if (entry.filterName == 'Region' || entry.filterName == 'Currency' || entry.filterName == 'Territory' || entry.filterName == 'Country' || entry.filterName == 'Crop' || entry.filterName == 'Unit Type' || entry.filterName == 'Source') {
                    if (entry.selectedData != null && entry.selectedData != 0) {
                        this.selectedData.selectedValues = this.data.filters.filter(x => x.filterName == entry.filterName)[0].filterData.filter(x => x["labelId"] == entry.selectedData)[0]["label"];

                    } else if (entry.filterName == 'Crop') {
                        this.cropType = this.data.filters.filter(x => x.filterName == entry.filterName)[0].filterData.filter(x => x["labelId"] == entry.selectedData)[0]["label"];
                    } else {
                        this.selectedData.selectedValues = 'Not available';
                    }
                }
                else if (entry.filterType.toLowerCase() == "source") {
                    let insightAppliedFilterObj: IInsightsFilters = { filterName: '', filterValue: '' }// Insight Filters
                    this.selectedData.filterName = entry.filterName + " source";
                    insightAppliedFilterObj.filterName = entry['filterName'];
                    if (entry.selectedData != null) {
                        arr = [];
                        let cropId = this.data.filters.filter(x => x.filterName == 'Crop')[0].filterData.filter(x => x['label'] == this.cropType)[0]['labelId'];
                        let regionId = filterObject.filter(x => x.filterName == 'Region')[0].selectedData;
                        let territoryId = filterObject.filter(x => x.filterName == 'Territory')[0].selectedData;
                        let countryId = filterObject.filter(x => x.filterName == 'Country')[0].selectedData;
                        let widgetId = 0;
                        if (this.data.widgets.filter(x => x.widgetName == entry.filterName).length > 0) {
                            widgetId = this.data.widgets.filter(x => x.widgetName == entry.filterName)[0].widgetId;
                            let sources = this.data.filtersRelation.filter(k => k.cropId == cropId && k.regionId == Number(regionId) && k.territoryId == territoryId && k.countryId == countryId && k.widgetId == widgetId);
                            if (sources.length > 0) {
                                let source = sources.filter(k => k.defaultSourceId == k.sourceId);
                                if (source.length > 0) {
                                    if (!source[0].sourceName.includes("recommended")) {
                                        arr.push(source[0].sourceName + ' (recommended)');
                                    } else {
                                        arr.push(source[0].sourceName);
                                    }
                                    insightAppliedFilterObj.filterValue = "" + source[0].sourceId;
                                } else {
                                    sources.sort((a, b) => {
                                        if (a["sourceName"] < b["sourceName"]) return -1;
                                        else if (a["sourceName"] > b["sourceName"]) return 1;
                                        else return 0;
                                    });
                                    arr.push(sources[0].sourceName);
                                }
                            } else {
                                arr.push('Not available');
                                insightAppliedFilterObj.filterValue = '0';
                            }
                            //if (entry.selectedData != null && entry.selectedData != undefined && entry.selectedData != 0) {
                            //    if (sources.findIndex(x => x.sourceId == entry.selectedData)) {
                            //        arr.push(this.data.filtersRelation.filter(k => k.cropId == cropId && k.regionId == regionId && k.territoryId == territoryId && k.sourceId == entry.selectedData && k.countryId == countryId && k.widgetId == widgetId)[0].sourceName);
                            //    } else {
                            //        arr.push(this.data.filtersRelation.filter(k => k.cropId == cropId && k.regionId == regionId && k.territoryId == territoryId && k.countryId == countryId && k.widgetId == widgetId)[0].sourceName);
                            //    }
                            //} else {
                            //    arr.push(this.data.filtersRelation.filter(k => k.cropId == cropId && k.regionId == regionId && k.territoryId == territoryId && k.countryId == countryId && k.widgetId == widgetId)[0].sourceName);
                            //}
                            //arr.push(this.data.filtersRelation.filter(k => k.cropId == cropId && k.regionId == regionId && k.territoryId == territoryId && k.sourceId == entry.selectedData && k.countryId == countryId && k.widgetId == widgetId)[0].sourceName)
                            this.selectedData.selectedValues = arr.sort().join(", ");
                        } else {
                            this.selectedData.selectedValues = "Not available";
                        }
                    } else {
                        this.selectedData.selectedValues = "Not available";
                    }
                }
                else if ((entry.filterName == 'PeriodYear')) {
                    this.selectedData.filterName = 'Period';
                    this.selectedData.selectedValues = entry.selectedData.join(" to ");
                }

                if (entry.filterType.toLowerCase() != 'dropdownmultiplesource') {
                    this.selectedFilters.push(this.selectedData);
                }
            }
        }
    }
    //GetSelectedFilters(filterObject: IFilters[]): void {
    //    this.selectedFilters = [];
    //    if (filterObject != null) {
    //        for (let entry of filterObject) {
    //            if (entry.filterName == 'PeriodYear') {
    //                entry.sortOrder = this.data.filters.filter(k => k.filterName == 'Period')[0].sortOrder;
    //            }
    //            else if (entry.filterType.toLowerCase() == "source") {
    //                entry.sortOrder = 20;
    //            }
    //            else
    //                if (this.data.filters.filter(k => k.filterName == entry.filterName).length > 0)
    //                    entry.sortOrder = this.data.filters.filter(k => k.filterName == entry.filterName)[0].sortOrder;
    //        }

    //        filterObject = filterObject.sort(function (obj1, obj2) { return obj1.sortOrder - obj2.sortOrder });
    //        for (let entry of filterObject) {
    //            this.selectedData = { filterName: '', selectedValues: '' };
    //            var arr: any = [];
    //            if (entry.filterName.toLowerCase() == "list") {
    //                continue;
    //            }
    //            if (entry.filterType.toLowerCase() != 'dropdownmultiplesource') {
    //                this.selectedData.filterName = entry.filterName;
    //            }
    //            if (entry.selectedData == null || entry.selectedData == 0) {
    //                if (entry.filterName == "Crop") {
    //                    arr.push(this.cropType);
    //                } else if (entry.filterName == "Period") {
    //                    arr.push(entry.filterData[0]['defaultValue'].join(" to "));
    //                } else if (entry.filterType.toLowerCase() == 'dropdownmultiplesource') {
    //                    for (let item of entry.filterData) {
    //                        let Sources = { filterName: '', selectedValues: '' };
    //                        arr = [];
    //                        Sources.filterName = item['filterName'] + "'s" + " Source";;
    //                        let cropId = this.data.filters.filter(x => x.filterName == 'Crop')[0].filterData.filter(x => x['label'] == this.cropType)[0]['labelId'];
    //                        let regionId = filterObject.filter(x => x.filterName == 'Region')[0].selectedData;
    //                        let widgetId = 0;
    //                        if (this.data.widgets.filter(x => x.widgetName == item['filterName']).length > 0) {
    //                            widgetId = this.data.widgets.filter(x => x.widgetName == item['filterName'])[0].widgetId;
    //                            arr.push(this.data.filtersRelation.filter(k => k.cropId == cropId && k.regionId == regionId && k.territoryId == 0 && k.countryId == 0 && k.widgetId == widgetId)[0].sourceName)
    //                        }
    //                        if (arr.length == 0) {
    //                            arr.push('Not Selected');
    //                        }
    //                        Sources.selectedValues = arr.sort().join(", ");
    //                        this.selectedFilters.push(Sources);
    //                    }
    //                } else if (entry.filterName == 'Region' || entry.filterName == 'Territory' || entry.filterName == 'Country') {
    //                    if (entry.selectedData != null) {
    //                        let Name = filterObject.filter(x => x.filterName == entry.filterName)[0].filterData.filter(x => x["labelId"] == entry.selectedData)[0]["label"];
    //                        this.selectedData.selectedValues = Name;
    //                    } else {
    //                        if (entry.filterName == 'Region') {
    //                            this.selectedData.selectedValues = GlobalUtil.getAppSession("UserInfo").region;
    //                        } else {
    //                            arr.push('Not Selected');
    //                        }
    //                    }
    //                } else {
    //                     arr.push('Not Selected'); 
    //                }
    //                if (entry.filterType.toLowerCase() != 'dropdownmultiplesource') {
    //                    this.selectedData.selectedValues = arr.sort().join(", ");
    //                }
    //            } else {
    //                if (entry.filterName == 'Region' || entry.filterName == 'Currency' || entry.filterName == 'Territory' || entry.filterName == 'Country' || entry.filterName == 'Crop' || entry.filterName == 'Unit Type' || entry.filterName == 'Source') {
    //                    if (entry.selectedData != null && entry.selectedData != 0) {
    //                            this.selectedData.selectedValues = this.data.filters.filter(x => x.filterName == entry.filterName)[0].filterData.filter(x => x["labelId"] == entry.selectedData)[0]["label"];

    //                    } else if (entry.filterName == 'Crop') {
    //                        this.cropType = this.data.filters.filter(x => x.filterName == entry.filterName)[0].filterData.filter(x => x["labelId"] == entry.selectedData)[0]["label"];
    //                    } else {
    //                        this.selectedData.selectedValues = 'Not selected';
    //                    }
    //                }
    //                else if (entry.filterType.toLowerCase() == "source") {
    //                    this.selectedData.filterName = entry.filterName + "'s" + " Source";
    //                    if (entry.selectedData != null) {
    //                        arr = [];
    //                        let cropId = this.data.filters.filter(x => x.filterName == 'Crop')[0].filterData.filter(x => x['label'] == this.cropType)[0]['labelId'];
    //                        let regionId = filterObject.filter(x => x.filterName == 'Region')[0].selectedData;
    //                        let territoryId = filterObject.filter(x => x.filterName == 'Territory')[0].selectedData;
    //                        let countryId = filterObject.filter(x => x.filterName == 'Country')[0].selectedData;
    //                        let widgetId = 0;
    //                        if (this.data.widgets.filter(x => x.widgetName == entry.filterName).length > 0) {
    //                            widgetId = this.data.widgets.filter(x => x.widgetName == entry.filterName)[0].widgetId;
    //                            arr.push(this.data.filtersRelation.filter(k => k.cropId == cropId && k.regionId == regionId && k.territoryId == territoryId && k.countryId == countryId && k.widgetId == widgetId)[0].sourceName)
    //                            this.selectedData.selectedValues = arr.sort().join(", ");
    //                        }
    //                    } else {
    //                        this.selectedData.selectedValues = "Not Available"
    //                    }
    //                }
    //                else if ((entry.filterName == 'PeriodYear')) {
    //                    this.selectedData.filterName = 'Period';
    //                    this.selectedData.selectedValues = entry.selectedData.join(" to ");
    //                }
    //            }
    //            if (entry.filterType.toLowerCase() != 'dropdownmultiplesource') {
    //                this.selectedFilters.push(this.selectedData);
    //            }
    //        }
    //    }
    //}
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
                    let Filters = (this.selectedFilters.length > 0) ? 'Filters applied: ' : 'Filters applied: ' + this.cropType;
                    if (this.selectedFilters != null) {
                        if (this.selectedFilters.length > 0) {
                            for (let item of this.selectedFilters) {
                                Filters = Filters.concat('<strong>').concat(item.filterName).concat('</strong>').concat(': ').concat(item.selectedValues).concat('; ');
                            }
                        }
                    }

                    let Insights = this.pageInsightList;
                    let PageInsightData = '';
                    this.datePipe = new DatePipe("en-US");
                    if (Insights.length > 0) {                        
                        for (let insightitem of Insights) {                            
                            if (insightitem.insightData != null || insightitem.insightData != undefined) {
                                PageInsightData = PageInsightData.concat('<strong>').concat("Time Period: ").concat('</strong>').concat(insightitem.insightTitle).concat('<br/>');
                                PageInsightData = PageInsightData.concat('<strong>').concat("Insight: ").concat('</strong>').concat(insightitem.insightData.replace('<p>', '').replace('</p>', '')).concat('<br/>');
                                PageInsightData = PageInsightData.concat('<strong>').concat('Author: ').concat('</strong>').concat(insightitem.author).concat('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'); // space given to show the next record in the same row
                                PageInsightData = PageInsightData.concat('<strong>').concat('Updated Date: ').concat('</strong>').concat(this.datePipe.transform(insightitem.updatedDate,'dd MMMM yyyy')).concat('<br/><br/><br/>');
                            }                            
                        }
                    }

                    let loop = (key: number) => {
                        let InsightNode = document.createElement('div');
                        //InsightNode.innerHTML = this.data.widgets.find(model => model.widgetId == key).insightData;
                        InsightNode.innerHTML = PageInsightData;             
                        let obj = {
                            Image: onSubmitClick("chart-container-" + key), Insight: (InsightData.selectedData == "1") ? InsightNode.innerHTML.toString() : null,
                            ChartHeaderDesc: Filters,
                            PageFooterDesc: GlobalUtil.getAppSession("UserInfo").userName + ' exported from AgriInsider on ' + this.datePipe.transform(new Date(), 'dd MMMM yyyy')
                        };
                        this.kpi[0] = {
                            name: filterdata[count].widgetName + ' - ' + this.cropType,
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
