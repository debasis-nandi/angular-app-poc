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
var global_util_1 = require('../../global/global.util');
var EmptyStringPipe_filter_1 = require('./EmptyStringPipe.filter');
var DataTableComponent = (function () {
    function DataTableComponent(router, cdr) {
        this.router = router;
        this.cdr = cdr;
        this.responsive = true;
        this.styleClass = 'ui-datatable table table-hover comp-table';
        this.reorderableColumns = true;
    }
    DataTableComponent.prototype.ngAfterViewInit = function () {
        //this.cdr.detach();
    };
    DataTableComponent.prototype.ngAfterViewChecked = function () {
        //this.cdr.detach();
    };
    DataTableComponent.prototype.ngOnInit = function () {
    };
    DataTableComponent.prototype.ngOnChanges = function () {
        var tblhead = this.tableHeader;
        var tbldata = this.tableData;
    };
    DataTableComponent.prototype.getNormalColData = function (colData) {
        if (colData != null && colData != "") {
            return parseFloat(colData);
        }
        else {
            return null;
        }
    };
    DataTableComponent.prototype.isNumber = function (val) { return typeof val === 'number'; };
    DataTableComponent.prototype.getColData = function (colData) {
        if (colData != null && colData != "") {
            var array = colData.split('|');
            return parseFloat(array[0].trim());
        }
        else {
            return null;
        }
    };
    DataTableComponent.prototype.getGrowthIndicator = function (colData) {
        if (colData != null && colData != "") {
            var array = colData.split('|');
            var indi = array[1].trim();
            if (indi == "")
                return null;
            if (indi == "0")
                return 0;
            if (indi == "1")
                return 1;
        }
        else {
            return 100;
        }
    };
    //colData.split('(')[1].split(')')[0]
    DataTableComponent.prototype.getUnitGrowthIndicator = function (colData) {
        if (colData != null && colData != "" && colData.indexOf('(') > 0 && colData.indexOf(')') > 0) {
            var unit = colData.split('(')[1].split(')')[0];
            return unit;
        }
        else {
            return null;
        }
    };
    DataTableComponent.prototype.onRedirect = function (rowCoolection) {
        if (rowCoolection) {
            global_util_1.GlobalUtil.setSession("CompetitorId", rowCoolection['competitorId']);
            global_util_1.GlobalUtil.setSession("CompanyName", rowCoolection['companyName']);
            global_util_1.GlobalUtil.setSession("CropName", rowCoolection['cropName']);
            global_util_1.GlobalUtil.setSession("CropId", rowCoolection['cropId']);
        }
    };
    DataTableComponent.prototype.sortColumn = function (colObj) {
        var columnName = undefined !== colObj.field ? colObj.field : colObj;
        if (columnName == 'totalAgriBusinessSales') {
            this.sortArray(colObj, 'totalAgriBusinessSalesValues');
        }
        if (columnName == 'ebit') {
            this.sortArray(colObj, 'ebitValues');
        }
        if (columnName == 'ebitMargin') {
            this.sortArray(colObj, 'ebitMarginValues');
        }
        if (columnName == 'rndExpenses') {
            this.sortArray(colObj, 'rndExpensesValues');
        }
        if (columnName == 'rndExpensesAsPercentageSales') {
            this.sortArray(colObj, 'rndExpensesAsPercentageSalesValues');
        }
        if (columnName == 'demand') {
            this.sortArray(colObj, 'demandValues');
        }
        if (columnName == 'areaHarvested') {
            this.sortArray(colObj, 'areaHarvestedValues');
        }
        if (columnName == 'price') {
            this.sortArray(colObj, 'priceValues');
        }
        if (columnName == 'production') {
            this.sortArray(colObj, 'productionValues');
        }
        if (columnName == 'stu') {
            this.sortArray(colObj, 'stuValues');
        }
    };
    DataTableComponent.prototype.sortArray = function (colObj, sortColName) {
        if (colObj.order == 1) {
            this.tableData.sort(function (obj1, obj2) {
                return obj1[sortColName] - obj2[sortColName];
            });
        }
        else {
            this.tableData.sort(function (obj1, obj2) {
                return obj2[sortColName] - obj1[sortColName];
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTableComponent.prototype, "tableHeader", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableComponent.prototype, "tableData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableComponent.prototype, "pageLinks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableComponent.prototype, "rowsPerPage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTableComponent.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableComponent.prototype, "responsive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableComponent.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableComponent.prototype, "rowStyleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableComponent.prototype, "reorderableColumns", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableComponent.prototype, "hyperLinkUrl", void 0);
    DataTableComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-table',
            templateUrl: 'datatable.component.html',
            styleUrls: ['datatable.component.css'],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [EmptyStringPipe_filter_1.EmptyStringPipe]
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_1.ChangeDetectorRef])
    ], DataTableComponent);
    return DataTableComponent;
}());
exports.DataTableComponent = DataTableComponent;
//# sourceMappingURL=datatable.component.js.map