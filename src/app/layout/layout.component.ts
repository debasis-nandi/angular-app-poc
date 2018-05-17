
import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { GlobalConfig, Page } from '../global/global.config';
import { GlobalUtil } from '../global/global.util';
import { IFootNote, IUserNotification } from './layout.model';
import { IUserProfile } from '../widgets/userprofile/userprofile.model'
import { LayoutService } from './layout.service';
import { UserProfileService } from '../widgets/userprofile/userprofile.service';
import { UserProfileComponent } from '../widgets/userprofile/userprofile.component';
import { ModalDetail } from '../widgets/modals/modal.model';
//import { QueryService } from '../query/query.service';
//import { IQueryModel } from '../query/query.model';
//import { QueryComponent } from '../query/query.component';

declare var tinymce: any;
declare var AuthenticationContext: any;

@Component({
    moduleId: module.id,
    selector: 'my-layout',
    templateUrl: 'layout.component.html',
    providers: [LayoutService],
    host: {
        '(document:click)': 'onBodyClick($event)',
    }
})

export class LayoutComponent implements OnInit {
    @ViewChild(UserProfileComponent) _userProfileComponent: UserProfileComponent;
    //@ViewChild(QueryComponent) onClickQueryView: QueryComponent;

    currentYear: string;
    username: string;
    onRedirect: string;
    searchItem: string;

    isAdmin: boolean;
    currentInsightData: string;
    currentWidgetId: number;
    editor: any;
    snapshotDesc: string;
   // footNote: IFootNote = {};
    logoPath: string = GlobalConfig.layoutSyngentaLogo;
    logoMobilePath: string = GlobalConfig.layoutSyngentaLogoMobile;
    maxCharSearchFor: number = 100;
    //adminPages: string[] = ['useranalytics', 'updateglossary', 'metadatamanagement', 'metadatamapping', 'subscription', 'query', 'search', 'kmupload', 'viewglossary','aboutportal'];
    userProfileModalClasses: ModalDetail = {
        csModalDialog: "modal-lg",
        csModalBody: "animated fadeInDown"
    }
    //arrowDown: boolean = true;
    userProfile: IUserProfile;
    //footerHightToggle: {
    //    insightScrollDisplay: boolean,
    //    richTextBoxFooterNote: boolean
    //}
    //editIconClasses: {
    //    'fa-pencil-square-o': boolean,
    //    'fa-check-circle': boolean
    //}
    //showFooterExtender: boolean = true;
    //footerTextClasses: {
    //    'col-md-11': boolean,
    //    'col-sm-10': boolean,
    //    'col-xs-10': boolean,
    //    'col-md-12': boolean,
    //    'col-sm-12': boolean,
    //    'col-xs-12': boolean
    //}
    //chevronStatus: {
    //    'glyphicon-chevron-down': boolean,
    //    'glyphicon-chevron-up': boolean
    //}
    //queryData: IQueryModel = {
    //    tableHead: [],
    //    kpiData: []
    //};
    queryAction: string;
    title: string;

    userNotification: IUserNotification = {
        notificationList: []
    };

    isShowNotification: boolean = false;
    pagename: string;
    constructor(private router: Router, private activeRoute: ActivatedRoute, private service: LayoutService, private userProfileService: UserProfileService, private _eref: ElementRef
        //, private queryService: QueryService
    ) {
        var userRole = GlobalUtil.getAppSession("UserInfo") ? GlobalUtil.getAppSession("UserInfo").roles[0] : "";
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

        this.username = GlobalUtil.getAppSession("UserInfo") ? GlobalUtil.getAppSession("UserInfo").firstName : "";
        this.currentYear = new Date().getFullYear().toString();
        this.onRedirect = "mypage";
        //this.loadScripts();
        this.getNotification();       
    }

