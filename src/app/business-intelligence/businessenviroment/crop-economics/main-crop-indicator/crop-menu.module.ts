
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CropMenuComponent } from './crop-menu.component';

@NgModule({
    imports:
    [
        HttpModule,
        FormsModule,
        CommonModule,
        RouterModule
    ],
    declarations:
    [
        CropMenuComponent
    ],
    exports: [
        CropMenuComponent
    ]

})
export class CropMenuModule { }