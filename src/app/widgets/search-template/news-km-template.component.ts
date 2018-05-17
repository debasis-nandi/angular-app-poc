
import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DocType, GlobalConfig } from '../../global/global.config';
import { PaginatorService } from '../paginator/paginator.service';
import { KmSearchUploadModel } from '../../knowledge-management/km-search-upload.model';
import { GlobalUtil } from '../../global/global.util';
import { IUserGroup } from '../../login/login';

declare var readmore: any;

@Component({
    moduleId: module.id,
    selector: 'my-news-km-template',
    templateUrl: 'news-km-template.component.html',
    providers: [PaginatorService]
})
export class NewsKmTemplateComponent implements OnInit {

    @Input() newsKmItems: any;
    @Input() searchResultFor: string;
    @Input() totalSize: number;
    @Input() type: string;
    @Input() typeName: string;
    @Input() dataIndex: number;
    @Input() isKMSearchComponent: boolean = false;
    @Input() showCustomPaging: boolean = false;
    @Input() KMRequest: KmSearchUploadModel;

    pager: any = {};
    pagedItems: any[];
    monthNames: any = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    rowPerPage: number = GlobalConfig.rowsPerPage;

    maxCharLimit: number = GlobalConfig.maxCharLimit;
    hideToggle: boolean = true;
    isCollapsed: boolean = true;
    docpath: string = GlobalConfig.docdownloadlink;
    isAdmin: boolean = (GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
    userGroup: IUserGroup[] = GlobalUtil.getAppSession("UserInfo").userGroup;
    
    constructor(private pagerService: PaginatorService, private router: Router) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.setPage(1, true);
    }

    getDay(date: Date): any {
        if (date) {
            var dateObj = new Date(date);
            return dateObj.getDate();
        }
    }

    getMonthYear(date: Date): any {
        if (date) {
            var dateObj = new Date(date);
            var month = this.monthNames[dateObj.getMonth()]
            var year = dateObj.getFullYear().toString();
            return month + ' ' + year;
        }
    }

    getDocType(fileName: string): string {
        //debugger;
        var fileType = GlobalUtil.getFileExtension(fileName);
        var docType = "";

        if (fileType)
        {   
            switch (fileType.toLowerCase()) {
                case DocType.doc:
                case DocType.docx: {
                    docType = "fa fa-file-word-o green2 size20 marginR5";
                    break;
                }
                case DocType.xls:
                case DocType.xlsx: {
                    docType = "fa fa-file-excel-o green2 size20 marginR5";
                    break;
                }
                case DocType.pdf: {
                    docType = "fa fa-file-pdf-o green2 size20 marginR5";
                    break;
                }
                case DocType.ppt:
                case DocType.pptx: {
                    docType = "fa fa-file-powerpoint-o green2 size20 marginR5";
                    break;
                }
                case DocType.csv: {
                    docType = "fa fa-file-text-o green2 size20 marginR5";
                    break;
                }
                case DocType.png:
                case DocType.jpg:
                case DocType.jpeg:
                case DocType.gif:{
                    docType = "fa fa-file-image-o green2 size20 marginR5";
                    break;
                }
                case DocType.msg: {
                    docType = "fa fa-envelope-o green2 size20 marginR5";
                    break;
                }
                case DocType.txt: {
                    docType = "fa fa-file-text-o green2 size20 marginR5";
                    break;
                }
                default: {
                    docType = "fa fa-file-word-o green2 size20 marginR5"; 
                    break;
                } 
            }
        }

        return docType;
    }

