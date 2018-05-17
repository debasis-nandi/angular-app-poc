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
var usertracking_service_1 = require('./usertracking.service');
var UserTrackingComponent = (function () {
    function UserTrackingComponent(service) {
        this.service = service;
    }
    UserTrackingComponent.prototype.ngOnInit = function () {
    };
    UserTrackingComponent.prototype.onSubmit = function () {
        //debugger;
        var url = "http://localhost:56833/api/UserTracking/LogUserAction";
        this.service.get(url).subscribe(function (result) {
            //debugger;
            var dd = result;
        });
    };
    UserTrackingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-tracking',
            templateUrl: 'usertracking.component.html',
            providers: [usertracking_service_1.UserTrackingService]
        }), 
        __metadata('design:paramtypes', [usertracking_service_1.UserTrackingService])
    ], UserTrackingComponent);
    return UserTrackingComponent;
}());
exports.UserTrackingComponent = UserTrackingComponent;
//# sourceMappingURL=usertracking.component.js.map