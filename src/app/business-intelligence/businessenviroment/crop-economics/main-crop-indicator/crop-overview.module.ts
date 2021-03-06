﻿import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FilterModule } from '../../../../widgets/filters/filter.module';
import { ExportModule } from '../../../../widgets/export/export.module';
import { ActionModule } from '../../../../widgets/actions/action.module';
import { PopoverModule } from 'ng2-popover';
import { UnderlyingDatatableModule } from '../../../../widgets/underlying-datatable/underlying-datatable.module';
import { ChartModule } from '../../../../widgets/charts/chart.module'
import { LoaderModule } from '../../../../loader/loader.module'
import { EmailModule } from '../../../../widgets/email/email.module';
import { CropOverviewRouting } from './crop-overview.routing';
import { CropOverviewComponent } from './crop-overview.component';
import { CropMenuModule } from './crop-menu.module';
import { CustomPipesModule } from '../../../../pipes/custompipes.module';
import { InsightsModule } from '../../../../insights/insights.module';

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
        CropOverviewRouting,
        CropMenuModule,
        LoaderModule,
        CustomPipesModule,
        EmailModule,
        InsightsModule
    ],
    declarations:
    [
        CropOverviewComponent
    ],
    exports: [
        CropOverviewComponent
    ]

})
export class CropOverviewModule { }