
import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import * as _ from 'underscore';

import { PaginatorService } from './paginator.service';

@Component({
    moduleId: module.id,
    selector: 'my-paginator',
    templateUrl: 'paginator.component.html',
    providers: [PaginatorService]
})
export class PaginatorComponent {

    @Input() itemList: any;
    pager: any = {}; // pager object
    pagedItems: any[]; // paged items

    constructor(private pagerService: PaginatorService) {
    }

    ngOnChanges() {
        //debugger;
        //var dd = this.itemList;
        this.setPage(1);
    }

    setPage(page: number) {
        /*if (page < 1 || page > this.pager.totalPages) {
            return;
        }*/
        // get pager object from service
        this.pager = this.pagerService.getPager(this.itemList.length, page);
        // get current page of items
        this.pagedItems = this.itemList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
