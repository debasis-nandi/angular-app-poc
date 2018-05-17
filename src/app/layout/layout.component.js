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
var global_config_1 = require('../global/global.config');
var global_util_1 = require('../global/global.util');
var layout_service_1 = require('./layout.service');
var userprofile_service_1 = require('../widgets/userprofile/userprofile.service');
var userprofile_component_1 = require('../widgets/userprofile/userprofile.component');
var LayoutComponent = (function () {
    function LayoutComponent(router, activeRoute, service, userProfileService, _eref) {
        this.router = router;
        this.activeRoute = activeRoute;
        this.service = service;
        this.userProfileService = userProfileService;
        this._eref = _eref;
        // footNote: IFootNote = {};
        this.logoPath = global_config_1.GlobalConfig.layoutSyngentaLogo;
        this.logoMobilePath = global_config_1.GlobalConfig.layoutSyngentaLogoMobile;
        this.maxCharSearchFor = 100;
        //adminPages: string[] = ['useranalytics', 'updateglossary', 'metadatamanagement', 'metadatamapping', 'subscription', 'query', 'search', 'kmupload', 'viewglossary','aboutportal'];
        this.userProfileModalClasses = {
            csModalDialog: "modal-lg",
            csModalBody: "animated fadeInDown"
        };
        this.userNotification = {
            notificationList: []
        };
        this.isShowNotification = false;
        var userRole = global_util_1.GlobalUtil.getAppSession("UserInfo") ? global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] : "";
        this.isAdmin = (userRole == "Regional Admin" || userRole == "Portal Admin") ? true : false;
        //if (!this.isAdmin) {
        //    this.footerTextClasses = {
        //        'col-md-11': false,
        //        'col-sm-10': false,
        //        'col-xs-10': false,
        //        'col-md-12': true,
        //        'col-sm-12': true,
        //        'col-xs-12': true
        //    }
        //}
        //else {
        //    this.footerTextClasses = {
        //        'col-md-11': true,
        //        'col-sm-10': true,
        //        'col-xs-10': true,
        //        'col-md-12': false,
        //        'col-sm-12': false,
        //        'col-xs-12': false
        //    }
        //}
        this.username = global_util_1.GlobalUtil.getAppSession("UserInfo") ? global_util_1.GlobalUtil.getAppSession("UserInfo").firstName : "";
        this.currentYear = new Date().getFullYear().toString();
        this.onRedirect = "mypage";
        //this.loadScripts();
        this.getNotification();
    }
    LayoutComponent.prototype.userProfileClick = function () {
        var _this = this;
        this.userProfileService.getUserProfile(global_util_1.GlobalUtil.getAppSession("UserInfo").userId).subscribe(function (_userProfile) {
            _this.userProfile = _userProfile;
            _this.userProfile.name = global_util_1.GlobalUtil.getAppSession("UserInfo").firstName + " " + global_util_1.GlobalUtil.getAppSession("UserInfo").lastName;
            _this.userProfile.accessLevel = global_util_1.GlobalUtil.getAppSession("UserInfo").accessLevel;
            _this.userProfile.region = global_util_1.GlobalUtil.getAppSession("UserInfo").region;
            _this.userProfile.imageUrl = global_config_1.GlobalConfig.ProfilePicImgURL;
            _this._userProfileComponent.onOpen();
        });
    };
    LayoutComponent.prototype.ngOnInit = function () {
    };
    LayoutComponent.prototype.ngOnChanges = function () {
    };
    LayoutComponent.prototype.getNotification = function () {
        var _this = this;
        var endPoint = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.getNotificationApi.replace("{0}", global_util_1.GlobalUtil.getAppSession("UserInfo").userId);
        this.service.getNotification(endPoint).subscribe(function (result) {
            _this.userNotification = result;
            global_util_1.GlobalUtil.setAppSession("UserNotification", _this.userNotification);
        });
    };
    LayoutComponent.prototype.setNotification = function () {
        this.isShowNotification = this.isShowNotification ? false : true;
        this.deactiveNotification();
    };
    LayoutComponent.prototype.deactiveNotification = function () {
        var _this = this;
        if (!this.isShowNotification) {
            if (this.userNotification.totalActiveNotification > 0) {
                this.userNotification.deActivateList = this.userNotification.notificationList.filter(function (x) { return x.isActive == true; });
                this.userNotification.notificationList = null;
                this.userNotification.isDeactive = 1;
                this.userNotification.userId = global_util_1.GlobalUtil.getAppSession("UserInfo").userId;
                for (var count = 0; count < this.userNotification.deActivateList.length; count++) {
                    this.userNotification.deActivateList[count].description = '';
                }
                var url = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.setNotificationApi;
                var formData = new FormData();
                formData.append('model', JSON.stringify(this.userNotification));
                this.service.setNotification(url, formData).subscribe(function (result) {
                    _this.userNotification = global_util_1.GlobalUtil.getAppSession("UserNotification");
                    _this.userNotification.totalActiveNotification = 0;
                    /*setTimeout(() => {
                        this.userNotification.totalActiveNotification = 0;
                    }, 2000);*/
                });
            }
        }
    };
    LayoutComponent.prototype.viewGlossaryTarget = function () {
        if (global_util_1.GlobalUtil.getSession("pagename")) {
            return (global_util_1.GlobalUtil.getSession("pagename") == 'viewglossary' ? '_self' : '_blank');
        }
        else {
            return '_blank';
        }
    };
    //ShowFooterNote(): boolean {
    //    let footerText = this.GetFootnote();
    //    this.pagename= GlobalUtil.getSession("pagename");
    //    let pageName: string = GlobalUtil.getSession("pagename");
    //    let showFooter = ((pageName != null && pageName != "") && (this.adminPages.indexOf(pageName.toLocaleLowerCase()) < 0));
    //    showFooter = showFooter && (this.isAdmin || (footerText != undefined && footerText != null && footerText != ""))
    //    return showFooter;
    //}
    //GetFootnote(): any {
    //    this.footerHightToggle = {
    //        insightScrollDisplay: GlobalConfig.isFooterInDisplayMode && GlobalConfig.isfooterArrowDown,
    //        richTextBoxFooterNote: !GlobalConfig.isFooterInDisplayMode
    //    }
    //    this.editIconClasses = {
    //        'fa-pencil-square-o': GlobalConfig.isFooterInDisplayMode,
    //        'fa-check-circle': !GlobalConfig.isFooterInDisplayMode
    //    }
    //    this.chevronStatus = {
    //        'glyphicon-chevron-down': GlobalConfig.isfooterArrowDown,
    //        'glyphicon-chevron-up': !GlobalConfig.isfooterArrowDown
    //    }
    //    let footnote = sessionStorage.getItem('PageFootnote');
    //    if (footnote != null && footnote != "" && footnote != "[object Object]") {
    //        this.showFooterExtender = GlobalConfig.isFooterInDisplayMode;
    //        this.footNote.footnoteText = footnote;
    //        return footnote;
    //    }
    //    else {
    //        this.showFooterExtender = false;
    //        return "";
    //    }
    //}
    LayoutComponent.prototype.onSearch = function () {
        /*var searchText = this.searchItem.trim() != "" ? this.searchItem : "";
        if (searchText) {
            this.router.navigate(['layout/search', searchText]);
        }*/
        if (this.searchItem.trim()) {
            this.router.navigate(['layout/search', this.searchItem]);
            this.searchItem = "";
        }
    };
    //loadScripts() {
    //    let node = document.createElement('script');
    //    node.src = GlobalConfig.tinyMceJs;
    //    node.type = 'text/javascript';
    //    node.async = true;
    //    node.charset = 'utf-8';
    //    document.getElementsByTagName('head')[0].appendChild(node);
    //}
    //onFooterExtenderClick() {
    //    if (GlobalConfig.isfooterArrowDown) {
    //        this.chevronStatus = {
    //            'glyphicon-chevron-down': false,
    //            'glyphicon-chevron-up': true
    //        }
    //        this.footerHightToggle = {
    //            insightScrollDisplay: false,
    //            richTextBoxFooterNote: false
    //        };
    //    }
    //    else {
    //        this.chevronStatus = {
    //            'glyphicon-chevron-down': true,
    //            'glyphicon-chevron-up': false
    //        }
    //        this.footerHightToggle = {
    //            insightScrollDisplay: true,
    //            richTextBoxFooterNote: false
    //        };
    //    }
    //    GlobalConfig.isfooterArrowDown = !GlobalConfig.isfooterArrowDown;
    //}
    LayoutComponent.prototype.scrollToTop = function () {
        scroll(0, 0);
    };
    //editFootnote(event: any): boolean {
    //    let richTextBoxId: HTMLElement = document.getElementById('richTextInsight');
    //    if (event.target.classList.contains('fa-pencil-square-o')) {//Pen  
    //        GlobalConfig.isFooterInDisplayMode = false;
    //        GlobalConfig.isfooterArrowDown = true;
    //        let options = {
    //            height: '80',
    //            max_chars: '2000',
    //            selector: '#richTextInsight',
    //            menubar: false,
    //            statusbar: false,
    //            inline: true,
    //            plugins: ['link', 'paste'],
    //            toolbar: "undo redo | bold italic underline | link | alignleft aligncenter alignright | charmap",
    //            content_css: [GlobalConfig.bootstrapMin, GlobalConfig.styleCss],
    //            setup: (editor: any) => {
    //                this.editor = editor;
    //                this.editor.on('keyup', (ev: any) => {
    //                    this.snapshotDesc = editor.getContent();
    //                    if (this.snapshotDesc.length > editor.getParam('max_chars')) {
    //                        if (ev.keyCode != 8) {
    //                            alert('Max ' + editor.getParam('max_chars') + ' characters are allowed in richtext area.');
    //                            ev.preventDefault();// backspace (8) / delete (46)
    //                            return false;
    //                        }
    //                    }
    //                });
    //                this.editor.on('init', () => {
    //                    editor.setContent(GlobalUtil.getSession("PageFootnote") || '');
    //                });
    //            }
    //        };
    //        tinymce.init(options);
    //        //Change the edit button image.
    //        this.editIconClasses = {
    //            'fa-pencil-square-o': false,
    //            'fa-check-circle': true
    //        }
    //        //event.target.classList.add('fa-check-circle');
    //        //event.target.classList.remove('fa-pencil-square-o');
    //        event.target.title = "Save changes";
    //        //richTextBoxId.classList.add('richTextBoxFooterNote');
    //        // this.showFooterExtender = false;
    //    }
    //    else if (event.target.classList.contains('fa-check-circle')) {//Right Tick
    //        //  this.showFooterExtender = true;
    //        GlobalConfig.isFooterInDisplayMode = true;
    //        if (this.editor.getContent().length > this.editor.getParam('max_chars')) {
    //            alert('Max ' + this.editor.getParam('max_chars') + ' characters are allowed in richtext area.');
    //            return false;
    //        }
    //        this.footNote.pageName = GlobalUtil.getSession("pagename");
    //        this.footNote.cropId = (this.footNote.pageName == "CropIndicatorOverview" || this.footNote.pageName == "CropIndicatorUSPrice") ? GlobalUtil.getSession("CropId") : null;
    //        this.footNote.competitorId = (this.footNote.pageName == "CiSnapshot" || this.footNote.pageName == "CiFinancials" || this.footNote.pageName == "CiFinancialsRatio" || this.footNote.pageName == "CiNews") ? GlobalUtil.getSession("CompetitorId") : null;
    //        this.footNote.footnoteText = this.editor.getContent();
    //        if (this.footNote.pageName != null && this.footNote.pageName.trim() != ""
    //            && this.footNote.footnoteText != null) {
    //            GlobalUtil.setSession("PageFootnote", this.footNote.footnoteText);
    //            this.service.saveFootnote(this.footNote).subscribe(result => {
    //            });
    //        }
    //        tinymce.remove(this.editor);
    //        //Change the edit button image.
    //        this.editIconClasses = {
    //            'fa-pencil-square-o': true,
    //            'fa-check-circle': false
    //        }
    //        //event.target.classList.add('fa-pencil-square-o');
    //        //event.target.classList.remove('fa-check-circle');
    //        event.target.title = "Add/Edit";
    //        // richTextBoxId.classList.remove('richTextBoxFooterNote');
    //    }
    //    return true;
    //}
    LayoutComponent.prototype.ngOnDestroy = function () {
        tinymce.remove(this.editor);
    };
    LayoutComponent.prototype.GetFAQ = function () {
        // window.open(GlobalConfig.baseEndpointExport + GlobalConfig.DownloadDocApi + "?FileName=" + GlobalConfig.faqFileName,'_blank');
        var a = window.document.createElement("a");
        a.href = global_config_1.GlobalConfig.baseEndpointExport + global_config_1.GlobalConfig.DownloadDocApi + "?FileName=" + global_config_1.GlobalConfig.faqFileName;
        a.download = global_config_1.GlobalConfig.faqFileName;
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    LayoutComponent.prototype.getGuide = function () {
        var a = window.document.createElement("a");
        a.href = global_config_1.GlobalConfig.baseEndpointExport + global_config_1.GlobalConfig.DownloadDocApi + "?FileName=" + global_config_1.GlobalConfig.quickStartGuideFileName;
        a.download = global_config_1.GlobalConfig.quickStartGuideFileName;
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    LayoutComponent.prototype.onKeypress = function (event) {
        if (event.target.value.length > this.maxCharSearchFor) {
            event.preventDefault();
        }
    };
    LayoutComponent.prototype.onChange = function (event) {
        if (event.target.value.length > this.maxCharSearchFor) {
            this.searchItem = event.target.value.substring(0, (this.maxCharSearchFor));
        }
    };
    LayoutComponent.prototype.onLogout = function () {
        global_util_1.GlobalUtil.clearAppSession("UserInfo");
        global_util_1.GlobalUtil.clearAppSession("RequestedUrl");
        if (global_config_1.GlobalConfig.isAadAuth) {
            global_util_1.GlobalUtil.clearSession("IsAppAuthenticated");
            if (AuthenticationContext._user == undefined) {
                AuthenticationContext = new AuthenticationContext(global_config_1.GlobalConfig.adalConfig());
            }
            AuthenticationContext.logOut();
        }
        else {
            this.router.navigateByUrl('login');
        }
        /*var userId = GlobalUtil.getAppSession("UserInfo").userId;
        this.service.killUserToken(userId).subscribe(result => {
            GlobalUtil.clearAppSession("UserInfo");
            GlobalUtil.clearAppSession("RequestedUrl");
            if (GlobalConfig.isAadAuth) {
                GlobalUtil.clearSession("IsAppAuthenticated");
                if (AuthenticationContext._user == undefined) {
                    AuthenticationContext = new AuthenticationContext(GlobalConfig.adalConfig());
                }
                AuthenticationContext.logOut();
            }
            else {
                this.router.navigateByUrl('login');
            }
        }, error => {
            if (GlobalConfig.isAadAuth) {
                GlobalUtil.clearSession("IsAppAuthenticated");
                if (AuthenticationContext._user == undefined) {
                    AuthenticationContext = new AuthenticationContext(GlobalConfig.adalConfig());
                }
                AuthenticationContext.logOut();
            }
            else {
                this.router.navigateByUrl('login');
            }
        });*/
    };
    //onClickQuery(action: string) {
    //    if (action == 'view') {
    //        var user = this.isAdmin ? "" : GlobalUtil.getAppSession("UserInfo").userName;
    //        var queryApi: string = GlobalConfig.baseEndpont + GlobalConfig.queryGetApi.replace("{0}", user);
    //        this.queryService.get(queryApi).subscribe(result => {
    //            this.queryData = result;
    //            this.queryAction = action;
    //            this.title = "My Queries";
    //            this.onClickQueryView.onOpen();
    //        });
    //    }
    //    if (action == 'save') {
    //        this.queryAction = action;
    //        this.title = "Ask us a Question";
    //        this.onClickQueryView.onOpen();
    //    }
    //}
    LayoutComponent.prototype.onBodyClick = function (event) {
        if (event.target.id != "ic_Notification" && this.isShowNotification) {
            this.isShowNotification = false;
            this.deactiveNotification();
        }
    };
    __decorate([
        core_1.ViewChild(userprofile_component_1.UserProfileComponent), 
        __metadata('design:type', userprofile_component_1.UserProfileComponent)
    ], LayoutComponent.prototype, "_userProfileComponent", void 0);
    LayoutComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-layout',
            templateUrl: 'layout.component.html',
            providers: [layout_service_1.LayoutService],
            host: {
                '(document:click)': 'onBodyClick($event)',
            }
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, layout_service_1.LayoutService, userprofile_service_1.UserProfileService, core_1.ElementRef])
    ], LayoutComponent);
    return LayoutComponent;
}());
exports.LayoutComponent = LayoutComponent;
//# sourceMappingURL=layout.component.js.map