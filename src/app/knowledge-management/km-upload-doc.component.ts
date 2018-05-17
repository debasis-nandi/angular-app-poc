
import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { GlobalUtil } from '../global/global.util';

@Component({
    moduleId: module.id,
    selector: 'my-km-upload-doc',
    templateUrl: 'km-upload-doc.component.html'
})

export class KmUploadDocComponent implements OnInit {
    isAdmin: boolean = false;
    constructor() {
    }

    ngOnInit() {
        this.isAdmin = (GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
    }
    
}
