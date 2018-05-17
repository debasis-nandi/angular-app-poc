import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AddNewUserRouting } from './add-new-user.routing';
import { AdminModule } from './admin.module';

import { CommonModule } from '@angular/common';

import { AddNewUserComponent } from './add-new-user.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule,
        AddNewUserRouting,
        AdminModule
    ],
    declarations: [
        AddNewUserComponent
    ],
    exports: [
        AddNewUserComponent
    ]
})
export class AddNewUserModule { }