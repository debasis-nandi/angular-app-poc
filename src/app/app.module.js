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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var app_component_1 = require('./app.component');
var chart_service_1 = require('./widgets/charts/chart.service');
var glossary_service_1 = require('./widgets/glossary/glossary.service');
var authorise_service_1 = require('./admin/authorise/authorise.service');
var app_routing_1 = require('./app.routing');
var layout_component_1 = require('./layout/layout.component');
var menu_module_1 = require('./widgets/menu/menu.module');
var breadcrumb_module_1 = require('./widgets/breadcrumb/breadcrumb.module');
var ng2_popover_1 = require('ng2-popover');
var menu_component_1 = require('./fw/menus/menu/menu.component');
var menu_service_1 = require('./fw/services/menu.service');
var menu_item_component_1 = require('./fw/menus/menu-item/menu-item.component');
var screen_service_1 = require('./fw/services/screen.service');
var auth_guard_1 = require('./guards/auth.guard');
var email_module_1 = require('./widgets/email/email.module');
var event_calendar_module_1 = require('./widgets/event-calendar/event-calendar.module');
var datalist_module_1 = require('./insights/datalist/datalist.module');
var custompipes_module_1 = require('./pipes/custompipes.module');
var userprofile_module_1 = require('./widgets/userprofile/userprofile.module');
var footer_note_component_1 = require('./widgets/footer-note/footer-note.component');
var tinymce_module_1 = require('./widgets/tinymce/tinymce.module');
//import { QueryModule } from './query/query.module';
var OAuthCallbackComponent_1 = require('./adal-service/OAuthCallbackComponent');
var OAuthCallbackHandler_1 = require('./adal-service/OAuthCallbackHandler');
var BridgeToMyPage_component_1 = require('./BridgeToMyPage/BridgeToMyPage.component');
var http_factory_1 = require('./http-interceptor/http.factory');
var login_service_1 = require('./login/login.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                app_routing_1.Routing,
                ng2_popover_1.PopoverModule,
                menu_module_1.MenuModule,
                breadcrumb_module_1.BreadcrumbModule,
                email_module_1.EmailModule,
                custompipes_module_1.CustomPipesModule,
                userprofile_module_1.UserProfileModule,
                //QueryModule,
                event_calendar_module_1.EventCalendarModule,
                tinymce_module_1.TinyMCEModule,
                datalist_module_1.DataGridModule
            ],
            declarations: [
                app_component_1.AppComponent,
                layout_component_1.LayoutComponent,
                menu_component_1.MenuComponent,
                menu_item_component_1.MenuItemComponent,
                footer_note_component_1.FooterNoteComponent,
                OAuthCallbackComponent_1.OAuthCallbackComponent,
                BridgeToMyPage_component_1.BridgeToMyPageComponent
            ],
            bootstrap: [
                app_component_1.AppComponent
            ],
            providers: [
                //{ provide: APP_BASE_HREF, useValue: '/syngentatest/' },
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
                //{ provide: LocationStrategy, useClass: PathLocationStrategy },
                chart_service_1.ChartService,
                login_service_1.LoginService,
                menu_service_1.MenuService,
                screen_service_1.ScreenService,
                auth_guard_1.AuthGuard,
                glossary_service_1.GlossaryService,
                authorise_service_1.AuthoriseService,
                OAuthCallbackHandler_1.OAuthCallbackHandler,
                { provide: http_1.Http, useFactory: http_factory_1.httpFactory, deps: [http_1.XHRBackend, http_1.RequestOptions, router_1.Router] }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map