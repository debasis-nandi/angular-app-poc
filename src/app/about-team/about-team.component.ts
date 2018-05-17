
import { AfterViewInit, Component, OnInit, Input, OnChanges, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AboutTeamService } from './about-team.service';
import { IAboutTeam, IAboutTeamViewModel, aboutTeamData} from './about-team.model';
import { GlobalConfig, Page } from '../global/global.config';
import { GlobalUtil } from '../global/global.util';
declare var tinymce: any;

@Component({
    moduleId: module.id,
    selector: 'my-about-team',
    templateUrl: 'about-team.component.html',
    providers: [AboutTeamService]
})
export class AboutTeamComponent implements OnInit {

    aboutTeam: IAboutTeam = {};
    aboutTeamList: IAboutTeam[] = [];
    teamData: IAboutTeamViewModel[];
    team: aboutTeamData;
    isAdmin: boolean = (GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin")? true : false;
    startIndex: number = 1;
    editIndex: number = -1;
    loading: boolean = false;
    editor: any;
    glossaryDef: string;
    errorDefMsg: string;
    editedTeamId: number;
    statusClass = {
        green1: true,
        red: false
    }

    constructor(private objAboutTeam: AboutTeamService) {
    }

    loadScripts() {
        let node = document.createElement('script');
        node.src = GlobalConfig.tinyMceJs;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

    ngOnInit() {
        this.getTeamInfo();
    }
    
    onCancel(): void {
        this.editIndex = -1;
    }

    onUpdate(updateddata: IAboutTeamViewModel): void {
        if (this.editor.getContent().length > this.editor.getParam('max_chars')) {
            this.statusClass.green1 = false;
            this.statusClass.red = true;
            this.errorDefMsg = `Maximum ${this.editor.getParam('max_chars')} characters are allowed.`;
            setTimeout(() => {
                this.errorDefMsg = "";
            }, 3000);
        }
        else if (this.editor.getContent().length == 0) {
            this.statusClass.green1 = false;
            this.statusClass.red = true;
            this.errorDefMsg = "Please enter definition";
            setTimeout(() => {
                this.errorDefMsg = "";
            }, 3000);
        }
        this.loading = true;
        updateddata.definition = this.editor.getContent();
        let userData = GlobalUtil.getAppSession('UserInfo');

        //let userData = GlobalUtil.getAppSession('UserInfo');
        this.aboutTeam.id = updateddata.id;
        this.aboutTeam.teamInfo = updateddata.definition;
        this.aboutTeam.updatedBy = (userData != null) ? userData.userName : '';
        this.updatePortalInfo(this.aboutTeam);
        this.editIndex = -1;
    }

    updatePortalInfo(updateddata: IAboutTeam): void {
        var url = GlobalConfig.baseEndpont + GlobalConfig.updateTeamInfoApi;
        this.objAboutTeam.post(url, updateddata).subscribe(
            (result: any) => {
                this.aboutTeam = result;

                this.aboutTeamList[this.editedTeamId].id = this.aboutTeam.id;
                this.aboutTeamList[this.editedTeamId].teamInfo = this.aboutTeam.teamInfo;
                this.aboutTeamList[this.editedTeamId].updatedBy = this.aboutTeam.updatedBy;
                this.loading = false;
            },
            error => { }
        );
    }

    onSelect(i:number) {
        this.editIndex = 1;
        this.editedTeamId = i;

    }

    getTeamInfo(): void {
        var url = GlobalConfig.baseEndpont + GlobalConfig.getTeamInfoApi;
        this.objAboutTeam.get(url).subscribe(
            (result: any) => {
                this.aboutTeamList = result;
                //this.teamData = [];
                //this.teamData["id"] = this.aboutTeam.id;
                //this.teamData["definition"] = this.aboutTeam.teamInfo;
                //this.teamData["userId"] = this.aboutTeam.updatedBy;
            },
            error => { }
        );
    }

    settingTinymce(): void {
        let options = {
            height: '400',
            width: '100%',
            min_width: '800px',
            max_chars: '10000',
            selector: '#aboutDefinition' + this.editedTeamId,
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
            content_css: [GlobalConfig.bootstrapMin, GlobalConfig.styleCss],
            setup: (editor: any) => {
                this.editor = editor;
                this.editor.on('keyup', (ev: any) => {
                    this.glossaryDef = editor.getContent();
                    //if (this.glossaryDef.length > editor.getParam('max_chars')) {
                    //    if (ev.keyCode != 8) {
                    //        alert('Max ' + editor.getParam('max_chars') + ' characters are allowed in glossary definition.');
                    //        ev.preventDefault();// backspace (8) / delete (46)
                    //        return false;
                    //    }
                    //}
                });
                this.editor.on('init', () => {
                    editor.setContent('');
                    editor.setContent(this.aboutTeamList[this.editedTeamId].teamInfo);
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
            file_picker_callback: function (cb: any, value: any, meta: any) {

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
    }

    ngAfterViewChecked(): void {
        this.settingTinymce();

    }
}