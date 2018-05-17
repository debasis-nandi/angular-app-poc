
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MappingRouting } from './mapping.routing';
import { AdminModule } from './admin.module';
import { CommonModule } from '@angular/common';
import { MappingComponent } from './mapping.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule,
        MappingRouting,
        AdminModule
    ],
    declarations: [
        MappingComponent
    ],
    exports: [
        MappingComponent
    ]
})
export class MappingModule { }