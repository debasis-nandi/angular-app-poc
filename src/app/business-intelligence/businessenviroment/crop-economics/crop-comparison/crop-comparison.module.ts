﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { ChartModule } from '../../../../widgets/charts/chart.module';
import { FilterModule } from '../../../../widgets/filters/filter.module';
import { UnderlyingDatatableModule } from '../../../../widgets/underlying-datatable/underlying-datatable.module';
import { ExportModule } from '../../../../widgets/export/export.module';
import { CropComparisonComponent } from './crop-comparison.component';
import { ActionModule } from '../../../../widgets/actions/action.module';
import { CropComparisonRouting } from './crop-comparison.routing';
import {LoaderModule} from '../../../../loader/loader.module'

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        ChartModule,
        UnderlyingDatatableModule,
        FilterModule,
        CropComparisonRouting,
        LoaderModule,
        ActionModule,
        ExportModule
    ],
    declarations: [
        CropComparisonComponent
    ],
    exports: [
        CropComparisonComponent
    ]
})
export class CropComparisonModule { }