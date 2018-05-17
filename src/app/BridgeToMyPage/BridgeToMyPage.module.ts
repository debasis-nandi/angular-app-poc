
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BridgeToMyPageComponent } from '../BridgeToMyPage/BridgeToMyPage.component';
import { BridgeToMyPageService } from '../BridgeToMyPage/BridgeToMyPage.service';
import { BridgeToMyPageRouting } from '../BridgeToMyPage/BridgeToMyPage.routing';
import { LoaderModule } from '../loader/loader.module'

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        BridgeToMyPageRouting,
        LoaderModule
    ],
    declarations: [
        BridgeToMyPageComponent
    ],
    exports: [
        BridgeToMyPageComponent
    ],
    providers: [BridgeToMyPageService]
})
export class BridgeToMyPageModule { }