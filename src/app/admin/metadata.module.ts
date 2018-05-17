
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MetaDataRouting } from './metadata.routing';
import { AdminModule } from './admin.module';

import { CommonModule } from '@angular/common';

import { MetadataComponent } from './metadata.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule,
        MetaDataRouting,
        AdminModule
    ],
    declarations: [
        MetadataComponent
    ],
    exports: [
        MetadataComponent
    ]
})
export class MetadataModule { }