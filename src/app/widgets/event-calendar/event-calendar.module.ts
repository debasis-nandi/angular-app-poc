import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScheduleModule } from 'primeng/primeng';
import { EventCalendarComponent } from './event-calendar.component';
import { EventCalendarService } from './event-calendar.service';
import { EventModalModule } from './event-modal.module';

import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { httpFactory } from '../../http-interceptor/http.factory';

@NgModule({
    imports:
    [
        CommonModule,
        FormsModule,
        ScheduleModule,
        EventModalModule
        
    ],
    declarations:
    [
        EventCalendarComponent
    ],
    exports: [
        EventCalendarComponent
    ],
    providers: [
        EventCalendarService,
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]
})
export class EventCalendarModule { }