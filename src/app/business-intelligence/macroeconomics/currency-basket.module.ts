﻿import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FilterModule } from '../../widgets/filters/filter.module';
import { ExportModule } from '../../widgets/export/export.module';
import { ActionModule } from '../../widgets/actions/action.module';
import { PopoverModule } from 'ng2-popover';
import { UnderlyingDatatableModule } from '../../widgets/underlying-datatable/underlying-datatable.module';
import { ChartModule } from '../../widgets/charts/chart.module'
import { LoaderModule } from '../../loader/loader.module'
import { CurrencyBasketRouting } from './currency-basket.routing';
import { CurrencyBasketComponent } from './currency-basket.component';
import { MacroeconomicsMenuModule } from './macroeconomics-menu.module';
import { CustomPipesModule } from '../../pipes/custompipes.module';
import { EmailModule } from '../../widgets/email/email.module';
import { InsightsModule } from '../../insights/insights.module';

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
        CurrencyBasketRouting,
        MacroeconomicsMenuModule,
        LoaderModule,
        CustomPipesModule,
        EmailModule,
        InsightsModule
    ],
    declarations:
    [
        CurrencyBasketComponent
    ],
    exports: [
        CurrencyBasketComponent
    ]

})
export class CurrencyBasketModule { }