
import {
    Component, Input, Output, OnInit, OnChanges, OnDestroy, AfterViewInit,
    EventEmitter, ViewChild, ViewEncapsulation, Pipe, PipeTransform
} from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationStart, Event as NavigationEvent, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ITabularViewModel } from './major-agrochemicals-seeds.model';
import { MASSnapshotService } from './mas-snapshot.service';
import { DatePipe } from '@angular/common';
import { ICompanySnapshotDescription, IPageParams } from './mas-snapshot.model';
import { GlobalConfig, Page, ExportLevel } from '../../../global/global.config';
import { GlobalUtil } from '../../../global/global.util';
import { IFilters, IServiceParams, IExports } from '../../../widgets/charts/chart';
import { PopoverContent } from 'ng2-popover';
import { DomSanitizer } from '@angular/platform-browser'
import { IExportModel } from '../../../widgets/export/export';
import { ExcelExportService } from '../../../widgets/export/Export.service';
import { ITableHeader } from '../../../widgets/datatable/datatable.model'


declare var tinymce: any;
//declare var HtmlToCanvas: any;
declare var html2canvas: any;

@Component({
    moduleId: module.id,
    selector: 'my-major-agrochemicals-seeds',
    templateUrl: 'mas-snapshot.component.html',
    providers: [MASSnapshotService],
    encapsulation: ViewEncapsulation.None
})


export class MASSnapshotComponent implements OnInit, AfterViewInit, OnDestroy, PipeTransform {

    constructor(private service: MASSnapshotService, private route: ActivatedRoute, private router: Router, private sanitized: DomSanitizer, private _ExcelExportService: ExcelExportService) {
        /*  Route event types
            NavigationEnd
            NavigationCancel
            NavigationError
            RoutesRecognized
        */
        router.events.forEach((event: NavigationEvent) => {
            if (event instanceof NavigationEnd) {
            }
        });
        
        if (GlobalUtil.getSession("CompetitorId")) {
            this.loadScripts();
        }

    }

    transform(value: string): any {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }

