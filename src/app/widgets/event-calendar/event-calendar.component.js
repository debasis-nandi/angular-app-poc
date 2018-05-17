"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var event_calendar_service_1 = require('./event-calendar.service');
var global_util_1 = require('../../global/global.util');
var event_modal_component_1 = require('./event-modal.component');
var EventCalendarComponent = (function () {
    function EventCalendarComponent(eventservice) {
        this.eventservice = eventservice;
        this.events = []; // containing Current Month events
        this.mergedEvents = []; // containing all events with unique id (Today , Upcoming , Current month events)
        this.event = { id: 0, title: "", start: "", end: "", allDay: false, userName: "" };
        this.queryData = { id: 0, title: "", start: null, end: null, allDay: false, userName: "" };
        this.TodayEvent = []; // containing todays events
        this.UpcomingEvent = []; // containing upcoming events
        this.en = {
            firstDay: 1
        };
        this.editable = true;
        this.show = false;
        this.userProfileModalClasses = {
            csModalDialog: "modal-lg",
            csModalBody: "animated fadeInDown"
        };
        this.eventClass = 'ui-state-events';
        this.queryDataModal = [];
    }
    EventCalendarComponent.prototype.ngOnInit = function () {
        this.defaultDate = new Date();
        this.header = {
            left: 'prev',
            center: 'title',
            right: 'next'
        };
        this.IsAdministrator = (global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
        //this.OnGetDateData(GlobalUtil.getFormattedDate());        
        //this.optionConfig = {
        //    selectable: true
        //};
    };
    EventCalendarComponent.prototype.OnGetDateData = function (selectedDate) {
        var _this = this;
        this.event.start = selectedDate;
        this.eventservice.getData(selectedDate)
            .subscribe(function (data) {
            if (data.kpiData.length > 0) {
                //let curentEvents = data.kpiData[0].currentEvents;
                //this.TodayEvent = curentEvents.slice(0, 3);
                _this.TodayEvent = data.kpiData[0].currentEvents;
                //let UpEvent = curentEvents.slice(3, curentEvents.length).concat(data.kpiData[0].upcomingEvents);
                //let UpEvent = data.kpiData[0].upcomingEvents;
                //this.UpcomingEvent = UpEvent.slice(0, 3);
                _this.UpcomingEvent = data.kpiData[0].upcomingEvents.slice(0, 3);
                _this.mergedEvents = _this.removeDuplicates(data.kpiData[0].currentEvents.concat(data.kpiData[0].upcomingEvents).concat(data.kpiData[0].allEvents), "id");
                _this.events = data.kpiData[0].allEvents;
                // yyyy-mm-dd
                var arrselectedDate = selectedDate.split("-");
                if (arrselectedDate[1].length === 1) {
                    arrselectedDate[1] = '0' + arrselectedDate[1];
                }
                if (arrselectedDate[2].length === 1) {
                    arrselectedDate[2] = '0' + arrselectedDate[1];
                }
                if (selectedDate == global_util_1.GlobalUtil.getFormattedDate()) {
                    _this.TodayTitle = 'Today\'s Events (' + arrselectedDate.reverse().join("-") + ')';
                }
                else {
                    _this.TodayTitle = 'Events on (' + arrselectedDate.reverse().join("-") + ')';
                }
                // remove class
                var className = document.getElementsByClassName(_this.eventClass);
                while (className.length) {
                    className[0].classList.remove(_this.eventClass);
                }
                ////
                var DateEvent = void 0;
                var CompareDate = void 0;
                //let CurrMonth = selectedDate.split('-')[0] + '-' + selectedDate.split('-')[1];
                var CurrMonth = _this.selectedMonth.split('-')[0] + '-' + _this.selectedMonth.split('-')[1];
                for (var _i = 0, _a = _this.events; _i < _a.length; _i++) {
                    var item = _a[_i];
                    DateEvent = item.start;
                    CompareDate = DateEvent.split('-')[0] + '-' + DateEvent.split('-')[1];
                    //let claslist = document.querySelector(".fc-content-skeleton [data-date='" + DateEvent + "']").classList;
                    //if (claslist.contains(this.eventClass)) {
                    //    claslist.remove(this.eventClass);
                    //}
                    if (CurrMonth == CompareDate) {
                        //  document.querySelector(".fc-content-skeleton [data-date='" + DateEvent + "']").classList.add('ui-state-events'); 
                        var claslist = document.querySelector(".fc-content-skeleton [data-date='" + DateEvent + "']").classList;
                        if (claslist.contains(_this.eventClass)) {
                            claslist.remove(_this.eventClass);
                        }
                        claslist.add(_this.eventClass);
                    }
                }
            }
        });
    };
    EventCalendarComponent.prototype.OnGetDateDataByMonth = function (selectedDate) {
        var _this = this;
        this.event.start = selectedDate;
        this.eventservice.getData(selectedDate)
            .subscribe(function (data) {
            if (data.kpiData.length > 0) {
                _this.events = data.kpiData[0].allEvents;
                // remove class
                var className = document.getElementsByClassName(_this.eventClass);
                while (className.length) {
                    className[0].classList.remove(_this.eventClass);
                }
                ////
                var DateEvent = void 0;
                var CompareDate = void 0;
                //let CurrMonth = selectedDate.split('-')[0] + '-' + selectedDate.split('-')[1];
                var CurrMonth = _this.selectedMonth.split('-')[0] + '-' + _this.selectedMonth.split('-')[1];
                for (var _i = 0, _a = _this.events; _i < _a.length; _i++) {
                    var item = _a[_i];
                    DateEvent = item.start;
                    CompareDate = DateEvent.split('-')[0] + '-' + DateEvent.split('-')[1];
                    //let claslist = document.querySelector(".fc-content-skeleton [data-date='" + DateEvent + "']").classList;
                    //if (claslist.contains(this.eventClass)) {
                    //    claslist.remove(this.eventClass);
                    //}
                    if (CurrMonth == CompareDate) {
                        //document.querySelector(".fc-content-skeleton [data-date='" + DateEvent + "']").classList.add('ui-state-events');
                        var claslist = document.querySelector(".fc-content-skeleton [data-date='" + DateEvent + "']").classList;
                        if (claslist.contains(_this.eventClass)) {
                            claslist.remove(_this.eventClass);
                        }
                        claslist.add(_this.eventClass);
                    }
                }
            }
        });
    };
    EventCalendarComponent.prototype.OnSaveEvent = function () {
        var _this = this;
        if ((this.queryData != undefined) || (this.queryData != null)) {
            this.event.userName = global_util_1.GlobalUtil.getAppSession("UserInfo").userId;
            //if (this.queryData.id == 0) {
            this.event.start = this.queryData.start['formatted'];
            //} else {
            //    this.event.start = this.queryData.start['date'];
            //}
            this.event.id = this.queryData.id;
            this.event.title = this.queryData.title;
            this.event.allDay = this.queryData.allDay;
        }
        //setTimeout(() => {
        this.eventservice.saveEvent(this.event)
            .subscribe(function (data) {
            //this.onClickCalendarView.onClose();
            if (data == "1") {
                //this.show = false;
                _this.onClickCalendarView.publicationDateeMsg = "Event has been saved successfully";
                _this.OnGetDateData(global_util_1.GlobalUtil.getFormattedDate());
            }
            else if (data == "-1") {
                _this.onClickCalendarView.publicationDateeMsg = "You cannot add more than 3 events for a day";
            }
        });
        //}, 100);
    };
    EventCalendarComponent.prototype.ngOnDayClick = function (event) {
        this.event.start = event.date.format();
        this.OnGetDateData(this.event.start);
    };
    EventCalendarComponent.prototype.ngOnViewRender = function (event) {
        var CurrDate = moment(event.view.intervalStart).format('YYYY-MM-DD'); // for every month the search will begin from first date except the current month, for which the search will begin from current date.               
        this.selectedMonth = CurrDate;
        var SelectedMonth = moment(event.view.intervalStart).format('MM');
        var CurrMonth = global_util_1.GlobalUtil.getFormattedDate().split('-')[1];
        if (Number(CurrMonth) < 10) {
            CurrMonth = "0" + CurrMonth;
        }
        if (CurrMonth == SelectedMonth) {
            this.OnGetDateData(global_util_1.GlobalUtil.getFormattedDate());
        }
        if (CurrMonth != SelectedMonth) {
            this.OnGetDateDataByMonth(CurrDate);
        }
    };
    EventCalendarComponent.prototype.onClickEvents = function (id) {
        this.queryDataModal = [];
        this.queryData = { id: 0, title: "", start: null, end: null, allDay: false, userName: "" };
        var _self = this;
        if ((id != '') || (id != undefined)) {
            //this.queryDataModal[0] = this.events.find(map => map.id == Number(id));
            this.queryDataModal[0] = this.mergedEvents.find(function (map) { return map.id == Number(id); });
            if (this.queryDataModal[0] != undefined) {
                //this.queryData.start = { date: this.getPublicationDate(this.queryDataModal[0].start) };
                var splitDate = this.getPublicationDate(this.queryDataModal[0].start).split('-');
                this.queryData.start = { formatted: this.getPublicationDate(this.queryDataModal[0].start), date: { year: Number(splitDate[2]), month: Number(splitDate[1]), day: Number(splitDate[0]) } };
                this.queryData.end = { date: this.getPublicationDate(this.queryDataModal[0].end) };
                this.queryData.id = this.queryDataModal[0].id;
                this.queryData.title = this.queryDataModal[0].title;
                this.queryData.allDay = this.queryDataModal[0].allDay;
            }
        }
        //this.onClickCalendarView.onOpen();
        this.show = true;
    };
    EventCalendarComponent.prototype.onClickEventsDelete = function (id) {
        var _this = this;
        var confirmationMessage;
        confirmationMessage = "Are you sure, you want to delete this event?";
        var res = confirm(confirmationMessage);
        if (res) {
            this.eventservice.deleteData(id)
                .subscribe(function (data) {
                if (data > 0) {
                    alert('Event has been deleted successfully');
                    _this.OnGetDateData(global_util_1.GlobalUtil.getFormattedDate());
                }
            });
        }
    };
    EventCalendarComponent.prototype.getPublicationDate = function (selectedDate) {
        var reggie = /(\d{4})-(\d{2})-(\d{2})/;
        var dateArray = reggie.exec(selectedDate);
        var dateObject = (dateArray[3]) + "-" + (dateArray[2]) + "-" + (dateArray[1]); // Careful, month starts at 0!            
        return dateObject;
    };
    EventCalendarComponent.prototype.removeDuplicates = function (originalArray, prop) {
        var newArray = [];
        var lookupObject = {};
        for (var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }
        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    };
    EventCalendarComponent.prototype.onClose = function () {
        this.show = false;
    };
    __decorate([
        core_1.ViewChild(event_modal_component_1.EventModalComponent), 
        __metadata('design:type', event_modal_component_1.EventModalComponent)
    ], EventCalendarComponent.prototype, "onClickCalendarView", void 0);
    __decorate([
        // containing upcoming events
        core_1.Input(), 
        __metadata('design:type', Number)
    ], EventCalendarComponent.prototype, "aspectRatio", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], EventCalendarComponent.prototype, "contentHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], EventCalendarComponent.prototype, "eventLimit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], EventCalendarComponent.prototype, "UpcomingTitle", void 0);
    EventCalendarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'event-calendar',
            templateUrl: 'event-calendar.component.html'
        }), 
        __metadata('design:paramtypes', [event_calendar_service_1.EventCalendarService])
    ], EventCalendarComponent);
    return EventCalendarComponent;
}());
exports.EventCalendarComponent = EventCalendarComponent;
//# sourceMappingURL=event-calendar.component.js.map