
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { LoginRouting } from './login.routing';
import { LoaderModule } from '../loader/loader.module'

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        LoginRouting,
        LoaderModule
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ],
    providers: [LoginService]
})
export class LoginModule { }