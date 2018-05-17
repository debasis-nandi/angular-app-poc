
import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

import { GlobalConfig } from '../global/global.config';
import { GlobalUtil } from '../global/global.util';
import { SearchModel } from './search.model';
import { SearchService } from './search.service';

@Component({
    moduleId: module.id,
    selector: 'my-search',
    templateUrl: 'search.component.html',
    providers: [SearchService]
})

export class SearchComponent implements OnInit {

    searchItems: SearchModel;
    searchResultFor: string;
    isUnifiedSearch: boolean = false;
    sub: any;
    pageSize: number = GlobalConfig.rowsPerPage;
    searchEndPoint: string = GlobalConfig.baseElasticEndPoint + GlobalConfig.elasticUnifiedSearchEndpoint;
    fileSearchEndPoint: string = GlobalConfig.baseElasticEndPoint + GlobalConfig.elasticUnifiedfileSearchEndpoint;
    loading: boolean = false;

    constructor(private searchService: SearchService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.searchResultFor = params['para'];
            if (this.searchResultFor != undefined) {
                this.isUnifiedSearch = false;
                var searchUrl = this.searchEndPoint.replace("{0}", this.searchResultFor).replace("{1}", this.pageSize.toString());
                this.getSearchItems(searchUrl);
            }
            else {
                this.isUnifiedSearch = true;
                this.searchResultFor = params['filepara'];
                var searchUrl = this.fileSearchEndPoint.replace("{0}", this.searchResultFor);
                this.getSearchItems(searchUrl);
                this.searchResultFor = "";
            }
        });
    }

    public ngOnChanges() {
    }
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public getSearchItems(searchUrl: string): void {
        this.loading = true;
        //searchUrl = "./app/search/search.json";
        this.searchService.get(searchUrl)
            .subscribe(resItems => {
                this.searchItems = resItems;
                this.loading = false;
            },
            error => {
                this.loading = false;
            });
    }
    
}