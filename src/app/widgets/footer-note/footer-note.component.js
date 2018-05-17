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
var global_config_1 = require('../../global/global.config');
var global_util_1 = require('../../global/global.util');
var layout_service_1 = require('../../layout/layout.service');
//declare var tinymce: any;
var FooterNoteComponent = (function () {
    function FooterNoteComponent(service) {
        this.service = service;
        this.initEditor = false;
        this.EditorId = 'footernoteid';
        this.maxAllowedLength = 2000;
        this.showFooterExtender = true;
        //editor: any;
        // adminPages: string[] = ['useranalytics', 'updateglossary', 'metadatamanagement', 'metadatamapping', 'subscription', 'query', 'search', 'kmupload', 'viewglossary', 'aboutportal', 'aboutteam','authorise'];
        this.footNote = {};
        this.snapshotDesc = "";
        this.charLeft = this.maxAllowedLength;
        this.loadScripts();
        this.footerClasses = [];
        var userRole = global_util_1.GlobalUtil.getAppSession("UserInfo") ? global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] : "";
        this.isAdmin = (userRole == "Portal Admin" || userRole == "Regional Admin") ? true : false;
        if (!this.isAdmin) {
            this.footerTextClasses = {
                'col-md-11': false,
                'col-sm-10': false,
                'col-xs-10': false,
                'col-md-12': true,
                'col-sm-12': true,
                'col-xs-12': true
            };
        }
        else {
            this.footerTextClasses = {
                'col-md-11': true,
                'col-sm-10': true,
                'col-xs-10': true,
                'col-md-12': false,
                'col-sm-12': false,
                'col-xs-12': false
            };
        }
    }
    FooterNoteComponent.prototype.ShowFooterNote = function () {
        var footerText = this.GetFootnote();
        var pageName = global_util_1.GlobalUtil.getSession("pagename");
        var showFooter = ((pageName != null && pageName != "") && (global_config_1.GlobalConfig.hideFooter.indexOf(pageName.toLocaleLowerCase()) < 0));
        showFooter = showFooter && (this.isAdmin || (footerText != undefined && footerText != null && footerText != ""));
        return showFooter;
    };
    FooterNoteComponent.prototype.EditorContentChangeHandler = function (content) {
        this.snapshotDesc = content;
    };
    FooterNoteComponent.prototype.GetFootnote = function () {
        this.footerClasses = [];
        if (global_config_1.GlobalConfig.isFooterInDisplayMode) {
            this.initEditor = false;
        }
        this.footerClasses.push({ className: 'insightScrollDisplay', isAdd: (global_config_1.GlobalConfig.isFooterInDisplayMode && global_config_1.GlobalConfig.isfooterArrowDown) }, { className: 'richTextBoxFooterNote', isAdd: !global_config_1.GlobalConfig.isFooterInDisplayMode });
        this.footerHightToggle = {
            insightScrollDisplay: global_config_1.GlobalConfig.isFooterInDisplayMode && global_config_1.GlobalConfig.isfooterArrowDown,
            richTextBoxFooterNote: !global_config_1.GlobalConfig.isFooterInDisplayMode
        };
        this.editIconClasses = {
            'fa-pencil-square-o': global_config_1.GlobalConfig.isFooterInDisplayMode,
            'fa-check-circle': !global_config_1.GlobalConfig.isFooterInDisplayMode
        };
        this.chevronStatus = {
            'glyphicon-chevron-down': global_config_1.GlobalConfig.isfooterArrowDown,
            'glyphicon-chevron-up': !global_config_1.GlobalConfig.isfooterArrowDown
        };
        var footnote = sessionStorage.getItem('PageFootnote');
        if (footnote != null && footnote != "" && footnote != "[object Object]") {
            this.showFooterExtender = global_config_1.GlobalConfig.isFooterInDisplayMode;
            if (global_config_1.GlobalConfig.isFooterInDisplayMode) {
                this.snapshotDesc = footnote;
            }
            this.footNote.footnoteText = footnote;
            return footnote;
        }
        else {
            this.showFooterExtender = false;
            if (global_config_1.GlobalConfig.isFooterInDisplayMode) {
                this.snapshotDesc = "";
            }
            return "";
        }
    };
    FooterNoteComponent.prototype.loadScripts = function () {
        var node = document.createElement('script');
        node.src = global_config_1.GlobalConfig.tinyMceJs;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    };
    FooterNoteComponent.prototype.onFooterExtenderClick = function () {
        if (global_config_1.GlobalConfig.isfooterArrowDown) {
            this.chevronStatus = {
                'glyphicon-chevron-down': false,
                'glyphicon-chevron-up': true
            };
            this.footerClasses = [];
            this.footerClasses.push({ className: 'insightScrollDisplay', isAdd: false }, { className: 'richTextBoxFooterNote', isAdd: false });
            this.footerHightToggle = {
                insightScrollDisplay: false,
                richTextBoxFooterNote: false
            };
        }
        else {
            this.chevronStatus = {
                'glyphicon-chevron-down': true,
                'glyphicon-chevron-up': false
            };
            this.footerClasses = [];
            this.footerClasses.push({ className: 'insightScrollDisplay', isAdd: true }, { className: 'richTextBoxFooterNote', isAdd: false });
            this.footerHightToggle = {
                insightScrollDisplay: true,
                richTextBoxFooterNote: false
            };
        }
        global_config_1.GlobalConfig.isfooterArrowDown = !global_config_1.GlobalConfig.isfooterArrowDown;
    };
    FooterNoteComponent.prototype.ChartLeftHandler = function (value) {
        this.charLeft = value;
    };
    FooterNoteComponent.prototype.editFootnote = function (event) {
        var richTextBoxId = document.getElementById('richTextInsight');
        if (event.target.classList.contains('fa-pencil-square-o')) {
            global_config_1.GlobalConfig.isFooterInDisplayMode = false;
            global_config_1.GlobalConfig.isfooterArrowDown = true;
            this.initEditor = true;
            //Change the edit button image.
            this.footerClasses = [];
            this.footerClasses.push({ className: 'insightScrollDisplay', isAdd: true }, { className: 'richTextBoxFooterNote', isAdd: false });
            this.editIconClasses = {
                'fa-pencil-square-o': false,
                'fa-check-circle': true
            };
            event.target.title = "Save changes";
        }
        else if (event.target.classList.contains('fa-check-circle')) {
            if (this.charLeft < 0) {
                alert('Maximum ' + this.maxAllowedLength + ' characters are allowed.');
                return false;
            }
            global_config_1.GlobalConfig.isFooterInDisplayMode = true;
            this.footNote.pageName = global_util_1.GlobalUtil.getSession("pagename");
            this.footNote.cropId = (this.footNote.pageName == "CropIndicatorOverview" || this.footNote.pageName == "CropIndicatorUSPrice") ? global_util_1.GlobalUtil.getSession("CropId") : null;
            this.footNote.competitorId = (this.footNote.pageName == "CiSnapshot" || this.footNote.pageName == "CiFinancials" || this.footNote.pageName == "CiFinancialsRatio" || this.footNote.pageName == "CiNews") ? global_util_1.GlobalUtil.getSession("CompetitorId") : null;
            this.footNote.footnoteText = this.snapshotDesc;
            if (this.footNote.pageName != null && this.footNote.pageName.trim() != ""
                && this.footNote.footnoteText != null) {
                global_util_1.GlobalUtil.setSession("PageFootnote", this.footNote.footnoteText);
                this.service.saveFootnote(this.footNote).subscribe(function (result) {
                });
            }
            // this.initEditor = false;
            //tinymce.remove(this.editor);
            //Change the edit button image.
            this.footerClasses = [];
            this.footerClasses.push({ className: 'insightScrollDisplay', isAdd: false }, { className: 'richTextBoxFooterNote', isAdd: true });
            this.editIconClasses = {
                'fa-pencil-square-o': true,
                'fa-check-circle': false
            };
            event.target.title = "Add/Edit";
        }
        return true;
    };
    FooterNoteComponent.prototype.ngOnDestroy = function () {
        this.initEditor = false;
    };
    FooterNoteComponent.prototype.ngOnInit = function () {
    };
    FooterNoteComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-footer-note',
            templateUrl: 'footer-note.component.html'
        }), 
        __metadata('design:paramtypes', [layout_service_1.LayoutService])
    ], FooterNoteComponent);
    return FooterNoteComponent;
}());
exports.FooterNoteComponent = FooterNoteComponent;
//# sourceMappingURL=footer-note.component.js.map