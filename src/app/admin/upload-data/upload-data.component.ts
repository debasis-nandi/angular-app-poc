
import { Component, OnInit, Input, OnChanges, OnDestroy, Output, ViewEncapsulation, ViewChild, VERSION } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { FileUpload } from 'primeng/primeng';

import { UploadDataService } from './upload-data.service';
import { IUploadData } from './upload-data.model';
import { GlobalConfig, DocType } from '../../global/global.config';
import { GlobalUtil } from '../../global/global.util';

@Component({
    moduleId: module.id,
    selector: 'my-upload-data',
    templateUrl: 'upload-data.component.html',
    styleUrls: ['upload-data.component.css'],
    providers: [UploadDataService],
    encapsulation: ViewEncapsulation.None
})

export class UploadDataComponent implements OnInit {
    isUpdate: boolean = false;
    pageDataEndPoint: string = GlobalConfig.baseEndpont + GlobalConfig.uploadDataPageBindApi;
    maxUploadedFileSize: number = GlobalConfig.maxUploadedDataFileSize;
    uploadedFiles: any[] = [];
    model: IUploadData = {};
    uploadFileMsg: string;
    moduleMsg: string;
    successMsg: string;
    isValidPage: number;
    loading: boolean = false;
    successMsgClass: { mandatory: boolean, green1: boolean };
    userRegion: string;
    constructor(private route: ActivatedRoute, private httpRequest: UploadDataService) {
      
    }

    ngOnInit() {
        this.getPageData();
    }

    getPageData() {
      
        this.httpRequest.get(this.pageDataEndPoint)
            .subscribe(resItems => {
                this.model = resItems;
                this.setAsDefault();
            });
    }
    UploadStatus: any;
    onUpload() {
        this.isValidPage = 1;
        this.moduleMsg = "";
        this.uploadFileMsg = "";
        this.successMsg = "";

        if (!this.model.moduleId || this.model.moduleId == 0) {
            this.moduleMsg = "You have to select a module first";
            this.isValidPage = 0;
        }

        if (this.uploadedFiles.length == 0) {
            this.uploadFileMsg = "You have to browse the file";
            this.isValidPage = 0;
        }

        if (this.isValidPage > 0) {

            let formData: FormData = new FormData();
            
            if (this.uploadedFiles.length > 0) {
                for (let file of this.uploadedFiles) {
                    formData.append('files', file, file.name);
                }
            }
            var url = GlobalConfig.baseEndpont + GlobalConfig.uploadDataFileApi;
            this.loading = true;

            this.userRegion = GlobalUtil.getAppSession("UserInfo").region
            
            
            this.httpRequest.postUploadData(url, formData, this.model.moduleId, this.isUpdate, this.userRegion).subscribe(
                success => {
                    this.UploadStatus = success.status;
                    if (success.status)
                    {
                        this.successMsgClass = { mandatory: false, green1: true }
                    }
                    else
                        this.successMsgClass = { mandatory: true, green1: false }  

                    this.successMsg = success.statusDescription;//success._body;
                    //this.successMsg = "Success";
                    this.setAsDefault();
                    this.loading = false;
                    //setTimeout(() => {
                    //    this.successMsg = "";
                    //}, 5000);
                },
                error => {
                   
                    this.successMsgClass = { mandatory: true, green1: false }
                    this.successMsg = "The file upload has failed";
                    this.loading = false;
                    setTimeout(() => {
                        this.successMsg = "";
                    }, 5000);
                }
            );
        }
    }

    setAsDefault() {
        this.model.moduleId = 0;
        this.uploadedFiles = [];
        this.moduleMsg = "";
        this.uploadFileMsg = "";
    }

    onCancel() {
        this.setAsDefault();
    }

    onSelect(event: any) {
        this.uploadFileMsg = "";
        var isValidType: boolean = false;
        var isValidSize: boolean = false;
        for (let file of event.files) {
            isValidType = this.isFileTypeValid(file);
            isValidSize = this.isFileSizeValid(file);

            if (!isValidType) {
                this.uploadFileMsg = "You can only upload an excel file";
            }
            else if (!isValidSize) {
                this.uploadFileMsg = "You have uploaded an invalid file size.";
            }
            else {
                this.uploadedFiles = [];
                this.uploadedFiles.push(file);
            }
        }
    }

    onFileDownload(fileName: string) {
        var a = window.document.createElement("a");
        a.href = GlobalConfig.baseEndpont + GlobalConfig.uploadDataTemplateDownloadApi.replace("{0}", fileName);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    onErroFileDownload(errorFileName: string) {
        var a = window.document.createElement("a");
        a.href = GlobalConfig.baseEndpont + GlobalConfig.DownloadErroFileApi.replace("{0}", errorFileName);
        a.download = errorFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    onRemove(event: any, index: any) {
        if (index != -1) {
            // remove file from batch.
            this.uploadedFiles.splice(index, 1);
        }
    }

    isFileTypeValid(file: any): boolean {
        var isValid: boolean = false;
        if (file) {
            var fileType = this.getFileExtension(file.name).toLowerCase();
            if (fileType == DocType.xls || fileType == DocType.xlsx) {
                isValid = true;
            }
        }
        return isValid;
    }

    getFileExtension(filename: string): string {
        return filename.split('.').pop();
    }

    isFileSizeValid(file: any): boolean {
        var isValid: boolean = false;

        if (file) {
            // check for indivisual file size
            if (file.size <= this.maxUploadedFileSize) {
                isValid = true;
            }
            else {
                isValid = false;
            }
        }

        return isValid;
    }

    formatSize(bytes: any): any {
        if (bytes == 0) {
            return '0 B';
        }
        let k = 1000,
            dm = 3,
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

}