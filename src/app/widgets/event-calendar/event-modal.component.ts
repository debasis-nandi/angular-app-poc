import { AfterViewInit, Component, OnInit, Input, Output, OnChanges, ViewChild, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConfig, Page } from '../../global/global.config';
import { ModalComponent } from '../../widgets/modals/modal.component';
import { ModalDetail } from '../../widgets/modals/modal.model';
import { IMyEvent } from './event-calendar';
import { GlobalUtil } from '../../global/global.util';
import { IMyDrpOptions } from 'mydaterangepicker';
import { IMyDpOptions } from 'mydatepicker';


@Component({
    moduleId: module.id,
    selector: 'event-modal',
    templateUrl: 'event-modal.component.html',
    encapsulation: ViewEncapsulation.None
})


export class EventModalComponent implements OnInit {

    @ViewChild(ModalComponent) _modalComponent: ModalComponent;

    @Input() responsive: boolean = null;
    @Input() queryData: IMyEvent;
    @Input() modalclasses?: ModalDetail;
    @Output() eventSave = new EventEmitter<any>();
    @Output() eventClose = new EventEmitter<any>();

    publicationDateeMsg: string;

    myDateRangePickerOptions: IMyDrpOptions = {
        dateFormat: 'dd-mm-yyyy'
    };

    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd-mm-yyyy',
    };

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    onSave(): void {
        if ((this.queryData.start == null) || (this.queryData.start == '')) {
            this.publicationDateeMsg = "Please select an event date";
            setTimeout(() => {
                this.publicationDateeMsg = "";
            }, 3000);
            return null;
        }

        if ((this.queryData.title.trim() == null) || this.queryData.title.trim() == '') {
            this.publicationDateeMsg = "Please enter title";
            setTimeout(() => {
                this.publicationDateeMsg = "";
            }, 3000);
            return null;
        }

        // not allowed to add/edit events for past date        
        let paraDate = this.queryData.start["formatted"];
        let eventDate = this.getEventDate(paraDate);
        let currentDate = new Date(GlobalUtil.getFormattedDate());
        currentDate.setHours(0, 0, 0, 0);
            if (eventDate < currentDate) {
                this.publicationDateeMsg = "Event date cannot be past date";
                setTimeout(() => {
                    this.publicationDateeMsg = "";
                }, 2000);
                return null;
            }        

        this.eventSave.emit(this.queryData);
    }

    onOpen() {
        this._modalComponent.show();
    }
    onClose() {
        this.eventClose.emit();
    }

    getEventDate(selectedDate: any): Date {
        let reggie = /(\d{2})-(\d{2})-(\d{4})/;
        let dateArray = reggie.exec(selectedDate);
        let dateObject = new Date(
            (+dateArray[3]),
            ((+dateArray[2])) - 1, // Careful, month starts at 0!
            (+dateArray[1])
        );
        return dateObject;
    }
}