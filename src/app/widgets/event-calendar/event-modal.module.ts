import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventModalComponent } from './event-modal.component';
import { ModalModule } from '../modals/modal.module';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
    imports:
    [
        CommonModule,
        FormsModule,
        ModalModule,
        MyDateRangePickerModule,
        MyDatePickerModule    
    ],
    declarations:
    [
        EventModalComponent
    ],
    exports: [
        EventModalComponent
    ]
})
export class EventModalModule { }