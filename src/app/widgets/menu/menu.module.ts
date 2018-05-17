

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {LoaderModule} from '../../loader/loader.module'
import { MenuComponent } from './menu.component';

import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { httpFactory } from '../../http-interceptor/http.factory';

@NgModule({
    imports:[
        CommonModule,
        HttpModule,
        RouterModule,
        LoaderModule
    ],
    declarations:[   
        MenuComponent
    ],
    exports: [
        MenuComponent
    ],
    providers: [
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]
})
export class MenuModule { }
