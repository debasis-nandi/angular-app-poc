import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from '../loader/loader.module';
import { ModalModule } from '../widgets/modals/modal.module';
import { SubscriptionComponent } from './subscription.component';
import { SubscriptionRouting } from './subscription.routing';
import { SubscriptionService } from './subscription.service';

import { httpFactory } from '../http-interceptor/http.factory';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@NgModule({
    imports:
    [
        HttpModule,
        FormsModule,
        CommonModule,
        LoaderModule,
        SubscriptionRouting,
        ModalModule
    ],
    declarations:
    [
        SubscriptionComponent
    ],
    exports: [
        SubscriptionComponent
    ],
    providers: [
        SubscriptionService,
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]
})
export class SubscriptionModule { }