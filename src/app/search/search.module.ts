
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchRouting } from './search.routing';
import { SearchComponent } from './search.component';
import { SearchTemplateModule } from '../widgets/search-template/search-template.module';
import { LoaderModule } from '../loader/loader.module';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        SearchRouting,
        SearchTemplateModule,
        LoaderModule
    ],
    declarations: [
        SearchComponent
    ],
    exports: [
        SearchComponent
    ]
})
export class SearchModule { }