    getDownloadPath(fileUniqueName: string, fileOriginalName: string, restrictedGroup: any[] = null) {
        var isAllowed = true;
        if (restrictedGroup && restrictedGroup.length > 0) {
            var isAdmin = (GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
            if (!isAdmin) {
                var userGroup: IUserGroup[] = GlobalUtil.getAppSession("UserInfo").userGroup;
                if (userGroup && userGroup.length > 0) {
                    for (var count = 0; count < restrictedGroup.length; count++) {
                        var isExist = userGroup.filter(x => x.groupName == restrictedGroup[count]).length > 0 ? true : false;
                        if (isExist) {
                            isAllowed = true;
                            break;
                        }
                        else {
                            isAllowed = false;
                        }
                    }
                }
                else {
                    isAllowed = false; // user not map with any restricted group
                }
            }
        }

        if (isAllowed) {
            var a = window.document.createElement("a");
            a.href = GlobalConfig.baseEndpont + GlobalConfig.kmSaveDownloadDocApi + "?FileUniqueName=" + fileUniqueName + "&FileOriginalName=" + fileOriginalName;
            a.download = fileOriginalName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        else {
            alert("Access Restricted!\nPlease write an email to the GlobalBI.AgriInsider@syngenta.com to receive this file.");
            
        }

    }
    
    setPage(page: number, isFirstLoad: boolean) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
       
        // get pager object from service
        this.pager = this.pagerService.getPager(this.totalSize, page);
        // get current page of items
        if (isFirstLoad) {
            this.pagedItems = this.newsKmItems;
            this.pagedItems = this.pagedItems.filter(x => {
                if (x['DocRestrictedGroup'] != null && x['DocRestrictedGroup'].length > 0) {
                    if (this.userGroup != null) {
                        if (this.userGroup.some(r => x['DocRestrictedGroup'].indexOf(r["groupName"]) > -1)) {
                            return x;
                        }
                    }
                } else {
                    return x;
                }
            });
        }
        else {
            if (this.isKMSearchComponent) {
                var pagingUrl = GlobalConfig.baseElasticEndPoint + GlobalConfig.elasticKMSearchEndpoint
                    .replace("{0}", GlobalConfig.rowsPerPage.toString())
                    .replace("{1}", page.toString())
                    .replace("{2}", this.typeName);
                this.pagerService.post(pagingUrl, this.KMRequest)
                    .subscribe(resItems => {
                        this.pagedItems = resItems.elasticResponseData[0].data;
                        this.pagedItems = this.pagedItems.filter(x => {
                            if (x['DocRestrictedGroup'] != null && x['DocRestrictedGroup'].length > 0) {
                                if (this.userGroup != null) {
                                    if (this.userGroup.some(r => x['DocRestrictedGroup'].indexOf(r["groupName"]) > -1)) {
                                        return x;
                                    }
                                }
                            } else {
                                return x;
                            }
                        });
                    });
            }
            else {
                var pagingUrl = GlobalConfig.baseElasticEndPoint + GlobalConfig.elasticTypeWiseSearchEndpoint
                    .replace("{0}", this.searchResultFor)
                    .replace("{1}", this.type)
                    .replace("{2}", GlobalConfig.rowsPerPage.toString())
                    .replace("{3}", page.toString());
                this.pagerService.get(pagingUrl).subscribe(resItems => {
                    if (resItems) {
                        this.pagedItems = resItems.elasticResponseData[0].data;
                        this.pagedItems = this.pagedItems.filter(x => {
                            if (x['DocRestrictedGroup'] != null && x['DocRestrictedGroup'].length > 0) {
                                if (this.userGroup != null) {
                                    if (this.userGroup.some(r => x['DocRestrictedGroup'].indexOf(r["groupName"]) > -1)) {
                                        return x;
                                    }
                                }
                            } else {
                                return x;
                            }
                        });
                    }
                });
            }
        }
        //this.pagedItems = this.chartItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    setCustomPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.newsKmItems.length, page);

        // get current page of items
        this.pagedItems = this.newsKmItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

        this.pagedItems = this.pagedItems.filter(x => {
            if (x['DocRestrictedGroup'] != null && x['DocRestrictedGroup'].length > 0) {
                if (this.userGroup != null) {
                    if (this.userGroup.some(r => x['DocRestrictedGroup'].indexOf(r["groupName"]) > -1)) {
                        return x;
                    }
                }
            } else {
                return x;
            }
        });
    }

    ngExpandText(index: any, id: any, event: any): void {
        readmore(index, id);
    }

    isAriaHidden(des: string): boolean {
        var result: boolean = false;
        if (des != '') {
            if (des.length > this.maxCharLimit) {
                result = true;
            }
        }
        return result;
    }

    isRestricted(restrictedGroup: any[]): boolean {
        var isRes: boolean = false;

        if (restrictedGroup && restrictedGroup.length > 0) {
            isRes = true;
        }

        return isRes;
    }

    getRestrictedDocType(fileName: string): string {
        var fileType = GlobalUtil.getFileExtension(fileName);
        var docType = "";

        if (fileType) {
            switch (fileType.toLowerCase()) {
                case DocType.doc:
                case DocType.docx: {
                    docType = "fa fa-file-word-o orange size20 marginR5";
                    break;
                }
                case DocType.xls:
                case DocType.xlsx: {
                    docType = "fa fa-file-excel-o orange size20 marginR5";
                    break;
                }
                case DocType.pdf: {
                    docType = "fa fa-file-pdf-o orange size20 marginR5";
                    break;
                }
                case DocType.ppt:
                case DocType.pptx: {
                    docType = "fa fa-file-powerpoint-o orange size20 marginR5";
                    break;
                }
                case DocType.csv: {
                    docType = "fa fa-file-text-o orange size20 marginR5";
                    break;
                }
                case DocType.png:
                case DocType.jpg:
                case DocType.jpeg:
                case DocType.gif: {
                    docType = "fa fa-file-image-o orange size20 marginR5";
                    break;
                }
                case DocType.msg: {
                    docType = "fa fa-envelope-o orange size20 marginR5";
                    break;
                }
                default: {
                    docType = "fa fa-file-word-o orange size20 marginR5";
                    break;
                }
            }
        }

        return docType;
    }

    showAlert() {
        alert("Access Restricted!\nPlease write an email to the GlobalBI.AgriInsider@syngenta.com to receive this file.");
    }

    getArrayData(items: Array<string>): any {
        var finalItems: string = '';

        if (items) {
            for (var count = 0; count < items.length; count++) {
                finalItems = finalItems + items[count] + ', ';
            }
        }
        finalItems = finalItems.replace(/,\s*$/, "");

        return finalItems;
    }

    onEditDocument(id: any): void {
        GlobalUtil.setSession("docId", id);
        this.router.navigate(['layout/kmupload/']);
    }

    onDeleteDocument(id: any): void {
        let confirmationMessage: string;
        confirmationMessage = "Are you sure, you want to delete?";
        let res: boolean = confirm(confirmationMessage);
        if (res) {
            var deleteUrl = GlobalConfig.baseEndpont + GlobalConfig.kmDeleteDocumentApi;
            this.pagerService.delete(deleteUrl, id)
                .subscribe(result => {
                    if (result == true) {
                        const index: number = this.pagedItems.findIndex(x => x.Id == id);
                        if (index != -1) {
                            this.pagedItems.splice(index, 1);
                            alert("Record have been deleted successfully");
                        }
                    }
                });
        }
    }

}