    userProfileClick() {
        this.userProfileService.getUserProfile(GlobalUtil.getAppSession("UserInfo").userId).subscribe(_userProfile => {
            this.userProfile = _userProfile;
            this.userProfile.name = GlobalUtil.getAppSession("UserInfo").firstName + " " + GlobalUtil.getAppSession("UserInfo").lastName
            this.userProfile.accessLevel = GlobalUtil.getAppSession("UserInfo").accessLevel;
            this.userProfile.region = GlobalUtil.getAppSession("UserInfo").region;
            this.userProfile.imageUrl = GlobalConfig.ProfilePicImgURL;
            this._userProfileComponent.onOpen();
        });
    }

    ngOnInit() {
    }

    ngOnChanges() {
    }

    getNotification(): void {
        var endPoint = GlobalConfig.baseEndpont + GlobalConfig.getNotificationApi.replace("{0}", GlobalUtil.getAppSession("UserInfo").userId);
        this.service.getNotification(endPoint).subscribe(result => {
            this.userNotification = result;
            GlobalUtil.setAppSession("UserNotification", this.userNotification);
        });
    }

    setNotification(): void {
        this.isShowNotification = this.isShowNotification ? false : true;
        this.deactiveNotification();
    }

    deactiveNotification(): void {

        if (!this.isShowNotification) {

            if (this.userNotification.totalActiveNotification > 0) {

                this.userNotification.deActivateList = this.userNotification.notificationList.filter(x => x.isActive == true);
                this.userNotification.notificationList = null;
                this.userNotification.isDeactive = 1;
                this.userNotification.userId = GlobalUtil.getAppSession("UserInfo").userId;

                for (var count = 0; count < this.userNotification.deActivateList.length; count++) {
                    this.userNotification.deActivateList[count].description = '';
                }

                var url = GlobalConfig.baseEndpont + GlobalConfig.setNotificationApi;
                let formData: FormData = new FormData();
                formData.append('model', JSON.stringify(this.userNotification));

                this.service.setNotification(url, formData).subscribe(result => {
                    this.userNotification = GlobalUtil.getAppSession("UserNotification");
                    this.userNotification.totalActiveNotification = 0;
                    /*setTimeout(() => {
                        this.userNotification.totalActiveNotification = 0;
                    }, 2000);*/
                });
            }
        }

    }
    viewGlossaryTarget() {
        if (GlobalUtil.getSession("pagename")) {
            return ((GlobalUtil.getSession("pagename") as string) == 'viewglossary' ? '_self' :'_blank');
        }
        else {
            return '_blank';
        }
    }
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

    onSearch() {
        /*var searchText = this.searchItem.trim() != "" ? this.searchItem : "";
        if (searchText) {
            this.router.navigate(['layout/search', searchText]);
        }*/

        if (this.searchItem.trim()) {
            this.router.navigate(['layout/search', this.searchItem]);
            this.searchItem = "";
        }
    }

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
    scrollToTop() {
        scroll(0, 0);
    }
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

    ngOnDestroy(): void {
        tinymce.remove(this.editor);
    }
    GetFAQ() {
        // window.open(GlobalConfig.baseEndpointExport + GlobalConfig.DownloadDocApi + "?FileName=" + GlobalConfig.faqFileName,'_blank');
        var a = window.document.createElement("a");
        a.href = GlobalConfig.baseEndpointExport + GlobalConfig.DownloadDocApi + "?FileName=" + GlobalConfig.faqFileName;
        a.download = GlobalConfig.faqFileName;
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    getGuide() {
        var a = window.document.createElement("a");
        a.href = GlobalConfig.baseEndpointExport + GlobalConfig.DownloadDocApi + "?FileName=" + GlobalConfig.quickStartGuideFileName;
        a.download = GlobalConfig.quickStartGuideFileName;
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    onKeypress(event: any) {
        if (event.target.value.length > this.maxCharSearchFor) {
            event.preventDefault();
        }
    }

    onChange(event: any) {
        if (event.target.value.length > this.maxCharSearchFor) {
            this.searchItem = event.target.value.substring(0, (this.maxCharSearchFor))
        }
    }

    onLogout() {
        
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
    }

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

    onBodyClick(event: any) {
        if (event.target.id != "ic_Notification" && this.isShowNotification) {
            this.isShowNotification = false;
            this.deactiveNotification()
        }
    }

}






