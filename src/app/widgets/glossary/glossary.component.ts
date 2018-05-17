import { Component, Input, Output,EventEmitter} from '@angular/core';
import { IGlossaryViewModel } from './glossary';
import { Router } from '@angular/router';
import { GlobalConfig } from '../../global/global.config';
import { GlobalUtil } from '../../global/global.util';
import { GlossaryService } from './glossary.service';
declare var tinymce: any;

@Component({
    moduleId: module.id,
    selector: 'my-glossary',
    templateUrl: 'glossary.component.html'

})
export class GlossaryComponent { 
    @Input() isAdd: boolean = true;
    @Input() editData: IGlossaryViewModel;
    @Output() updateddata = new EventEmitter<IGlossaryViewModel>();
    @Output() updateCancelEvent = new EventEmitter<any>();
    formData: IGlossaryViewModel = { termId: 0, term: "", definition: "", userId: "" };
    //term: string;
    index: string;
    errorTermMsg: string;
    errorDefMsg: string;
    editor: any;
    glossaryDef: string;
    loading: boolean = false;
    //isAdd: boolean = true;
    statusClass = {
        green1: true,
        red: false
    }

    constructor(private glossaryService: GlossaryService, private router: Router) {
        //this.loadScripts();
    }
    loadScripts() {
        let node = document.createElement('script');
        node.src = GlobalConfig.tinyMceJs;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }
   
    ngOnInit()    {
    }

    settingTinymce(): void {
        let options = {
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
                //tools: { title: 'Tools', items: 'spellchecker code' }
            },        
            statusbar: true,
            inline: true,
            //plugins: ['link', 'paste'],
            //toolbar: "undo redo | bold italic underline | link | alignleft aligncenter alignright | charmap",
            plugins: ['link', 'paste', 'table', 'image', 'code', 'preview', 'textcolor', 'colorpicker', 'lists advlist'],
            toolbar: "undo redo | styleselect | bold italic | link | alignleft aligncenter alignright | charmap preview | forecolor backcolor | bullist numlist",
            content_css: [GlobalConfig.bootstrapMin, GlobalConfig.styleCss],
            setup: (editor: any) => {
                this.editor = editor;
                this.editor.on('keyup', (ev: any) => {
                    this.glossaryDef = editor.getContent();
                    if (this.glossaryDef.length > editor.getParam('max_chars')) {
                        if (ev.keyCode != 8) {
                            alert('Maximum ' + editor.getParam('max_chars') + ' characters are allowed');
                            ev.preventDefault();// backspace (8) / delete (46)
                            return false;
                        }
                    }
                });
                this.editor.on('init', () => {
                    //editor.setContent(GlobalUtil.getSession("PageFootnote") || '');
                    editor.setContent('');
                    if (this.isAdd==false)
                        editor.setContent(this.editData.definition);
                });
            }
        };

        if (typeof tinymce !== 'undefined' && typeof tinymce != undefined && tinymce != "" && tinymce != null) {
            tinymce.init(options);
        }
    }
    onAdd(): void {
        this.errorTermMsg = "";
        this.errorDefMsg = "";
        if (this.formData.term.length == 0) {
            this.errorTermMsg = "Please enter term";
            setTimeout(() => {
                this.errorTermMsg = "";
            }, 3000);
        }
        else if (this.formData.term.length > 100) {
            this.errorTermMsg = "Maximum 100 characters are allowed";
            setTimeout(() => {
                this.errorTermMsg = "";
            }, 3000);
        }

        else if (this.editor.getContent().length > this.editor.getParam('max_chars')) {
            this.statusClass.green1 = false;
            this.statusClass.red = true;
            this.errorDefMsg = "Maximum 100 characters are allowed";
            setTimeout(() => {
                this.errorDefMsg = "";
            }, 3000);
            //setTimeout(() => {
            //    this.errorDefMsg = "";
            //}, 3000);
        }
        else if (this.editor.getContent().length == 0) {
            this.statusClass.green1 = false;
            this.statusClass.red = true;
            this.errorDefMsg = "Please enter definition";
            setTimeout(() => {
                this.errorDefMsg = "";
            }, 3000);
        }

        else {
            this.loading = true;
            this.formData.term = this.formData.term.trim();
            var patt = new RegExp("^[A-Za-z].*");
            var res = patt.test(this.formData.term);
            if (res == false)
            {
                this.errorTermMsg = "Please enter valid term starting with alphabet only.";
                this.loading = false;
                setTimeout(() => {
                    this.errorTermMsg = "";
                }, 3000);
            }
            else {
                this.formData.definition = this.editor.getContent();
                this.formData.userId = GlobalUtil.getAppSession('UserInfo').userId;
                this.glossaryService.addGlossary(this.formData)
                    .subscribe(data => {
                        if (data == 3) {
                            this.statusClass.green1 = false;
                            this.statusClass.red = true;
                            this.errorDefMsg = "Server error!";
                            setTimeout(() => {
                                this.errorDefMsg = "";
                            }, 3000);
                        }
                        else if (data == 0) {
                            this.errorTermMsg = "This term already exists";
                            setTimeout(() => {
                                this.errorTermMsg = "";
                            }, 3000);

                        }
                        else if (data == 1) {
                            if (this.formData.termId && this.formData.termId != 0) {
                                this.statusClass.green1 = true;
                                this.statusClass.red = false;
                                this.errorDefMsg = "Term has been updated successfully";
                                setTimeout(() => {
                                    this.errorDefMsg = "";
                                }, 3000);
                                this.updateddata.emit(this.formData);
                            }
                            else {
                                this.statusClass.green1 = true;
                                this.statusClass.red = false;
                                this.errorDefMsg = "Term and definition have been added successfully";
                                setTimeout(() => {
                                    this.errorDefMsg = "";
                                }, 3000);
                                this.errorTermMsg = "";
                                this.formData = { termId: 0, term: "", definition: "", userId: "" };
                                this.editor.setContent("");
                            }
                        }
                        //this.onCancel();
                        this.loading = false;
                    },
                    error => this.errorTermMsg = <any>error
                    );
            }
        }

    }
    onCancel(): void {
        this.errorTermMsg = "";
        this.errorDefMsg = "";
        this.formData = { termId: 0, term: "", definition: "", userId: "" };
        this.editor.setContent("");

    }
   
    onUpdateCancel(): void {
        this.updateCancelEvent.emit();
    }

    ngOnChanges() {
        if (this.isAdd == false) {
            this.settingTinymce();
            this.formData.termId = this.editData.termId;
            this.formData.term = this.editData.term;
            //let content = this.editData.definition;
            //this.editor.setContent("content");
        } 
        setTimeout(() => { this.settingTinymce();},200);
        //setTimeout(function () {   
        
        //    this.settingTinymce();
        //}, 200);
    }
    ngAfterViewChecked(): void {
        this.settingTinymce();
   
    }
    
    ngOnDestroy(): void {
        tinymce.remove(this.editor);
    }
}

