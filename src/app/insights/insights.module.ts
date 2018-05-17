import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {AddInsightsComponent } from './addinsights.component';
import { InsightsService } from './insights.service';
import { TinyMCEModule } from '../widgets/tinymce/tinymce.module';
import { DataListModule, GrowlModule } from 'primeng/primeng';
import { ModalModule } from '../widgets/modals/modal.module';
import { CustomPipesModule } from '../pipes/custompipes.module';
import { httpFactory } from '../http-interceptor/http.factory';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@NgModule({
    imports:
    [
        HttpModule,
        FormsModule,
        CommonModule,
        TinyMCEModule,
        DataListModule,
        GrowlModule,
        CustomPipesModule,
        ModalModule
    ],
    declarations:
    [
        AddInsightsComponent,
    ],
    exports: [
        AddInsightsComponent
    ],
    providers: [
        InsightsService,
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]
})
export class InsightsModule { }