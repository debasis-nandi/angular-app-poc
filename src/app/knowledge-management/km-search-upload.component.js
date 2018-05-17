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
var router_1 = require("@angular/router");
var km_search_upload_model_1 = require('./km-search-upload.model');
var km_search_upload_service_1 = require('./km-search-upload.service');
var global_config_1 = require('../global/global.config');
var global_util_1 = require('../global/global.util');
var KmSearchUploadComponent = (function () {
    function KmSearchUploadComponent(kmSearchService, route) {
        this.kmSearchService = kmSearchService;
        this.route = route;
        this.selectedValueEmit = new core_1.EventEmitter();
        this.kmSearchEndPoint = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.kmPageBindApi;
        this.kmUploadEndPoint = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.kmUploadPageBindApi;
        this.getDocumentById = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.kmEditDocumentApi;
        this.getCountryOnRegionEndPoint = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.getCountryOnRegionApi;
        this.myDateRangePickerOptions = {
            dateFormat: 'dd-mm-yyyy'
        };
        this.myDatePickerOptions = {
            dateFormat: 'dd-mm-yyyy',
        };
        this.model = {};
        this.postModel = {};
        this.isValidPage = 1;
        this.uploadedFiles = [];
        this.maxUploadedFileSize = global_config_1.GlobalConfig.maxUploadedFileSize;
        this.batchUploadedFileSize = 0;
        this.maxCharSearchFor = 100;
        this.loading = false;
        this.showCompetitor = false;
        this.showRegion = false;
        this.msgs = [];
        this.showDocTypeByModule = false;
    }
    KmSearchUploadComponent.prototype.ngOnInit = function () {
        this.getPageData();
    };
    KmSearchUploadComponent.prototype.ngOnChanges = function () {
    };
    KmSearchUploadComponent.prototype.ngOnDestroy = function () {
        global_util_1.GlobalUtil.setSession('docId', '');
    };
    KmSearchUploadComponent.prototype.getPageData = function () {
        var _this = this;
        var url = this.isKmUploadDoc ? this.kmUploadEndPoint : this.kmSearchEndPoint;
        this.kmSearchService.get(url)
            .subscribe(function (resItems) {
            _this.model = resItems;
            _this.setAsDefault();
            _this.ShowRawData();
        });
    };
    KmSearchUploadComponent.prototype.ShowRawData = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['para'] != undefined) {
                var value = params['para'];
                var DocumentType = params['doctype'];
                if (value == global_config_1.GlobalConfig.competitiveLandscapeModule.toString()) {
                    _this.showCompetitor = false;
                    _this.showRegion = false;
                }
                for (var i = 0; i < _this.model.moduleList.length; i++) {
                    var moduleItem = _this.model.moduleList[i];
                    if (moduleItem.id == value) {
                        _this.model.docModules = new Array();
                        _this.model.docModules.push(moduleItem.label);
                        _this.model.docSelectedModules = new Array();
                        _this.model.docSelectedModules.push(moduleItem.id);
                    }
                }
                if (value != "0") {
                    _this.model.docTypeList = _this.model.documentTypeList.filter(function (x) { return x.moduleid == Number(value); });
                    _this.showDocTypeByModule = true;
                }
                _this.model.docType = (DocumentType == '' || DocumentType == undefined) ? "Raw Data" : DocumentType;
                for (var i = 0; i < _this.model.docTypeList.length; i++) {
                    var docItem = _this.model.docTypeList[i];
                    if (docItem.label == _this.model.docType) {
                        _this.model.docSelectedType = docItem.value;
                    }
                }
                _this.selectedValueEmit.emit(_this.model);
            }
            if (params['advancedsearchpara'] != undefined) {
                var value = params['advancedsearchpara'];
                _this.model.keyword = value;
            }
            if (global_util_1.GlobalUtil.getSession('docId') != undefined && global_util_1.GlobalUtil.getSession('docId') != '') {
                if (_this.isKmUploadDoc) {
                    var url = _this.getDocumentById;
                    _this.kmSearchService.getDocumentById(url, global_util_1.GlobalUtil.getSession('docId'))
                        .subscribe(function (resItems) {
                        _this.model.docId = resItems.docId;
                        _this.model.description = resItems.docDes;
                        _this.model.tags = resItems.docTags;
                        _this.model.title = resItems.docTitle;
                        _this.model.emailNotification = resItems.emailNotification;
                        _this.model.isClr = resItems.isClr;
                        _this.model.docSelectedCompetitors = resItems.competitorsSelected != null ? resItems.competitorsSelected.map(function (item) { return item['value']; }) : null;
                        _this.model.docSelectedModules = resItems.docModules != null ? resItems.docModules[0].value : 0;
                        _this.onChangeModule(_this.model.docSelectedModules);
                        _this.model.docSelectedType = resItems.docType != null ? resItems.docType : 0;
                        _this.model.docSelectedRestrictedGroup = resItems.restrictedGroup != null ? resItems.restrictedGroup.map(function (item) { return item['value']; }) : null;
                        _this.model.docSelectedRegions = resItems.docRegions != null ? resItems.docRegions.map(function (item) { return item['value']; }) : null;
                        if (_this.model.docSelectedRegions != null && _this.model.docSelectedRegions != '') {
                            _this.setCountryOnRegion(_this.model.docSelectedRegions);
                        }
                        _this.model.docSelectedCountries = resItems.docCountries != null ? resItems.docCountries.map(function (item) { return item['value']; }) : null;
                        _this.onChangeDocumentType(null);
                        if (resItems.uploadPublicationDate != null) {
                            var UploadedDate = new Date(resItems.uploadPublicationDate);
                            _this.uploadPublicationDate = resItems.uploadPublicationDate != null ? { date: { year: Number(UploadedDate.getFullYear()), month: Number(UploadedDate.getMonth() + 1), day: Number(UploadedDate.getDate()) } } : null;
                            _this.model.uploadPublicationDate = _this.uploadPublicationDate;
                        }
                    });
                }
            }
        });
    };
    KmSearchUploadComponent.prototype.onChangeRegion = function (selectedValue) {
        this.getCountryOnRegion(selectedValue);
    };
    KmSearchUploadComponent.prototype.onChangeModule = function (selectedValue) {
        //let res = Number(selectedValue.target.value);
        var res = Number(selectedValue);
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
        }
        else {
            this.model.docTypeList = null;
        }
        this.showDocTypeByModule = true;
        if ((res != 0) && (res != global_config_1.GlobalConfig.competitiveLandscapeModule)) {
            this.showCompetitor = false;
            this.showRegion = true;
        }
        else {
            this.showCompetitor = false;
            this.showRegion = false;
        }
        if (res == 0) {
            this.model.docModules = null;
        }
    };
    KmSearchUploadComponent.prototype.onChangeDocumentType = function (selectedValue) {
        var ModuleId = this.model.docSelectedModules != null ? Number(this.model.docSelectedModules) : 0;
        var DocumentType = this.model.docSelectedType != null ? Number(this.model.docSelectedType) : 0;
        if (((ModuleId == global_config_1.GlobalConfig.competitiveLandscapeModule && DocumentType != global_config_1.GlobalConfig.cprDocumentType)
            && (ModuleId == global_config_1.GlobalConfig.competitiveLandscapeModule && DocumentType != global_config_1.GlobalConfig.rawDataDocumentType))) {
            this.showCompetitor = true;
            this.showRegion = false;
        }
        else if ((ModuleId == global_config_1.GlobalConfig.competitiveLandscapeModule && DocumentType == global_config_1.GlobalConfig.cprDocumentType)
            || (ModuleId == global_config_1.GlobalConfig.competitiveLandscapeModule && DocumentType == global_config_1.GlobalConfig.rawDataDocumentType)) {
            this.showCompetitor = false;
            this.showRegion = false;
            this.model.docSelectedCompetitors = [];
        }
        else {
            this.showCompetitor = false;
            this.showRegion = true;
            this.model.docSelectedCompetitors = [];
        }
    };
    KmSearchUploadComponent.prototype.getCountryOnRegion = function (regionList) {
        var _this = this;
        var endPoint = this.getCountryOnRegionEndPoint.replace("{0}", regionList);
        this.kmSearchService.get(endPoint)
            .subscribe(function (resItems) {
            _this.model.docSelectedCountries = [];
            _this.model.docCountries = null;
            _this.model.countryList = resItems;
        });
    };
    KmSearchUploadComponent.prototype.setCountryOnRegion = function (regionList) {
        var _this = this;
        var endPoint = this.getCountryOnRegionEndPoint.replace("{0}", regionList);
        this.kmSearchService.get(endPoint)
            .subscribe(function (resItems) {
            _this.model.docCountries = null;
            _this.model.countryList = resItems;
        });
    };
    KmSearchUploadComponent.prototype.onSearch = function () {
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
    };
    KmSearchUploadComponent.prototype.onReset = function () {
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
        global_util_1.GlobalUtil.setSession('docId', '');
        this.getPageData();
        this.selectedValueEmit.emit(this.model);
    };
    KmSearchUploadComponent.prototype.setAsDefault = function () {
        this.model.uploadby = 0;
        this.model.docSelectedType = 0;
        this.model.documentTypeList = this.model.docTypeList; // assigning the values to an similar object so it can be filter later based on selected module
        this.model.docSelectedModules = "0";
        this.model.emailNotification = 0;
    };
    KmSearchUploadComponent.prototype.getSelectedModules = function (selectedModuleList) {
        if (typeof (selectedModuleList) == 'string') {
            if (selectedModuleList == "0") {
                selectedModuleList = null;
                this.model.docModules = null;
            }
        }
        else if (typeof (selectedModuleList) == 'object') {
            if (selectedModuleList.length > 0) {
                selectedModuleList = selectedModuleList[0].toString();
            }
        }
        if (selectedModuleList) {
            var arrModules = selectedModuleList.split(',').map(Number);
            this.model.docModules = new Array();
            for (var i = 0; i < arrModules.length; i++) {
                var moduleValue = arrModules[i];
                var moduleLabel = this.model.moduleList.filter(function (x) { return x.value == moduleValue; })[0].label;
                this.model.docModules.push(moduleLabel);
            }
        }
    };
    KmSearchUploadComponent.prototype.getSelectedRegions = function (selectedRegionsList) {
        if (selectedRegionsList) {
            this.model.docRegions = new Array();
            for (var i = 0; i < selectedRegionsList.length; i++) {
                var regionValue = selectedRegionsList[i];
                var regionLabel = this.model.regionList.filter(function (x) { return x.value == regionValue; })[0].label;
                this.model.docRegions.push(regionLabel);
            }
        }
    };
    KmSearchUploadComponent.prototype.getSelectedCountries = function (selectedCountriesList) {
        if (selectedCountriesList) {
            this.model.docCountries = new Array();
            for (var i = 0; i < selectedCountriesList.length; i++) {
                var countryValue = selectedCountriesList[i];
                var countryLabel = this.model.countryList.filter(function (x) { return x.value == countryValue; })[0].label;
                this.model.docCountries.push(countryLabel);
            }
        }
    };
    KmSearchUploadComponent.prototype.getSelectedType = function (selectedType) {
        if (selectedType != "0") {
            this.model.docType = this.model.docTypeList.filter(function (x) { return x.value == selectedType; })[0].label;
        }
        else {
            this.model.docType = null;
        }
    };
    KmSearchUploadComponent.prototype.getSelectedRestrictedGroup = function (selectedRestrictedGroupList) {
        if (selectedRestrictedGroupList) {
            this.model.docRestrictedGroup = new Array();
            for (var i = 0; i < selectedRestrictedGroupList.length; i++) {
                var restrictedValue = selectedRestrictedGroupList[i];
                var restrictedValueLabel = this.model.restrictedGroupList.filter(function (x) { return x.value == restrictedValue; })[0].label;
                this.model.docRestrictedGroup.push(restrictedValueLabel);
            }
        }
    };
    KmSearchUploadComponent.prototype.getSelectedCompetitors = function (selectedCompetitorsList) {
        if (selectedCompetitorsList) {
            this.model.docCompetitors = new Array();
            for (var i = 0; i < selectedCompetitorsList.length; i++) {
                var competitorValue = selectedCompetitorsList[i];
                var competitorLabel = this.model.competitorsList.filter(function (x) { return x.value == competitorValue; })[0].label;
                this.model.docCompetitors.push(competitorLabel);
            }
        }
    };
    KmSearchUploadComponent.prototype.onDateRangeChanged = function (event, id) {
        var startdatejson = event.beginDate;
        var startday = startdatejson.day + 1;
        var startmonth = startdatejson.month - 1;
        var startdate = new Date(startdatejson.year, startmonth, startday, 0, 0, 0);
        var enddatejson = event.endDate;
        var endday = enddatejson.day + 1;
        var endmonth = enddatejson.month - 1;
        var enddate = new Date(enddatejson.year, endmonth, endday, 0, 0, 0);
        if (id == "myuploadperiod") {
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
    };
    KmSearchUploadComponent.prototype.onDateSelected = function (event) {
        if (event.type == 2) {
            document.getElementsByTagName('footer')[0].classList.remove('minusindex');
            document.getElementsByTagName('my-search-template')[0].classList.remove('minusindex');
        }
    };
    KmSearchUploadComponent.prototype.onSelect = function (event) {
        this.uploadFileMsg = "";
        var isValidType = false;
        var isValidSize = false;
        for (var _i = 0, _a = event.files; _i < _a.length; _i++) {
            var file = _a[_i];
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
    };
    KmSearchUploadComponent.prototype.onSave = function () {
        var _this = this;
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
        if ((this.model.docSelectedModules != undefined) && (this.model.docSelectedModules != null)) {
            if (this.model.docSelectedModules.length > 0) {
                if (this.model.docSelectedModules.indexOf(9) == -1) {
                    if (!this.model.docSelectedRegions || this.model.docSelectedRegions.length == 0) {
                        this.regionMsg = "You have to select atleast one region.";
                        this.isValidPage = 0;
                    }
                }
            }
        }
        else {
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
            this.postModel.UploadedBy = global_util_1.GlobalUtil.getAppSession("UserInfo").email;
            this.postModel.PublicationDate = this.getPublicationDate(this.model.uploadPublicationDate);
            this.postModel.DocCountries = this.getSelectedCountriesList(this.model.docSelectedCountries);
            this.postModel.DocModules = this.getSelectedModulesList(this.model.docSelectedModules.toString());
            this.postModel.CompetitorsSelected = this.getSelectedCompetitorList(this.model.docSelectedCompetitors);
            this.postModel.DocRegions = this.getSelectedRegionsList(this.model.docSelectedRegions);
            this.postModel.RestrictedGroup = this.getSelectedRestrictedGroupList(this.model.docSelectedRestrictedGroup);
            var formData = new FormData();
            formData.append('model', JSON.stringify(this.postModel));
            if (this.uploadedFiles.length > 0) {
                for (var _i = 0, _a = this.uploadedFiles; _i < _a.length; _i++) {
                    var file = _a[_i];
                    formData.append('files', file, file.name);
                }
            }
            var url = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.kmSaveUploadDocApi;
            this.loading = true;
            this.kmSearchService.saveUploadDoc(url, formData).subscribe(function (success) {
                //this.successMsg = "Data has been saved successfully.";
                _this.showSuccess("Data has been saved successfully");
                _this.onReset();
                _this.loading = false;
                /*setTimeout(() => {
                    this.successMsg = "";
                }, 5000);*/
            }, function (error) {
                //this.successMsg = "Fails to save data.";
                _this.showError("Fails to save data");
                _this.loading = false;
                /*setTimeout(() => {
                    this.successMsg = "";
                }, 5000);*/
            });
        }
    };
    KmSearchUploadComponent.prototype.getSelectedCountriesList = function (selectedCountries) {
        var selectedList = [];
        if (selectedCountries) {
            for (var i = 0; i < selectedCountries.length; i++) {
                var list = new km_search_upload_model_1.SelectedList();
                list.Value = selectedCountries[i];
                selectedList.push(list);
            }
        }
        return selectedList;
    };
    KmSearchUploadComponent.prototype.getSelectedModulesList = function (selectedModules) {
        var arrModules = selectedModules.split(',').map(Number);
        var selectedList = [];
        if (arrModules) {
            for (var i = 0; i < arrModules.length; i++) {
                var list = new km_search_upload_model_1.SelectedList();
                list.Value = arrModules[i];
                selectedList.push(list);
            }
        }
        return selectedList;
    };
    KmSearchUploadComponent.prototype.getSelectedCompetitorList = function (selectedModules) {
        var selectedList = [];
        if (selectedModules) {
            for (var i = 0; i < selectedModules.length; i++) {
                var list = new km_search_upload_model_1.SelectedList();
                list.Value = selectedModules[i];
                selectedList.push(list);
            }
        }
        return selectedList;
    };
    KmSearchUploadComponent.prototype.getSelectedRegionsList = function (selectedRegions) {
        var selectedList = [];
        if (selectedRegions) {
            for (var i = 0; i < selectedRegions.length; i++) {
                var list = new km_search_upload_model_1.SelectedList();
                list.Value = selectedRegions[i];
                selectedList.push(list);
            }
        }
        return selectedList;
    };
    KmSearchUploadComponent.prototype.getSelectedRestrictedGroupList = function (selectedRestrictedGroup) {
        var selectedList = [];
        if (selectedRestrictedGroup) {
            for (var i = 0; i < selectedRestrictedGroup.length; i++) {
                var list = new km_search_upload_model_1.SelectedList();
                list.Value = selectedRestrictedGroup[i];
                selectedList.push(list);
            }
        }
        return selectedList;
    };
    KmSearchUploadComponent.prototype.getPublicationDate = function (selectedDate) {
        var _date = selectedDate.date;
        var year = _date.year;
        var month = _date.month;
        var day = _date.day;
        return year.toString() + '-' + month.toString() + '-' + day.toString();
    };
    KmSearchUploadComponent.prototype.getFormattedDate = function (selectedDate) {
        var reggie = /(\d{4})-(\d{2})-(\d{2})/;
        var dateArray = reggie.exec(selectedDate);
        var dateObject = (dateArray[3]) + "-" + (dateArray[2]) + "-" + (dateArray[1]); // Careful, month starts at 0!            
        return dateObject;
    };
    KmSearchUploadComponent.prototype.onKeypress = function (event, charLimit) {
        if (charLimit === void 0) { charLimit = 0; }
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
    };
    KmSearchUploadComponent.prototype.onChange = function (event, charLimit) {
        if (charLimit === void 0) { charLimit = 0; }
        var maxCharLimit = charLimit > 0 ? charLimit : this.maxCharSearchFor;
        if (event.target.value.length > maxCharLimit) {
            this.model.keyword = event.target.value.substring(0, (maxCharLimit));
        }
    };
    KmSearchUploadComponent.prototype.onChangeTitle = function (event, charLimit) {
        if (charLimit === void 0) { charLimit = 0; }
        var maxCharLimit = charLimit > 0 ? charLimit : this.maxCharSearchFor;
        if (event.target.value.length > maxCharLimit) {
            this.model.title = event.target.value.substring(0, (maxCharLimit));
        }
    };
    KmSearchUploadComponent.prototype.onChangeDes = function (event, charLimit) {
        if (charLimit === void 0) { charLimit = 0; }
        var maxCharLimit = charLimit > 0 ? charLimit : this.maxCharSearchFor;
        if (event.target.value.length > maxCharLimit) {
            this.model.description = event.target.value.substring(0, (maxCharLimit));
        }
    };
    KmSearchUploadComponent.prototype.onChangeTags = function (event, charLimit) {
        if (charLimit === void 0) { charLimit = 0; }
        var maxCharLimit = charLimit > 0 ? charLimit : this.maxCharSearchFor;
        if (event.target.value.length > maxCharLimit) {
            this.model.tags = event.target.value.substring(0, (maxCharLimit));
        }
    };
    KmSearchUploadComponent.prototype.onClear = function (event) {
        this.uploadedFiles = [];
        this.batchUploadedFileSize = 0;
    };
    KmSearchUploadComponent.prototype.onRemove = function (event, index) {
        if (index != -1) {
            // subtract file size from batch uploaded file size when we remove file from batch.
            this.batchUploadedFileSize -= this.uploadedFiles[index].size;
            // remove file from batch.
            this.uploadedFiles.splice(index, 1);
        }
    };
    KmSearchUploadComponent.prototype.isFileTypeValid = function (file) {
        var isValid = false;
        if (file) {
            var fileType = this.getFileExtension(file.name).toLowerCase();
            if (fileType == global_config_1.DocType.csv || fileType == global_config_1.DocType.doc || fileType == global_config_1.DocType.docx || fileType == global_config_1.DocType.gif || fileType == global_config_1.DocType.jpeg || fileType == global_config_1.DocType.jpg || fileType == global_config_1.DocType.msg || fileType == global_config_1.DocType.pdf || fileType == global_config_1.DocType.png || fileType == global_config_1.DocType.ppt || fileType == global_config_1.DocType.pptx || fileType == global_config_1.DocType.xls || fileType == global_config_1.DocType.xlsx || fileType == global_config_1.DocType.txt) {
                isValid = true;
            }
        }
        return isValid;
    };
    KmSearchUploadComponent.prototype.getFileExtension = function (filename) {
        return filename.split('.').pop();
    };
    KmSearchUploadComponent.prototype.isFileSizeValid = function (file) {
        var isValid = false;
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
    };
    KmSearchUploadComponent.prototype.formatSize = function (bytes) {
        if (bytes == 0) {
            return '0 B';
        }
        var k = 1000, dm = 3, sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };
    KmSearchUploadComponent.prototype.onChangeCountry = function (selectedValue) {
    };
    KmSearchUploadComponent.prototype.onChangeUploadedBy = function (selectedValue) {
    };
    KmSearchUploadComponent.prototype.onChangeDocType = function (selectedValue) {
    };
    KmSearchUploadComponent.prototype.onChangeRestrictedGroup = function (selectedValue) {
    };
    KmSearchUploadComponent.prototype.showSuccess = function (message) {
        this.msgs = [];
        this.msgs.push({ severity: 'success', detail: message });
    };
    KmSearchUploadComponent.prototype.showError = function (message) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: message });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], KmSearchUploadComponent.prototype, "isKmUploadDoc", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], KmSearchUploadComponent.prototype, "selectedValueEmit", void 0);
    KmSearchUploadComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-km-search-upload',
            templateUrl: 'km-search-upload.component.html',
            styleUrls: ['km-search-upload.component.css'],
            providers: [km_search_upload_service_1.KmSearchService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [km_search_upload_service_1.KmSearchService, router_1.ActivatedRoute])
    ], KmSearchUploadComponent);
    return KmSearchUploadComponent;
}());
exports.KmSearchUploadComponent = KmSearchUploadComponent;
//# sourceMappingURL=km-search-upload.component.js.map