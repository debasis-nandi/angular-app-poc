
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { KmRecentDocsRouting } from './km-recent-docs.routing';
import { KmSearchUploadModule } from './km-search-upload.module';
import { SearchTemplateModule } from '../widgets/search-template/search-template.module';
import { LoaderModule } from '../loader/loader.module';
import { KmRecentDocsComponent } from './km-recent-docs.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        KmRecentDocsRouting,
        KmSearchUploadModule,
        SearchTemplateModule,
        LoaderModule
    ],
    declarations: [
        KmRecentDocsComponent
    ],
    exports: [
        KmRecentDocsComponent
    ]
})
export class KmRecentDocsModule { }