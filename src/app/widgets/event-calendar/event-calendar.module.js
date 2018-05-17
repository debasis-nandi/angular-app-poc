"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
var primeng_1 = require('primeng/primeng');
var event_calendar_component_1 = require('./event-calendar.component');
var event_calendar_service_1 = require('./event-calendar.service');
var event_modal_module_1 = require('./event-modal.module');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var http_factory_1 = require('../../http-interceptor/http.factory');
var EventCalendarModule = (function () {
    function EventCalendarModule() {
    }
    EventCalendarModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                primeng_1.ScheduleModule,
                event_modal_module_1.EventModalModule
            ],
            declarations: [
                event_calendar_component_1.EventCalendarComponent
            ],
            exports: [
                event_calendar_component_1.EventCalendarComponent
            ],
            providers: [
                event_calendar_service_1.EventCalendarService,
                { provide: http_1.Http, useFactory: http_factory_1.httpFactory, deps: [http_1.XHRBackend, http_1.RequestOptions, router_1.Router] }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], EventCalendarModule);
    return EventCalendarModule;
}());
exports.EventCalendarModule = EventCalendarModule;
//# sourceMappingURL=event-calendar.module.js.map