
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { MyDatePickerModule } from 'mydatepicker';

import { MASNewsRouting } from './mas-news.routing';
import { FilterModule } from '../../../widgets/filters/filter.module';
import { ExportModule } from '../../../widgets/export/export.module';
import { ActionModule } from '../../../widgets/actions/action.module';
import { LoaderModule } from '../../../loader/loader.module'
import { PopoverModule } from 'ng2-popover';
import { MASNewsComponent } from './mas-news.component';
import { AccordionModule } from 'primeng/primeng';
import { MenuItem } from 'primeng/components/common/api';

import { EmailModule } from '../../../widgets/email/email.module';
import { CompetitorMenuModule } from './competitormenu.module';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        MASNewsRouting,
        AccordionModule,        
        LoaderModule,
        CompetitorMenuModule,
        FilterModule,
        ActionModule,
        PopoverModule,
        EmailModule,
        MyDateRangePickerModule,
        MyDatePickerModule      
    ],
    declarations:
    [
        MASNewsComponent
    ],
    exports: [
        MASNewsComponent
    ],
    providers: [
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]
})
export class MASNewsModule { }