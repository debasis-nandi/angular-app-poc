import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { GlobalUtil } from '../../global/global.util';
import { GlobalConfig, Page } from '../../global/global.config';
import { DataListModule } from 'primeng/primeng';
import { DataListService } from './datalist.service';
import { Insight } from './datalist.model';
import { IInsights } from '../insights.model'

import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
    moduleId: module.id,
    selector: 'ngdatalist',
    templateUrl: 'datalist.component.html'
})


export class DataListComponent{

    constructor(private router: Router, private datalistService: DataListService) {
    }

    @Input() paginator: boolean = false;
    @Input() rows: number;
    @Input() header: string;
    @Input() value: any[];
    @Input() insightObj: IInsights;

    IsAdmin: boolean = (GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin")? true : false;
    userId: string = GlobalUtil.getAppSession("UserInfo").userId;
    showInsightButton: boolean = true;
    showContent: boolean = true;
    contentDefinition: any;

    bodyClass: string = 'panel-body';
    headerClass: string = 'panel-heading';
    insights: IInsights;

    
    ngOnChanges()
    {
        this.insights = this.insightObj;
    }


    showMoreContent(insight: Insight): void {
        this.contentDefinition = insight;
        this.showContent = !this.showContent;;
    }

    onClose(): void {
        this.showContent = !this.showContent;;
        this.contentDefinition = '';
    }

    onEditClick(insight: Insight): void {
        alert('Edit clicked');
    }
}