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
var global_util_1 = require('../../global/global.util');
var authorise_service_1 = require('./authorise.service');
var AuthoriseComponent = (function () {
    function AuthoriseComponent(authoriseService) {
        this.authoriseService = authoriseService;
        //isAdmin: boolean = true;
        this.isPortalAdmin = global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" ? true : false;
        this.loading = false;
        this.isUpdateDisable = true;
        this.tIdSuggestions = [];
        this.filteredTIds = [];
        this.model = { tId: '', roleId: 0, regionId: 0, firstName: '', lastName: '', emailId: '', restrictedGroup: [] };
        this.styleClass = 'ui-datatable table table-hover comp-table wrapOff';
        this.statusClass = {
            green1: true,
            mandatory: false
        };
        this.regionVisible = false;
    }
    AuthoriseComponent.prototype.ngOnInit = function () {
        this.loading = true;
        //console.log(GlobalUtil.getAppSession("UserInfo").roles[0]);
        //this.isAdmin = GlobalUtil.getAppSession("UserInfo").roles[0] == "Administrator" ? true : false;
        this.getPageData();
    };
    AuthoriseComponent.prototype.getPageData = function () {
        var _this = this;
        this.authoriseService.getPageData().subscribe(function (result) {
            _this.roleData = result["roleData"];
            _this.regionData = result["regionData"];
            if (_this.isPortalAdmin == false) {
                _this.roleData = _this.roleData.filter(function (x) { return x.roleName != "Portal Admin"; });
            }
            _this.completeData = result["completeData"];
            //this.tIdSuggestions = this.completeData["tId"];
            _this.tIdSuggestions = _this.completeData.map(function (a) { return a.tId; });
            _this.gridData = result["gridData"];
            _this.restrictedGroupList = result["restrictedGroupList"];
            _this.loading = false;
        });
    };
    AuthoriseComponent.prototype.filterTIds = function (event) {
        this.filteredTIds = [];
        for (var i = 0; i < this.tIdSuggestions.length; i++) {
            var ID = this.tIdSuggestions[i];
            if (ID.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredTIds.push(ID);
            }
        }
        if (this.filteredTIds.length == 0) {
            this.isUpdateDisable = true;
            this.regionVisible = false;
        }
        else {
        }
    };
    AuthoriseComponent.prototype.ontIdchange = function (event) {
        this.isUpdateDisable = false;
        var filterData = this.completeData.filter(function (x) { return x["tId"] == event; })[0];
        this.model.roleId = +filterData["roleId"];
        if (!this.isPortalAdmin) {
            if (this.model.roleId == 1) {
                this.model.roleId = 2;
            }
        }
        this.model.firstName = filterData["firstName"];
        this.model.lastName = filterData["lastName"];
        this.model.emailId = filterData["userName"];
        if (this.model.roleId == 3) {
            this.regionVisible = true;
            this.model.regionId = filterData["regionId"];
        }
        else {
            this.regionVisible = false;
        }
        if (filterData["groupId"]) {
            var restrictedGroup = filterData["groupId"].split(',');
            this.model.restrictedGroup = restrictedGroup;
        }
        else {
            this.model.restrictedGroup = null;
        }
    };
    AuthoriseComponent.prototype.onRoleChange = function (event) {
        if (event == 3) {
            this.regionVisible = true;
            this.model.regionId = this.regionData[0]["regionId"];
        }
        else
            this.regionVisible = false;
    };
    AuthoriseComponent.prototype.Update = function () {
        var _this = this;
        this.loading = true;
        if (this.model.roleId != 3) {
            this.model.regionId = 0;
        }
        this.authoriseService.updateUser(this.model).subscribe(function (x) {
            _this.statusDesc = x;
            if (_this.statusDesc.indexOf('exist') > -1) {
                _this.statusClass = {
                    green1: false,
                    mandatory: true
                };
            }
            else {
                _this.statusClass = {
                    green1: true,
                    mandatory: false
                };
            }
            setTimeout(function () {
                _this.statusDesc = "";
            }, 3000);
            _this.authoriseService.getPageData().subscribe(function (result) {
                _this.completeData = result["completeData"];
                _this.tIdSuggestions = _this.completeData.map(function (a) { return a.tId; });
                _this.gridData = result["gridData"];
            });
            _this.Reset();
            _this.loading = false;
        }, function (error) { return _this.errorTermMsg = error; });
    };
    AuthoriseComponent.prototype.Reset = function () {
        this.model = { tId: '', roleId: 0, regionId: 0, firstName: '', lastName: '', emailId: '', restrictedGroup: [] };
        this.isUpdateDisable = true;
        this.regionVisible = false;
        this.filteredTIds = [];
    };
    AuthoriseComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'authorise.component.html',
            styleUrls: ['authorise.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [authorise_service_1.AuthoriseService])
    ], AuthoriseComponent);
    return AuthoriseComponent;
}());
exports.AuthoriseComponent = AuthoriseComponent;
//# sourceMappingURL=authorise.component.js.map