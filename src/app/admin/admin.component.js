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
var admin_service_1 = require("./admin.service");
var global_config_1 = require('../global/global.config');
var paginator_service_1 = require('../widgets/paginator/paginator.service');
var global_config_2 = require('../global/global.config');
var global_util_1 = require('../global/global.util');
var AdminComponent = (function () {
    function AdminComponent(_adminService, route, pagerService) {
        this._adminService = _adminService;
        this.route = route;
        this.pagerService = pagerService;
        this.BASE_USER_ENDPOINT = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.adminformsApi;
        this.errorMsg = '';
        this.msgs = [];
        this.pager = {};
        this.rowPerPage = global_config_1.GlobalConfig.rowsPerPage;
        this.otherFormsName = '';
        this.model = {};
        this.saveApi = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.querySaveApi;
        this.loading = false;
    }
    ;
    ;
    AdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.otherFormsName != '') {
            this.formname = this.otherFormsName;
            this.formtype = "other";
        }
        else {
            this.route.data.subscribe(function (v) { return _this.data = v; });
            this.formname = this.data.id;
            this.formtype = this.data.formtype;
        }
        this.currentpage = 1;
        this.Initialization();
    };
    AdminComponent.prototype.Initialization = function () {
        var _this = this;
        this._adminService.getForm(this.BASE_USER_ENDPOINT, this.formname).subscribe(function (result) {
            _this.CurrentForm = JSON.parse(result);
            _this.maxcol = Math.floor((12 / _this.CurrentForm.maxCol));
            _this.displayclass = "col-md-" + _this.maxcol + " col-sm-" + _this.maxcol + " col-xs-12";
            if (_this.formtype == "mapping") {
                _this.pagetitle = "Create " + _this.CurrentForm.formName;
                _this.AddButtonText = "Map";
            }
            if (_this.formtype == "manageuser") {
                _this.pagetitle = "Manage and Update Users";
            }
            if (_this.formtype == "master") {
                _this.pagetitle = "Add " + _this.CurrentForm.formName;
                _this.AddButtonText = "Add";
            }
            if (_this.formtype == "adduser") {
                _this.pagetitle = "Add New Users";
                _this.AddButtonText = "Add";
            }
            if (_this.formtype == "other") {
                //this.pagetitle = this.CurrentForm.formName;
                _this.AddButtonText = "Submit";
            }
            _this.parameter = _this.CurrentForm.masterFormMapping;
            _this.searchfield = _this.CurrentForm.searchField;
            _this.dropdowndata = _this.CurrentForm.dropDownData;
            _this.gridRecord = _this.CurrentForm.gridRecord;
            _this.editIndex = -1;
            var index = 0;
            _this.TotalData = [];
            for (var i in _this.gridRecord) {
                _this.iterateData = JSON.parse(result);
                _this.iterateData.gridRecord = null;
                _this.TotalData.push(_this.iterateData);
                var p = new Array();
                var objectKeys = Object.keys;
                var m = 0;
                for (var _i = 0, _a = objectKeys(_this.gridRecord[i]); _i < _a.length; _i++) {
                    var key = _a[_i];
                    var gridkey = _this.gridRecord[i][key];
                    if (_this.TotalData[i].masterFormMapping[m].controlName.toLocaleLowerCase() != 'dropdown' && _this.TotalData[i].masterFormMapping[m].controlName.toLocaleLowerCase() != 'multiselect') {
                        _this.TotalData[i].masterFormMapping[m].defaultSelected = gridkey;
                        _this.TotalData[i].masterFormMapping[m].defaultShowSelected = gridkey;
                        m++;
                    }
                    else {
                        for (var d in _this.TotalData[i].dropDownData) {
                            if (_this.TotalData[i].dropDownData[d].dropDownId == _this.TotalData[i].masterFormMapping[m].formFieldId) {
                                _this.TotalData[i].masterFormMapping[m].defaultSelected = _this.TotalData[i].dropDownData[d].data[_this.gridRecord[i][key]][0];
                                _this.TotalData[i].masterFormMapping[m].defaultShowSelected = _this.TotalData[i].dropDownData[d].data[_this.gridRecord[i][key]][0];
                                m = m + 1;
                                break;
                            }
                        }
                    }
                }
            }
            _this.FilteredData = _this.TotalData;
            _this.totalSize = _this.TotalData.length;
            _this.setPage(_this.currentpage);
        });
        this.setTextBoxValidation();
    };
    AdminComponent.prototype.setTextBoxValidation = function () {
        if (this.formname == 'Query') {
            this.textBoxValidationPattern = "";
        }
        else if (this.formname == 'Restricted Group') {
            this.textBoxValidationPattern = "[A-Za-z0-9$#@'&:\\s-_]*[A-Za-z0-9$#@'&:-_][A-Za-z0-9$#@'&:\\s-_]*";
        }
        else {
            this.textBoxValidationPattern = "[A-Za-z0-9$#@'&:\\s]*[A-Za-z0-9$#@'&:][A-Za-z0-9$#@'&:\\s]*";
        }
    };
    AdminComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.currentpage = page;
        this.editIndex = -1;
        this.pager = this.pagerService.getPager(this.totalSize, page);
        this.FilteredData = this.TotalData.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    AdminComponent.prototype.filter = function () {
        this.FilteredData = this.listFilter ? this.performFilter(this.listFilter) : this.TotalData;
    };
    AdminComponent.prototype.SubmitForm = function (form) {
        var _this = this;
        if (this.otherFormsName == global_config_2.Page.Query) {
            if (this.CurrentForm.masterFormMapping.length > 0) {
                for (var count = 0; count < this.CurrentForm.masterFormMapping.length; count++) {
                    if (this.CurrentForm.masterFormMapping[count].inputField == 'Type') {
                        this.model.type = this.CurrentForm.masterFormMapping[count].defaultSelected;
                    }
                    if (this.CurrentForm.masterFormMapping[count].inputField == 'Title') {
                        this.model.title = this.CurrentForm.masterFormMapping[count].defaultSelected;
                    }
                    if (this.CurrentForm.masterFormMapping[count].inputField == 'Description') {
                        this.model.description = this.CurrentForm.masterFormMapping[count].defaultSelected;
                    }
                }
                this.model.createdBy = global_util_1.GlobalUtil.getAppSession("UserInfo").email;
                // let formData: FormData = new FormData();
                //formData.append('model', JSON.stringify(this.model));
                this.loading = true;
                this._adminService.saveQueryData(this.saveApi, this.model).subscribe(function (result) {
                    _this.showSuccess("Query has been submitted succesfully");
                    _this.Initialization();
                    _this.loading = false;
                }, function (error) {
                    _this.loading = false;
                });
            }
        }
        else {
            this.loading = true;
            this._adminService.saveForm(this.BASE_USER_ENDPOINT, this.CurrentForm).subscribe(function (result) {
                if (JSON.parse(result) == '1') {
                    _this.showSuccess("Data has been submitted successfully");
                    _this.Initialization();
                }
                if (JSON.parse(result) == '-1') {
                    _this.showError("Data already exists");
                    _this.Initialization();
                }
                if (JSON.parse(result) == '3') {
                    _this.showSuccess("Data has been mapped successfully");
                    _this.Initialization();
                }
                _this.loading = false;
            }, function (error) {
                _this.loading = false;
            });
        }
    };
    AdminComponent.prototype.ResetForm = function (form) {
        this.Initialization();
    };
    AdminComponent.prototype.showSuccess = function (message) {
        this.msgs = [];
        this.msgs.push({ severity: 'success', detail: message });
    };
    AdminComponent.prototype.showError = function (message) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: message });
    };
    AdminComponent.prototype.listkeys = function (model) {
        var p = new Array();
        var sortedkeys = new Array();
        var objectKeys = Object.keys;
        sortedkeys = objectKeys(model).sort(function (a, b) { return ((model[a][0].toLocaleLowerCase() > model[b][0].toLocaleLowerCase()) ? 1 : -1); });
        for (var _i = 0, sortedkeys_1 = sortedkeys; _i < sortedkeys_1.length; _i++) {
            var key = sortedkeys_1[_i];
            if (model[key][1] == "1")
                p.push(key);
        }
        return p;
    };
    AdminComponent.prototype.getindex = function (user) {
        this.index = -1;
        var len = user.masterFormMapping.length;
        do {
            this.index = this.index + 1;
            len = len - 1;
        } while (len > 0 && user.masterFormMapping[this.index].inputField != this.searchfield);
        if (len < 0)
            return -1;
        return (this.index);
    };
    AdminComponent.prototype.performFilter = function (filterBy) {
        var search_parameter_index = this.getindex(this.CurrentForm);
        if (search_parameter_index >= 0) {
            filterBy = filterBy.toLocaleLowerCase();
            return this.TotalData.filter(function (user) {
                return user.masterFormMapping[search_parameter_index].defaultSelected.toLocaleLowerCase().indexOf(filterBy) !== -1;
            });
        }
    };
    AdminComponent.prototype.getKeyByValue = function (object, value) {
        return Object.keys(object).find(function (key) { return object[key][0] === value; });
    };
    AdminComponent.prototype.saveData = function (user) {
        var _this = this;
        for (var p in user.masterFormMapping) {
            var param = user.masterFormMapping[p];
            if (param.controlName.toLocaleLowerCase() == 'dropdown' || param.controlName.toLocaleLowerCase() == 'multiselect') {
                for (var d in user.dropDownData) {
                    if (user.dropDownData[d].dropDownId == param.formFieldId) {
                        param.defaultSelected = this.getKeyByValue(user.dropDownData[d].data, param.defaultSelected);
                    }
                }
            }
            if (param.controlName.toLocaleLowerCase() == 'nocontrol') {
                this.updateid = param.defaultSelected;
            }
        }
        this.loading = true;
        this._adminService.updateForm(this.BASE_USER_ENDPOINT, user, this.updateid).subscribe(function (result) {
            var a = result;
            if (JSON.parse(result) == '1') {
                _this.Initialization();
            }
            else {
                _this.showError("Data already exist");
                _this.Initialization();
            }
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    AdminComponent.prototype.onSelect = function (i) {
        for (var fieldindex in this.FilteredData[i].masterFormMapping)
            this.FilteredData[i].masterFormMapping[fieldindex].defaultSelected = this.FilteredData[i].masterFormMapping[fieldindex].defaultShowSelected;
        this.editIndex = i;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AdminComponent.prototype, "otherFormsName", void 0);
    AdminComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'admin.component.html',
            selector: 'my-admin',
            styles: [" #query-p-growl .ui-growl { position: absolute !important; } "],
            providers: [paginator_service_1.PaginatorService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [admin_service_1.AdminService, router_1.ActivatedRoute, paginator_service_1.PaginatorService])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map