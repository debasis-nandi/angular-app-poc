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
var router_1 = require('@angular/router');
var global_config_1 = require('../../global/global.config');
var global_util_1 = require('../../global/global.util');
var glossary_service_1 = require('./glossary.service');
var GlossaryComponent = (function () {
    function GlossaryComponent(glossaryService, router) {
        this.glossaryService = glossaryService;
        this.router = router;
        this.isAdd = true;
        this.updateddata = new core_1.EventEmitter();
        this.updateCancelEvent = new core_1.EventEmitter();
        this.formData = { termId: 0, term: "", definition: "", userId: "" };
        this.loading = false;
        //isAdd: boolean = true;
        this.statusClass = {
            green1: true,
            red: false
        };
        //this.loadScripts();
    }
    GlossaryComponent.prototype.loadScripts = function () {
        var node = document.createElement('script');
        node.src = global_config_1.GlobalConfig.tinyMceJs;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    };
    GlossaryComponent.prototype.ngOnInit = function () {
    };
    GlossaryComponent.prototype.settingTinymce = function () {
        var _this = this;
        var options = {
            height: '400',
            width: '100%',
            min_width: '800px',
            max_chars: '10000',
            selector: '#glossaryDefinition',
            menubar: true,
            menu: {
                file: { title: 'File', items: 'newdocument' },
                edit: { title: 'Edit', items: 'undo redo | cut copy | selectall' },
                insert: { title: 'Insert', items: 'link media | template hr' },
                //view: { title: 'View', items: 'visualaid' },
                format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat' },
                table: { title: 'Table', items: 'inserttable tableprops deletetable | cell row column' },
            },
            statusbar: true,
            inline: true,
            //plugins: ['link', 'paste'],
            //toolbar: "undo redo | bold italic underline | link | alignleft aligncenter alignright | charmap",
            plugins: ['link', 'paste', 'table', 'image', 'code', 'preview', 'textcolor', 'colorpicker', 'lists advlist'],
            toolbar: "undo redo | styleselect | bold italic | link | alignleft aligncenter alignright | charmap preview | forecolor backcolor | bullist numlist",
            content_css: [global_config_1.GlobalConfig.bootstrapMin, global_config_1.GlobalConfig.styleCss],
            setup: function (editor) {
                _this.editor = editor;
                _this.editor.on('keyup', function (ev) {
                    _this.glossaryDef = editor.getContent();
                    if (_this.glossaryDef.length > editor.getParam('max_chars')) {
                        if (ev.keyCode != 8) {
                            alert('Maximum ' + editor.getParam('max_chars') + ' characters are allowed');
                            ev.preventDefault(); // backspace (8) / delete (46)
                            return false;
                        }
                    }
                });
                _this.editor.on('init', function () {
                    //editor.setContent(GlobalUtil.getSession("PageFootnote") || '');
                    editor.setContent('');
                    if (_this.isAdd == false)
                        editor.setContent(_this.editData.definition);
                });
            }
        };
        if (typeof tinymce !== 'undefined' && typeof tinymce != undefined && tinymce != "" && tinymce != null) {
            tinymce.init(options);
        }
    };
    GlossaryComponent.prototype.onAdd = function () {
        var _this = this;
        this.errorTermMsg = "";
        this.errorDefMsg = "";
        if (this.formData.term.length == 0) {
            this.errorTermMsg = "Please enter term";
            setTimeout(function () {
                _this.errorTermMsg = "";
            }, 3000);
        }
        else if (this.formData.term.length > 100) {
            this.errorTermMsg = "Maximum 100 characters are allowed";
            setTimeout(function () {
                _this.errorTermMsg = "";
            }, 3000);
        }
        else if (this.editor.getContent().length > this.editor.getParam('max_chars')) {
            this.statusClass.green1 = false;
            this.statusClass.red = true;
            this.errorDefMsg = "Maximum 100 characters are allowed";
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
        else {
            this.loading = true;
            this.formData.term = this.formData.term.trim();
            var patt = new RegExp("^[A-Za-z].*");
            var res = patt.test(this.formData.term);
            if (res == false) {
                this.errorTermMsg = "Please enter valid term starting with alphabet only.";
                this.loading = false;
                setTimeout(function () {
                    _this.errorTermMsg = "";
                }, 3000);
            }
            else {
                this.formData.definition = this.editor.getContent();
                this.formData.userId = global_util_1.GlobalUtil.getAppSession('UserInfo').userId;
                this.glossaryService.addGlossary(this.formData)
                    .subscribe(function (data) {
                    if (data == 3) {
                        _this.statusClass.green1 = false;
                        _this.statusClass.red = true;
                        _this.errorDefMsg = "Server error!";
                        setTimeout(function () {
                            _this.errorDefMsg = "";
                        }, 3000);
                    }
                    else if (data == 0) {
                        _this.errorTermMsg = "This term already exists";
                        setTimeout(function () {
                            _this.errorTermMsg = "";
                        }, 3000);
                    }
                    else if (data == 1) {
                        if (_this.formData.termId && _this.formData.termId != 0) {
                            _this.statusClass.green1 = true;
                            _this.statusClass.red = false;
                            _this.errorDefMsg = "Term has been updated successfully";
                            setTimeout(function () {
                                _this.errorDefMsg = "";
                            }, 3000);
                            _this.updateddata.emit(_this.formData);
                        }
                        else {
                            _this.statusClass.green1 = true;
                            _this.statusClass.red = false;
                            _this.errorDefMsg = "Term and definition have been added successfully";
                            setTimeout(function () {
                                _this.errorDefMsg = "";
                            }, 3000);
                            _this.errorTermMsg = "";
                            _this.formData = { termId: 0, term: "", definition: "", userId: "" };
                            _this.editor.setContent("");
                        }
                    }
                    //this.onCancel();
                    _this.loading = false;
                }, function (error) { return _this.errorTermMsg = error; });
            }
        }
    };
    GlossaryComponent.prototype.onCancel = function () {
        this.errorTermMsg = "";
        this.errorDefMsg = "";
        this.formData = { termId: 0, term: "", definition: "", userId: "" };
        this.editor.setContent("");
    };
    GlossaryComponent.prototype.onUpdateCancel = function () {
        this.updateCancelEvent.emit();
    };
    GlossaryComponent.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.isAdd == false) {
            this.settingTinymce();
            this.formData.termId = this.editData.termId;
            this.formData.term = this.editData.term;
        }
        setTimeout(function () { _this.settingTinymce(); }, 200);
        //setTimeout(function () {   
        //    this.settingTinymce();
        //}, 200);
    };
    GlossaryComponent.prototype.ngAfterViewChecked = function () {
        this.settingTinymce();
    };
    GlossaryComponent.prototype.ngOnDestroy = function () {
        tinymce.remove(this.editor);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], GlossaryComponent.prototype, "isAdd", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GlossaryComponent.prototype, "editData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GlossaryComponent.prototype, "updateddata", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GlossaryComponent.prototype, "updateCancelEvent", void 0);
    GlossaryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-glossary',
            templateUrl: 'glossary.component.html'
        }), 
        __metadata('design:paramtypes', [glossary_service_1.GlossaryService, router_1.Router])
    ], GlossaryComponent);
    return GlossaryComponent;
}());
exports.GlossaryComponent = GlossaryComponent;
//# sourceMappingURL=glossary.component.js.map