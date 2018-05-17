import { Component, OnInit } from '@angular/core';
import { GlobalConfig } from '../../global/global.config';
import { GlobalUtil } from '../../global/global.util';
import { IFootNote } from '../../layout/layout.model';
import { LayoutService } from '../../layout/layout.service';
import { EditorClasses } from '../tinymce/tinymce.directive';
//declare var tinymce: any;

@Component({
    moduleId: module.id,
    selector: 'my-footer-note',
    templateUrl: 'footer-note.component.html'
})
export class FooterNoteComponent implements OnInit {
    initEditor = false;
    EditorId:any='footernoteid'
    footerClasses: EditorClasses[];
    footerHightToggle: {
        insightScrollDisplay: boolean,
        richTextBoxFooterNote: boolean
    }
    maxAllowedLength = 2000;
    editIconClasses: {
        'fa-pencil-square-o': boolean,
        'fa-check-circle': boolean
    }
    showFooterExtender: boolean = true;
    footerTextClasses: {
        'col-md-11': boolean,
        'col-sm-10': boolean,
        'col-xs-10': boolean,
        'col-md-12': boolean,
        'col-sm-12': boolean,
        'col-xs-12': boolean
    }
    chevronStatus: {
        'glyphicon-chevron-down': boolean,
        'glyphicon-chevron-up': boolean
    }
    isAdmin: boolean;
    //editor: any;
   // adminPages: string[] = ['useranalytics', 'updateglossary', 'metadatamanagement', 'metadatamapping', 'subscription', 'query', 'search', 'kmupload', 'viewglossary', 'aboutportal', 'aboutteam','authorise'];
    footNote: IFootNote = {};
    snapshotDesc: string = "";
    charLeft: number = this.maxAllowedLength;
    constructor(private service: LayoutService) {
        this.loadScripts();
        this.footerClasses = [];
        var userRole = GlobalUtil.getAppSession("UserInfo") ? GlobalUtil.getAppSession("UserInfo").roles[0] : "";
        this.isAdmin = (userRole == "Portal Admin" || userRole == "Regional Admin")? true : false;
        if (!this.isAdmin) {
            this.footerTextClasses = {
                'col-md-11': false,
                'col-sm-10': false,
                'col-xs-10': false,
                'col-md-12': true,
                'col-sm-12': true,
                'col-xs-12': true
            }
        }
        else {
            this.footerTextClasses = {
                'col-md-11': true,
                'col-sm-10': true,
                'col-xs-10': true,
                'col-md-12': false,
                'col-sm-12': false,
                'col-xs-12': false
            }
        }
    }
    ShowFooterNote(): boolean {
        let footerText = this.GetFootnote();
        let pageName: string = GlobalUtil.getSession("pagename");
        let showFooter = ((pageName != null && pageName != "") && (GlobalConfig.hideFooter.indexOf(pageName.toLocaleLowerCase()) < 0));
        showFooter = showFooter && (this.isAdmin || (footerText != undefined && footerText != null && footerText != ""))
        return showFooter;
    }
    EditorContentChangeHandler(content: any) {
        this.snapshotDesc = content;
    }
    GetFootnote(): any {
        this.footerClasses = [];
        if (GlobalConfig.isFooterInDisplayMode) {
            this.initEditor =false;
        }
        this.footerClasses.push({ className: 'insightScrollDisplay', isAdd: (GlobalConfig.isFooterInDisplayMode && GlobalConfig.isfooterArrowDown) }, { className: 'richTextBoxFooterNote', isAdd: !GlobalConfig.isFooterInDisplayMode })
        this.footerHightToggle = {
            insightScrollDisplay: GlobalConfig.isFooterInDisplayMode && GlobalConfig.isfooterArrowDown,
            richTextBoxFooterNote: !GlobalConfig.isFooterInDisplayMode
        }
        this.editIconClasses = {
            'fa-pencil-square-o': GlobalConfig.isFooterInDisplayMode,
            'fa-check-circle': !GlobalConfig.isFooterInDisplayMode
        }
        this.chevronStatus = {
            'glyphicon-chevron-down': GlobalConfig.isfooterArrowDown,
            'glyphicon-chevron-up': !GlobalConfig.isfooterArrowDown
        }
        let footnote = sessionStorage.getItem('PageFootnote');
        if (footnote != null && footnote != "" && footnote != "[object Object]") {
            this.showFooterExtender = GlobalConfig.isFooterInDisplayMode;
            if (GlobalConfig.isFooterInDisplayMode) {
                this.snapshotDesc = footnote;
            }
            this.footNote.footnoteText = footnote;
            return footnote;
        }
        else {
            this.showFooterExtender = false;
            if (GlobalConfig.isFooterInDisplayMode) {
                this.snapshotDesc = "";
            }
            return "";
        }
    }
    loadScripts() {
        let node = document.createElement('script');
        node.src = GlobalConfig.tinyMceJs;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }
    onFooterExtenderClick() {
        if (GlobalConfig.isfooterArrowDown) {
            this.chevronStatus = {
                'glyphicon-chevron-down': false,
                'glyphicon-chevron-up': true
            }
            this.footerClasses = [];
            this.footerClasses.push({ className: 'insightScrollDisplay', isAdd: false }, { className: 'richTextBoxFooterNote', isAdd: false })
            this.footerHightToggle = {
                insightScrollDisplay: false,
                richTextBoxFooterNote: false
            };

        }
        else {
            this.chevronStatus = {
                'glyphicon-chevron-down': true,
                'glyphicon-chevron-up': false
            }
            this.footerClasses = [];
            this.footerClasses.push({ className: 'insightScrollDisplay', isAdd: true }, { className: 'richTextBoxFooterNote', isAdd: false })
            this.footerHightToggle = {
                insightScrollDisplay: true,
                richTextBoxFooterNote: false
            };
        }
        GlobalConfig.isfooterArrowDown = !GlobalConfig.isfooterArrowDown;
    }
    ChartLeftHandler(value: number) {
        this.charLeft = value;
    }
    editFootnote(event: any): boolean {
        let richTextBoxId: HTMLElement = document.getElementById('richTextInsight');
        if (event.target.classList.contains('fa-pencil-square-o')) {//Pen  

            GlobalConfig.isFooterInDisplayMode = false;
            GlobalConfig.isfooterArrowDown = true;
            this.initEditor = true;

            //Change the edit button image.
            this.footerClasses = [];
            this.footerClasses.push({ className: 'insightScrollDisplay', isAdd: true }, { className: 'richTextBoxFooterNote', isAdd: false })
            this.editIconClasses = {
                'fa-pencil-square-o': false,
                'fa-check-circle': true
            }

            event.target.title = "Save changes";

        }
        else if (event.target.classList.contains('fa-check-circle')) {//Right Tick

            if (this.charLeft < 0) {
                alert('Maximum ' + this.maxAllowedLength + ' characters are allowed.');
                return false;
            }
            GlobalConfig.isFooterInDisplayMode = true;
            this.footNote.pageName = GlobalUtil.getSession("pagename");

            this.footNote.cropId = (this.footNote.pageName == "CropIndicatorOverview" || this.footNote.pageName == "CropIndicatorUSPrice") ? GlobalUtil.getSession("CropId") : null;

            this.footNote.competitorId = (this.footNote.pageName == "CiSnapshot" || this.footNote.pageName == "CiFinancials" || this.footNote.pageName == "CiFinancialsRatio" || this.footNote.pageName == "CiNews") ? GlobalUtil.getSession("CompetitorId") : null;

            
            this.footNote.footnoteText = this.snapshotDesc;
            if (this.footNote.pageName != null && this.footNote.pageName.trim() != ""
                && this.footNote.footnoteText != null) {

                GlobalUtil.setSession("PageFootnote", this.footNote.footnoteText);
                this.service.saveFootnote(this.footNote).subscribe(result => {

                });
            }
           // this.initEditor = false;
            //tinymce.remove(this.editor);

            //Change the edit button image.
            this.footerClasses = [];
            this.footerClasses.push({ className: 'insightScrollDisplay', isAdd: false }, { className: 'richTextBoxFooterNote', isAdd: true })
            this.editIconClasses = {
                'fa-pencil-square-o': true,
                'fa-check-circle': false
            }
            event.target.title = "Add/Edit";
        }
        return true;
    }
    
    ngOnDestroy(): void {
        this.initEditor = false;
    }
    ngOnInit() {

    }
}