

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataListModule } from 'primeng/primeng';
import { DataListComponent } from './datalist.component';
import { DataListService } from './datalist.service';

@NgModule({
    imports: [
        RouterModule,
        FormsModule,
        CommonModule,
        DataListModule        
    ],
    declarations: [
        DataListComponent
    ],
    exports: [
        DataListComponent
    ],
    providers: [DataListService]
})
export class DataGridModule { }