    public loadScripts() {
        let node = document.createElement('script');
        node.src = GlobalConfig.tinyMceJs;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

    tabularViewModel: ITabularViewModel = {
        widget: [],
        tableHead: [],
        financialSummery: [],
        companySnapshot: [],
        actions: [],
        filters: []
    };

    clicked: boolean = true;
    isAdmin: boolean = (GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin")? true : false;
    isEditModeHidden: boolean = false;
    snapshotDesc: any;
    transformedSnapshotDesc: any;
    competitiorId: number;
    companyName: string;
    kpi: Object[] = [];
    arrayFilterdata: IExportModel;
    snapshotDescription: ICompanySnapshotDescription = {};
    pageParams: IPageParams = {};
    seriveParams: IServiceParams = { pageName: Page.cisnap, companyId: GlobalUtil.getSession("CompetitorId"), cropId: 0, selectedFilter: null };
    exportObject: IExports[] = [];
    filterObject: IFilters[] = [];
    filterApi: IFilters[] = [];
    errorMessage: string;
    datePipe: DatePipe;
    
    @Input()
    editorOptions: any = {};

    @Output()
    editorChange = new EventEmitter<any>();

    @Output()
    getEditor = new EventEmitter<any>();

    editor: any;
    editorId: string;
    editorInitialContent: string = '';

    paginator: boolean;
    pageLinks: number;
    rowsPerPage: number;
    rowsPerPageOptions: Array<number>;
    responsive: boolean;
    styleClass: string;
    rowStyleClass: string;

    competitorId: number;
    pageName: string=Page.cisnap;
    loading: boolean = false;
    exportData: string;
    ngOnInit() {

        if (GlobalUtil.getSession("CompetitorId")) {
            this.loading = true;
            this.companyName = GlobalUtil.getSession("CompanyName");
            this.setPageData();
            this.isEditModeHidden = true;
        }
        else {
            this.router.navigateByUrl('layout/majoragroandseeds');
        }
    }

    setPageData() {
        this.paginator = false;
        this.pageLinks = 3;
        this.rowsPerPage = 5;
        this.rowsPerPageOptions = [5, 10, 20];
        this.responsive = false;

        this.getPageData();
    }

    /*getPageModuleId(): string {
        return GlobalUtil.getSession("PageModuleId");
    }*/

    getPageModuleId(): number {
        return parseInt(GlobalUtil.getSession("PageModuleId"));
    }

    getPageData(): void {
        this.service.getPageData(this.seriveParams).subscribe(result => {
            this.tabularViewModel = result;
            this.snapshotDesc = result.companySnapshot[0].companyInfo;
            this.transformedSnapshotDesc = this.transform(this.snapshotDesc);

            GlobalConfig.snapActionState = this.tabularViewModel.actions;
            GlobalConfig.snapFilterState = this.tabularViewModel.filters;
            this.loading = false;
        },
            error => {
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
    FilterSubmit(pagePopover: PopoverContent): void {
        this.loading = true;
        //pagePopover.hide();
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
        let selectedValue: IServiceParams = { pageName: Page.cisnap, companyId: GlobalUtil.getSession("CompetitorId"), cropId: 0, selectedFilter: this.filterApi };
        //debugger;
        this.service.getPageData(selectedValue)
            .subscribe(data => {
                this.tabularViewModel.tableHead = data.tableHead;
                this.tabularViewModel.financialSummery = data.financialSummery;
                this.tabularViewModel.actions = GlobalConfig.snapActionState;
                this.tabularViewModel.filters = GlobalConfig.snapFilterState;
                this.loading = false;

            }, error => {
                this.errorMessage = <any>error
            });
    }

    //ExportSubmit(): void {
    //    this.loading = true;

    //    let ExportAsData = this.exportObject.find(model => model.exportName == "Export As");
    //    //if excel
    //    if (ExportAsData.selectedData == 1) {

    //        var filteredData = this._ExcelExportService.constructTabularDataForExport(this.tabularViewModel.tableHead, this.tabularViewModel.financialSummery);
    //        this.kpi[0] = { name: this.tabularViewModel.widget[0].name, data: filteredData };
    //    }

    //    this.arrayFilterdata = { templateName: "Export", fileName: this.tabularViewModel.widget[0].name, kpiData: this.kpi, exportAs: ExportAsData.selectedData };

    //    this._ExcelExportService.ExcelExportedFilePath(this.arrayFilterdata).subscribe(data => { this.exportData = data; this.loading = false; });
    //}

    ExportSubmit(): void {
        this.loading = true;
        this.datePipe = new DatePipe("en-US");
        let ExportAsData = this.exportObject.find(model => model.exportName == "Export As");
        let ChartData = this.exportObject.find(model => model.exportName == "Chart Names");
        let InsightData = this.exportObject.find(model => model.exportName == "Insights");
        if (ExportAsData.selectedData == 1) {
            var filteredData = this._ExcelExportService.constructTabularDataForExport(this.tabularViewModel.tableHead, this.tabularViewModel.financialSummery);
            this.kpi[0] = { name: this.tabularViewModel.widget[0].name, data: filteredData };
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
                        name: GlobalUtil.getSession("CompanyName"),
                        data: obj,
                        CurrentChunk: 0,
                        TotalChunks: 1,
                        ExportLevel: ExportLevel.Page,
                        Size: 1
                    };
                    var arrayFilterdata = { templateName: "Export", fileName: _self.pageName, kpiData: _self.kpi, exportAs: 2 };
                    _self._ExcelExportService.ExcelExportedFilePath(arrayFilterdata)
                        .subscribe(data => {
                           // console.log(data);
                            _self.loading = false;
                        });
                }
            });
        }
    }

    Submit(pagePopover: PopoverContent): void {
        this.loading = true;
        pagePopover.hide();
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
        // console.log(this.filterApi);
        let selectedValue: IServiceParams = { pageName: Page.cisnap, companyId: GlobalUtil.getSession("CompetitorId"), cropId: 0, selectedFilter: this.filterApi };
        this.service.getPageData(selectedValue)
            .subscribe(data => {
                this.tabularViewModel.widget = data.widget;
                this.tabularViewModel.tableHead = data.tableHead;
                this.tabularViewModel.financialSummery = data.financialSummery;
                this.snapshotDesc = data.companySnapshot[0].companyInfo;
                this.tabularViewModel.actions = GlobalConfig.snapActionState;
                this.tabularViewModel.filters = GlobalConfig.snapFilterState;
                this.loading = false;;
            }, error => {
                this.errorMessage = <any>error
            });
    }

    saveSnapshotData(competitorId: number, content: string): any {
        this.snapshotDescription.competitorId = competitorId;
        this.snapshotDescription.description = content;
        this.service.setSnapshotData(this.snapshotDescription).subscribe(result => {
            //this.tabularViewModel = result;
        });
    }



    editSnapshotDesc(event: any) {
        //tinymce.activeEditor.setMode('design');
        if (event.target.classList.contains('fa-pencil-square-o')) {//Pen

            this.isEditModeHidden = false;
            let uiBasePoint = GlobalUtil.getBasePath("");
            let options = {
                height: '424',
                //readonly: true,
                selector: '#richTextTinyMC',
                menu: {
                    file: { title: 'File', items: 'newdocument' },
                    edit: { title: 'Edit', items: 'undo redo | cut copy | selectall' },
                    insert: { title: 'Insert', items: 'link media | template hr' },
                    view: { title: 'View', items: 'visualaid' },
                    format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat' },
                    table: { title: 'Table', items: 'inserttable tableprops deletetable | cell row column' },
                    tools: { title: 'Tools', items: 'spellchecker code' }
                },
                plugins: ['link', 'paste', 'table', 'image', 'code', 'preview', 'textcolor', 'colorpicker'],
                toolbar: "undo redo | styleselect | bold italic | link | alignleft aligncenter alignright | charmap image code preview | forecolor backcolor",
                //skin_url: '/node_modules/tinymce/skins/lightgray',
                content_css: [GlobalConfig.bootstrapMin, GlobalConfig.styleCss],
                setup: (editor: any) => {

                    this.editor = editor;
                    //this.editor.on('change', () => {
                    //    this.snapshotDesc = editor.getContent();
                    //    this.editorChange.emit(this.snapshotDesc);
                    //    //this.saveSnapshotData(this.competitiorId, this.snapshotDesc);
                    //});

                    this.editor.on('keyup', () => {
                        this.snapshotDesc = editor.getContent();
                        this.editorChange.emit(this.snapshotDesc);
                    });

                    this.editor.on('init', () => {

                        //tinymce.activeEditor.setMode('readonly');
                        editor.setContent(this.snapshotDesc);
                    });

                    this.getEditor.emit(this.editor);
                },
                // enable title field in the Image dialog
                image_title: true,
                // enable automatic uploads of images represented by blob or data URIs
                automatic_uploads: true,
                // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
                images_upload_url: 'postAcceptor.php',
                // here we add custom filepicker only to Image dialog
                file_picker_types: 'image',
                // and here's our custom image picker
                file_picker_callback: function (cb: any, value: any, meta: any) {

                    var input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');

                    // Note: In modern browsers input[type="file"] is functional without 
                    // even adding it to the DOM, but that might not be the case in some older
                    // or quirky browsers like IE, so you might want to add it to the DOM
                    // just in case, and visually hide it. And do not forget do remove it
                    // once you do not need it anymore.

                    input.onchange = function () {

                        var file = input.files[0];

                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function () {
                            // Note: Now we need to register the blob in TinyMCEs image blob
                            // registry. In the next release this part hopefully won't be
                            // necessary, as we are looking to handle it internally.
                            var id = 'blobid' + (new Date()).getTime();
                            var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                            var base64 = reader.result.split(',')[1];
                            var blobInfo = blobCache.create(id, file, base64);
                            blobCache.add(blobInfo);

                            // call the callback and populate the Title field with the file name
                            cb(blobInfo.blobUri(), { title: file.name });
                        };
                    };

                    input.click();
                }
            };
            this.editorOptions = options;
            tinymce.init(options);

            //Change the edit button image.
            event.target.classList.add('fa-check-circle');
            event.target.classList.remove('fa-pencil-square-o');
        }
        else if (event.target.classList.contains('fa-check-circle')) {//Right Tick
            //Change the edit button image.
            event.target.classList.add('fa-pencil-square-o');
            event.target.classList.remove('fa-check-circle');

            //Save snapshot description to db.
            this.snapshotDesc = this.editor.getContent();
            this.saveSnapshotData(GlobalUtil.getSession("CompetitorId"), this.snapshotDesc);
            this.isEditModeHidden = false;

            //Convert editable mode to non-editable mode.
            tinymce.remove(this.editor);
        }
    }

    ngOnChanges() {
    }

    ngAfterViewInit() {

    }

    ngOnDestroy(): void {

        if (GlobalUtil.getSession("CompetitorId")) {
            tinymce.remove(this.editor);
        }
    }

}