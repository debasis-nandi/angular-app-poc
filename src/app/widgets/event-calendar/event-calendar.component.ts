import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EventCalendarService } from './event-calendar.service';
import { IMyEvent, IMyEventModal } from './event-calendar';
import { GlobalUtil } from '../../global/global.util';
import { GlobalConfig, Page } from '../../global/global.config';
import { EventModalComponent } from './event-modal.component';
import { ModalDetail } from '../../widgets/modals/modal.model';


declare var moment: any;

@Component({
    moduleId: module.id,
    selector: 'event-calendar',
    templateUrl: 'event-calendar.component.html'
})

export class EventCalendarComponent implements OnInit {

    @ViewChild(EventModalComponent) onClickCalendarView: EventModalComponent;

    events: IMyEvent[] = []; // containing Current Month events
    mergedEvents: IMyEvent[] = []; // containing all events with unique id (Today , Upcoming , Current month events)
    event: IMyEvent = { id: 0, title: "", start: "", end: "", allDay: false, userName: "" };
    queryData: IMyEventModal = { id: 0, title: "", start: null, end: null, allDay: false, userName: "" };
    TodayEvent: IMyEvent[] = []; // containing todays events
    UpcomingEvent: IMyEvent[] = []; // containing upcoming events
    //optionConfig: Object;
    @Input() aspectRatio: number;
    @Input() contentHeight: number;
    @Input() eventLimit: string;
    @Input() UpcomingTitle: string;
    en = {
        firstDay: 1
    };
    editable: boolean = true;
    header: any;
    defaultDate: Date;
    TodayTitle: string;
    IsAdministrator: boolean;
    show: boolean = false;
    userProfileModalClasses: ModalDetail = {
        csModalDialog: "modal-lg",
        csModalBody: "animated fadeInDown"
    }
    eventClass: string = 'ui-state-events';
    selectedMonth: any;


    constructor(private eventservice: EventCalendarService) {
    }

