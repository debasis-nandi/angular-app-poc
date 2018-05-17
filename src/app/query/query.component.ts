
import { AfterViewInit, Component, OnInit, Input, OnChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IQueryModel } from './query.model';
import { GlobalConfig, Page } from '../global/global.config';
import { GlobalUtil } from '../global/global.util';

import { QueryService } from '../query/query.service';
//import { IQueryModel } from '../query/query.model';
import { ModalComponent } from '../widgets/modals/modal.component';
import { ModalDetail } from '../widgets/modals/modal.model';

@Component({
    moduleId: module.id,
    selector: 'my-query',
    templateUrl: 'query.component.html',
    styleUrls: ['query.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class QueryComponent implements OnInit {

    @ViewChild(ModalComponent) _modalComponent: ModalComponent;
    //@Input() modalclasses?: ModalDetail;
    action: string;
    queryData: IQueryModel = {
        tableHead: [],
        kpiData: []
    };
    paginator: boolean = true;
    pageLinks: number = 3;
    rowsPerPage: number = 10;
    rowsPerPageOptions: Array<number> = [5,10];
    responsive: boolean = null;
    styleClass: string = 'ui-datatable table table-hover comp-table';
    title: string;
    
    formName: string = Page.Query;
    queryAction: string;
    loading: boolean = false;
    
    constructor(private route: ActivatedRoute, private router: Router, private queryService: QueryService) {
        this.route.params.subscribe(params => {
            this.action = params["action"];
            this.onClickQuery(this.action);
        });
    }

    ngOnInit() {
        //this.route.params.subscribe(params => { this.action = params["action"] });
        //this.onClickQuery(this.action);
    }

    ngOnChanges() {
        if (this.queryData) {
            if (this.queryData.kpiData.length > this.rowsPerPage)
                this.paginator = true;
        }
    }

    onOpen() {
        this._modalComponent.show();
    }
    onClose() {
        this._modalComponent.hide();
    }

    onClickQuery(action: string) {
        if (action == 'view') {
            var isAdmin = (GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
            var user = isAdmin ? "" : GlobalUtil.getAppSession("UserInfo").email;
            var queryApi: string = GlobalConfig.baseEndpont + GlobalConfig.queryGetApi.replace("{0}", user);
            this.loading = true;
            this.queryService.get(queryApi).subscribe(result => {
                this.queryData = result;
                this.queryAction = action;
                this.title = "My Queries";
                this.loading = false;
                //this.onClickQueryView.onOpen();
            },
                error => {
                    this.loading = false;
                });
        }
        if (action == 'save') {
            this.queryAction = action;
            this.title = "Ask Questions";
            //this.onClickQueryView.onOpen();
        }
    }
}