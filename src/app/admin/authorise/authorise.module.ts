import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthoriseComponent } from './authorise.component';
import { AuthoriseRouting } from './authorise.routing';
import { RouterModule } from '@angular/router';
import { UnderlyingDatatableModule } from '../../widgets/underlying-datatable/underlying-datatable.module';
import { AutoCompleteModule, MultiSelectModule } from 'primeng/primeng';
import {DataTableModule, SharedModule} from 'primeng/primeng';

@NgModule({
    imports:
    [
        CommonModule,
        FormsModule,
        AuthoriseRouting,
        UnderlyingDatatableModule,
        AutoCompleteModule,
        DataTableModule,
        SharedModule,
        MultiSelectModule
    ],
    exports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        AuthoriseComponent
    ]
})
export class AuthoriseModule { }