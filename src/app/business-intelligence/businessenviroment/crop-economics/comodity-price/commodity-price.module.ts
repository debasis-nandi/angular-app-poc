import { NgModule } from '@angular/core';
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
import { CommodityPriceRouting } from './commodity-price.routing';
import { CommodityPriceComponent } from './commodity-price.component';


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
        CommodityPriceRouting,
        LoaderModule
    ],
    declarations:
    [
        CommodityPriceComponent
    ],
    exports: [
        CommodityPriceComponent
    ]

})
export class CommodityPriceModule { }