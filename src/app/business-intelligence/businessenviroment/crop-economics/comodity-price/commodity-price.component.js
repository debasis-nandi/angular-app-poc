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
var chart_service_1 = require('../../../../widgets/charts/chart.service');
var ng2_popover_1 = require('ng2-popover');
var global_config_1 = require('../../../../global/global.config');
var global_util_1 = require('../../../../global/global.util');
var CommodityPriceComponent = (function () {
    function CommodityPriceComponent(chartService, ref) {
        this.chartService = chartService;
        this.ref = ref;
        this.filterObject = [];
        this.exportObject = [];
        this.filterApi = [];
        this.exportApi = [];
        this.exportVisible = true;
        this.paginator = false;
        this.pageLinks = 3;
        this.rowsPerPage = 5;
        this.rowsPerPageOptions = [5, 10, 20];
        this.responsive = true;
        this.loading = false;
        this.isAdmin = (global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
        this.insightDetails = {};
        this.seriveParams = { pageName: global_config_1.Page.commodityPrice, companyId: 0, cropId: 0, selectedFilter: null };
        this.loadScripts();
    }
    CommodityPriceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.chartService.getData(this.seriveParams)
            .subscribe(function (data) { _this.data = data.pageDataMapper; _this.loading = false; }, function (error) { return _this.errorMessage = error; });
    };
    CommodityPriceComponent.prototype.onFilterEmit = function (filter) {
        this.filterObject = this.filterObject.filter(function (x) { return x.filterName !== filter.filterName; });
        this.filterObject.push(filter);
        return true;
        //this.filterObject = filter;
        //return true;
    };
    CommodityPriceComponent.prototype.onExportEmit = function (filter) {
        this.exportObject = this.exportObject.filter(function (x) { return x.filterName !== filter.filterName; });
        this.exportObject.push(filter);
        return true;
    };
    CommodityPriceComponent.prototype.FilterSubmit = function (pagePopover) {
        var _this = this;
        //pagePopover.hide();
        this.loading = true;
        for (var _i = 0, _a = this.filterObject; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry.filterName === 'View Data As' && entry.selectedData === 'Quarterly')
                this.filterApi = this.filterObject.filter(function (x) { return x.filterName !== "PeriodYear"; });
            else if (entry.filterName === 'View Data As' && entry.selectedData === 'Yearly')
                this.filterApi = this.filterObject.filter(function (x) { return x.filterName !== "PeriodQuarter"; });
        }
        //console.log(this.filterApi);
        var selectedValue = { pageName: global_config_1.Page.commodityPrice.toString(), companyId: 0, cropId: 0, selectedFilter: this.filterApi };
        this.chartService.getData(selectedValue)
            .subscribe(function (data) { _this.data.widgets = data.pageDataMapper.widgets; _this.loading = false; }, function (error) { return _this.errorMessage = error; });
    };
    CommodityPriceComponent.prototype.ExportSubmit = function () {
        //console.log(this.exportObject);
    };
    CommodityPriceComponent.prototype.onExportVisibleEmit = function (visible) {
        this.exportVisible = visible;
    };
    CommodityPriceComponent.prototype.loadScripts = function () {
        var node = document.createElement('script');
        node.src = global_config_1.GlobalConfig.tinyMceJs;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    };
    CommodityPriceComponent.prototype.editChartInsight = function (event, widgetId, insightData, richTextNumber) {
        var _this = this;
        var richTextBoxId = document.getElementById('richTextInsight' + richTextNumber);
        if (event.target.classList.contains('fa-pencil-square-o')) {
            if (tinymce.editors.length == 1) {
                alert('Only one insight can be modified at a time');
                return false;
            }
            this.snapshotDesc = insightData;
            var options = {
                height: '80',
                selector: '#richTextInsight' + richTextNumber,
                menubar: false,
                statusbar: false,
                inline: true,
                plugins: ['link', 'paste'],
                toolbar: "undo redo | bold italic underline | link | alignleft aligncenter alignright | charmap",
                content_css: [global_config_1.GlobalConfig.bootstrapMin, global_config_1.GlobalConfig.styleCss],
                setup: function (editor) {
                    _this.editor = editor;
                    _this.editor.on('keyup', function (ev) {
                        _this.snapshotDesc = editor.getContent();
                        if (_this.snapshotDesc.length > editor.getParam('max_chars')) {
                            if (ev.keyCode != 8) {
                                alert('Max ' + editor.getParam('max_chars') + ' characters are allowed in richtext area.');
                                ev.preventDefault(); // backspace (8) / delete (46)
                                return false;
                            }
                        }
                    });
                    _this.editor.on('init', function () {
                        editor.setContent(_this.snapshotDesc);
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
        }
        else if (event.target.classList.contains('fa-check-circle')) {
            if (this.editor.getContent().length > this.editor.getParam('max_chars')) {
                alert('Max ' + this.editor.getParam('max_chars') + ' characters are allowed in richtext area.');
                return false;
            }
            this.insightDetails.insightData = this.editor.getContent();
            this.insightDetails.widgetDetailId = widgetId.toString();
            this.chartService.updateInsightData(this.insightDetails).subscribe(function (result) {
                _this.data.widgets[richTextNumber].insightData = _this.insightDetails.insightData;
                _this.data.widgets[richTextNumber].insightLastUpdated = global_util_1.GlobalUtil.getFormattedDate();
            });
            tinymce.remove(this.editor);
            //Change the edit button image.
            event.target.classList.add('fa-pencil-square-o');
            event.target.classList.remove('fa-check-circle');
            event.target.title = "Add/Edit insight";
            richTextBoxId.classList.remove('richTextBoxStyle');
        }
        return true;
    };
    CommodityPriceComponent.prototype.ngOnDestroy = function () {
        tinymce.remove(this.editor);
    };
    __decorate([
        core_1.ViewChild('pagePopover'), 
        __metadata('design:type', ng2_popover_1.PopoverContent)
    ], CommodityPriceComponent.prototype, "pagePopover", void 0);
    CommodityPriceComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'commodity-price.component.html',
        }), 
        __metadata('design:paramtypes', [chart_service_1.ChartService, core_1.ElementRef])
    ], CommodityPriceComponent);
    return CommodityPriceComponent;
}());
exports.CommodityPriceComponent = CommodityPriceComponent;
//# sourceMappingURL=commodity-price.component.js.map