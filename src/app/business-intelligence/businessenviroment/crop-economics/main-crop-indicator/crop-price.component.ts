import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChartService } from '../../../../widgets/charts/chart.service';
import { IPageDataMapper, IServiceParams, IFilters, IExports, IInisghts, ISelectedFilters } from '../../../../widgets/charts/chart';
import { DatePipe } from '@angular/common';
import { PopoverContent } from 'ng2-popover';
import { GlobalConfig, Page, Constants, ExportLevel } from '../../../../global/global.config';
import { GlobalUtil } from '../../../../global/global.util';
declare var tinymce: any;
declare var onSubmitClick: any;
import { IExportModel } from '../../../../widgets/export/export';
import { ExcelExportService } from '../../../../widgets/export/Export.service';

@Component({
    moduleId: module.id,
    templateUrl: 'crop-price.component.html'
})
export class CropPriceComponent {
    data: IPageDataMapper;
    pageName: string = Page.cropIndicatorUSPrice.toString();
    errorMessage: string;
    filterObject: IFilters[] = [];
    exportObject: IExports[] = [];
    filterApi: IFilters[] = [];
    exportApi: IExports[] = [];
    exportVisible: boolean = true;
    submitVisible: boolean = false;
    @ViewChild('pagePopover') pagePopover: PopoverContent;

