"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var mas_snapshot_service_1 = require('./mas-snapshot.service');
var common_1 = require('@angular/common');
var global_config_1 = require('../../../global/global.config');
var global_util_1 = require('../../../global/global.util');
var platform_browser_1 = require('@angular/platform-browser');
var Export_service_1 = require('../../../widgets/export/Export.service');
var MASSnapshotComponent = (function () {
    function MASSnapshotComponent(service, route, router, sanitized, _ExcelExportService) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.sanitized = sanitized;
        this._ExcelExportService = _ExcelExportService;
        this.tabularViewModel = {
            widget: [],
            tableHead: [],
            financialSummery: [],
            companySnapshot: [],
            actions: [],
            filters: []
        };
        this.clicked = true;
        this.isAdmin = (global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
        this.isEditModeHidden = false;
        this.kpi = [];
        this.snapshotDescription = {};
        this.pageParams = {};
        this.seriveParams = { pageName: global_config_1.Page.cisnap, companyId: global_util_1.GlobalUtil.getSession("CompetitorId"), cropId: 0, selectedFilter: null };
        this.exportObject = [];
        this.filterObject = [];
        this.filterApi = [];
        this.editorOptions = {};
        this.editorChange = new core_1.EventEmitter();
        this.getEditor = new core_1.EventEmitter();
        this.editorInitialContent = '';
        this.pageName = global_config_1.Page.cisnap;
        this.loading = false;
        /*  Route event types
            NavigationEnd
            NavigationCancel
            NavigationError
            RoutesRecognized
        */
        router.events.forEach(function (event) {
            if (event instanceof router_1.NavigationEnd) {
            }
        });
        if (global_util_1.GlobalUtil.getSession("CompetitorId")) {
            this.loadScripts();
        }
    }
    MASSnapshotComponent.prototype.transform = function (value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    };
    MASSnapshotComponent.prototype.loadScripts = function () {
        var node = document.createElement('script');
        node.src = global_config_1.GlobalConfig.tinyMceJs;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    };
    MASSnapshotComponent.prototype.ngOnInit = function () {
        if (global_util_1.GlobalUtil.getSession("CompetitorId")) {
            this.loading = true;
            this.companyName = global_util_1.GlobalUtil.getSession("CompanyName");
            this.setPageData();
            this.isEditModeHidden = true;
        }
        else {
            this.router.navigateByUrl('layout/majoragroandseeds');
        }
    };
    MASSnapshotComponent.prototype.setPageData = function () {
        this.paginator = false;
        this.pageLinks = 3;
        this.rowsPerPage = 5;
        this.rowsPerPageOptions = [5, 10, 20];
        this.responsive = false;
        this.getPageData();
    };
    /*getPageModuleId(): string {
        return GlobalUtil.getSession("PageModuleId");
    }*/
    MASSnapshotComponent.prototype.getPageModuleId = function () {
        return parseInt(global_util_1.GlobalUtil.getSession("PageModuleId"));
    };
    MASSnapshotComponent.prototype.getPageData = function () {
        var _this = this;
        this.service.getPageData(this.seriveParams).subscribe(function (result) {
            _this.tabularViewModel = result;
            _this.snapshotDesc = result.companySnapshot[0].companyInfo;
            _this.transformedSnapshotDesc = _this.transform(_this.snapshotDesc);
            global_config_1.GlobalConfig.snapActionState = _this.tabularViewModel.actions;
            global_config_1.GlobalConfig.snapFilterState = _this.tabularViewModel.filters;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    MASSnapshotComponent.prototype.onFilterEmit = function (filter) {
        this.filterObject = this.filterObject.filter(function (x) { return x.filterName !== filter.filterName; });
        this.filterObject.push(filter);
        return true;
        //this.filterObject = filter;
        //return true;
    };
    MASSnapshotComponent.prototype.onExportEmit = function (exp) {
        this.exportObject = this.exportObject.filter(function (x) { return x.exportName !== exp.exportName; });
        this.exportObject.push(exp);
        return true;
    };
    MASSnapshotComponent.prototype.FilterSubmit = function (pagePopover) {
        var _this = this;
        this.loading = true;
        //pagePopover.hide();
        //debugger;
        for (var _i = 0, _a = this.filterObject; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry.filterName === 'View Data As' && entry.selectedData === 'Quarterly')
                this.filterApi = this.filterObject.filter(function (x) { return x.filterName !== "PeriodYear"; });
            else if (entry.filterName === 'View Data As' && entry.selectedData === 'Yearly')
                this.filterApi = this.filterObject.filter(function (x) { return x.filterName !== "PeriodQuarter"; });
            else if (entry.filterName === 'Currency')
                this.filterApi = this.filterObject;
        }
        //console.log(this.filterApi);
        var selectedValue = { pageName: global_config_1.Page.cisnap, companyId: global_util_1.GlobalUtil.getSession("CompetitorId"), cropId: 0, selectedFilter: this.filterApi };
        //debugger;
        this.service.getPageData(selectedValue)
            .subscribe(function (data) {
            _this.tabularViewModel.tableHead = data.tableHead;
            _this.tabularViewModel.financialSummery = data.financialSummery;
            _this.tabularViewModel.actions = global_config_1.GlobalConfig.snapActionState;
            _this.tabularViewModel.filters = global_config_1.GlobalConfig.snapFilterState;
            _this.loading = false;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
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
    MASSnapshotComponent.prototype.ExportSubmit = function () {
        var _this = this;
        this.loading = true;
        this.datePipe = new common_1.DatePipe("en-US");
        var ExportAsData = this.exportObject.find(function (model) { return model.exportName == "Export As"; });
        var ChartData = this.exportObject.find(function (model) { return model.exportName == "Chart Names"; });
        var InsightData = this.exportObject.find(function (model) { return model.exportName == "Insights"; });
        if (ExportAsData.selectedData == 1) {
            var filteredData = this._ExcelExportService.constructTabularDataForExport(this.tabularViewModel.tableHead, this.tabularViewModel.financialSummery);
            this.kpi[0] = { name: this.tabularViewModel.widget[0].name, data: filteredData };
            this.arrayFilterdata = { templateName: "Export", fileName: this.tabularViewModel.widget[0].name + "_" + (global_util_1.GlobalUtil.getAppSession("UserInfo") ? global_util_1.GlobalUtil.getAppSession("UserInfo").userName.split('@')[0].split('.')[0] : ""), kpiData: this.kpi, exportAs: ExportAsData.selectedData };
            this._ExcelExportService.ExcelExportedFilePath(this.arrayFilterdata).subscribe(function (data) { _this.exportData = data; _this.loading = false; });
        }
        if (ExportAsData.selectedData == 2) {
            var _self_1 = this;
            html2canvas([document.getElementById("content")], {
                onrendered: function (canvas) {
                    var imagedata = canvas.toDataURL('image/png');
                    var obj = {
                        Image: imagedata, Insight: "",
                        PageFooterDesc: global_util_1.GlobalUtil.getAppSession("UserInfo").userName + ' exported from AgriInsider on ' + _self_1.datePipe.transform(new Date(), 'dd MMMM yyyy') };
                    _self_1.kpi[0] = {
                        name: global_util_1.GlobalUtil.getSession("CompanyName"),
                        data: obj,
                        CurrentChunk: 0,
                        TotalChunks: 1,
                        ExportLevel: global_config_1.ExportLevel.Page,
                        Size: 1
                    };
                    var arrayFilterdata = { templateName: "Export", fileName: _self_1.pageName, kpiData: _self_1.kpi, exportAs: 2 };
                    _self_1._ExcelExportService.ExcelExportedFilePath(arrayFilterdata)
                        .subscribe(function (data) {
                        // console.log(data);
                        _self_1.loading = false;
                    });
                }
            });
        }
    };
    MASSnapshotComponent.prototype.Submit = function (pagePopover) {
        var _this = this;
        this.loading = true;
        pagePopover.hide();
        for (var _i = 0, _a = this.filterObject; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry.filterName === 'View Data As' && entry.selectedData === 'Quarterly')
                this.filterApi = this.filterObject.filter(function (x) { return x.filterName !== "PeriodYear"; });
            else if (entry.filterName === 'View Data As' && entry.selectedData === 'Yearly')
                this.filterApi = this.filterObject.filter(function (x) { return x.filterName !== "PeriodQuarter"; });
            else if (entry.filterName === 'Currency')
                this.filterApi = this.filterObject;
        }
        // console.log(this.filterApi);
        var selectedValue = { pageName: global_config_1.Page.cisnap, companyId: global_util_1.GlobalUtil.getSession("CompetitorId"), cropId: 0, selectedFilter: this.filterApi };
        this.service.getPageData(selectedValue)
            .subscribe(function (data) {
            _this.tabularViewModel.widget = data.widget;
            _this.tabularViewModel.tableHead = data.tableHead;
            _this.tabularViewModel.financialSummery = data.financialSummery;
            _this.snapshotDesc = data.companySnapshot[0].companyInfo;
            _this.tabularViewModel.actions = global_config_1.GlobalConfig.snapActionState;
            _this.tabularViewModel.filters = global_config_1.GlobalConfig.snapFilterState;
            _this.loading = false;
            ;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    MASSnapshotComponent.prototype.saveSnapshotData = function (competitorId, content) {
        this.snapshotDescription.competitorId = competitorId;
        this.snapshotDescription.description = content;
        this.service.setSnapshotData(this.snapshotDescription).subscribe(function (result) {
            //this.tabularViewModel = result;
        });
    };
    MASSnapshotComponent.prototype.editSnapshotDesc = function (event) {
        var _this = this;
        //tinymce.activeEditor.setMode('design');
        if (event.target.classList.contains('fa-pencil-square-o')) {
            this.isEditModeHidden = false;
            var uiBasePoint = global_util_1.GlobalUtil.getBasePath("");
            var options = {
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
                content_css: [global_config_1.GlobalConfig.bootstrapMin, global_config_1.GlobalConfig.styleCss],
                setup: function (editor) {
                    _this.editor = editor;
                    //this.editor.on('change', () => {
                    //    this.snapshotDesc = editor.getContent();
                    //    this.editorChange.emit(this.snapshotDesc);
                    //    //this.saveSnapshotData(this.competitiorId, this.snapshotDesc);
                    //});
                    _this.editor.on('keyup', function () {
                        _this.snapshotDesc = editor.getContent();
                        _this.editorChange.emit(_this.snapshotDesc);
                    });
                    _this.editor.on('init', function () {
                        //tinymce.activeEditor.setMode('readonly');
                        editor.setContent(_this.snapshotDesc);
                    });
                    _this.getEditor.emit(_this.editor);
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
                file_picker_callback: function (cb, value, meta) {
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
        else if (event.target.classList.contains('fa-check-circle')) {
            //Change the edit button image.
            event.target.classList.add('fa-pencil-square-o');
            event.target.classList.remove('fa-check-circle');
            //Save snapshot description to db.
            this.snapshotDesc = this.editor.getContent();
            this.saveSnapshotData(global_util_1.GlobalUtil.getSession("CompetitorId"), this.snapshotDesc);
            this.isEditModeHidden = false;
            //Convert editable mode to non-editable mode.
            tinymce.remove(this.editor);
        }
    };
    MASSnapshotComponent.prototype.ngOnChanges = function () {
    };
    MASSnapshotComponent.prototype.ngAfterViewInit = function () {
    };
    MASSnapshotComponent.prototype.ngOnDestroy = function () {
        if (global_util_1.GlobalUtil.getSession("CompetitorId")) {
            tinymce.remove(this.editor);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MASSnapshotComponent.prototype, "editorOptions", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MASSnapshotComponent.prototype, "editorChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MASSnapshotComponent.prototype, "getEditor", void 0);
    MASSnapshotComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-major-agrochemicals-seeds',
            templateUrl: 'mas-snapshot.component.html',
            providers: [mas_snapshot_service_1.MASSnapshotService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [mas_snapshot_service_1.MASSnapshotService, router_1.ActivatedRoute, router_1.Router, platform_browser_1.DomSanitizer, Export_service_1.ExcelExportService])
    ], MASSnapshotComponent);
    return MASSnapshotComponent;
}());
exports.MASSnapshotComponent = MASSnapshotComponent;
//# sourceMappingURL=mas-snapshot.component.js.map