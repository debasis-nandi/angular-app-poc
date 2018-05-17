
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AboutPortalRouting } from './about-portal.routing';
import { AboutPortalComponent } from './about-portal.component';
import { GlossaryModule } from '../widgets/glossary/glossary.module';
import { CustomPipesModule } from '../pipes/custompipes.module';
import { LoaderModule } from '../loader/loader.module'

import { httpFactory } from '../http-interceptor/http.factory';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        AboutPortalRouting,
        GlossaryModule,
        CustomPipesModule,
        LoaderModule
    ],
    declarations: [
        AboutPortalComponent
    ],
    exports: [
        AboutPortalComponent
    ],
    providers: [
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]
})
export class AboutPortalModule { }