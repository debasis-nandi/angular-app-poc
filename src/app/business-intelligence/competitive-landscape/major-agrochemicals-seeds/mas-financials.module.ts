
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
import { CompetitorMenuModule } from './competitormenu.module';
import { ChartModule } from '../../../widgets/charts/chart.module'
import { MASFinancialsComponent } from './mas-financials.component';
import {LoaderModule} from '../../../loader/loader.module'
import { CustomPipesModule } from '../../../pipes/custompipes.module';
import { EmailModule } from '../../../widgets/email/email.module';
import { MASFinancialsRouting } from './mas-financials.routing';
import { InsightsModule } from '../../../insights/insights.module';
import { DataGridModule } from '../../../insights/datalist/datalist.module';

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
        CompetitorMenuModule,
        MASFinancialsRouting,
        LoaderModule,
        CustomPipesModule,
        EmailModule,
        InsightsModule,
        DataGridModule
    ],
    declarations:
    [
        MASFinancialsComponent
    ],
    exports: [
        MASFinancialsComponent
    ]

})
export class MASFinancialsModule { }