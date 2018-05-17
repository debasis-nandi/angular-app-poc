
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { MyDatePickerModule } from 'mydatepicker';

import { MASCompetitorReportRouting } from './mas-competitorreports.routing';
import { FilterModule } from '../../../widgets/filters/filter.module';
import { ExportModule } from '../../../widgets/export/export.module';
import { ActionModule } from '../../../widgets/actions/action.module';
import { LoaderModule } from '../../../loader/loader.module'
import { PopoverModule } from 'ng2-popover';
import { MASCompetitorReportsComponent } from './mas-competitorreports.component';
import { AccordionModule } from 'primeng/primeng';
import { MenuItem } from 'primeng/components/common/api';
import { SearchTemplateModule } from '../../../widgets/search-template/search-template.module';

import { EmailModule } from '../../../widgets/email/email.module';
import { CompetitorMenuModule } from './competitormenu.module';

import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { httpFactory } from '../../../http-interceptor/http.factory';

@NgModule({
    imports:
    [
        HttpModule,
        FormsModule,
        CommonModule,
        ExportModule,
        MASCompetitorReportRouting,
        AccordionModule,
        LoaderModule,
        CompetitorMenuModule,
        FilterModule,
        ActionModule,
        PopoverModule,
        EmailModule,
        MyDateRangePickerModule,
        MyDatePickerModule,
        SearchTemplateModule
    ],
    declarations:
    [
        MASCompetitorReportsComponent
    ],
    exports: [
        MASCompetitorReportsComponent
    ],
    providers: [
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]
})
export class MASCompetitorReportModule { }