    paginator: boolean = false;
    pageLinks: number = 3;
    rowsPerPage: number = 5;
    rowsPerPageOptions: Array<number> = [5, 10, 20];
    responsive: boolean = true;
    loading: boolean = false;
    cropType: string = '';
    submitMessage: string = '';
    isAdmin: boolean = (GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin")? true : false;
    currentInsightData: string;
    currentWidgetId: number;
    editor: any;
    snapshotDesc: string;
    insightDetails: IInisghts = {};
    noInsightText = Constants.noInsightText;
    noInsightDate = Constants.noInsightDate;
    selectedFilters: ISelectedFilters[] = [];
    selectedData: ISelectedFilters;

    noDataMessage: string = "";
    blankCropsArray: string[] = [];
    blankCrops: string = '';
    datePipe: DatePipe;

    seriveParams: IServiceParams = { pageName: Page.cropIndicatorUSPrice, companyId: 0, cropId: GlobalUtil.getSession("CropId"), selectedFilter: null, userId: GlobalUtil.getAppSession("UserInfo").userId, regionName: GlobalUtil.getAppSession("UserInfo").region };

    constructor(private chartService: ChartService, private ref: ElementRef, private _ExcelExportService: ExcelExportService) {
        this.loadScripts();
    }
    getPageModuleId(): string {
        return GlobalUtil.getSession("PageModuleId");
    }

    ngOnInit(): void {
        this.loading = true;
        this.cropType = GlobalUtil.getSession("CropName");
        this.chartService.getData(this.seriveParams)
            .subscribe(data => {
                this.data = data.pageDataMapper;
                this.DefaultSelectedFilters(this.data.filters);
                this.noDataMessage = "No data to display."; 
                this.loading = false
            }
            , error => this.errorMessage = <any>error
            );
    }

    onFilterEmit(filter: IFilters): boolean {

        this.filterObject = this.filterObject.filter(
            x => x.filterName !== filter.filterName);

        this.filterObject.push(filter);
        //console.log(this.filterObject);
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


    onExportEmit(exp: IExports): boolean {

        this.exportObject = this.exportObject.filter(
            x => x.exportName !== exp.exportName);

        this.exportObject.push(exp);
        return true;

    }

    FilterSubmit(pagePopover: PopoverContent): void {
        tinymce.remove(this.editor);
        //let collapseFilter: HTMLElement = document.getElementById('collapseFilter');
        //collapseFilter.classList.remove('in');
        let list: string[] = this.filterObject.filter(x => x.filterName == "List")[0].selectedData;
        this.filterObject = this.filterObject.filter(x => x.filterType != "Source" || (x.filterType == "Source" && list.indexOf(x.filterName) > -1));
        this.loading = true;
        let cropsSelected: Array<string> = [];

        for (let item of this.filterObject.filter(x => x.filterName == "Crop")[0].selectedData) {
            cropsSelected.push(this.data.filters.filter(x => x.filterName == "Crop")[0].filterData.filter(x => x['value'] == item)[0]['label']);
        }

        this.cropType = cropsSelected.join();
        let selectedValue: IServiceParams = { pageName: Page.cropIndicatorUSPrice.toString(), companyId: 0, cropId: GlobalUtil.getSession("CropId"), selectedFilter: this.filterObject };
        this.chartService.getData(selectedValue)
            .subscribe(data => {
                let collapseFilter: HTMLElement = document.getElementById('CPFilter');
                collapseFilter.click();
                this.AfterSubmit(data.pageDataMapper)
            }
            , error => this.errorMessage = <any>error
            );
    }

    AfterSubmit(data: IPageDataMapper): void {
        this.data.widgets = data.widgets;
        this.noDataMessage = "No data to display.";
        this.blankCropsArray = [];
        this.blankCrops = '';

        this.data.exports = data.exports; this.exportVisible = true;
        if (this.data.widgets[0]) {
            for (let entry of this.data.widgets[0].cropComparisonIds) {
                if (this.data.widgets[0].chartPlottedOn == 'crop') {
                    this.blankCropsArray.push(this.data.filters.filter(x => x.filterName == 'Crop')[0].filterData.filter(x => x["value"] == entry)[0]["label"]);
                }
                else {
                    this.blankCropsArray.push(this.data.filters.filter(x => x.filterName == 'Region')[0].filterData.filter(m => m["filterName"].toLowerCase() == this.data.widgets[0].chartPlottedOn)[0]["filterData"].filter((k: any) => k.value == entry)[0].label);
                }
            }
            this.blankCrops = this.blankCropsArray.join(",");
        }
        this.GetSelectedFilters(this.filterObject);
        this.loading = false;
    }

    DefaultSelectedFilters(filterObject: IFilters[]): void {
        this.selectedFilters = [];
        if (filterObject != null) {
            for (let entry of filterObject) {
                if (entry.filterName == 'Region' || entry.filterName == 'Territory' || entry.filterName == 'Country') {
                    entry.sortOrder = this.data.filters.filter(x => x.filterName == 'Region')[0].filterData.filter(m => m["filterName"] == entry.filterName)[0]["sortOrder"];
                }
                else if (entry.filterName == 'From Year' || entry.filterName == 'From Month' || entry.filterName == 'To Year' || entry.filterName == 'To Month') {
                    entry.sortOrder = this.data.filters.filter(x => x.filterName == 'From Year')[0].filterData.filter(m => m["filterName"] == entry.filterName)[0]["sortOrder"];
                }
                else if (entry.filterType.toLowerCase() == "source") {
                    entry.sortOrder = 20;
                }
                else
                    if (this.data.filters.filter(k => k.filterName == entry.filterName).length > 0)
                        entry.sortOrder = this.data.filters.filter(k => k.filterName == entry.filterName)[0].sortOrder;
            }

            filterObject = filterObject.sort(function (obj1, obj2) { return obj1.sortOrder - obj2.sortOrder });
            let cropSources = { filterName: '', selectedValues: '' }; // for crop's sources
            for (let entry of filterObject) {
                this.selectedData = { filterName: '', selectedValues: '' };                
                var arr: any = [];
                if (entry.filterName.toLowerCase() == "list") {
                    continue;
                }
                this.selectedData.filterName = entry.filterName;
                if (entry.filterName == 'Source' || entry.filterName == 'Currency') {
                    this.selectedData.selectedValues = this.data.filters.filter(x => x.filterName == entry.filterName)[0].filterData.filter(x => x["labelId"] == entry.selectedData)[0]["label"]
                }
                else if (entry.filterName == 'UnitType') {
                    this.selectedData.filterName = 'Unit Type';
                    this.selectedData.selectedValues = this.data.filters.filter(x => x.filterName == entry.filterName)[0].filterData.filter(x => x["labelId"] == entry.selectedData)[0]["label"]
                }
                else if (entry.filterName == 'Crop') {
                    arr.push(this.cropType);
                    this.selectedData.selectedValues = arr.sort().join(", ");
                }
                else if (entry.filterType == 'GeographyCascadeMultiselects') {
                    let multiSelects = filterObject.filter(x => x.filterType == entry.filterType);
                    if (multiSelects.length > 0) {
                        let filterData = multiSelects[0].filterData;
                        for (let item of filterData) {
                            if (item['filterName'] == 'Region') {
                                if (GlobalUtil.getAppSession("UserInfo").region != '' && GlobalUtil.getAppSession("UserInfo").region != undefined) {
                                    //let sources = { filterName: '', selectedValues: '' };
                                    cropSources.filterName = this.cropType + " source";;
                                    let cropId = this.data.filters.filter(x => x.filterName == 'Crop')[0].filterData.filter(x => x['label'] == this.cropType)[0]['value'];
                                    let regionId = GlobalUtil.getAppSession("UserInfo").regionId;
                                    let relation = this.data.filtersRelation.filter(k => k.cropId == cropId && k.kpiId == 48 && k.regionId == regionId && k.territoryId == 0 && k.countryId == 0);
                                    //if (relation.length > 0) {
                                    //    cropSources.selectedValues = relation[0].sourceName;
                                    //}
                                    if (relation.length > 0) {
                                        let source = relation.filter(k => k.defaultSourceId == k.sourceId);
                                        if (source.length > 0) {
                                            cropSources.selectedValues = source[0].sourceName + ' (recommended)';
                                        } else {
                                            relation.sort((a, b) => {
                                                if (a["sourceName"] < b["sourceName"]) return -1;
                                                else if (a["sourceName"] > b["sourceName"]) return 1;
                                                else return 0;
                                            });
                                            cropSources.selectedValues = relation[0].sourceName;
                                        }
                                    } else {
                                        cropSources.selectedValues = 'Not available';
                                    }
                                    // adding the region as per its order (coming first before territory and country)
                                    arr.push(GlobalUtil.getAppSession("UserInfo").region);
                                    this.selectedData.selectedValues = arr.sort().join(", ");
                                    this.selectedFilters.push(this.selectedData);
                                    /////////////////
                                    //this.selectedFilters.push(cropSources);
                                }
                            }  else if (item['filterName'] == 'Territory' || item['filterName'] == 'Country' ) {
                                let sources = { filterName: '', selectedValues: '' };
                                sources.filterName = item['filterName'];
                                if (item['selectedData'] == null || item['selectedData'] == 0) {                                                                    
                                    sources.selectedValues = 'Not available';
                                }
                                this.selectedFilters.push(sources);
                            }
                        }
                        //arr.push(GlobalUtil.getAppSession("UserInfo").region);
                    }
                    if (arr.length > 0)
                        this.selectedData.selectedValues = arr.sort().join(", ");
                    else
                        this.selectedData.selectedValues = 'Not available';
                } else if (entry.filterType == 'MonthlyDropdowns') {
                    let multiSelects = filterObject.filter(x => x.filterType == entry.filterType);
                    if (multiSelects.length > 0) {
                        let filters = multiSelects[0].filterData;
                        for (let item of filters) {
                            let sources = { filterName: '', selectedValues: '' };
                            sources.filterName = item['filterName'];
                            
                            //console.log(filters.filter(x => x['filterName'] == item['filterName'])[0]);
                            let relation = item['filterData'].filter((x: any) => x['labelId'] == Number(item['selectedData']));                            
                            if (relation.length > 0) {
                                sources.selectedValues = relation[0]['label'];
                            }
                            this.selectedFilters.push(sources);
                        }
                    }
                }
                else if (entry.filterType.toLowerCase() == "source") {
                    this.selectedData.filterName = entry.filterName +  " source";
                    if (entry.filterData != null) {
                        if (entry.filterData.length > 0)
                            this.selectedData.selectedValues = entry.filterData[0]["sourceName"];
                        else
                            this.selectedData.selectedValues = "Not available"
                    }
                    else
                        this.selectedData.selectedValues = "Not available"
                }
                else {  //Choose Via, From Year, To Year
                    this.selectedData.selectedValues = entry.selectedData;
                }
                if ((entry.filterType != 'MonthlyDropdowns') && (entry.filterType.toString() != 'GeographyCascadeMultiselects')) {
                    this.selectedFilters.push(this.selectedData);
                }
            }
            this.selectedFilters.push(cropSources); // to display the crop sources at the end that's why it's kept out of loop
        }
    }

    GetSelectedFilters(filterObject: IFilters[]): void {
        this.selectedFilters = [];
        if (filterObject != null) {
            for (let entry of filterObject) {
                if (entry.filterName == 'Region' || entry.filterName == 'Territory' || entry.filterName == 'Country') {
                    entry.sortOrder = this.data.filters.filter(x => x.filterName == 'Region')[0].filterData.filter(m => m["filterName"] == entry.filterName)[0]["sortOrder"];
                }
                else if (entry.filterName == 'From Year' || entry.filterName == 'From Month' || entry.filterName == 'To Year' || entry.filterName == 'To Month') {
                    entry.sortOrder = this.data.filters.filter(x => x.filterName == 'From Year')[0].filterData.filter(m => m["filterName"] == entry.filterName)[0]["sortOrder"];
                }
                else if (entry.filterType.toLowerCase() == "source")
                {
                    entry.sortOrder=20;
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
                this.selectedData.filterName = entry.filterName;
                if (entry.filterName == 'Source' || entry.filterName == 'Currency') {
                    this.selectedData.selectedValues = this.data.filters.filter(x => x.filterName == entry.filterName)[0].filterData.filter(x => x["labelId"] == entry.selectedData)[0]["label"]
                }
                else if (entry.filterName == 'UnitType') {
                    this.selectedData.filterName = 'Unit Type';
                    this.selectedData.selectedValues = this.data.filters.filter(x => x.filterName == entry.filterName)[0].filterData.filter(x => x["labelId"] == entry.selectedData)[0]["label"]
                }
                else if (entry.filterName == 'Crop') {
                    if ((typeof (entry.selectedData) != "object") || (entry.selectedData == null)) {
                        arr.push(this.cropType);
                    } else {
                        for (let item of this.filterObject.filter(x => x.filterName == "Crop")[0].selectedData) {
                            arr.push(this.data.filters.filter(x => x.filterName == "Crop")[0].filterData.filter(x => x['value'] == item)[0]['label']);
                        }
                    }
                        this.selectedData.selectedValues = arr.sort().join(", ");                    
                }  
                else if (entry.filterName == 'Region' || entry.filterName == 'Territory' || entry.filterName == 'Country') {
                    if ((typeof (entry.selectedData) != "object") || (entry.selectedData == null)) {
                        arr.push(this.data.filters.filter(x => x.filterName == entry.filterName)[0].filterData.filter(m => m["filterName"] == entry.filterName)[0]["filterData"].filter((k: any) => k.value == entry.selectedData)[0]["label"]);
                    } else {
                        for (let item of this.filterObject.filter(x => x.filterName == entry.filterName)[0].selectedData) {
                            arr.push(this.data.filters.filter(x => x.filterName == 'Region')[0].filterData.filter(m => m["filterName"] == entry.filterName)[0]["filterData"].filter((k: any) => k.value == item)[0]["label"]);
                        }
                    }
                    if (arr.length > 0) 
                        this.selectedData.selectedValues = arr.sort().join(", ");
                    else
                        this.selectedData.selectedValues = 'Not available';
                }
                else if (entry.filterName == 'From Month' || entry.filterName == 'To Month') {
                    this.selectedData.selectedValues = this.data.filters.filter(x => x.filterName == 'From Year')[0].filterData.filter(k => k["filterName"] == entry.filterName)[0]["filterData"].filter((l: any) => l.labelId == entry.selectedData)[0].label;
                }

                else if (entry.filterType.toLowerCase() == "source")
                {
                    this.selectedData.filterName = entry.filterName + " source";

                    if (entry.filterData != null)
                    {
                        if (entry.filterData.length > 0)
                            this.selectedData.selectedValues = entry.filterData[0]["sourceName"];
                        else
                            this.selectedData.selectedValues = "Not available"
                    }
                    else
                        this.selectedData.selectedValues = "Not available"
                }

                else {  //Choose Via, From Year, To Year
                    this.selectedData.selectedValues = entry.selectedData;
                }

                this.selectedFilters.push(this.selectedData);
            }
        }
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
                    this.datePipe = new DatePipe("en-US");
                    let Filters = (this.selectedFilters.length > 0) ? 'Filters applied: ' : 'Filters applied: ' + this.cropType; 
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
                            ChartHeaderDesc: Filters, ChartFooterDesc: '',
                            PageFooterDesc: GlobalUtil.getAppSession("UserInfo").userName + ' exported from AgriInsider on ' + this.datePipe.transform(new Date(), 'dd MMMM yyyy')
                        };
                        this.kpi[0] = {
                            name: filterdata[count].widgetName + ' - ' + this.cropType,
                            data: obj,
                            CurrentChunk: count,
                            TotalChunks: FilesCount,
                            Size: "0",
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

    loadScripts() {
        let node = document.createElement('script');
        node.src = GlobalConfig.tinyMceJs;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

    editChartInsight(event: any, widgetId: number, insightData: string, richTextNumber: number): boolean {
        let richTextBoxId: HTMLElement = document.getElementById('richTextInsight' + richTextNumber);
        if (event.target.classList.contains('fa-pencil-square-o')) {//Pen  

            if (tinymce.editors.length == 1)//Only one insight could be editted at a time.
            {
                alert('Only one insight can be modified at a time');
                return false;
            }

            this.snapshotDesc = insightData;
            let options = {
                height: '80',
                max_chars: '2000',
                selector: '#richTextInsight' + richTextNumber,
                menubar: false,
                statusbar: false,
                inline: true,
                plugins: ['link', 'paste'],
                toolbar: "undo redo | bold italic underline | link | alignleft aligncenter alignright | charmap",
                content_css: [GlobalConfig.bootstrapMin, GlobalConfig.styleCss],
                setup: (editor: any) => {
                    this.editor = editor;
                    this.editor.on('keyup', (ev: any) => {
                        this.snapshotDesc = editor.getContent();
                        if (this.snapshotDesc.length > editor.getParam('max_chars')) {
                            if (ev.keyCode != 8) {
                                alert('Max ' + editor.getParam('max_chars') + ' characters are allowed in richtext area.');
                                ev.preventDefault();// backspace (8) / delete (46)
                                return false;
                            }
                        }
                    });
                    this.editor.on('init', () => {
                        editor.setContent(this.snapshotDesc != null ? this.snapshotDesc : '');
                    });
                }
            };
            tinymce.init(options);


            //Change the edit button image.
            event.target.classList.add('fa-check-circle');
            event.target.classList.remove('fa-pencil-square-o');
            event.target.title = "Save changes";
            richTextBoxId.classList.add('richTextBoxStyle');
            richTextBoxId.classList.remove('insightScrollDisplay');
            //document.getElementById('richTextInsight' + richTextNumber).classList.add('richTextBoxStyle');         
        }
        else if (event.target.classList.contains('fa-check-circle')) {//Right Tick
            if (this.editor.getContent().length > this.editor.getParam('max_chars')) {
                alert('Max ' + this.editor.getParam('max_chars') + ' characters are allowed in richtext area.');
                return false;
            }
            this.insightDetails.insightData = this.editor.getContent();
            this.insightDetails.widgetDetailId = widgetId.toString();
            this.chartService.updateInsightData(this.insightDetails).subscribe(result => {
                this.data.widgets[richTextNumber].insightData = this.insightDetails.insightData;
                this.data.widgets[richTextNumber].insightLastUpdated = GlobalUtil.getFormattedDate();
            });

            tinymce.remove(this.editor);

            //Change the edit button image.
            event.target.classList.add('fa-pencil-square-o');
            event.target.classList.remove('fa-check-circle');
            event.target.title = "Add/Edit insight";
            richTextBoxId.classList.remove('richTextBoxStyle');
            //non-edit mode with overflow hidden
            //document.getElementById('richTextInsight' + richTextNumber).classList.remove('richTextBoxStyle');         
        }
        return true;
    }

    ngOnDestroy(): void {
        tinymce.remove(this.editor);
    }

    Reset(pagePopover: PopoverContent): void {
        this.loading = true;
        this.data.filters = null;
        this.submitVisible = false;
        this.submitMessage = "";

        this.chartService.getData(this.seriveParams)
            .subscribe(data => { this.data.filters = data.pageDataMapper.filters; this.loading = false; }
            , error => this.errorMessage = <any>error
            );

    }
}
