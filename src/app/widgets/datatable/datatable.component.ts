

import { AfterViewInit, AfterViewChecked, Component, OnInit, ViewEncapsulation, Input, OnChanges, ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { ITableHeader } from './datatable.model';
import { GlobalUtil } from '../../global/global.util';
import { EmptyStringPipe } from './EmptyStringPipe.filter'

@Component({
    moduleId: module.id,
    selector: 'my-table',
    templateUrl: 'datatable.component.html',
    styleUrls: ['datatable.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [EmptyStringPipe]
})

export class DataTableComponent implements OnInit {

    @Input() tableHeader: ITableHeader[];
    @Input() tableData: any;
    @Input() paginator: boolean;
    @Input() pageLinks: number;
    @Input() rowsPerPage: number;
    @Input() rowsPerPageOptions: Array<number>;
    @Input() responsive: boolean = true;
    @Input() styleClass: string = 'ui-datatable table table-hover comp-table';
    @Input() rowStyleClass: string;
    @Input() reorderableColumns: boolean = true;
    @Input() hyperLinkUrl: string;

    constructor(private router: Router, private cdr: ChangeDetectorRef) {
    }

    ngAfterViewInit() {
        //this.cdr.detach();
    }

    ngAfterViewChecked() {
        //this.cdr.detach();
    }

    ngOnInit() {
    }

    ngOnChanges() {
        var tblhead = this.tableHeader;
        var tbldata = this.tableData;
    }

    getNormalColData(colData: string): number {
        if (colData != null && colData != "") {
            return parseFloat(colData);
        }
        else {
            return null;
        }
    }

    isNumber(val: any) { return typeof val === 'number'; }

    getColData(colData: string): number {
        if (colData != null && colData != "") {
            var array = colData.split('|');
            return parseFloat(array[0].trim());
        }
        else {
            return null;
        }
    }

    getGrowthIndicator(colData: string): number {
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
    }

    //colData.split('(')[1].split(')')[0]
    getUnitGrowthIndicator(colData: string): string {
        if (colData != null && colData != "" && colData.indexOf('(') > 0 && colData.indexOf(')') > 0) {
            let unit = colData.split('(')[1].split(')')[0];
            return unit;
        }
        else {
            return null;
        }
    }

    onRedirect(rowCoolection: any) {
        if (rowCoolection) {
            GlobalUtil.setSession("CompetitorId", rowCoolection['competitorId']);
            GlobalUtil.setSession("CompanyName", rowCoolection['companyName']);
            GlobalUtil.setSession("CropName", rowCoolection['cropName']);

            GlobalUtil.setSession("CropId", rowCoolection['cropId']);
        }
    }

    sortColumn(colObj: any) {

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
        
    }

    sortArray(colObj: any, sortColName: any) {
        if (colObj.order == 1) {
            this.tableData.sort(function (obj1: any, obj2: any) {
                return obj1[sortColName] - obj2[sortColName];
            });
        }
        else {
            this.tableData.sort(function (obj1: any, obj2: any) {
                return obj2[sortColName] - obj1[sortColName];
            });
        }
    }

}