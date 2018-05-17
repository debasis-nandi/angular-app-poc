import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ActionModule } from '../../../../widgets/actions/action.module';
import { PopoverModule } from 'ng2-popover';
import { TableModule } from '../../../../widgets/datatable/datatable.module';
import { CropMenuModule } from './crop-menu.module';
import { ExportModule } from '../../../../widgets/export/export.module';
import { FilterModule } from '../../../../widgets/filters/filter.module';
import { MainCropIndicatorComponent } from './main-crop-indicator.component';

import { MainCropIndicatorRouting } from './main-crop-indicator.routing';
import {LoaderModule} from '../../../../loader/loader.module'

@NgModule({
    imports:
    [
        HttpModule,
        FormsModule,
        CommonModule,
        FilterModule,
        ExportModule,
        ActionModule,
        PopoverModule,
        TableModule,
        CropMenuModule,
        MainCropIndicatorRouting, LoaderModule
    ],
    declarations:
    [
        MainCropIndicatorComponent
    ],
    exports: [
        MainCropIndicatorComponent
    ]

})
export class MainCropIndicatorModule { }