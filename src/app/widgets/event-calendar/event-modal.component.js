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
var router_1 = require('@angular/router');
var modal_component_1 = require('../../widgets/modals/modal.component');
var global_util_1 = require('../../global/global.util');
var EventModalComponent = (function () {
    function EventModalComponent(router) {
        this.router = router;
        this.responsive = null;
        this.eventSave = new core_1.EventEmitter();
        this.eventClose = new core_1.EventEmitter();
        this.myDateRangePickerOptions = {
            dateFormat: 'dd-mm-yyyy'
        };
        this.myDatePickerOptions = {
            dateFormat: 'dd-mm-yyyy',
        };
    }
    EventModalComponent.prototype.ngOnInit = function () {
    };
    EventModalComponent.prototype.onSave = function () {
        var _this = this;
        if ((this.queryData.start == null) || (this.queryData.start == '')) {
            this.publicationDateeMsg = "Please select an event date";
            setTimeout(function () {
                _this.publicationDateeMsg = "";
            }, 3000);
            return null;
        }
        if ((this.queryData.title.trim() == null) || this.queryData.title.trim() == '') {
            this.publicationDateeMsg = "Please enter title";
            setTimeout(function () {
                _this.publicationDateeMsg = "";
            }, 3000);
            return null;
        }
        // not allowed to add/edit events for past date        
        var paraDate = this.queryData.start["formatted"];
        var eventDate = this.getEventDate(paraDate);
        var currentDate = new Date(global_util_1.GlobalUtil.getFormattedDate());
        currentDate.setHours(0, 0, 0, 0);
        if (eventDate < currentDate) {
            this.publicationDateeMsg = "Event date cannot be past date";
            setTimeout(function () {
                _this.publicationDateeMsg = "";
            }, 2000);
            return null;
        }
        this.eventSave.emit(this.queryData);
    };
    EventModalComponent.prototype.onOpen = function () {
        this._modalComponent.show();
    };
    EventModalComponent.prototype.onClose = function () {
        this.eventClose.emit();
    };
    EventModalComponent.prototype.getEventDate = function (selectedDate) {
        var reggie = /(\d{2})-(\d{2})-(\d{4})/;
        var dateArray = reggie.exec(selectedDate);
        var dateObject = new Date((+dateArray[3]), ((+dateArray[2])) - 1, // Careful, month starts at 0!
        (+dateArray[1]));
        return dateObject;
    };
    __decorate([
        core_1.ViewChild(modal_component_1.ModalComponent), 
        __metadata('design:type', modal_component_1.ModalComponent)
    ], EventModalComponent.prototype, "_modalComponent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], EventModalComponent.prototype, "responsive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EventModalComponent.prototype, "queryData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EventModalComponent.prototype, "modalclasses", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EventModalComponent.prototype, "eventSave", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EventModalComponent.prototype, "eventClose", void 0);
    EventModalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'event-modal',
            templateUrl: 'event-modal.component.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], EventModalComponent);
    return EventModalComponent;
}());
exports.EventModalComponent = EventModalComponent;
//# sourceMappingURL=event-modal.component.js.map