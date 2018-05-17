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
var TinyMceEditorDirective = (function () {
    function TinyMceEditorDirective(renderer, el) {
        this.renderer = renderer;
        this.el = el;
        this.htmlContent = '';
        this.isEditorInitialized = false;
        this.editorPlaceHolder = '';
        this.onEditorContentChange = new core_1.EventEmitter();
        this.CharLeft = new core_1.EventEmitter();
        this.onEditorFocus = new core_1.EventEmitter();
    }
    Object.defineProperty(TinyMceEditorDirective.prototype, "EditorId", {
        set: function (ids) {
            if (ids != undefined) {
                this.renderer.setAttribute(this.el.nativeElement, 'id', ids);
                if (this.isEditorInitialized) {
                    this.initEditor();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TinyMceEditorDirective.prototype, "editorClasses", {
        set: function (val) {
            var _this = this;
            val.forEach(function (x) {
                if (x.isAdd) {
                    _this.renderer.addClass(_this.el.nativeElement, x.className);
                }
                else {
                    _this.renderer.removeClass(_this.el.nativeElement, x.className);
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TinyMceEditorDirective.prototype, "setEditor", {
        set: function (isInit) {
            this.isEditorInitialized = isInit;
            if (isInit && this.el.nativeElement.id != "") {
                this.initEditor();
            }
            else if (isInit == false) {
                if (this.editor != undefined && tinymce != undefined) {
                    tinymce.remove(this.editor);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TinyMceEditorDirective.prototype, "mceDefaultContent", {
        set: function (content) {
            this.htmlContent = content;
            this.setEditor = this.isEditorInitialized;
            if (!this.isEditorInitialized) {
            }
        },
        enumerable: true,
        configurable: true
    });
    TinyMceEditorDirective.prototype.initEditor = function () {
        var _this = this;
        if (this.editor != undefined && tinymce != undefined) {
            tinymce.remove(this.editor);
        }
        var self = this;
        var options = {
            mode: 'exact',
            height: '80',
            max_chars: this.maxAllowedLength,
            selector: '#' + this.el.nativeElement.id,
            menubar: false,
            link_assume_external_targets: true,
            inline: true,
            plugins: ['link', 'paste'],
            toolbar: "undo redo | bold italic underline | link | alignleft aligncenter alignright | charmap",
            content_css: [global_config_1.GlobalConfig.bootstrapMin, global_config_1.GlobalConfig.styleCss],
            setup: function (editor) {
                _this.editor = editor;
                var editorPlaceHolder = _this.editorPlaceHolder;
                var htmlContent = _this.htmlContent;
                var trimedContent = '';
                var textlength = 0;
                _this.editor.on('keyup change', function (ev) {
                    textlength = editor.getBody().innerText.trim().length;
                    _this.htmlContent = editor.getContent();
                    htmlContent = _this.htmlContent;
                    if (textlength > editor.getParam('max_chars')) {
                        if (ev.keyCode != 8) {
                            editor.getBody().innerText = editor.getBody().innerText.substring(0, editor.getParam('max_chars'));
                            trimedContent = editor.getContent();
                            editor.setContent(trimedContent);
                            editor.focus();
                            editor.selection.select(editor.getBody(), true);
                            editor.selection.collapse(false);
                            _this.onEditorContentChange.emit(trimedContent);
                            _this.CharLeft.emit(0);
                            ev.preventDefault(); // backspace (8) / delete (46)
                            return false;
                        }
                    }
                    else {
                        _this.onEditorContentChange.emit(_this.htmlContent);
                        _this.CharLeft.emit(_this.maxAllowedLength - textlength);
                    }
                });
                _this.editor.on('focus', function (ev) {
                    self.onEditorFocus.emit(self.el.nativeElement.id);
                    if (editorPlaceHolder != '' && (htmlContent === '' || htmlContent === ('<p>' + editorPlaceHolder + '</p>'))) {
                        editor.setContent('');
                        this.htmlContent = htmlContent = "";
                    }
                });
                _this.editor.on('blur', function (ev) {
                    if (editorPlaceHolder != '' && (htmlContent === '' || htmlContent === ('<p>' + editorPlaceHolder + '</p>'))) {
                        editor.setContent(editorPlaceHolder);
                        this.htmlContent = htmlContent = "";
                    }
                });
                _this.editor.on('init', function () {
                    if (editorPlaceHolder != '' && htmlContent === '') {
                        editor.setContent(editorPlaceHolder);
                    }
                    else if (htmlContent != null && htmlContent != "") {
                        editor.setContent(htmlContent);
                    }
                    self.CharLeft.emit(_this.maxAllowedLength - editor.getBody().innerText.trim().length);
                });
            }
        };
        tinymce.init(options);
    };
    TinyMceEditorDirective.prototype.ngOnDestroy = function () {
        if (this.editor != undefined && tinymce != undefined) {
            tinymce.remove(this.editor);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TinyMceEditorDirective.prototype, "onEditorFocus", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TinyMceEditorDirective.prototype, "maxAllowedLength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TinyMceEditorDirective.prototype, "editorPlaceHolder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], TinyMceEditorDirective.prototype, "EditorId", null);
    TinyMceEditorDirective = __decorate([
        core_1.Directive({
            selector: '[tinyMceEditor]',
            inputs: ['mceDefaultContent', 'setEditor', 'editorClasses'],
            outputs: ['onEditorContentChange', 'CharLeft']
        }), 
        __metadata('design:paramtypes', [core_1.Renderer2, core_1.ElementRef])
    ], TinyMceEditorDirective);
    return TinyMceEditorDirective;
}());
exports.TinyMceEditorDirective = TinyMceEditorDirective;
//# sourceMappingURL=tinymce.directive.js.map