    ngOnInit(): void {
        this.defaultDate = new Date();
        this.header = {
            left: 'prev',
            center: 'title',
            right: 'next'
        };
        this.IsAdministrator = (GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;

        //this.OnGetDateData(GlobalUtil.getFormattedDate());        
        //this.optionConfig = {
        //    selectable: true
        //};
    }

    OnGetDateData(selectedDate: string): void {
        this.event.start = selectedDate;
        this.eventservice.getData(selectedDate)
            .subscribe(data => {
                if (data.kpiData.length > 0) {
                    //let curentEvents = data.kpiData[0].currentEvents;
                    //this.TodayEvent = curentEvents.slice(0, 3);
                    this.TodayEvent = data.kpiData[0].currentEvents;
                    //let UpEvent = curentEvents.slice(3, curentEvents.length).concat(data.kpiData[0].upcomingEvents);
                    //let UpEvent = data.kpiData[0].upcomingEvents;
                    //this.UpcomingEvent = UpEvent.slice(0, 3);
                    this.UpcomingEvent = data.kpiData[0].upcomingEvents.slice(0, 3);
                    this.mergedEvents = this.removeDuplicates(data.kpiData[0].currentEvents.concat(data.kpiData[0].upcomingEvents).concat(data.kpiData[0].allEvents), "id");
                    this.events = data.kpiData[0].allEvents;
                    // yyyy-mm-dd
                    let arrselectedDate = selectedDate.split("-");
                    if (arrselectedDate[1].length === 1) {
                        arrselectedDate[1] = '0' + arrselectedDate[1];
                    }
                    if (arrselectedDate[2].length === 1) {
                        arrselectedDate[2] = '0' + arrselectedDate[1];
                    }
                    if (selectedDate == GlobalUtil.getFormattedDate()) {
                        this.TodayTitle = 'Today\'s Events (' + arrselectedDate.reverse().join("-") + ')';
                    } else {
                        this.TodayTitle = 'Events on (' + arrselectedDate.reverse().join("-") + ')';
                    }
                    // remove class
                    let className = document.getElementsByClassName(this.eventClass);
                    while (className.length) {
                        className[0].classList.remove(this.eventClass);
                    }
                    ////
                    let DateEvent: string;
                    let CompareDate: string;
                    //let CurrMonth = selectedDate.split('-')[0] + '-' + selectedDate.split('-')[1];
                    let CurrMonth = this.selectedMonth.split('-')[0] + '-' + this.selectedMonth.split('-')[1];
                    for (let item of this.events) {
                        DateEvent = item.start;
                        CompareDate = DateEvent.split('-')[0] + '-' + DateEvent.split('-')[1];
                        //let claslist = document.querySelector(".fc-content-skeleton [data-date='" + DateEvent + "']").classList;
                        //if (claslist.contains(this.eventClass)) {
                        //    claslist.remove(this.eventClass);
                        //}
                        if (CurrMonth == CompareDate) {
                            //  document.querySelector(".fc-content-skeleton [data-date='" + DateEvent + "']").classList.add('ui-state-events'); 
                            let claslist = document.querySelector(".fc-content-skeleton [data-date='" + DateEvent + "']").classList;
                            if (claslist.contains(this.eventClass)) {
                                claslist.remove(this.eventClass);
                            }
                            claslist.add(this.eventClass);
                        }
                    }
                }
            });
    }

    OnGetDateDataByMonth(selectedDate: string): void {
        this.event.start = selectedDate;
        this.eventservice.getData(selectedDate)
            .subscribe(data => {
                if (data.kpiData.length > 0) {
                    this.events = data.kpiData[0].allEvents;
                    // remove class
                    let className = document.getElementsByClassName(this.eventClass);
                    while (className.length) {
                        className[0].classList.remove(this.eventClass);
                    }
                    ////
                    let DateEvent: string;
                    let CompareDate: string;
                    //let CurrMonth = selectedDate.split('-')[0] + '-' + selectedDate.split('-')[1];
                    let CurrMonth = this.selectedMonth.split('-')[0] + '-' + this.selectedMonth.split('-')[1];
                    for (let item of this.events) {
                        DateEvent = item.start;
                        CompareDate = DateEvent.split('-')[0] + '-' + DateEvent.split('-')[1];
                        //let claslist = document.querySelector(".fc-content-skeleton [data-date='" + DateEvent + "']").classList;
                        //if (claslist.contains(this.eventClass)) {
                        //    claslist.remove(this.eventClass);
                        //}
                        if (CurrMonth == CompareDate) {
                            //document.querySelector(".fc-content-skeleton [data-date='" + DateEvent + "']").classList.add('ui-state-events');
                            let claslist = document.querySelector(".fc-content-skeleton [data-date='" + DateEvent + "']").classList;
                            if (claslist.contains(this.eventClass)) {
                                claslist.remove(this.eventClass);
                            }
                            claslist.add(this.eventClass);
                        }
                    }
                }
            });
    }

    OnSaveEvent(): void {
        if ((this.queryData != undefined) || (this.queryData != null)) {
            this.event.userName = GlobalUtil.getAppSession("UserInfo").userId;
            //if (this.queryData.id == 0) {
            this.event.start = this.queryData.start['formatted'];

            //} else {
            //    this.event.start = this.queryData.start['date'];

            //}
            this.event.id = this.queryData.id;
            this.event.title = this.queryData.title;
            this.event.allDay = this.queryData.allDay;
            //this.onClickCalendarView.publicationDateeMsg = "Saved Successfully";
        }

        //setTimeout(() => {
            this.eventservice.saveEvent(this.event)
                .subscribe(data => {
                    //this.onClickCalendarView.onClose();
                    if (data == "1") {
                        //this.show = false;
                        this.onClickCalendarView.publicationDateeMsg = "Event has been saved successfully";
                        this.OnGetDateData(GlobalUtil.getFormattedDate());
                    } else if (data == "-1") {
                        this.onClickCalendarView.publicationDateeMsg = "You cannot add more than 3 events for a day";
                    }
                });
        //}, 100);
    }

    ngOnDayClick(event: any): any {
        this.event.start = event.date.format();
        this.OnGetDateData(this.event.start);
    }

    ngOnViewRender(event: any): void {
        let CurrDate = moment(event.view.intervalStart).format('YYYY-MM-DD'); // for every month the search will begin from first date except the current month, for which the search will begin from current date.               
        this.selectedMonth = CurrDate;
        let SelectedMonth = moment(event.view.intervalStart).format('MM');
        let CurrMonth = GlobalUtil.getFormattedDate().split('-')[1];

        if (Number(CurrMonth) < 10) {
            CurrMonth = "0" + CurrMonth;
        }

        if (CurrMonth == SelectedMonth) {
            this.OnGetDateData(GlobalUtil.getFormattedDate());
        }
        if (CurrMonth != SelectedMonth) {
            this.OnGetDateDataByMonth(CurrDate);
        }
    }

    queryDataModal: IMyEvent[] = [];
    onClickEvents(id?: string) {
        this.queryDataModal = [];
        this.queryData = { id: 0, title: "", start: null, end: null, allDay: false, userName: "" };
        let _self = this;
        if ((id != '') || (id != undefined)) {
            //this.queryDataModal[0] = this.events.find(map => map.id == Number(id));
            this.queryDataModal[0] = this.mergedEvents.find(map => map.id == Number(id));
            if (this.queryDataModal[0] != undefined) {
                //this.queryData.start = { date: this.getPublicationDate(this.queryDataModal[0].start) };
                let splitDate = this.getPublicationDate(this.queryDataModal[0].start).split('-');
                this.queryData.start = { formatted: this.getPublicationDate(this.queryDataModal[0].start), date: { year: Number(splitDate[2]), month: Number(splitDate[1]), day: Number(splitDate[0]) } };
                this.queryData.end = { date: this.getPublicationDate(this.queryDataModal[0].end) };
                this.queryData.id = this.queryDataModal[0].id;
                this.queryData.title = this.queryDataModal[0].title;
                this.queryData.allDay = this.queryDataModal[0].allDay;
            }
        }
        //this.onClickCalendarView.onOpen();
        this.show = true;
    }

    onClickEventsDelete(id: string) {
        let confirmationMessage: string;
        confirmationMessage = "Are you sure, you want to delete this event?";
        let res: boolean = confirm(confirmationMessage);
        if (res) {
            this.eventservice.deleteData(id)
                .subscribe(data => {
                    if (data > 0) {
                        alert('Event has been deleted successfully');
                        this.OnGetDateData(GlobalUtil.getFormattedDate());
                    }
                });
        }
    }

    getPublicationDate(selectedDate: any): string {
        let reggie = /(\d{4})-(\d{2})-(\d{2})/;
        let dateArray = reggie.exec(selectedDate);
        let dateObject = (dateArray[3]) + "-" + (dateArray[2]) + "-" + (dateArray[1]); // Careful, month starts at 0!            
        return dateObject;
    }

    removeDuplicates(originalArray: any, prop: any): any {
        var newArray: any = [];
        var lookupObject = {};

        for (var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }

    onClose() {
        this.show = false;
    }
}