import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionComponent } from './action.component';
import { ModalModule } from '../modals/modal.module';
import { PopoverModule } from 'ng2-popover';
import { FilterModule } from '../filters/filter.module';
import { FavouriteModule } from '../favourites/favourites.module'

import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { httpFactory } from '../../http-interceptor/http.factory';

@NgModule({
    imports:
    [
        CommonModule,
        FormsModule,
        ModalModule,
        PopoverModule,
        FilterModule,
        FavouriteModule
    ],
    exports: [
        ActionComponent
    ],
    declarations: [
        ActionComponent
    ],
    providers: [
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]
})
export class ActionModule { }