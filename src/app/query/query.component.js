"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var global_config_1 = require('../global/global.config');
var global_util_1 = require('../global/global.util');
var query_service_1 = require('../query/query.service');
//import { IQueryModel } from '../query/query.model';
var modal_component_1 = require('../widgets/modals/modal.component');
var QueryComponent = (function () {
    function QueryComponent(route, router, queryService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.queryService = queryService;
        this.queryData = {
            tableHead: [],
            kpiData: []
        };
        this.paginator = true;
        this.pageLinks = 3;
        this.rowsPerPage = 10;
        this.rowsPerPageOptions = [5, 10];
        this.responsive = null;
        this.styleClass = 'ui-datatable table table-hover comp-table';
        this.formName = global_config_1.Page.Query;
        this.loading = false;
        this.route.params.subscribe(function (params) {
            _this.action = params["action"];
            _this.onClickQuery(_this.action);
        });
    }
    QueryComponent.prototype.ngOnInit = function () {
        //this.route.params.subscribe(params => { this.action = params["action"] });
        //this.onClickQuery(this.action);
    };
    QueryComponent.prototype.ngOnChanges = function () {
        if (this.queryData) {
            if (this.queryData.kpiData.length > this.rowsPerPage)
                this.paginator = true;
        }
    };
    QueryComponent.prototype.onOpen = function () {
        this._modalComponent.show();
    };
    QueryComponent.prototype.onClose = function () {
        this._modalComponent.hide();
    };
    QueryComponent.prototype.onClickQuery = function (action) {
        var _this = this;
        if (action == 'view') {
            var isAdmin = (global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
            var user = isAdmin ? "" : global_util_1.GlobalUtil.getAppSession("UserInfo").email;
            var queryApi = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.queryGetApi.replace("{0}", user);
            this.loading = true;
            this.queryService.get(queryApi).subscribe(function (result) {
                _this.queryData = result;
                _this.queryAction = action;
                _this.title = "My Queries";
                _this.loading = false;
                //this.onClickQueryView.onOpen();
            }, function (error) {
                _this.loading = false;
            });
        }
        if (action == 'save') {
            this.queryAction = action;
            this.title = "Ask Questions";
        }
    };
    __decorate([
        core_1.ViewChild(modal_component_1.ModalComponent), 
        __metadata('design:type', modal_component_1.ModalComponent)
    ], QueryComponent.prototype, "_modalComponent", void 0);
    QueryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-query',
            templateUrl: 'query.component.html',
            styleUrls: ['query.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, query_service_1.QueryService])
    ], QueryComponent);
    return QueryComponent;
}());
exports.QueryComponent = QueryComponent;
//# sourceMappingURL=query.component.js.map