import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'ng2-popover';
import { UserAnalyticsComponent } from './useranalytics.component';
import { LoaderModule } from '../../loader/loader.module';
import { ActionModule } from '../../widgets/actions/action.module';
//import { TableModule } from '../../widgets/datatable/datatable.module';
import { FilterModule } from '../../widgets/filters/filter.module';
import { UnderlyingDatatableModule } from '../../widgets/underlying-datatable/underlying-datatable.module';
import { UserAnalyticsRouting } from './useranalytics.routing';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
    imports:
    [
        HttpModule,
        FormsModule,
        CommonModule,
        FilterModule,
        ActionModule,
        PopoverModule,
        UnderlyingDatatableModule,
        UserAnalyticsRouting,
        LoaderModule,
        MyDatePickerModule
    ],
    declarations:
    [
        UserAnalyticsComponent
    ],
    exports: [
        UserAnalyticsComponent
    ]
})
export class UserAnalyticsModule { }