
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { KmSearchRouting } from './km-search.routing';
import { KmSearchComponent } from './km-search.component';
import { KmSearchUploadModule } from './km-search-upload.module';
import { SearchTemplateModule } from '../widgets/search-template/search-template.module';
import { LoaderModule } from '../loader/loader.module';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        KmSearchRouting,
        KmSearchUploadModule,
        SearchTemplateModule,
        LoaderModule
    ],
    declarations: [
        KmSearchComponent
    ],
    exports: [
        KmSearchComponent
    ]
})
export class KmSearchModule { }