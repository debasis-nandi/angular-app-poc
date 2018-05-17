import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {LoaderComponent} from './loader.component';

@NgModule({
    imports:
    [
        CommonModule,
        FormsModule       
        
    ],
    declarations:
    [
        LoaderComponent
    ],
    exports: [
        LoaderComponent
    ]

})
export class LoaderModule { }