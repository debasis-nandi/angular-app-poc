
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { KmUploadDocRouting } from './km-upload-doc.routing';
import { KmUploadDocComponent } from './km-upload-doc.component';
import { KmSearchUploadModule } from './km-search-upload.module';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        KmUploadDocRouting,
        KmSearchUploadModule
    ],
    declarations: [
        KmUploadDocComponent
    ],
    exports: [
        KmUploadDocComponent
    ]
})
export class KmUploadDocModule { }