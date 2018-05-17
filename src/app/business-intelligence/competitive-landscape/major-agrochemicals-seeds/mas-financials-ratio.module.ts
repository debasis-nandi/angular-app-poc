import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExportModule } from '../../../widgets/export/export.module';
import { FilterModule } from '../../../widgets/filters/filter.module';
import { ActionModule } from '../../../widgets/actions/action.module';
import { PopoverModule } from 'ng2-popover';
import { UnderlyingDatatableModule } from '../../../widgets/underlying-datatable/underlying-datatable.module';
import { CompetitorMenuModule } from './competitormenu.module';
import { MASFinancialsRatioComponent } from './mas-financials-ratio.component';
import { ChartModule } from '../../../widgets/charts/chart.module'
import { EmailModule } from '../../../widgets/email/email.module';
import { MASFinancialsRatioRouting  } from './mas-financials-ratio.routing';
import { LoaderModule } from '../../../loader/loader.module'
import { CustomPipesModule } from '../../../pipes/custompipes.module';
import { FavouriteModule } from '../../../widgets/favourites/favourites.module'
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
        ActionModule,
        PopoverModule,
        UnderlyingDatatableModule,
        CompetitorMenuModule,
        MASFinancialsRatioRouting,
        LoaderModule,
        ExportModule,
        CustomPipesModule,
        EmailModule,
        FavouriteModule,
        InsightsModule,
        DataGridModule
    ],
    declarations:
    [
        MASFinancialsRatioComponent
    ],
    exports: [
        MASFinancialsRatioComponent
    ]

})
export class MASFinancialsRatioModule { }