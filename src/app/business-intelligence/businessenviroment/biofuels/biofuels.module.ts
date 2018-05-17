import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FilterModule } from '../../../widgets/filters/filter.module';
import { ExportModule } from '../../../widgets/export/export.module';
import { ActionModule } from '../../../widgets/actions/action.module';
import { PopoverModule } from 'ng2-popover';
import { CustomPipesModule } from '../../../pipes/custompipes.module';
import { UnderlyingDatatableModule } from '../../../widgets/underlying-datatable/underlying-datatable.module';
import { ChartModule } from '../../../widgets/charts/chart.module'
import { EmailModule } from '../../../widgets/email/email.module';
import { LoaderModule } from '../../../loader/loader.module'
import { BiofuelsRouting } from './biofuels.routing';
import { BiofuelsComponent } from './biofuels.component';
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
        BiofuelsRouting,
        LoaderModule,
        CustomPipesModule,
        EmailModule,
        InsightsModule
    ],
    declarations:
    [
        BiofuelsComponent
    ],
    exports: [
        BiofuelsComponent
    ]

})
export class BiofuelsModule { }