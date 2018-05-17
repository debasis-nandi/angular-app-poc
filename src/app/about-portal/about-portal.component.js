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
var about_portal_service_1 = require('./about-portal.service');
var global_config_1 = require('../global/global.config');
var global_util_1 = require('../global/global.util');
var AboutPortalComponent = (function () {
    function AboutPortalComponent(objAboutPortal) {
        this.objAboutPortal = objAboutPortal;
        this.aboutPortal = {};
        this.isAdmin = (global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
        this.startIndex = 1;
        this.editIndex = -1;
        this.loading = false;
        this.statusClass = {
            green1: true,
            red: false
        };
    }
    AboutPortalComponent.prototype.loadScripts = function () {
        var node = document.createElement('script');
        node.src = global_config_1.GlobalConfig.tinyMceJs;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    };
    AboutPortalComponent.prototype.ngOnInit = function () {
        this.getPortalInfo();
    };
    AboutPortalComponent.prototype.onCancel = function () {
        this.editIndex = -1;
    };
    AboutPortalComponent.prototype.onUpdate = function (updateddata) {
        var _this = this;
        if (this.editor.getContent().length > this.editor.getParam('max_chars')) {
            this.statusClass.green1 = false;
            this.statusClass.red = true;
            this.errorDefMsg = "Maximum " + this.editor.getParam('max_chars') + " characters are allowed.";
            setTimeout(function () {
                _this.errorDefMsg = "";
            }, 3000);
        }
        else if (this.editor.getContent().length == 0) {
            this.statusClass.green1 = false;
            this.statusClass.red = true;
            this.errorDefMsg = "Please enter definition";
            setTimeout(function () {
                _this.errorDefMsg = "";
            }, 3000);
        }
        this.loading = true;
        updateddata.definition = this.editor.getContent();
        var userData = global_util_1.GlobalUtil.getAppSession('UserInfo').userId;
        //let userData = GlobalUtil.getAppSession('UserInfo');
        this.aboutPortal.id = updateddata.termId;
        this.aboutPortal.portalInfo = updateddata.definition;
        this.aboutPortal.updatedBy = (userData != null) ? userData.userName : '';
        this.updatePortalInfo(this.aboutPortal);
        this.editIndex = -1;
    };
    AboutPortalComponent.prototype.onSelect = function () {
        this.editIndex = 1;
    };
    AboutPortalComponent.prototype.getPortalInfo = function () {
        var _this = this;
        var url = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.getPortalInfoApi;
        this.objAboutPortal.get(url).subscribe(function (result) {
            _this.aboutPortal = result;
            _this.glossaryData = [];
            _this.glossaryData["term"] = 'term';
            _this.glossaryData["termId"] = _this.aboutPortal.id;
            _this.glossaryData["definition"] = _this.aboutPortal.portalInfo;
            _this.glossaryData["userId"] = _this.aboutPortal.updatedBy;
        }, function (error) { });
    };
    AboutPortalComponent.prototype.updatePortalInfo = function (updateddata) {
        var _this = this;
        var url = global_config_1.GlobalConfig.baseEndpont + global_config_1.GlobalConfig.updatePortalInfoApi;
        this.objAboutPortal.post(url, updateddata).subscribe(function (result) {
            _this.aboutPortal = result;
            _this.glossaryData = [];
            _this.glossaryData["termId"] = _this.aboutPortal.id;
            _this.glossaryData["definition"] = _this.aboutPortal.portalInfo;
            _this.glossaryData["userId"] = _this.aboutPortal.updatedBy;
            _this.loading = false;
        }, function (error) { });
    };
    AboutPortalComponent.prototype.settingTinymce = function () {
        var _this = this;
        var options = {
            height: '400',
            width: '100%',
            min_width: '800px',
            max_chars: '10000',
            selector: '#aboutDefinition',
            menubar: true,
            menu: {
                file: { title: 'File', items: 'newdocument' },
                edit: { title: 'Edit', items: 'undo redo | cut copy | selectall' },
                insert: { title: 'Insert', items: 'link media | template hr' },
                view: { title: 'View', items: 'visualaid' },
                format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat' },
                table: { title: 'Table', items: 'inserttable tableprops deletetable | cell row column' },
                tools: { title: 'Tools', items: 'spellchecker code' }
            },
            statusbar: true,
            inline: true,
            //plugins: ['link', 'paste'],
            //toolbar: "undo redo | bold italic underline | link | alignleft aligncenter alignright | charmap",
            plugins: ['link', 'paste', 'table', 'image', 'code', 'preview', 'textcolor', 'colorpicker'],
            toolbar: "undo redo | styleselect | bold italic | link | alignleft aligncenter alignright | charmap image code preview | forecolor backcolor",
            content_css: [global_config_1.GlobalConfig.bootstrapMin, global_config_1.GlobalConfig.styleCss],
            setup: function (editor) {
                _this.editor = editor;
                _this.editor.on('keyup', function (ev) {
                    _this.glossaryDef = editor.getContent();
                    //if (this.glossaryDef.length > editor.getParam('max_chars')) {
                    //    if (ev.keyCode != 8) {
                    //        alert('Max ' + editor.getParam('max_chars') + ' characters are allowed in glossary definition.');
                    //        ev.preventDefault();// backspace (8) / delete (46)
                    //        return false;
                    //    }
                    //}
                });
                _this.editor.on('init', function () {
                    editor.setContent('');
                    editor.setContent(_this.glossaryData["definition"]);
                });
            },
            // enable title field in the Image dialog
            image_title: true,
            // enable automatic uploads of images represented by blob or data URIs
            automatic_uploads: true,
            // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
            images_upload_url: 'postAcceptor.php',
            // here we add custom filepicker only to Image dialog
            file_picker_types: 'image',
            // and here's our custom image picker
            file_picker_callback: function (cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                // Note: In modern browsers input[type="file"] is functional without 
                // even adding it to the DOM, but that might not be the case in some older
                // or quirky browsers like IE, so you might want to add it to the DOM
                // just in case, and visually hide it. And do not forget do remove it
                // once you do not need it anymore.
                input.onchange = function () {
                    var file = input.files[0];
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        // Note: Now we need to register the blob in TinyMCEs image blob
                        // registry. In the next release this part hopefully won't be
                        // necessary, as we are looking to handle it internally.
                        var id = 'blobid' + (new Date()).getTime();
                        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                        var base64 = reader.result.split(',')[1];
                        var blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);
                        // call the callback and populate the Title field with the file name
                        cb(blobInfo.blobUri(), { title: file.name });
                    };
                };
                input.click();
            }
        };
        if (typeof tinymce !== 'undefined' && typeof tinymce != undefined && tinymce != "" && tinymce != null) {
            tinymce.init(options);
        }
    };
    AboutPortalComponent.prototype.ngAfterViewChecked = function () {
        this.settingTinymce();
    };
    AboutPortalComponent.prototype.ngOnDestroy = function () {
        tinymce.remove(this.editor);
    };
    AboutPortalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-about-portal',
            templateUrl: 'about-portal.component.html',
            providers: [about_portal_service_1.AboutPortalService]
        }), 
        __metadata('design:paramtypes', [about_portal_service_1.AboutPortalService])
    ], AboutPortalComponent);
    return AboutPortalComponent;
}());
exports.AboutPortalComponent = AboutPortalComponent;
//# sourceMappingURL=about-portal.component.js.map