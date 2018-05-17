
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AboutTeamRouting } from './about-team.routing';
import { AboutTeamComponent } from './about-team.component';
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
        AboutTeamRouting,
        LoaderModule,
        CustomPipesModule
    ],
    declarations: [
        AboutTeamComponent
    ],
    exports: [
        AboutTeamComponent
    ],
    providers: [
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]
})
export class AboutTeamModule { }