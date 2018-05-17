
import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/filter";

import { IBreadcrumb } from './breadcrumb.model';
import { BreadCrumbService } from './breadcrumb.service';

@Component({
    moduleId: module.id,
    selector: 'my-breadcrumb',
    templateUrl: 'breadcrumb.component.html',
    providers: [BreadCrumbService]
})

export class BreadcrumbComponent implements OnInit {
    
    public breadcrumbs: IBreadcrumb[] = [];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private breadcrumbService: BreadCrumbService
    ) { }

    ngOnInit() {
        this.router.events.subscribe(event => {
            this.breadcrumbs = [];
            var currentPath = this.router.url;
            this.breadcrumbs = this.breadcrumbService.getBreadcrumbsLink(currentPath);
        })
       
    }
    
}

