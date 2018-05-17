import { Component, OnInit, Input, ViewChild, NgModule, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MasterForm } from './admin';
import { masterFormMapping } from './admin';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService } from "./admin.service";
import { dropDownData } from './admin';
import { Datas } from './admin';
import { gridData } from './admin';
import { GlobalConfig } from '../global/global.config';
import { Message } from 'primeng/primeng';
import { PaginatorService } from '../widgets/paginator/paginator.service';
import { Page } from '../global/global.config';
import { IQuery } from './admin';
import { GlobalUtil } from '../global/global.util';

@Component({
    moduleId: module.id,
    templateUrl: 'admin.component.html',
    selector: 'my-admin',
    styles: [` #query-p-growl .ui-growl { position: absolute !important; } `],
    providers: [PaginatorService],
    encapsulation: ViewEncapsulation.None
})

export class AdminComponent {
    BASE_USER_ENDPOINT: string= GlobalConfig.baseEndpont + GlobalConfig.adminformsApi;;
    data: any;
    value: any;
    formname: any;
    formtype: any;
    pagetitle: string;
    AddButtonText: any;
    updateid: number;
    displayclass: string;
    maxcol: any;
    TotalData: MasterForm[];
    iterateData: MasterForm;
    FilteredData: MasterForm[];
    CurrentForm: MasterForm;
    parameter: masterFormMapping[];
    dropdowndata: dropDownData[];
    gridRecord: gridData[];
    errorMsg: string = '';
    searchfield: string;
    index: number;
    editIndex: number;
    key: string[];
    listFilter: any;
    msgs: Message[] = [];
    pager: any = {};
    rowPerPage: number = GlobalConfig.rowsPerPage;
    totalSize: number;
    currentpage: number;
    @Input() otherFormsName: string = '';

    model: IQuery = {};
    saveApi = GlobalConfig.baseEndpont + GlobalConfig.querySaveApi;
    textBoxValidationPattern: string;
    loading: boolean = false;

    constructor(private _adminService: AdminService, private route: ActivatedRoute,private pagerService: PaginatorService) {
    };

    ngOnInit(): void {
        if (this.otherFormsName != '')
        {
            this.formname = this.otherFormsName;
            this.formtype = "other";
        }
        else
        {
            this.route.data.subscribe(v => this.data = v);
            this.formname = this.data.id;
            this.formtype = this.data.formtype;
        }
        
        this.currentpage = 1;
        this.Initialization();


    }

    Initialization(): void {
        this._adminService.getForm(this.BASE_USER_ENDPOINT, this.formname).subscribe((result: any) => {
            this.CurrentForm = JSON.parse(result);
            this.maxcol = Math.floor((12 / this.CurrentForm.maxCol));
            this.displayclass = "col-md-" + this.maxcol + " col-sm-" + this.maxcol + " col-xs-12";
            if (this.formtype == "mapping") {
                this.pagetitle = "Create " + this.CurrentForm.formName;
                this.AddButtonText = "Map";
            }
            if (this.formtype == "manageuser") {
                this.pagetitle = "Manage and Update Users";
            }
            if (this.formtype == "master") {
                this.pagetitle = "Add " + this.CurrentForm.formName;
                this.AddButtonText = "Add";
            }
            if (this.formtype == "adduser") {
                this.pagetitle = "Add New Users";
                this.AddButtonText = "Add";
            }
            if (this.formtype == "other") {
                //this.pagetitle = this.CurrentForm.formName;
                this.AddButtonText = "Submit";
            }
            this.parameter = this.CurrentForm.masterFormMapping;

            this.searchfield = this.CurrentForm.searchField;
            this.dropdowndata = this.CurrentForm.dropDownData;
            this.gridRecord = this.CurrentForm.gridRecord;
            this.editIndex = -1;
            let index: number = 0;
            this.TotalData = [];
            for (let i in this.gridRecord) {
                this.iterateData = JSON.parse(result);
                this.iterateData.gridRecord = null;
                this.TotalData.push(this.iterateData);
                let p: string[] = new Array();
                var objectKeys = Object.keys;
                let m: number = 0;
                for (let key of objectKeys(this.gridRecord[i])) {
                    var gridkey = this.gridRecord[i][key];
                    if (this.TotalData[i].masterFormMapping[m].controlName.toLocaleLowerCase() != 'dropdown' && this.TotalData[i].masterFormMapping[m].controlName.toLocaleLowerCase() != 'multiselect') {
                        this.TotalData[i].masterFormMapping[m].defaultSelected = gridkey;
                        this.TotalData[i].masterFormMapping[m].defaultShowSelected = gridkey;
                        m++;

                    }
                    else {

                        for (let d in this.TotalData[i].dropDownData) {


                            if (this.TotalData[i].dropDownData[d].dropDownId == this.TotalData[i].masterFormMapping[m].formFieldId) {

                                this.TotalData[i].masterFormMapping[m].defaultSelected = this.TotalData[i].dropDownData[d].data[this.gridRecord[i][key]][0];
                                this.TotalData[i].masterFormMapping[m].defaultShowSelected = this.TotalData[i].dropDownData[d].data[this.gridRecord[i][key]][0];
                                m = m + 1;
                                break;
                            }
                        }
                    }


                }

            }
            this.FilteredData = this.TotalData;
            this.totalSize = this.TotalData.length;
            this.setPage(this.currentpage);

        });

        this.setTextBoxValidation();
    }

