import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ManageUserRouting } from './manageuser.routing';
import { AdminModule } from './admin.module';

import { CommonModule } from '@angular/common';

import { ManageUserAuthorizationComponent } from './manage-user-authorization.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule,
        ManageUserRouting,
        AdminModule
    ],
    declarations: [
        ManageUserAuthorizationComponent
    ],
    exports: [
        ManageUserAuthorizationComponent
    ]
})
export class ManageUserAuthorizationModule { }