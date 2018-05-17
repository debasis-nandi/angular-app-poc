import { Directive, Renderer2, ElementRef, EventEmitter, OnDestroy, Input, Output } from '@angular/core';
import { GlobalConfig } from '../../global/global.config';
import { GlobalUtil } from '../../global/global.util';
declare var tinymce: any;
@Directive({
    selector: '[tinyMceEditor]',
    inputs: ['mceDefaultContent', 'setEditor', 'editorClasses'],
    outputs: ['onEditorContentChange', 'CharLeft']
})

export class TinyMceEditorDirective implements OnDestroy {
    editor: any;
    private htmlContent: string = '';
    public onEditorContentChange: EventEmitter<any>;
    public CharLeft: EventEmitter<number>;
    @Output() public onEditorFocus: EventEmitter<any>;
    tinymceClasses: EditorClasses[];
    isEditorInitialized = false;
    @Input() maxAllowedLength: number;
    @Input() editorPlaceHolder: string = '';
    constructor(private renderer: Renderer2, private el: ElementRef) {
        this.onEditorContentChange = new EventEmitter();
        this.CharLeft = new EventEmitter();
        this.onEditorFocus = new EventEmitter();
    }

    @Input()
    set EditorId(ids: any) {

        if (ids != undefined) {
            this.renderer.setAttribute(this.el.nativeElement, 'id', ids);
            if (this.isEditorInitialized) {
                this.initEditor();
            }
        }
    }

    set editorClasses(val: EditorClasses[]) {
        val.forEach(x => {
            if (x.isAdd) {
                this.renderer.addClass(this.el.nativeElement, x.className);
            }
            else {
                this.renderer.removeClass(this.el.nativeElement, x.className);
            }
        })
    }

    set setEditor(isInit: boolean) {
        this.isEditorInitialized = isInit;
        if (isInit && this.el.nativeElement.id != "") {
            this.initEditor();
        }
        else if (isInit == false) {
            if (this.editor != undefined && tinymce != undefined) {
                tinymce.remove(this.editor);
            }
            //  this.el.nativeElement.innerHTML = this.htmlContent;
        }
    }


    set mceDefaultContent(content: any) {
        this.htmlContent = content;
        this.setEditor = this.isEditorInitialized;
        if (!this.isEditorInitialized) {
            // this.el.nativeElement.innerHTML = this.htmlContent ;
        }
    }

 
    initEditor() {
        if (this.editor != undefined && tinymce != undefined) {
            tinymce.remove(this.editor);
        }
        let self = this;
        let options = {
            mode: 'exact',
            height: '80',
            max_chars: this.maxAllowedLength,
            selector: '#' + this.el.nativeElement.id,
            menubar: false,
            link_assume_external_targets: true,
            inline: true,
            plugins: ['link', 'paste'],
            toolbar: "undo redo | bold italic underline | link | alignleft aligncenter alignright | charmap",
            content_css: [GlobalConfig.bootstrapMin, GlobalConfig.styleCss],
            setup: (editor: any) => {
                this.editor = editor;
                let editorPlaceHolder = this.editorPlaceHolder;
                let htmlContent = this.htmlContent;
                let trimedContent = '';
                let textlength = 0;
                this.editor.on('keyup change', (ev: any) => {
                    textlength = editor.getBody().innerText.trim().length;
                    this.htmlContent = editor.getContent();
                    htmlContent = this.htmlContent;

                    if (textlength > editor.getParam('max_chars')) {
                        if (ev.keyCode != 8) {
                            editor.getBody().innerText = editor.getBody().innerText.substring(0, editor.getParam('max_chars'));
                            trimedContent = editor.getContent();
                            editor.setContent(trimedContent);
                            editor.focus();
                            editor.selection.select(editor.getBody(), true);
                            editor.selection.collapse(false);
                            this.onEditorContentChange.emit(trimedContent);
                            this.CharLeft.emit(0);
                            ev.preventDefault();// backspace (8) / delete (46)
                            return false;
                        }
                    }
                    else {
                        this.onEditorContentChange.emit(this.htmlContent);
                        this.CharLeft.emit(this.maxAllowedLength - textlength);
                    }
                });
                this.editor.on('focus', function (ev: any) {
                    self.onEditorFocus.emit(self.el.nativeElement.id);
                    if (editorPlaceHolder != '' && (htmlContent === '' || htmlContent === ('<p>' + editorPlaceHolder + '</p>'))) {
                        editor.setContent('');
                        this.htmlContent = htmlContent = "";
                    }
                });
                this.editor.on('blur', function (ev: any) {
                    if (editorPlaceHolder != '' && (htmlContent === '' || htmlContent === ('<p>' + editorPlaceHolder + '</p>'))) {
                        editor.setContent(editorPlaceHolder);
                        this.htmlContent = htmlContent = "";
                    }
                });

                this.editor.on('init', () => {
                    if (editorPlaceHolder != '' && htmlContent === '') {
                        editor.setContent(editorPlaceHolder);
                    }
                    else if (htmlContent != null && htmlContent != "") {
                        editor.setContent(htmlContent);
                    }
                    self.CharLeft.emit(this.maxAllowedLength - editor.getBody().innerText.trim().length);
                });
            }
        };
        tinymce.init(options);
    }

    ngOnDestroy(): void {
        if (this.editor != undefined && tinymce != undefined) {
            tinymce.remove(this.editor);
        }
    }
}
export interface EditorClasses {
    className: string;
    isAdd: boolean
}