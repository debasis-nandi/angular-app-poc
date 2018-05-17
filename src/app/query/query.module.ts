
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalModule } from '../widgets/modals/modal.module';
import { TableModule } from '../widgets/datatable/datatable.module';
import { AdminModule } from '../admin/admin.module';

import { QueryComponent } from './query.component';
import { QueryService } from './query.service';
import { QueryRouting } from './query.routing';
import { LoaderModule } from '../loader/loader.module';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        TableModule,
        ModalModule,
        AdminModule,
        QueryRouting,
        LoaderModule
    ],
    declarations: [
        QueryComponent
    ],
    exports: [
        QueryComponent
    ],
    providers: [
        QueryService
    ]
})
export class QueryModule { }