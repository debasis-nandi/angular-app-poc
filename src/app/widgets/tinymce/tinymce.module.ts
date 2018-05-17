import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TinyMceEditorDirective } from './tinymce.directive'

@NgModule({
    imports:
    [
        CommonModule,
        FormsModule
    ],
    exports: [
        TinyMceEditorDirective
    ],
    declarations: [
        TinyMceEditorDirective,
    ],
})
export class TinyMCEModule { }