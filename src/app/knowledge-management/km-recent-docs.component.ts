
import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { KmSearchService } from './km-search-upload.service';
import { KmSearchUploadModel } from './km-search-upload.model';
import { GlobalConfig } from '../global/global.config';
import { SearchModel } from '../search/search.model';
import { GlobalUtil } from '../global/global.util';

@Component({
    moduleId: module.id,
    selector: 'my-km-recent-docs',
    templateUrl: 'km-recent-docs.component.html',
    providers: [KmSearchService]
})

export class KmRecentDocsComponent implements OnInit {

    //kmSearchEndPoint: string = GlobalConfig.baseEndpont + GlobalConfig.kmSearchApi;
    KMRequest: KmSearchUploadModel;
    KMSearchEndPoint: string = GlobalConfig.baseEndpont + GlobalConfig.getRecentUploadedDocs;
    searchResultFor: string;
    pageSize: number;
    searchItems: SearchModel = null;
    searchItems1: any = null;
    isAdmin: boolean = false;
    loading: boolean = false;

    constructor(private kmSearchService: KmSearchService) {
    }

    ngOnInit() {
        this.isAdmin = (GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
        this.getRecent();

    }
    loadFirstPage() {
        let pagination = document.getElementsByClassName('pagination')[0];
        if (pagination) {
            let active = pagination.getElementsByClassName('active')[0];
            if (active) {
                let k = active.getElementsByTagName('a')[0];
                if (k) k.click();
            }
        }
    }
    getRecent() {
        this.loading = true;
        this.KMRequest = {};
        this.kmSearchService.getRecentDocs(this.KMSearchEndPoint)
            .subscribe(resItems => {
                let docs = JSON.parse(resItems);
                for (let i = 0; i < docs.length; i++) {
                    docs[i]["DocModules"] = JSON.parse(docs[i]["DocModules"]);
                    docs[i]["DocRegions"] = JSON.parse(docs[i]["DocRegions"]);
                    docs[i]["DocCompetitors"] = JSON.parse(docs[i]["DocCompetitors"]);
                    docs[i]["DocCountries"] = JSON.parse(docs[i]["DocCountries"]);
                    docs[i]["DocRestrictedGroup"] = JSON.parse(docs[i]["DocRestrictedGroup"]);
                }
                this.searchItems1 = {
                    "elasticResponseData": [
                        {
                            "type": "knowledgemanagement",
                            "templateType": "other",
                            "typeName": "Knowledge Management",
                            "count": docs.length,
                            "data": docs
                        }
                    ]
                }
                setTimeout(() => this.loadFirstPage(), 2000);
                this.loading = false;
            },
            error => {
                this.loading = false;
            });
    }
}
