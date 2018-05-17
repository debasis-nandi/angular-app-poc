
import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { KmSearchService } from './km-search-upload.service';
import { KmSearchUploadModel } from './km-search-upload.model';
import { GlobalConfig } from '../global/global.config';
import { SearchModel } from '../search/search.model';
import { GlobalUtil } from '../global/global.util';

@Component({
    moduleId: module.id,
    selector: 'my-km-search',
    templateUrl: 'km-search.component.html',
    providers: [KmSearchService]
})

export class KmSearchComponent implements OnInit {

    //kmSearchEndPoint: string = GlobalConfig.baseEndpont + GlobalConfig.kmSearchApi;
    KMRequest: KmSearchUploadModel = {};
    KMSearchEndPoint: string = GlobalConfig.baseElasticEndPoint + GlobalConfig.elasticKMSearchEndpoint;
    searchResultFor: string;
    pageSize: number;
    searchItems: SearchModel = null;
    isAdmin: boolean = false;
    loading: boolean = false;

    constructor(private kmSearchService: KmSearchService) {
    }

    ngOnInit() {
        this.isAdmin = (GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
    }

    onSearchEmit(inputModel: KmSearchUploadModel) {
        
        if (inputModel.isReset) {
            this.searchItems = null;
        }
        else {
            this.KMRequest.keyword = inputModel.keyword;
            this.KMRequest.docModules = inputModel.docModules;
            this.KMRequest.docRegions = inputModel.docRegions;
            this.KMRequest.docCountries = inputModel.docCountries;
            this.KMRequest.docCompetitors = inputModel.docCompetitors;
            this.KMRequest.uploadby = inputModel.uploadby;
            this.KMRequest.uploadedDateTime = inputModel.uploadedDateTime;
            this.KMRequest.publicationDate = inputModel.publicationDate;
            this.KMRequest.docType = inputModel.docType;
            this.KMRequest.docRestrictedGroup = inputModel.docRestrictedGroup;
            this.KMRequest.docTypeList = inputModel.documentTypeList;

            var kmPageSize: number = GlobalConfig.rowsPerPage;
            var kmSearchEndPoint = this.KMSearchEndPoint.replace("{0}", kmPageSize.toString()).replace("{1}", "1");
            this.loading = true;
            this.kmSearchService.post(kmSearchEndPoint, this.KMRequest)
                .subscribe(resItems => {
                    //debugger;
                    this.searchItems = resItems;
                    this.pageSize = kmPageSize;

                    setTimeout(function () {
                        document.getElementById('content').scrollIntoView();
                    }, 200);

                    this.loading = false;
                },
                error => {
                    this.loading = false;
                });
        }

    }
    
}
