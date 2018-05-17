
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';

import { ChartService } from './widgets/charts/chart.service';
import { GlossaryService } from './widgets/glossary/glossary.service';
import { AuthoriseService } from './admin/authorise/authorise.service';

import { Routing } from './app.routing';
import { LayoutComponent } from './layout/layout.component';
import { MenuModule } from './widgets/menu/menu.module';
import { BreadcrumbModule } from './widgets/breadcrumb/breadcrumb.module';

import { PopoverModule } from 'ng2-popover';

import { MenuComponent } from './fw/menus/menu/menu.component';
import { MenuService } from './fw/services/menu.service';
import { MenuItemComponent } from './fw/menus/menu-item/menu-item.component';
import { ScreenService } from './fw/services/screen.service';
import { AuthGuard } from './guards/auth.guard';
import { EmailModule } from './widgets/email/email.module';
import { EventCalendarModule } from './widgets/event-calendar/event-calendar.module';
import { DataGridModule } from './insights/datalist/datalist.module';
import { CustomPipesModule } from './pipes/custompipes.module';
import { UserProfileModule } from './widgets/userprofile/userprofile.module';
import { FooterNoteComponent } from './widgets/footer-note/footer-note.component';
import { TinyMCEModule } from './widgets/tinymce/tinymce.module';
//import { QueryModule } from './query/query.module';
import { OAuthCallbackComponent } from './adal-service/OAuthCallbackComponent';
import { OAuthCallbackHandler } from './adal-service/OAuthCallbackHandler';
import { BridgeToMyPageModule } from './BridgeToMyPage/BridgeToMyPage.module';
import { BridgeToMyPageComponent } from './BridgeToMyPage/BridgeToMyPage.component';

import { httpFactory } from './http-interceptor/http.factory';
import { LoginService } from './login/login.service';

@NgModule({
    imports:
    [
        BrowserModule,
        HttpModule,
        FormsModule,
        Routing,
        PopoverModule,
        MenuModule,
        BreadcrumbModule,
        EmailModule,
        CustomPipesModule,
        UserProfileModule,
        //QueryModule,
        EventCalendarModule,
        TinyMCEModule,
        DataGridModule
        //UserAnalyticsModule
    ],
    declarations: [
        AppComponent,
        LayoutComponent,
        MenuComponent,
        MenuItemComponent,
        FooterNoteComponent,
        OAuthCallbackComponent,
        BridgeToMyPageComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        //{ provide: APP_BASE_HREF, useValue: '/syngentatest/' },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        //{ provide: LocationStrategy, useClass: PathLocationStrategy },
        ChartService,
        LoginService,
        MenuService,
        ScreenService,
        AuthGuard,
        GlossaryService,
        AuthoriseService,
        OAuthCallbackHandler,
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]
})
export class AppModule { }
