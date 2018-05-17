
import { Component, OnInit, Input, OnChanges, OnDestroy, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { IMyDrpOptions } from 'mydaterangepicker';
import { IMyDpOptions } from 'mydatepicker';
import { SelectItem } from 'primeng/primeng';

import { KmSearchUploadModel, KmSaveUploadDocModel, SelectedList, Message } from './km-search-upload.model';
import { KmSearchService } from './km-search-upload.service';
import { GlobalConfig, DocType } from '../global/global.config';
import { GlobalUtil } from '../global/global.util';
import { SearchModel } from '../search/search.model';

@Component({
    moduleId: module.id,
    selector: 'my-km-search-upload',
    templateUrl: 'km-search-upload.component.html',
    styleUrls: ['km-search-upload.component.css'],
    providers: [KmSearchService],
    encapsulation: ViewEncapsulation.None
})

export class KmSearchUploadComponent implements OnInit {

    @Input() isKmUploadDoc: boolean;
    @Output() selectedValueEmit: EventEmitter<KmSearchUploadModel> = new EventEmitter<KmSearchUploadModel>();

    kmSearchEndPoint: string = GlobalConfig.baseEndpont + GlobalConfig.kmPageBindApi;
    kmUploadEndPoint: string = GlobalConfig.baseEndpont + GlobalConfig.kmUploadPageBindApi;
    getDocumentById: string = GlobalConfig.baseEndpont + GlobalConfig.kmEditDocumentApi;
    getCountryOnRegionEndPoint: string = GlobalConfig.baseEndpont + GlobalConfig.getCountryOnRegionApi;
    
    myDateRangePickerOptions: IMyDrpOptions = {
        dateFormat: 'dd-mm-yyyy'
    };

    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd-mm-yyyy',
        //disableSince: { year: 2018, month: 1, day: 5 }
    };
    
    model: KmSearchUploadModel = {};
    postModel: KmSaveUploadDocModel = {};
    isValidPage: number = 1;
    uploadedFiles: any[] = [];
    successMsg: string;
    maxUploadedFileSize: number = GlobalConfig.maxUploadedFileSize;
    batchUploadedFileSize: number = 0;
    
    titleMsg: string;
    tagMsg: string;
    docTypeMsg: string;
    moduleMsg: string;
    publicationDateeMsg: string;
    uploadFileMsg: string;
    regionMsg: string;
    maxCharSearchFor: number = 100;
    loading: boolean = false;
    showCompetitor: boolean = false;
    showRegion: boolean = false;
    msgs: Message[] = [];
    showDocTypeByModule: boolean = false;
    uploadPublicationDate: any;

    constructor(private kmSearchService: KmSearchService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.getPageData();
    }

    ngOnChanges() {
    }

    ngOnDestroy() {
        GlobalUtil.setSession('docId', '');
    }

    getPageData() {
        var url = this.isKmUploadDoc ? this.kmUploadEndPoint : this.kmSearchEndPoint;
        this.kmSearchService.get(url)
            .subscribe(resItems => {
                this.model = resItems;
                this.setAsDefault();
                this.ShowRawData();
            });
    }

    ShowRawData() {
        this.route.params.subscribe(params => {
            if (params['para'] != undefined) {
                var value = params['para'];
                var DocumentType = params['doctype'];
                if (value == GlobalConfig.competitiveLandscapeModule.toString()) {   // 9 is for competitive landscape
                    this.showCompetitor = false;
                    this.showRegion = false;
                }
                for (var i = 0; i < this.model.moduleList.length; i++) {
                    var moduleItem = this.model.moduleList[i];                   
                    if (moduleItem.id == value) {
                        this.model.docModules = new Array();
                        this.model.docModules.push(moduleItem.label);

                        this.model.docSelectedModules = new Array();
                        this.model.docSelectedModules.push(moduleItem.id);
                    }
                }

                if (value != "0") {
                    this.model.docTypeList = this.model.documentTypeList.filter(x => x.moduleid == Number(value));
                    this.showDocTypeByModule = true;
                }
                this.model.docType = (DocumentType == '' || DocumentType == undefined) ? "Raw Data" : DocumentType;
                for (var i = 0; i < this.model.docTypeList.length; i++) {
                    var docItem = this.model.docTypeList[i];
                    if (docItem.label == this.model.docType) {
                        this.model.docSelectedType = docItem.value;
                    }
                }

                this.selectedValueEmit.emit(this.model);
            }
            if (params['advancedsearchpara'] != undefined) {
                var value = params['advancedsearchpara'];
                this.model.keyword = value;
            }
            if (GlobalUtil.getSession('docId') != undefined && GlobalUtil.getSession('docId') != '') {
                if (this.isKmUploadDoc) {
                    var url = this.getDocumentById;
                    this.kmSearchService.getDocumentById(url, GlobalUtil.getSession('docId'))
                        .subscribe(resItems => {
                            this.model.docId = resItems.docId;
                            this.model.description = resItems.docDes;
                            this.model.tags = resItems.docTags;
                            this.model.title = resItems.docTitle;
                            this.model.emailNotification = resItems.emailNotification;
                            this.model.isClr = resItems.isClr;
                            this.model.docSelectedCompetitors = resItems.competitorsSelected != null ? resItems.competitorsSelected.map(function (item: any) { return item['value']; }) : null;
                            this.model.docSelectedModules = resItems.docModules != null ? resItems.docModules[0].value : 0;
                            this.onChangeModule(this.model.docSelectedModules);
                            this.model.docSelectedType = resItems.docType != null ? resItems.docType : 0;
                            this.model.docSelectedRestrictedGroup = resItems.restrictedGroup != null ? resItems.restrictedGroup.map(function (item: any) { return item['value']; }) : null;
                            this.model.docSelectedRegions = resItems.docRegions != null ? resItems.docRegions.map(function (item: any) { return item['value']; }) : null;
                            if (this.model.docSelectedRegions != null && this.model.docSelectedRegions != '') {
                                this.setCountryOnRegion(this.model.docSelectedRegions);
                            }
                            this.model.docSelectedCountries = resItems.docCountries != null ? resItems.docCountries.map(function (item: any) { return item['value']; }) : null;
                            this.onChangeDocumentType(null);
                            if (resItems.uploadPublicationDate != null) {
                                let UploadedDate = new Date(resItems.uploadPublicationDate);
                                this.uploadPublicationDate = resItems.uploadPublicationDate != null ? { date: { year: Number(UploadedDate.getFullYear()), month: Number(UploadedDate.getMonth() + 1), day: Number(UploadedDate.getDate()) } } : null;
                                this.model.uploadPublicationDate = this.uploadPublicationDate;
                            }

                        });
                }
            }
        });
    }

    onChangeRegion(selectedValue: any) {
        this.getCountryOnRegion(selectedValue);
    }

    onChangeModule(selectedValue: any) {
        //let res = Number(selectedValue.target.value);
        let res = Number(selectedValue);
        this.model.docSelectedType = 0;
        if (res != 0) {
            this.model.docTypeList = this.model.documentTypeList.filter(function (x) {
                if ((x.moduleid == res) || (x.moduleid == null) || (x.moduleid == 0) || (x.moduleid == undefined)) {
                    return true;
                }
                //if (x.moduleid == res) {
                //    return true;
                //}
            });
        } else {
            this.model.docTypeList = null;
        }
        this.showDocTypeByModule = true;
        if ((res != 0) && (res != GlobalConfig.competitiveLandscapeModule)) {
            this.showCompetitor = false;
            this.showRegion = true;
        } else {
            this.showCompetitor = false;
            this.showRegion = false;
        }
        if (res == 0) {
            this.model.docModules = null;
        }
    }

    onChangeDocumentType(selectedValue: any) {
        let ModuleId = this.model.docSelectedModules != null ? Number(this.model.docSelectedModules) : 0;
        let DocumentType = this.model.docSelectedType != null ? Number(this.model.docSelectedType) : 0;
        if (((ModuleId == GlobalConfig.competitiveLandscapeModule && DocumentType != GlobalConfig.cprDocumentType)
            && (ModuleId == GlobalConfig.competitiveLandscapeModule && DocumentType != GlobalConfig.rawDataDocumentType))) {
            this.showCompetitor = true;
            this.showRegion = false;
        } else if ((ModuleId == GlobalConfig.competitiveLandscapeModule && DocumentType == GlobalConfig.cprDocumentType)
            || (ModuleId == GlobalConfig.competitiveLandscapeModule && DocumentType == GlobalConfig.rawDataDocumentType)) {
            this.showCompetitor = false;
            this.showRegion = false;
            this.model.docSelectedCompetitors = [];
        }
        else {
            this.showCompetitor = false;
            this.showRegion = true;
            this.model.docSelectedCompetitors = [];
        }
    }

    getCountryOnRegion(regionList: string) {
        var endPoint = this.getCountryOnRegionEndPoint.replace("{0}", regionList);
        this.kmSearchService.get(endPoint)
            .subscribe(resItems => {
                this.model.docSelectedCountries = [];
                this.model.docCountries = null;
                this.model.countryList = resItems;
            });
    }

    setCountryOnRegion(regionList: any) {
        var endPoint = this.getCountryOnRegionEndPoint.replace("{0}", regionList);
        this.kmSearchService.get(endPoint)
            .subscribe(resItems => {
                this.model.docCountries = null;
                this.model.countryList = resItems;
            });
    }

    onSearch() {
        
        this.isValidPage = 0;

        this.getSelectedModules(this.model.docSelectedModules);
        this.getSelectedRegions(this.model.docSelectedRegions);
        this.getSelectedCountries(this.model.docSelectedCountries);
        this.getSelectedType(this.model.docSelectedType);
        this.getSelectedRestrictedGroup(this.model.docSelectedRestrictedGroup);
        this.getSelectedCompetitors(this.model.docSelectedCompetitors);

        if (this.model.keyword && this.model.keyword.trim() != "") {
            this.isValidPage = 1;
        }
        if (this.model.uploadedDateTime && this.model.uploadedDateTime.length > 0) {
            this.isValidPage = 1;
        }
        if (this.model.publicationDate && this.model.publicationDate.length > 0) {
            this.isValidPage = 1;
        }
        if (this.model.docModules && this.model.docModules.length > 0) {
            this.isValidPage = 1;
        }
        if (this.model.docRegions && this.model.docRegions.length > 0) {
            this.isValidPage = 1;
        }
        if (this.model.docCountries && this.model.docCountries.length > 0) {
            this.isValidPage = 1;
        }
        if (this.model.docType && this.model.docType != "0") {
            this.isValidPage = 1;
        }
        if (this.model.uploadby && this.model.uploadby != "0") {
            this.isValidPage = 1;
        }
        if (this.model.docRestrictedGroup && this.model.docRestrictedGroup.length > 0) {
            this.isValidPage = 1;
        }
        
        if (this.isValidPage) {
            this.selectedValueEmit.emit(this.model);
        }
    }

    onReset() {
        this.model = {};
        this.model.uploadPeriod = null;
        this.model.publicationPeriod = null;
        this.model.uploadPublicationDate = null;
        this.model.isReset = true;
        this.showCompetitor = false;

        this.titleMsg = "";
        this.tagMsg = "";
        this.docTypeMsg = "";
        this.publicationDateeMsg = "";
        this.uploadFileMsg = "";
        this.regionMsg = "";
        this.uploadedFiles = [];
        this.batchUploadedFileSize = 0;
        GlobalUtil.setSession('docId', '');

        this.getPageData();

        this.selectedValueEmit.emit(this.model);
    }

    setAsDefault() {
        this.model.uploadby = 0;
        this.model.docSelectedType = 0;
        this.model.documentTypeList = this.model.docTypeList; // assigning the values to an similar object so it can be filter later based on selected module
        this.model.docSelectedModules = "0";        
        this.model.emailNotification = 0;        
    }
    
    getSelectedModules(selectedModuleList: any) {
        if (typeof (selectedModuleList) == 'string') {
            if (selectedModuleList == "0") {
                selectedModuleList = null;
                this.model.docModules = null;
            }
        } else if (typeof (selectedModuleList) == 'object') {
            if (selectedModuleList.length > 0) {
                selectedModuleList = selectedModuleList[0].toString();
            }
        }
        if (selectedModuleList) {            
            var arrModules = selectedModuleList.split(',').map(Number);
            this.model.docModules = new Array();
            for (var i = 0; i < arrModules.length; i++) {
                var moduleValue = arrModules[i];
                var moduleLabel = this.model.moduleList.filter(x => x.value == moduleValue)[0].label;
                this.model.docModules.push(moduleLabel);
            }
        }
    }

    getSelectedRegions(selectedRegionsList: any) {
        if (selectedRegionsList) {
            this.model.docRegions = new Array();
            for (var i = 0; i < selectedRegionsList.length; i++) {
                var regionValue = selectedRegionsList[i];
                var regionLabel = this.model.regionList.filter(x => x.value == regionValue)[0].label;
                this.model.docRegions.push(regionLabel);
            }
        }
    }

    getSelectedCountries(selectedCountriesList: any) {
        if (selectedCountriesList) {
            this.model.docCountries = new Array();
            for (var i = 0; i < selectedCountriesList.length; i++) {
                var countryValue = selectedCountriesList[i];
                var countryLabel = this.model.countryList.filter(x => x.value == countryValue)[0].label;
                this.model.docCountries.push(countryLabel);
            }
        }
    }

    getSelectedType(selectedType: any) {
        if (selectedType != "0") { 
            this.model.docType = this.model.docTypeList.filter(x => x.value == selectedType)[0].label;
        }
        else {
            this.model.docType = null;
        }
    }

    getSelectedRestrictedGroup(selectedRestrictedGroupList: any) {
        if (selectedRestrictedGroupList) {
            this.model.docRestrictedGroup = new Array();
            for (var i = 0; i < selectedRestrictedGroupList.length; i++) {
                var restrictedValue = selectedRestrictedGroupList[i];
                var restrictedValueLabel = this.model.restrictedGroupList.filter(x => x.value == restrictedValue)[0].label;
                this.model.docRestrictedGroup.push(restrictedValueLabel);
            }
        }
    }

    getSelectedCompetitors(selectedCompetitorsList: any) {
        if (selectedCompetitorsList) {
            this.model.docCompetitors = new Array();
            for (var i = 0; i < selectedCompetitorsList.length; i++) {
                var competitorValue = selectedCompetitorsList[i];
                var competitorLabel = this.model.competitorsList.filter(x => x.value == competitorValue)[0].label;
                this.model.docCompetitors.push(competitorLabel);
            }
        }
    }
    
    onDateRangeChanged(event: any, id: string) {
        
        var startdatejson: any = event.beginDate;
        var startday: number = startdatejson.day + 1;
        var startmonth:number = startdatejson.month - 1;
        var startdate = new Date(startdatejson.year, startmonth, startday,0,0,0);

        var enddatejson: any = event.endDate;
        var endday: number = enddatejson.day + 1;
        var endmonth: number = enddatejson.month - 1;
        var enddate = new Date(enddatejson.year, endmonth, endday, 0, 0, 0);

        if (id == "myuploadperiod")
        {
            this.model.uploadedDateTime = [];
            if (startdatejson.year != 0) {
                this.model.uploadedDateTime.push(startdate);
                this.model.uploadedDateTime.push(enddate);
            }
        }
        else {
            this.model.publicationDate = [];
            if (startdatejson.year != 0) {
                this.model.publicationDate.push(startdate);
                this.model.publicationDate.push(enddate);
            }
        }
    }

    onDateSelected(event: any): void {
        if (event.type == 2) {
            document.getElementsByTagName('footer')[0].classList.remove('minusindex');
            document.getElementsByTagName('my-search-template')[0].classList.remove('minusindex');
        }
    }
    
    onSelect(event: any) {
        this.uploadFileMsg = "";
        var isValidType: boolean = false;
        var isValidSize: boolean = false;
        for (let file of event.files) {
            isValidType = this.isFileTypeValid(file);
            isValidSize = this.isFileSizeValid(file);

            if (!isValidType) {
                this.uploadFileMsg = "You can upload only (doc, pdf, csv, xls, ppt, msg, txt and images ) file types.";
            }
            else if (!isValidSize) {
                this.uploadFileMsg = "The file size should not exceed 100 MB";
            }
            else {
                this.uploadedFiles.push(file);
            }
        }
    }

    onSave() {
        this.isValidPage = 1;
        this.titleMsg = "";
        this.tagMsg = "";
        this.docTypeMsg = "";
        this.publicationDateeMsg = "";
        this.uploadFileMsg = "";
        this.regionMsg = "";
        this.moduleMsg = "";

        if (!this.model.title) {
            this.titleMsg = "Title should not be blank.";
            this.isValidPage = 0;
        }
        if (!this.model.tags) {
            this.tagMsg = "Tags / Topics should not be blank.";
            this.isValidPage = 0;
        }
        if (!this.model.docSelectedModules || this.model.docSelectedModules == "0") {
            this.moduleMsg = "Please select a module.";
            this.isValidPage = 0;
        }
        if (!this.model.docSelectedType || this.model.docSelectedType == "0") {
            this.docTypeMsg = "You have to select doc type.";
            this.isValidPage = 0;
        }
        if (!this.model.uploadPublicationDate) {
            this.publicationDateeMsg = "You have to select publication date.";
            this.isValidPage = 0;
        }
        if (this.uploadedFiles.length == 0) {
            this.uploadFileMsg = "You have to browse atleast one file.";
            this.isValidPage = 0;
        }

        if ((this.model.docSelectedModules != undefined) && (this.model.docSelectedModules != null)) { // 9 is for competitve landscape
            if (this.model.docSelectedModules.length > 0) {
                if (this.model.docSelectedModules.indexOf(9) == -1) {
                    if (!this.model.docSelectedRegions || this.model.docSelectedRegions.length == 0) {
                        this.regionMsg = "You have to select atleast one region.";
                        this.isValidPage = 0;
                    }
                }
            }
        } else {
            if (!this.model.docSelectedRegions || this.model.docSelectedRegions.length == 0) {
                this.regionMsg = "You have to select atleast one region.";
                this.isValidPage = 0;
            }
        }

        if (this.isValidPage > 0) {

            this.postModel.DocId = this.model.docId;
            this.postModel.DocDes = this.model.description;
            this.postModel.DocTags = this.model.tags;
            this.postModel.DocTitle = this.model.title;
            this.postModel.DocType = this.model.docSelectedType;
            this.postModel.IsClr = this.model.isClr;
            this.postModel.EmailNotification = this.model.emailNotification;
            this.postModel.UploadedBy = GlobalUtil.getAppSession("UserInfo").email;
            this.postModel.PublicationDate = this.getPublicationDate(this.model.uploadPublicationDate);

            this.postModel.DocCountries = this.getSelectedCountriesList(this.model.docSelectedCountries);
            this.postModel.DocModules = this.getSelectedModulesList(this.model.docSelectedModules.toString());
            this.postModel.CompetitorsSelected = this.getSelectedCompetitorList(this.model.docSelectedCompetitors);
            this.postModel.DocRegions = this.getSelectedRegionsList(this.model.docSelectedRegions);
            this.postModel.RestrictedGroup = this.getSelectedRestrictedGroupList(this.model.docSelectedRestrictedGroup);


            let formData: FormData = new FormData();
            formData.append('model', JSON.stringify(this.postModel));
            if (this.uploadedFiles.length > 0) {
                for (let file of this.uploadedFiles) {
                    formData.append('files', file, file.name);
                }
            }
            var url = GlobalConfig.baseEndpont + GlobalConfig.kmSaveUploadDocApi;
            this.loading = true;
            this.kmSearchService.saveUploadDoc(url, formData).subscribe(
                success => {
                    //this.successMsg = "Data has been saved successfully.";
                    this.showSuccess("Data has been saved successfully");
                    this.onReset();
                    this.loading = false;
                    /*setTimeout(() => {
                        this.successMsg = "";     
                    }, 5000);*/
                },
                error => {
                    //this.successMsg = "Fails to save data.";
                    this.showError("Fails to save data");
                    this.loading = false;
                    /*setTimeout(() => {
                        this.successMsg = "";
                    }, 5000);*/
                }
            );
        }
    }

    getSelectedCountriesList(selectedCountries: any): SelectedList[] {
        var selectedList: SelectedList[] = [];
        if (selectedCountries) {
            for (var i = 0; i < selectedCountries.length; i++) {
                var list = new SelectedList();
                list.Value = selectedCountries[i];
                selectedList.push(list);
            }
        }
        return selectedList;
    }

    getSelectedModulesList(selectedModules: any): SelectedList[] {
        var arrModules = selectedModules.split(',').map(Number);
        var selectedList: SelectedList[] = [];
        if (arrModules) {
            for (var i = 0; i < arrModules.length; i++) {
                var list = new SelectedList();
                list.Value = arrModules[i];
                selectedList.push(list);
            }
        }
        return selectedList;
    }

    getSelectedCompetitorList(selectedModules: any): SelectedList[] {
        var selectedList: SelectedList[] = [];
        if (selectedModules) {
            for (var i = 0; i < selectedModules.length; i++) {
                var list = new SelectedList();
                list.Value = selectedModules[i];
                selectedList.push(list);
            }
        }
        return selectedList;
    }

    getSelectedRegionsList(selectedRegions: any): SelectedList[] {
        var selectedList: SelectedList[] = [];
        if (selectedRegions) {
            for (var i = 0; i < selectedRegions.length; i++) {
                var list = new SelectedList();
                list.Value = selectedRegions[i];
                selectedList.push(list);
            }
        }
        return selectedList;
    }

    getSelectedRestrictedGroupList(selectedRestrictedGroup: any): SelectedList[] {
        var selectedList: SelectedList[] = [];
        if (selectedRestrictedGroup) {
            for (var i = 0; i < selectedRestrictedGroup.length; i++) {
                var list = new SelectedList();
                list.Value = selectedRestrictedGroup[i];
                selectedList.push(list);
            }
        }
        return selectedList;
    }

    getPublicationDate(selectedDate: any): string {
        var _date = selectedDate.date;
        var year = _date.year;
        var month = _date.month;
        var day = _date.day;
        return year.toString() + '-' + month.toString() + '-' + day.toString();
    }

    getFormattedDate(selectedDate: any): string {
        let reggie = /(\d{4})-(\d{2})-(\d{2})/;
        let dateArray = reggie.exec(selectedDate);
        let dateObject = (dateArray[3]) + "-" + (dateArray[2]) + "-" + (dateArray[1]); // Careful, month starts at 0!            
        return dateObject;
    }
    
    onKeypress(event: any, charLimit: number = 0) {
        var maxCharLimit = charLimit > 0 ? charLimit : this.maxCharSearchFor;
        if (event.target.value.length > maxCharLimit) {
            event.preventDefault();
        }
        // 13 is the keycode for Enter Key
        if (event.keyCode == 13) {
            if (event.target.id == "title") {
                this.onSearch();
            }
        }
    }

    onChange(event: any, charLimit: number = 0) {
        var maxCharLimit = charLimit > 0 ? charLimit : this.maxCharSearchFor;
        if (event.target.value.length > maxCharLimit) {
            this.model.keyword = event.target.value.substring(0, (maxCharLimit));
        }
    }

    onChangeTitle(event: any, charLimit: number = 0) {
        var maxCharLimit = charLimit > 0 ? charLimit : this.maxCharSearchFor;
        if (event.target.value.length > maxCharLimit) {
            this.model.title = event.target.value.substring(0, (maxCharLimit));
        }
    }

    onChangeDes(event: any, charLimit: number = 0) {
        var maxCharLimit = charLimit > 0 ? charLimit : this.maxCharSearchFor;
        if (event.target.value.length > maxCharLimit) {
            this.model.description = event.target.value.substring(0, (maxCharLimit));
        }
    }

    onChangeTags(event: any, charLimit: number = 0) {
        var maxCharLimit = charLimit > 0 ? charLimit : this.maxCharSearchFor;
        if (event.target.value.length > maxCharLimit) {
            this.model.tags = event.target.value.substring(0, (maxCharLimit));
        }
    }

    onClear(event: any) {
        this.uploadedFiles = [];
        this.batchUploadedFileSize = 0;
    }

    onRemove(event: any, index: any) {
        if (index != -1) {
            // subtract file size from batch uploaded file size when we remove file from batch.
            this.batchUploadedFileSize -= this.uploadedFiles[index].size;
            // remove file from batch.
            this.uploadedFiles.splice(index, 1);
        }
    }

    isFileTypeValid(file: any): boolean {
        var isValid: boolean = false;
        if (file) {
            var fileType = this.getFileExtension(file.name).toLowerCase();
            if (fileType == DocType.csv || fileType == DocType.doc || fileType == DocType.docx || fileType == DocType.gif || fileType == DocType.jpeg || fileType == DocType.jpg || fileType == DocType.msg || fileType == DocType.pdf || fileType == DocType.png || fileType == DocType.ppt || fileType == DocType.pptx || fileType == DocType.xls || fileType == DocType.xlsx || fileType == DocType.txt) {
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

            // check for group of file size and add file size with batch size when file size is valid.
            if ((this.batchUploadedFileSize + file.size) <= this.maxUploadedFileSize) {
                this.batchUploadedFileSize += file.size;
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

    onChangeCountry(selectedValue: any) {
    }

    onChangeUploadedBy(selectedValue: any) {
    }

    onChangeDocType(selectedValue: any) {
    }

    onChangeRestrictedGroup(selectedValue: any) {
    }

    showSuccess(message: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'success', detail: message });
    }

    showError(message: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: message });
    }
}
