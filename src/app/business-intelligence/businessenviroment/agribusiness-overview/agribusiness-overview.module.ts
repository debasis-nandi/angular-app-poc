import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FilterModule } from '../../../widgets/filters/filter.module';
import { ExportModule } from '../../../widgets/export/export.module';
import { ActionModule } from '../../../widgets/actions/action.module';
import { PopoverModule } from 'ng2-popover';
import { UnderlyingDatatableModule } from '../../../widgets/underlying-datatable/underlying-datatable.module';
import { ChartModule } from '../../../widgets/charts/chart.module'
import { LoaderModule } from '../../../loader/loader.module'
import { AgribusinessOverviewRouting } from './agribusiness-overview.routing';
import { AgribusinessOverviewComponent } from './agribusiness-overview.component';
import { CustomPipesModule } from '../../../pipes/custompipes.module';
import { EmailModule } from '../../../widgets/email/email.module';
import { InsightsModule } from '../../../insights/insights.module';

@NgModule({
    imports:
    [
        HttpModule,
        FormsModule,
        CommonModule,
        ChartModule,
        FilterModule,
        ExportModule,
        ActionModule,
        PopoverModule,
        UnderlyingDatatableModule,
        AgribusinessOverviewRouting,
        LoaderModule,
        CustomPipesModule,
        EmailModule,
        InsightsModule
    ],
    declarations:
    [
        AgribusinessOverviewComponent
    ],
    exports: [
        AgribusinessOverviewComponent
    ]

})
export class AgribusinessOverviewModule { }