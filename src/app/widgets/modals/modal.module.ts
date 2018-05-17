import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal.component';

@NgModule({
    imports:
    [
        CommonModule,
        FormsModule
    ],
    exports: [
        ModalComponent
    ],
    declarations: [
        ModalComponent
    ]


})
export class ModalModule { }