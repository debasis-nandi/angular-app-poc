
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalUtil } from '../../global/global.util';
import { GlobalConfig } from '../../global/global.config';
import { Page } from '../../global/global.config';
import { PaginatorService } from '../paginator/paginator.service';

@Component({
    moduleId: module.id,
    selector: 'my-chart-template',
    templateUrl: 'chart-template.component.html',
    providers: [PaginatorService]
})
export class ChartTemplateComponent implements OnInit {

    @Input() chartItems: any;
    @Input() searchResultFor: string;
    @Input() totalSize: number;
    @Input() type: string;
    
    pager: any = {};
    pagedItems: any[];
    rowPerPage: number = GlobalConfig.rowsPerPage;
    
    constructor(private router: Router, private pagerService: PaginatorService) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.setPage(1, true);
    }

    onRedirect(pageName: string, Id: any, chartYear: number, companyName: string) {
        //debugger;
        if (pageName) {
            
            GlobalUtil.setSession("ChartYear", chartYear != 0 ? chartYear.toString() : "");

            if (pageName == Page.ciFinancials) {
                GlobalUtil.setSession("CompanyName", companyName);
                GlobalUtil.setSession("CompetitorId", Id);
                this.router.navigate(['layout/majoragroandseeds/masfinancials']);
            }
            if (pageName == Page.ciFinancialsRatio) {
                GlobalUtil.setSession("CompanyName", companyName);
                GlobalUtil.setSession("CompetitorId", Id);
                this.router.navigate(['layout/majoragroandseeds/masfinancialsratio']);
            }
            if (pageName == Page.competitorComparison) {
                GlobalUtil.setSession("CompanyName", companyName);
                GlobalUtil.setSession("CompetitorId", Id);
                this.router.navigate(['layout/competitorcomparison']);
            }
            if (pageName == Page.cropIndicatorOverview) {
                GlobalUtil.setSession("CropName", companyName);
                GlobalUtil.setSession("CropId", Id);
                this.router.navigate(['layout/agribusinessoverview/cropoverview']);
            }
            if (pageName == Page.cropIndicatorUSPrice) {
                GlobalUtil.setSession("CropName", companyName);
                GlobalUtil.setSession("CropId", Id);
                this.router.navigate(['layout/agribusinessoverview/cropprice']);
            }
            if (pageName == Page.biofuels) {
                this.router.navigate(['layout/biofuels']);
            }
            if (pageName == Page.macroeconomicsIndicators) {
                this.router.navigate(['layout/economicindicators']);
            }
            if (pageName == Page.macroeconomicsCurrencyBasket) {
                this.router.navigate(['layout/currencybasket']);
            }
            if (pageName == Page.agribusinessOverview) {
                this.router.navigate(['layout/agribusinessoverview']);
            }
        }
    }
    
    setPage(page: number, isFirstLoad: boolean) {
        //debugger;
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.totalSize, page);
        // get current page of items
        if (isFirstLoad) {
            this.pagedItems = this.chartItems;
        }
        else
        {
            var pagingUrl = GlobalConfig.baseElasticEndPoint + GlobalConfig.elasticTypeWiseSearchEndpoint
                .replace("{0}", this.searchResultFor)
                .replace("{1}", this.type)
                .replace("{2}", GlobalConfig.rowsPerPage.toString())
                .replace("{3}", page.toString());
            this.pagerService.get(pagingUrl).subscribe(resItems => {
                if (resItems) {
                    this.pagedItems = resItems.elasticResponseData[0].data;
                }
            });;
        }

        //this.pagedItems = this.chartItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

}