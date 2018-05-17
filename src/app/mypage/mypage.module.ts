
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { MyPageComponent } from './mypage.component';
import { ChartModule } from '../widgets/charts/chart.module'
import { ActionModule } from '../widgets/actions/action.module';
import { FilterModule } from '../widgets/filters/filter.module';
import { ExportModule } from '../widgets/export/export.module';
import { PopoverModule } from 'ng2-popover';
import { UnderlyingDatatableModule } from '../widgets/underlying-datatable/underlying-datatable.module';

import { MyPageRouting } from './mypage.routing';
import { LoaderModule } from '../loader/loader.module'
import { EmailModule } from '../widgets/email/email.module';
import { EventCalendarModule } from '../widgets/event-calendar/event-calendar.module';
import { CustomPipesModule } from '../pipes/custompipes.module';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        ChartModule,
        UnderlyingDatatableModule,
        MyPageRouting,
        LoaderModule,
        EmailModule,
        ActionModule,
        PopoverModule,
        FilterModule,
        CustomPipesModule,
        ExportModule,
        EventCalendarModule
    ],
    declarations: [
        MyPageComponent
    ],
    exports: [
        MyPageComponent
    ]
})
export class MyPageModule { }