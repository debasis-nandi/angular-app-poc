
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SearchTemplateComponent } from './search-template.component';
import { NewsKmTemplateComponent } from './news-km-template.component';
import { ChartTemplateComponent } from './chart-template.component';
import { PaginatorModule } from '../paginator/paginator.module';
import { EmailModule } from '../../widgets/email/email.module';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule,
        PaginatorModule,
        EmailModule
    ],
    declarations: [
        SearchTemplateComponent,
        NewsKmTemplateComponent,
        ChartTemplateComponent
    ],
    exports: [
        SearchTemplateComponent,
        NewsKmTemplateComponent,
        ChartTemplateComponent
    ],
    entryComponents: [
        NewsKmTemplateComponent,
        ChartTemplateComponent
    ]
})
export class SearchTemplateModule { }
