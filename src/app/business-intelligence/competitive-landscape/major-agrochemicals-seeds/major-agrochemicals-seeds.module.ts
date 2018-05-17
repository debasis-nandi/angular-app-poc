import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExportModule } from '../../../widgets/export/export.module';
import { FilterModule } from '../../../widgets/filters/filter.module';
import { ActionModule } from '../../../widgets/actions/action.module';
import { SearchTemplateModule } from '../../../widgets/search-template/search-template.module';
import { PopoverModule } from 'ng2-popover';
import { TableModule } from '../../../widgets/datatable/datatable.module';
import { CompetitorMenuModule } from './competitormenu.module';

import { MajorAgrochemicalsSeedsComponent } from './major.agrochemicals-seeds.component';

import { MajorAgroRouting } from './major.agrochemicals-seeds.routing';
import {LoaderModule} from '../../../loader/loader.module'

@NgModule({
    imports:
    [
        HttpModule,
        FormsModule,
        CommonModule,
        FilterModule,
        ActionModule,
        PopoverModule,
        TableModule,
        CompetitorMenuModule,
        MajorAgroRouting, LoaderModule,
        ExportModule,
        SearchTemplateModule
    ],
    declarations:
    [
        MajorAgrochemicalsSeedsComponent
    ],
    exports: [
        MajorAgrochemicalsSeedsComponent
    ]

})
export class MajorAgrochemicalsSeedsModule { }