    setTextBoxValidation() {
        if (this.formname == 'Query') {
            this.textBoxValidationPattern = "";
        }
        else if (this.formname == 'Restricted Group') {
            this.textBoxValidationPattern = "[A-Za-z0-9$#@'&:\\s-_]*[A-Za-z0-9$#@'&:-_][A-Za-z0-9$#@'&:\\s-_]*";
        }
        else {
            this.textBoxValidationPattern = "[A-Za-z0-9$#@'&:\\s]*[A-Za-z0-9$#@'&:][A-Za-z0-9$#@'&:\\s]*";
        }
    }

    setPage(page: number): void {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.currentpage = page;
        this.editIndex = -1;
        this.pager = this.pagerService.getPager(this.totalSize, page);
        this.FilteredData = this.TotalData.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }


    filter(): void {
        this.FilteredData = this.listFilter ? this.performFilter(this.listFilter) : this.TotalData;
    }




    SubmitForm(form: NgForm): void {
        if (this.otherFormsName == Page.Query) {
            
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
                this.model.createdBy = GlobalUtil.getAppSession("UserInfo").email;

               // let formData: FormData = new FormData();
                //formData.append('model', JSON.stringify(this.model));
                this.loading = true;
                this._adminService.saveQueryData(this.saveApi, this.model).subscribe(result => {
                    this.showSuccess("Query has been submitted succesfully");
                    this.Initialization();
                    this.loading = false;
                },
                    error => {
                        this.loading = false;
                    });
            }
        }
        else {
            this.loading = true;
            this._adminService.saveForm(this.BASE_USER_ENDPOINT, this.CurrentForm).subscribe((result: any) => {
                if (JSON.parse(result) == '1') {
                    this.showSuccess("Data has been submitted successfully");
                    this.Initialization();

                }
                if (JSON.parse(result) == '-1') {
                    this.showError("Data already exists");
                    this.Initialization();


                }
                if (JSON.parse(result) == '3') {
                    this.showSuccess("Data has been mapped successfully");
                    this.Initialization();
                }
                this.loading = false;
            },
                error => {
                    this.loading = false;
                });
        }
    }

    ResetForm(form: NgForm): void {
        this.Initialization();
    }

    showSuccess(message: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'success',detail: message });
    }

    showError(message: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'error',  detail: message });
    }

    listkeys(model: Datas): string[] {
        let p: string[] = new Array();
        let sortedkeys: string[] = new Array();
        var objectKeys = Object.keys;
        sortedkeys=objectKeys(model).sort((a, b) => ((model[a][0].toLocaleLowerCase() > model[b][0].toLocaleLowerCase())?1:-1));
        for (let key of sortedkeys) {
            if (model[key][1]=="1")
            p.push(key);
        }
        return p;

    }

    getindex(user: MasterForm): number {
        this.index = -1;
        var len = user.masterFormMapping.length;
        do {
            this.index = this.index + 1;
            len = len - 1;
        }
        while (len > 0 && user.masterFormMapping[this.index].inputField != this.searchfield);
        if (len < 0)
            return -1;
        return (this.index);
    }

    performFilter(filterBy: string): MasterForm[] {
        var search_parameter_index = this.getindex(this.CurrentForm);
        if (search_parameter_index >= 0) {
            filterBy = filterBy.toLocaleLowerCase();
            return this.TotalData.filter((user: MasterForm) =>
                user.masterFormMapping[search_parameter_index].defaultSelected.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }
    }


    getKeyByValue(object: any, value: any) {
        return Object.keys(object).find(key => object[key][0] === value);
    }

    saveData(user: MasterForm): void {
        for (let p in user.masterFormMapping) {
            var param = user.masterFormMapping[p];

            if (param.controlName.toLocaleLowerCase() == 'dropdown' || param.controlName.toLocaleLowerCase() == 'multiselect') {
                for (let d in user.dropDownData) {
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
        this._adminService.updateForm(this.BASE_USER_ENDPOINT, user, this.updateid).subscribe((result: any) => {
            var a = result;
            if (JSON.parse(result) == '1') {
                this.Initialization();
            }
            else {
                this.showError("Data already exist");
                this.Initialization();
            }
            this.loading = false;
        },
            error => {
                this.loading = false;
            });

    }

    onSelect(i: number): void {
        for (var fieldindex in this.FilteredData[i].masterFormMapping)
            this.FilteredData[i].masterFormMapping[fieldindex].defaultSelected = this.FilteredData[i].masterFormMapping[fieldindex].defaultShowSelected;
        this.editIndex = i;
    }


}
